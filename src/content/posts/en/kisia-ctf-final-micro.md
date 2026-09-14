# [KISIA-CTF final] micro: Past the ADC Fingerprint and the RTC Gate to Reach the eFuse

A 2000-point hardware challenge from the KISIA CTF finals. What made it unusual was that the handout was not a file but physical equipment. Each team received an envelope containing one ESP32-C3 development board, one breadboard, nine red jumper wires and a USB-C cable. The challenge description was short. "This challenge is solved using the equipment distributed per team. Device damage caused by participant error cannot be recovered. Obtain the flag from the provided device, then obtain the final flag from the server."

Let me write the conclusion first. We passed every gate on the device and secured arbitrary memory read, dumped every eFuse block, and recovered the 32 bytes judged to be the DEVICE PROOF. The challenge instance for verifying that value had expired, though, so we did not receive the final flag string. This piece is a record of what was right and what was wrong along the way there.

![The final wiring state — mode D, with arbitrary memory read open](/images/kisia-micro/board_wired.png)

---

## 1. Confirming what is in hand first

The first thing done was establishing exactly what this black board was. The silkscreen on the back read `ESP32-C3`, `SuperMini` and `V1601`, and the QFN package in the centre of the front was engraved `ESP32-C3` too.

![The back of the board — ESP32-C3 SuperMini V1601](/images/kisia-micro/board_back.png)

The ESP32-C3 is a RISC-V 32-bit single-core SoC. CPU, 400KB SRAM, 4MB flash, WiFi 802.11 b/g/n, BLE 5, ADC and eFuse are all inside this one chip. That the flash is inside the chip package becomes important later, because it shuts off at source the classical route of removing the chip and reading it with a separate reader.

![The front of the board — USB-C, BOOT/RST buttons, ESP32-C3 QFN package](/images/kisia-micro/board_front.png)

The USB-C connector is wired directly to the chip's native USB pins, so plugging the cable in brought it up as `/dev/cu.usbmodem1101` with no separate adapter. That is the first channel.

The pinout was established by reading the silkscreen. With the front facing you, the right column runs from the top `5V`, `G`, `3.3`, `GPIO4`, `GPIO3`, `GPIO2`, `GPIO1`, `GPIO0`, and the left column runs `GPIO5` through `GPIO21`. This arrangement belongs to the board model, not to something the chip fixed. Whereas "GPIO0\~4 are ADC1 channels 0\~4" is a fixed chip specification from the datasheet. Failing to distinguish these two layers causes confusion later.

That `5V` and `3.3` are only two positions apart is worth writing down in advance. Every near-death incident for the board in this challenge came from miswiring these adjacent pins.

---

## 2. Opening the firmware — one block of strings is 80% of the design

The `firmware.bin` received as handout was 593,920 bytes. The structure was parsed first with `esptool image-info`.

```
Project name: micro
ESP-IDF: v4.4.4
Chip ID: 5 (ESP32-C3)
Checksum: valid / Validation hash: valid

Segment  Length   Load addr   Memory types
   0     0x058d0  0x3c070020  DROM
   1     0x02088  0x3fc8ce00  DRAM
   2     0x08690  0x40380000  IRAM
   3     0x6d2ec  0x42000020  IROM
   4     0x04648  0x40388690  IRAM
```

Both checksum and hash being valid means the image is plaintext. An encrypted image would have blocked us right here.

Next, only the DROM segment was cut out and hexdumped whole. It is where the app's read-only data gathers, and where there is most to gain. In fact, in a stretch of just over 200 bytes from offset `0x744` to `0x8c8`, almost the entire design of this challenge was present.

```
0x744  IDLE  LOCKED  C  AUTH  NO  SSID  KEY  OK  OFF  S
0x781  192.168.4.1
0x7a4  23456789ABCDEFGHJKLMNPQRSTUVWXYZ
0x7c8  712dc48a36b905ee  9b4317d06ca2f528
0x7d8  D  AUTH  DENIED  FAULT  READY
0x7f8  %08lx:   0123456789abcdef
0x878  address=  &value=  stored  blocked  bad request
```

Read line by line it interprets like this. `C`, `S` and `D` are the names of three modes. `IDLE`, `LOCKED`, `AUTH`, `READY`, `DENIED` and `FAULT` are the state machine's responses. `192.168.4.1` is the default gateway address for an ESP-IDF SoftAP, so this device opens a WiFi AP. `23456789ABCDEFGHJKLMNPQRSTUVWXYZ` is a 32-character alphabet with 0, 1, I and O removed – the typical encoding for a code a person reads by eye and types by hand. `%08lx:` sitting next to `0123456789abcdef` signals a hexdump output routine. `address=` and `&value=` are HTTP form parameters, and `stored` and `blocked` being prepared as responses means there is a feature writing to an arbitrary address together with a range check blocking it.

And the 16 bytes right after the alphabet, `712dc48a36b905ee 9b4317d06ca2f528`. By position they were likely two keys used in authentication. That guess was confirmed later when it passed on the real device as-is.

We got this far without disassembling a single line of code. It is why a string dump is the highest value-for-effort first move in embedded reverse engineering.

In parallel, the team recovered the RISC-V code with Ghidra. Every function name was a temporary address-based name such as `FUN_ram_42004384`. A compiled binary keeps neither variable names nor comments. What remains is instruction flow, constants and strings, and those three alone are enough to recover the behaviour. Three things were established from decompilation: that the mode is fixed by two bits, GPIO6 and GPIO7; that the authentication code is made as 12 characters by `ALPHABET[SHA256(key ‖ device_id)[i] & 0x1f]`; and that the 6-byte `device_id` comes from ADC measurements.

---

## 3. Three modes, and the separation of privilege

The same firmware is on the same chip, and the moment it boots it becomes an entirely different device depending on what the voltages on two GPIOs are.

| GPIO6 | GPIO7 | Mode | Channel | Auth | Capability |
|---|---|---|---|---|---|
| 0 | 0 | LOCKED | — | — | none |
| 1 | 0 | **C** provisioning | USB serial | required | store WiFi credentials in NVS |
| 0 | 1 | **S** SoftAP | WiFi HTTP | **none** | **write** 1 byte to an arbitrary address |
| 1 | 1 | **D** console | USB serial | required | **read** arbitrary addresses |

This table is the whole challenge. Write capability and read capability are split across different modes, and the mode is fixed once at boot. Which is to say, you cannot have both at once.

More perverse is the asymmetry of authentication. The write primitive, which looks powerful, has no authentication at all. Anyone who connects to the AP can write memory. Read, by contrast, demands a 12-character code. It was not the developer forgetting authentication by mistake. On the write side there is a range check explicitly blocking the eFuse region (`0x60008800`\~`0x60009000`) and adjacent peripheral regions. It is code written knowing exactly what has to be protected. Had S mode had even one read, authentication, fingerprint and gate would all have become meaningless and the challenge would have collapsed instantly. That asymmetry was the challenge itself.

---

## 4. The ADC fingerprint — the authentication code cannot be computed from firmware alone

The authentication code comes from `SHA256(fixed key ‖ device_id)`. The fixed key is embedded in the firmware and anyone can extract it. We did in fact obtain it in 30 minutes with a string dump. The problem is `device_id`.

These 6 bytes are stored nowhere on the device. They are produced every boot by measuring the voltages on GPIO0\~4 with the ADC. Each channel is sampled 10 times, sorted, the middle 6 summed, and that sum divided by 1536 and quantized into 0\~15. The sixth byte is a recalibration measurement of channel 0.

The design intent is clear. Touch nothing on the pins and each board has its own floating voltage pattern, which becomes a per-team unique ID. It can never be computed by tearing the firmware apart; only by having the physical board in hand. The single line "this challenge is solved using the equipment distributed per team" comes from here.

Approached honestly, this value has to be measured. Measure the voltage on the five pins with a multimeter and put it into the formula. But we went the other way. **Instead of measuring the value, we forced it.**

Tie GPIO0\~4 all to 3.3V and the ADC saturates. The 12-bit ADC's maximum of 4095 added six times is 24570, and dividing by 1536 gives 15.99, clipped to the ceiling of 15. Which is to say, the first five bytes are all fixed at `0x0f`. Per-unit variation disappears and the unknown shrinks from 6 bytes to 1 byte.

```
16^6 = 16,777,216 possibilities  →  16 possibilities
```

Here the identity of the breadboard and the nine jumper wires becomes clear. One strand to run 3.3V out to a rail, five strands to GPIO0\~4, two strands to the two mode pins. Exactly eight, with one strand left over. The contents of the envelope were no coincidence.

The brute force did in fact finish in seconds.

```
0f0f0f0f0f00 -> NO
0f0f0f0f0f01 -> DENIED
```

`NO` means the code is wrong and `DENIED` is a different response. That only one of 256 combinations produced `DENIED` strongly suggested that value was correct. So authentication was broken and something else was blocking.

One side effect had to be accepted. Even in saturation the sixth calibration byte was still analog, so the value wobbled every time the jumpers were touched. It would be `01`, then `02`, then `03`. So the 16 combinations had to be rerun every time the wiring was touched. The device_id is not a fixed value like a MAC address but closer to a body temperature measured anew each time.

---

## 5. The RTC gate — a bridge skipping across boots

`DENIED`'s identity was a second gate. Even with a correct authentication code, both words in RTC memory have to be non-zero for `READY` to come out.

```
0x50000024
0x50000028
```

The RTC domain is a separate low-power region inside the chip. It was originally made to count time and hold a small amount of state even during deep sleep, and it has one important property. **Its contents survive a CPU reset and are lost when power is cut.**

The organizers used this property as a bridge carrying state between boots. And the only tool that can lay that bridge is S mode's arbitrary write.

```bash
curl -d "address=0x50000024&value=1" http://192.168.4.1/
```

That is all. Not a special API but an arbitrary address write primitive that happens to change that variable to 1.

The problem is that the device accepts **only one POST per boot.** On success it brings down both the HTTP server and the AP. A second curl in fact comes back like this.

```
1st → stored
2nd → This URI does not exist
```

With two locks and only one openable per boot, a reboot is required in between. And rebooting can erase the RTC. Here the challenge's real gate emerges.

---

## 6. Knowing the kinds of reset was part of the challenge

The ESP32 has several ways to reboot, and their effects on the RTC all differ.

| Method | Reset code | Power | RTC memory |
|---|---|---|---|
| USB reset (toggling the RTS signal) | `0x15` | kept | **preserved** |
| RST button (EN pin) | `0x1` | kept | erased |
| Unplugging the cable | — | cut | erased |

A USB reset finishes with toggling one control line on the cable.

```python
s.setRTS(True)
time.sleep(0.25)
s.setRTS(False)
```

`rst:0x15 (USB_UART_CHIP_RESET)` appearing in the boot log means success. The chip's internal USB Serial/JTAG controller resets only the CPU and does not touch the RTC domain.

The `RST` button on the board, by contrast, pulls the EN pin directly and resets the whole chip. The moment it is pressed, the RTC's locks go back to 0.

Not knowing this distinction had us going in circles for a long time. After landing one shot we would press RST "because we have to reboot," and the progress would vanish each time. We went round the same spot several times. In hindsight this was not a mistake but a trap the challenge intended. Knowing which reset erases what is itself part of the solution.

To put it in order, the optimal procedure is this. The jumpers need changing only once, at the end.

```
in mode S
  connect to micro-ap → POST 0x50000024=1 → stored
  USB reset (jumpers unchanged)
  reconnect to micro-ap → POST 0x50000028=1 → stored
then add one jumper → mode D → authenticate → READY
```

---

## 7. A record of the failures

That is the tidy account; in reality it was far messier.

**The board was not fully seated.** Early on the device_id brute force kept failing. Tied to 3.3V it should have given `0f0f0f0f0f0X`, and neither the 16 nor a uniform 256-combination sweep gave anything but `NO`. The cause was the board being plugged into the breadboard at an angle, leaving the lower pins floating. Only after looking at a photograph closely did we notice the black pin header was visible above the surface. Pressing it in evenly caught it on the second attempt. Because the upper mode pins were making contact while the lower ADC pins were not, the confusing symptom was "the mode is fine and only the values are odd."

**The port died twice from short circuits.** With the wiring running 3.3V onto the red rail, touching `5V` or `G` to that rail cuts power immediately. It happened twice, and each time `/dev/cu.usbmodem*` disappeared entirely. Fortunately it recovered on removing the short. Changing several strands at once makes the cause unidentifiable, so the discipline of changing one strand at a time and checking each time was necessary.

**There were symptoms I created myself.** Trying to automate AP detection, I ran a WiFi scan every 1\~2 seconds, and on macOS a scan makes the wireless chip leave the current channel, dropping the connection that had been established. An infinite loop of "connects, then drops 1\~2 seconds later" went on for a while, and I only belatedly realized the cause was my own script. Stopping the scan then made the AP disappear from the macOS WiFi menu, because the menu list reads the scan cache. It was settled into a structure of scanning only until connected and cutting the scan the moment an IP arrived.

**macOS blocks connecting to WiFi from the CLI.** `networksetup -setairportnetwork` failed, and so did CoreWLAN's `associate`. The latter's error text carried `-3905 "tmpErr"` inside `Code=-3912`, and with a signal at rssi -45 it was plenty, so it was not a wireless problem but a policy refusal. Scanning works and only association is blocked. In the end there was nothing for it but for a person to click the AP in the menu. It took quite a while to accept that.

**The firmware was replaced mid-competition.** A notice went up saying "a compatibility issue between the MICRO challenge hardware and firmware has been found and is being addressed." The symptoms we had been experiencing – the AP not coming up on a USB reset and only on a physical RST, and the AP going down after 44 seconds – matched exactly. `release2` was then distributed, with instructions to flash the app partition directly.

Flashing caught us once too. esptool refuses like this.

```
A fatal error occurred: Detected flash encryption and secure download mode enabled.
Flashing plaintext binary may brick your device! Use the force argument to override.
```

It is a warning that writing a plaintext image to a device with flash encryption on will brick it, which does not apply since what we are writing is the already-encrypted `application.encrypted.bin`. esptool cannot distinguish that from the file contents alone and warns uniformly. Adding `--force` gets through.

```bash
esptool --port /dev/cu.usbmodem1101 --no-stub write-flash --force 0x10000 application.encrypted.bin
```

Since the write location is the single app partition (`0x10000`) and the bootloader (`0x0`) and partition table (`0x8000`) are untouched, even if it goes wrong it merely fails to boot and is recoverable by reflashing. We also checked in advance that a Secure Boot v2 signature block (`e7 02 00 00`) was attached at the end of the image.

Comparing v1 and v2 byte by byte, DROM was completely identical and only IROM had grown by 160 bytes. Which means the constants and the authentication scheme were unchanged, and indeed the keys and token computation already worked out still applied. After flashing, the AP came up in 4 seconds on a USB reset alone.

---

## 8. READY, and the eFuse

After both POSTs received `stored`, the jumpers went back in and we returned to mode D. This time the response was different.

```
D
AUTH
0f0f0f0f0f02 -> READY
```

Arbitrary memory read was open. The command form is `R <address> <length>`, with a maximum length of 256 bytes.

The first thing done was verifying whether this primitive was trustworthy. Read a region whose answer is already known and compare. 24KB of DROM was dumped and compared against the distributed v2 firmware.

```
DROM dump vs v2 firmware : 22760/22760 = 100.0% match
DROM dump vs v1 firmware : 21305/22760 =  93.6%
```

Not a single byte wrong. As a bonus it also confirmed that v2 really had been flashed. Constant locations were fixed by measurement too, matching exactly the addresses the team had recovered by decompilation.

```
ALPHABET  0x3c0707bc
KEY8      0x3c0707e0   712dc48a36b905ee
CONST8    0x3c0707e8   9b4317d06ca2f528
```

The RTC was read directly too, to confirm the values we wrote had actually landed.

```
0x50000020 = 6d43a91e   (RTC initialization magic)
0x50000024 = 00000001
0x50000028 = 00000001
```

And the whole eFuse controller region was dumped. USER_DATA (`0x6000887c`), which the team's analysis had pointed to, was all zeros across 32 bytes. The address is right. The ESP32-C3's `EFUSE_RD_USR_DATA0_REG` is exactly there. It was simply empty.

Organized by block:

| Block | Address | Non-zero bytes | Content |
|---|---|---|---|
| BLK0 config | `+0x030` | 8/20 | security flags |
| BLK1 MAC | `+0x044` | 15/24 | MAC address, SPI configuration |
| BLK2 SYS_PART1 | `+0x05C` | 29/32 | presumed ADC calibration |
| BLK3 USER_DATA | `+0x07C` | **0/32** | empty |
| BLK4 KEY0 | `+0x09C` | **0/32** | empty |
| **BLK5 KEY1** | `+0x0BC` | **32/32** | 32 high-entropy bytes |
| BLK6 KEY2 | `+0x0DC` | 0/32 | empty |

Only KEY1 was full. Whether this was the DEVICE PROOF or the flash encryption key was the fork, and BLOCK0's `RD_DIS` bits gave the answer.

```
RD_DIS = 0x01
  bit0  BLOCK4/KEY0  read disabled  →  which is why it reads as 0
  bit1  BLOCK5/KEY1  readable       →  32 bytes exposed as they are
```

A read-protected eFuse block reads as zeros. KEY0 being all zeros is not because it is empty but because it is locked. With flash encryption on, that key is in KEY0 and is naturally locked. KEY1, by contrast, was not locked. Had it been a real secret key, `RD_DIS` would have been set on it as on KEY0. It is the only non-zero block left open, and its size comes out exactly at 32 bytes.

```
585b25dd82df0ebd641cba5e686f7e5b10119eb603eef027ccbfa455f21bccd4
```

---

## 9. What remains

We stopped here. The `micro device proof verifier` instance for submitting this value had expired, `nc` timed out, and the final flag string was not received. A value that has not been verified cannot be written down as the flag, so only the facts are recorded.

What we secured is still alive, though. The RTC gate holds as long as the USB cable stays plugged in, the authentication code can be found again in 16 combinations, and the read primitive's integrity was proved by a 100% DROM match. Bring the instance back up and submission is a matter of seconds.

---

## 10. Looking back

The reason I think this challenge is well made is that the defences are in several layers and those layers are of different kinds. Secure Boot, Flash Encryption and Secure Download Mode block the route of lifting the flash whole; the ADC fingerprint blocks the route of computing the authentication code from firmware alone; and the mode separation of read and write blocks the route of finishing with a single primitive. And the last device binding those three was the knowledge of "which reset preserves the RTC" – something you cannot know without reading the documentation, and that is obvious once you do.

Personally the two most valuable lessons are these.

One is that a string dump is still the cheapest first move. Reading 200 bytes of DROM before turning on a decompiler opened 80% of this challenge.

The other is that when facing analog, do not measure – force. Trying to measure the ADC fingerprint honestly would have needed a multimeter and a fight with error margins. Tying all five pins to 3.3V to saturate them made per-unit variation disappear and shrank the search space from 16.7 million to 16. Where a challenge takes analog uncertainty as its defence, removing that uncertainty is itself the attack.

The last thing to record is that the spot where we were stuck longest in this challenge was not a vulnerability but the wiring. The board being 1mm short of seated cost us several hours. On hardware challenges it is better to suspect "is the wire actually making contact" before "is the code wrong."
