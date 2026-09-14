# [HACKSIUM 2026] Why the Console Would Not Open: CA Certificates, the TLS Handshake, and VMRC

The 2026 HACKSIUM BUSAN finals were not a CTF of solving challenges but a Live Fire defence of assigned assets. And yet the first hour went entirely not to defence but to **opening the training VM's console**. Pressing the platform's remote access button did nothing, the organizers distributed a certificate, installing it did not help, the certificate distributed again turned out to be the same one, VMRC spat out `could not negotiate SSL`, and in the end it took detouring through the vCenter web console to reach the asset.

We were blocked three times and all three looked like "an SSL problem." But the causes were all different, and each happened at **a different layer of the network stack**. This piece is a record of taking those three layers apart – the OS's URL scheme handler, the certificate trust store, and the TLS handshake with TCP reachability beneath it – using actually observed values. At the end, the procedure is laid out so that the hands move by themselves the next time a certificate file arrives.

The observation environment was macOS 26.6.2, VMware Remote Console 13.1.1 (App Store), the competition platform, and vCenter `203.0.113.10`. The certificate fields, command output and error text in the body are the values at the time, transcribed as they were, and anything inferred rather than observed is marked as such. Per competition rules (system and network configuration not to be disclosed), IP addresses are replaced with RFC 5737 documentation examples and the platform name is omitted. The remaining certificate fields and error text are verbatim.

---

## 1. Where we got blocked

The conclusion table first. The three symptoms are all the same "connection failure" and they sit at different layers, so the prescriptions differ.

| Symptom | Layer | The real cause | Does installing the certificate fix it |
| --- | --- | --- | --- |
| pressing the remote access button does nothing | OS scheme handler | no app was registered to handle `vmrc://` URLs | no. A problem before TLS |
| browser certificate warning | trust store | vCenter uses a self-signed CA (VMCA) whose root was not in the keychain | yes |
| `Connection error: could not negotiate SSL` | TCP reachability | VMRC has to connect directly to the ESXi host on 443 and that path did not exist | no |

The third row is why this piece was written. The error text contains SSL, so suspecting the certificate is natural, and in reality it was a failure that finished **before the certificate was even looked at**. During the competition we inferred this as "a TLS version mismatch between VMRC 13.x and an older ESXi," and checking the Broadcom KB afterwards showed the inference was wrong. That correction is covered in section 9.

---

## 2. What an X.509 certificate holds

A certificate is not a thing that encrypts. It is **a signed statement by somebody that "this public key belongs to this name."** It is the document guaranteeing that the public key used for encryption really belongs to that server, and the credibility of that guarantee depends entirely on who signed it.

Taking apart the certificate distributed at the competition as-is:

```
$ openssl x509 -in vmca-root.crt -noout -subject -issuer -dates -ext basicConstraints

subject = CN=203.0.113.10, DC=vsphere, DC=local, C=KR, ST=California, O=localhost
issuer  = CN=203.0.113.10, DC=vsphere, DC=local, C=KR, ST=California, O=localhost
notBefore = Aug 18 07:48:36 2026 GMT
notAfter  = Aug 15 07:48:36 2036 GMT
X509v3 Basic Constraints: critical
    CA:TRUE, pathlen:0
```

### Reading it field by field

| Field | Meaning | In this certificate |
| --- | --- | --- |
| Subject | **whose** this certificate is | the vCenter server itself |
| Issuer | **who** signed it | itself. Identical to Subject, character for character |
| notBefore / notAfter | validity period | 10 years. Far longer than the server certificates public CAs issue (usually 90 days to a year) |
| basicConstraints | is this certificate a CA | `CA:TRUE` – it is qualified to issue other certificates |
| pathlen | how many intermediate CAs may sit beneath it | 0 – this CA issues only end certificates directly |
| public key | the actual cryptographic material | used for signature verification and key exchange |

### Subject == Issuer means self-signed

That one line is the core. A certificate that is its own issuer is a **root CA**. With nobody above it there is no superior to vouch for it, so **whether to believe it is entirely the receiver's decision.** This is exactly why a browser raises a warning. Not that the certificate is wrong, but that you never decided to trust this root.

This certificate has one amusing trace. `C=KR` with `ST=California` and `O=localhost`. The country is Korea while the state is California and the organization is localhost. These are the defaults VMware's built-in CA (VMCA) leaves behind when it auto-generates at vCenter installation. It is the trace of nobody having touched it, and a shape commonly seen in self-signed certificates. A public CA would never let such values through.

### The fingerprint – a certificate's real identity

To confirm whether two certificates are the same, look at the **fingerprint**, not the name. It is the hash of the whole DER-encoded certificate's bytes. Names can collide; fingerprints do not.

```
$ openssl x509 -in vmca-root.crt -noout -fingerprint -sha256
SHA256 Fingerprint=4D:C3:C4:06:...:B5:EA:90:4A
```

During the competition the organizers distributed certificates twice. First there were two files, `certs/mac/34fa2217.0` and `dbad4059.0`, and later a single `vmca-root.crt` came again. The second file was a bundle of two certificates appended together, and each one's SHA-256 fingerprint was exactly the same as the two already installed. They were **identical certificates with different names**, so reinstallation was unnecessary. Without looking at the fingerprint there would have been no way to check.

### `.0` and `.r1` – what the filenames tell you

The distributed folder had files like these.

```
certs/mac/34fa2217.0     PEM certificate
certs/mac/34fa2217.r1    ASCII text
certs/mac/dbad4059.0     PEM certificate
certs/mac/dbad4059.r1    ASCII text
```

This naming is OpenSSL's hash directory convention (`c_rehash`). The leading `34fa2217` is the hash of the certificate's subject, and the extension `.0` is a certificate while `.r1` is a CRL (revocation list). The structure lets a verifier find the file straight from the hash value without scanning the whole directory. When hashes collide the numbers climb through `.0`, `.1`, `.2`.

The macOS keychain and the Windows certificate store do not recognize these extensions. So they had to be copied to `.crt` to be imported. It is why the files in the `win/` folder had one more extension attached, as in `34fa2217.0.crt`.

---

## 3. The chain of trust – how you come to believe

How do you believe the certificate a server sent? The answer is **following the chain upwards and seeing whether it reaches a root you already decided to trust.**

![A comparison of a public CA chain and a self-signed root](/images/pki-tls-vmrc/en/chain.svg)

In a public CA system the root is already in the OS and the browser. The server sends its own certificate together with the intermediate CA's, and the client checks that the intermediate CA's signature resolves to the root. With the root already on the trust list, the chain closes by itself.

A self-signed root has nobody to close against. It is both the root and the server certificate, with nothing above it. So the receiving side has to recognize this certificate as a root directly. Registering it manually in the keychain at the competition was exactly this job.

### The five things a verifier actually checks

1. **Signature** – does the parent certificate's public key resolve the child certificate's signature
2. **Validity period** – is now between notBefore and notAfter
3. **Name match** – is the hostname connected to present in the SAN (Subject Alternative Name)
4. **Usage** – only a certificate with `CA:TRUE` can sign other certificates, and the depth must not exceed what `pathlen` allows
5. **Revocation** – has it been revoked via CRL or OCSP

Number 3 needs particular care. Modern clients do not look at the CN field at all. Hostname verification is done entirely from the SAN. Connect by IP address with only a domain name in the SAN and you get a `hostname mismatch` however perfect the chain. It is a failure that root registration does not fix.

### The scope of trusting a root

Put a root CA on the trust list and you come to trust that CA's certificates for **every domain**. `google.com`, a bank, all the same. Whoever holds that CA's private key can impersonate any site, and my computer accepts it without warning. A competition vCenter CA holding that power permanently is a problem. So it was deleted after the competition, and the deletion was confirmed.

---

## 4. Storing and trusting are different

This is where people get most lost. **Putting a certificate into the keychain and trusting it as a root are two separate actions.** Do only the first and omit the second and the warning stays. It is why the organizers' notice went out of its way to emphasize "please install it as a trusted root certification authority."

### macOS

macOS's keychain is the system store holding credentials and certificates, and there are several with different scopes.

| Keychain | Scope | Path | Use |
| --- | --- | --- | --- |
| login | that user only | `~/Library/Keychains/login.keychain-db` | personal passwords, personal certificates |
| System | the whole computer | `/Library/Keychains/System.keychain` | CAs used by system services, Wi-Fi profiles |
| System Roots | read-only | `/System/Library/Keychains/SystemRootCertificates.keychain` | the list of public roots Apple distributes |

For an app such as VMRC or the vSphere Client to trust it system-wide, it is the System keychain. One registration command contains both actions.

```bash
sudo security add-trusted-cert \
  -d \                                          # 적용 범위: admin 도메인 (전체 사용자)
  -r trustRoot \                                # ② 루트 CA로 신뢰
  -k /Library/Keychains/System.keychain \       # ① 어디에 저장
  vmca-root.crt
```

`-k` is storing and `-r trustRoot` is trusting. Done through the GUI, it corresponds to double-clicking the certificate in Keychain Access to add it (①), then opening that entry again, expanding the "Trust" section and changing "When using this certificate" to "Always Trust" (②).

The verification commands each look at a different thing too.

```bash
# ① 저장됐나 - 키체인 안에 존재하는지, 지문과 함께
security find-certificate -a -Z /Library/Keychains/System.keychain | grep -A1 'SHA-256'

# ② 신뢰됐나 - 신뢰 설정에 올라갔는지
sudo security dump-trust-settings -d
```

During the competition the second command's output was this.

```
Cert 0: VERAPORT-CA
Cert 1: 127.0.0.1
Cert 2: DELFINO-CA
Cert 3: 127.0.0.1
Cert 4: 203.0.113.10      ← vCenter VMCA (방금 등록)
Cert 5: CA                ← VMware Engineering (방금 등록)
```

`VERAPORT-CA` and `DELFINO-CA` are roots installed by the security plugins Korean financial sites require. The two `127.0.0.1` entries beneath them are **certificates for the HTTPS servers those plugins stand up on localhost.** They are installed so that a bank web page's JavaScript can call an address such as `https://127.0.0.1:16105` without a warning. Which is to say, it is a structure designed for a web page to call a local daemon, and that this structure is itself an attack surface is a separate topic.

When deleting, specify by fingerprint rather than name. Deleting by a common name such as `CN=CA` can blow away the wrong certificate.

```bash
sudo security delete-certificate -Z <SHA256> \
  /Library/Keychains/System.keychain
```

After the competition the two were deleted with this command, and `Cert 4` and `Cert 5` were confirmed gone from `dump-trust-settings`.

### Linux (Debian/Ubuntu)

The system trust store is one bundle merged into `/etc/ssl/certs/ca-certificates.crt`. You do not edit it directly; you put the file into a designated directory and run the update command.

```bash
sudo cp vmca-root.crt /usr/local/share/ca-certificates/vmca-root.crt   # 확장자 .crt 필수
sudo update-ca-certificates
```

Without a `.crt` extension, `update-ca-certificates` ignores the file. It is why putting the distributed `.0` file in as-is does nothing. RHEL-family goes into `/etc/pki/ca-trust/source/anchors/` with `sudo update-ca-trust`.

But this is the system store, and Firefox and some Java apps use their own stores separately. If the browser still warns, look there.

### Windows

```
certutil -addstore -f Root vmca-root.crt
```

Or double-click the file and choose "Install Certificate" → store location **Local Machine** → "Place all certificates in the following store" → **Trusted Root Certification Authorities**. Putting it in "Current User" means programs running as services cannot see it.

### Wherever you put it, verify with an actual connection

The final confirmation that registration worked is an actual connection, not command output. Only when `https://203.0.113.10/ui` opened at the competition with no certificate warning could we say registration was right. The same check can be done with `openssl`.

```bash
openssl s_client -connect 203.0.113.10:443 -CAfile vmca-root.crt </dev/null 2>/dev/null | grep 'Verify return code'
# Verify return code: 0 (ok)   ← 이 줄이 나와야 사슬이 닫힌 것
```

---

## 5. The TLS handshake – certificate verification is only one part of it

Certificate verification is one stage of the handshake, with other negotiations before and after it. Each stage has its own way of failing. Looking at it as of TLS 1.3.

![TLS 1.3 handshake stages and failure points](/images/pki-tls-vmrc/en/handshake.svg)

### Stage 0: TCP

Before TLS there is the TCP connection. Fail here and TLS never starts. Failure at this stage divides in two, and that distinction is half the diagnosis.

- **Connection refused** – the host is alive and answered (RST), and nobody is listening on that port. The service is not up.
- **Timeout** – no response at all. Packets were dropped in transit. A firewall, or no routing.

This distinction was decisive at the competition when the monitoring agent kept failing to register at `192.0.2.31:1515`.

```
$ timeout 3 bash -c 'echo >/dev/tcp/192.0.2.31/1515'
bash: connect: Connection refused
```

It was refused, so the hypothesis "the network is blocked" died instantly and it narrowed to "the registration service is not up." One line eliminated one hypothesis.

### Stage 1: ClientHello – what I can do

The client sends its list of supported TLS versions, its list of cipher suites, key exchange material (key_share) and the hostname it wants to reach (SNI), all at once. It is not yet encrypted; it is plaintext. That the SNI is plaintext is also the basis on which network monitoring can see "which site you are connecting to."

### Stage 2: ServerHello – picking one of them

The server picks a version and a cipher suite it also supports from the lists and answers. **If the intersection is empty the connection dies here.** What comes out then is text such as `handshake failure`, `protocol version` or `no shared cipher`. The certificate has not even been exchanged yet.

### Stage 3: Certificate + CertificateVerify – presenting and verifying identity

In TLS 1.3 encryption begins right after ServerHello, and inside it the server sends the certificate chain. The accompanying CertificateVerify is a signature proving the server actually holds that certificate's private key. It is why merely copying and sending a certificate does not pass. The client verifies the five things of section 3 here, and on failure text such as `unable to get local issuer certificate`, `self signed certificate`, `certificate has expired` or `hostname mismatch` appears.

### Stage 4: Finished – fixing the keys

Both sides confirm to each other that they derived the same session key from the exchanged material. Every application byte afterwards is encrypted with this symmetric key. The certificate's public key was used only for signature verification and is not used for the actual data encryption.

### What a cipher suite is

Up to TLS 1.2 a cipher suite was four things in one lump, as in `ECDHE-RSA-AES256-GCM-SHA384`. Key exchange (ECDHE), authentication (RSA), symmetric cipher (AES-256-GCM) and hash (SHA-384). In TLS 1.3 it shrank to `TLS_AES_256_GCM_SHA384`. Key exchange and authentication were separated out of the cipher suite and negotiated separately, and unsafe combinations (RSA key exchange, CBC mode, RC4, SHA-1) were dropped from the specification entirely.

Negotiation failures generally arise **when one side is too old or one side too strict.** An old server supporting only TLS 1.0 and 1.1 with a modern client refusing anything below 1.2 leaves an empty intersection. What a server actually supports can be asked directly.

```bash
openssl s_client -connect HOST:443 -tls1_2 </dev/null   # 1.2로 강제. 성공하면 지원
openssl s_client -connect HOST:443 -tls1_3 </dev/null
openssl s_client -connect HOST:443 -showcerts </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
nmap --script ssl-enum-ciphers -p 443 HOST              # 지원 암호군 전체 열거
```

---

## 6. A table for sorting error text by layer

Even for the same "connection failure," the text tells you the layer. This table was made at the cost of getting lost three times yesterday.

| Text | Layer | Meaning | Does registering the certificate fix it |
| --- | --- | --- | --- |
| `Connection refused` | TCP | the host is alive and there is no service on the port | no |
| `Connection timed out` | TCP | packets were dropped. Firewall or missing routing | no |
| `handshake failure`, `protocol version`, `no shared cipher` | TLS stage 2 | no common TLS version or cipher suite | no |
| `unable to get local issuer certificate` | TLS stage 3 | the chain did not climb to a trusted root | **yes** |
| `self signed certificate` | TLS stage 3 | the root is self-signed and is not on the trust list | **yes** |
| `certificate has expired` | TLS stage 3 | outside the validity period | no. The clock, or certificate renewal |
| `hostname mismatch` | TLS stage 3 | the hostname connected to is not in the SAN | no. Connect by name, or fix the SAN |
| `could not negotiate SSL` (VMRC) | **TCP** | see section 9. Contrary to the text, not a TLS problem | no |

The last row is this piece's twist.

---

## 7. What vSphere looks like

To understand VMRC you have to know what it connects to, which requires vSphere's composition.

| Component | Role |
| --- | --- |
| ESXi | the actual hypervisor. Installed on a physical server, it runs the VMs directly |
| vCenter Server | the central server that groups several ESXi hosts and manages them. Provides the web UI and API |
| vSphere Client | vCenter's HTML5 web interface. `https://vcenter/ui` |
| VMCA | the certificate authority built into vCenter. Auto-generates a self-signed root at installation |
| VMRC | the native desktop app that attaches to a VM console |

### VMCA – the starting point of everything

Install vCenter and, rather than buying a certificate from a public CA, it makes a CA inside itself and signs its own. This is the VMware Certificate Authority (VMCA). In the default mode (Fully Managed), VMCA issues every certificate in the environment from the root made at installation – vCenter's own Machine SSL certificate, each ESXi host's certificate, certificates between internal services. Which is why the competition certificate carried the internal SSO domain name `DC=vsphere, DC=local`, why the validity period was 10 years, and why it was untrusted from outside.

vCenter has several certificates in different roles. Machine SSL (what the web UI and API present), the VMCA root, one for STS signing, and the Trusted Root list. That the `vmca-root.crt` the organizers distributed held two certificates comes from this structure too. One was the VMCA root with `CN=203.0.113.10`, and the other another root with `CN=CA, OU=VMware Engineering`. It would be two vCenter lineages, or the trace of one vCenter's root having been replaced. That is an inference we could not confirm.

There is also a mode putting VMCA as a subordinate CA under an enterprise internal CA, and VMware itself does not recommend it, citing complexity and operational risk. So most vCenters met in practice use a self-signed root, and so the first gate of connecting to vCenter is almost always "putting the root into the trust store."

---

## 8. Dissecting VMRC

### What it is

VMware Remote Console is a standalone app for handling a VM's **screen, keyboard and mouse** remotely. In VMware's words it is "a client application that connects to virtual machines in vSphere, vRealize Automation and vCloud Director, and to VNC servers." Unlike the web console inside a browser, being a native app it has more features – connecting local USB devices or ISO images to the VM, operating the power, running full screen. On the other hand it needs installing and, as seen below, has stricter network requirements.

Windows and macOS are current on the 13.x line (what we got from the App Store was 13.1.1), and for Linux even the documentation the organizers pointed at was the 12.0 line. The Linux distribution appears to have stopped at 12.0, and this is an observation read from the documentation tree rather than a confirmed official announcement.

### How it runs – the scheme handler

VMRC is not an app you open and type an address into. On installation it registers with the OS that "I handle the `vmrc://` scheme," and when the console launch button is pressed in the web client, the browser hands the `vmrc://...` link to the OS, and the OS launches the registered app, passing it that URL. The notice that appears when the app is run right after installation says exactly this. "To access a remote virtual machine console, open the corresponding link in the vSphere Web Client."

Because of this structure, **without VMRC the button quietly does nothing.** A browser meeting a scheme it cannot handle asks the OS, and with no handler it simply ends, with no error. This is why the remote access button was unresponsive for the competition's first 30 minutes, and it had nothing to do with TLS. The same principle applies to `mailto:`, `slack://` and `zoommtg://`. "I clicked and nothing happened" is almost always a missing scheme handler.

On macOS this registry is managed by LaunchServices, and registration is checked like this.

```bash
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -dump \
  | grep -A2 'vmrc:'
```

If the app is installed and not registered, running the app once does it. At the competition, pressing Close on that popup was enough to complete registration.

### Dissecting a `vmrc://` URL

The link the platform issues looks roughly like this.

```
vmrc://clone:<ticket>@<host>:443/?moid=vm-1234
       └──┬──┘└───┬───┘ └──┬──┘        └───┬───┘
      인증 방식  세션 티켓  접속 대상    Managed Object ID
```

- The string after `clone:` is the **session ticket**. It is a one-time console ticket vCenter issues to a logged-in user, and it is itself the credential. With this string alone anyone can attach to that VM console.
- `<host>` is the server to connect to. The competition certificate's CN was `203.0.113.10`, so vCenter goes in this position.
- `moid` is the Managed Object ID pointing at the VM within vCenter's inventory. The `vm-1234` form.

The ticket's lifetime is short. The exact value was not confirmed in the documentation, and reopening a link a few minutes old gives `Invalid or expired session ticket`. A short lifetime being the only line of defence, this link must not be pasted into logs, message boards or chat. Opening it directly from a terminal requires wrapping it in quotes. `?`, `&` and `:` break in the shell.

```bash
open "vmrc://clone:TICKET@HOST:443/?moid=vm-123"
```

### What it connects to – from 902 to 443

This is the core of understanding VMRC, and the point that explains the failure in section 9.

After receiving the ticket from vCenter, VMRC **connects directly to the ESXi host the VM actually runs on.** Even in a vCenter-managed environment. The screen, keyboard and mouse data (MKS, Mouse-Keyboard-Screen in VMware's terms) travels directly between ESXi and the client without passing through vCenter.

This direct-connection port changed with version. Before VMRC 11.0 it used TCP 902, and **from 11.0, adopting WebSocket as the default transport, it uses TCP 443.** The firewall section of the vSphere 7 security documentation states it:

> The firewall must allow the VMRC to access vCenter Server on port 443 and to access the ESXi host on port 902 for VMRC versions before 11.0, and port 443 for VMRC version 11.0 and greater.

Which is to say, using VMRC 11.0 or above requires both **vCenter's 443 and every ESXi host's 443** to be open from the client. On a network where only vCenter is visible, the ticket arrives and the console does not open.

The browser web console is different. The web console section of the same document has the client connecting to vCenter's 443 and **vCenter connecting to ESXi's 902**. The only place the client has to reach directly is vCenter.

![A comparison of the browser web console's and VMRC's connection paths](/images/pki-tls-vmrc/en/console-paths.svg)

---

## 9. Why the web console opened and VMRC did not

Setting out the situation at the competition again:

- The laptop was on the venue LAN.
- vCenter `203.0.113.10` was a public IP and was reachable. Web UI login worked.
- The training network was a separate private range and was not routed from the laptop. Which range the ESXi management network was on was not even known.
- The web console opened. VMRC failed with `Connection error: could not negotiate SSL`.

At the time we inferred this as "VMRC 13.x's TLS stack and an older ESXi's TLS version do not match." Plausible, and wrong. After the competition, checking Broadcom KB 422935 showed there is a document dedicated to this error text, and the symptoms and cause matched our situation exactly.

The symptoms section says this: VMRC launch fails with an SSL negotiation error, and **the web console works normally.** The cause section is the client being unable to reach **ESXi host port 443**, and it mentions alongside the VMRC 11.0 change from 902 to 443. The resolution is opening 443 between the client and every ESXi host, and where that is impossible, the documented workaround is adding `config.mksdevproxy.enable = true` to vCenter's advanced settings, **making vCenter relay the console traffic instead.**

To put it in order:

1. VMRC succeeded as far as receiving the ticket from vCenter. vCenter's 443 was open.
2. It then tried to connect directly to the ESXi host's 443, and there was no path from the venue LAN to the ESXi management network.
3. This connection failure surfaced inside VMRC as the text "SSL negotiation failure." In reality it is a failure at the TCP stage, before TLS starts.
4. The web console did not require the client to reach ESXi, since vCenter goes to ESXi on its behalf in the middle. So it opened.

A case of error text deceiving you about the layer. The word "SSL" had us digging through certificates and TLS versions, and the answer was in the routing table. Had we known this KB at the time, a single line of `nc -zv <ESXi> 443` would have settled it in 10 seconds instead of installing certificates twice. During the competition, though, we did not know the ESXi host address itself, so detouring through the web console was the only answer anyway.

The principle gained from this correction is one. **Establish the layer the error text came from, not the words in the error text.** Which means checking from the bottom layer upwards. Does TCP reach, does negotiation succeed, is the certificate believed, does the name match. Skip this order and dig where the text points and you end up as we did yesterday.

---

## 10. What to do the moment you receive a certificate

So that the hands move by themselves the next time a `*.crt` file arrives in any environment, the order is fixed here.

### 1) Open it and confirm its identity – before installing

```bash
openssl x509 -in cert.crt -noout -subject -issuer -dates -ext basicConstraints,subjectAltName
openssl x509 -in cert.crt -noout -fingerprint -sha256
grep -c 'BEGIN CERT' cert.crt      # 묶음이면 2 이상
```

- Are Subject and Issuer the same → it is a root. It is a candidate for trust registration.
- If they differ it is an intermediate CA or a server certificate. It must not be trusted as a root. Find the top of the chain.
- Is it `CA:TRUE` → if not it cannot be registered as a root in the first place.
- Does the validity period include now?
- If it is a bundle, split each one and repeat the above.

```bash
# 묶음 분리
awk '/BEGIN CERT/{n++} {print > "cert_" n ".pem"}' bundle.crt
```

### 2) Check whether it is already there – by fingerprint

There is no need to put the same certificate in twice, and a different certificate with the same name must not be overwritten.

```bash
# macOS
security find-certificate -a -Z /Library/Keychains/System.keychain | grep -i '<지문 앞 8자리>'
# Linux
grep -rl "$(openssl x509 -in cert.crt -noout -serial | cut -d= -f2)" /etc/ssl/certs/ 2>/dev/null
```

### 3) Decide which store it goes into

- A system service or a desktop app (VMRC and the like) has to use it → the system store
- Only my browser uses it → a user store suffices, and the narrower scope is safer
- For programs using their own store, such as Firefox, Java or Python `requests` → put it there separately

### 4) Register it – both storing and trusting

```bash
# macOS (시스템, 루트로 신뢰)
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain cert.crt
# Debian/Ubuntu
sudo cp cert.crt /usr/local/share/ca-certificates/ && sudo update-ca-certificates
# RHEL
sudo cp cert.crt /etc/pki/ca-trust/source/anchors/ && sudo update-ca-trust
# Windows
certutil -addstore -f Root cert.crt
```

### 5) Verify with an actual connection

```bash
openssl s_client -connect HOST:443 </dev/null 2>/dev/null | grep 'Verify return code'
# 0 (ok)가 아니면 아직 안 끝난 것
```

Open it in a browser too and check there is no warning on the padlock. That a command succeeded and that the app uses that store are different things.

### 6) Remove it when done – by fingerprint

Temporary environments, competitions and test CAs get removed once their use ends. One root CA left behind means whoever holds that private key can impersonate any site on my computer.

```bash
sudo security delete-certificate -Z <SHA256> /Library/Keychains/System.keychain
sudo security dump-trust-settings -d      # 사라졌는지 확인
```

### And when a connection fails, go from the bottom up

```bash
timeout 3 bash -c 'echo >/dev/tcp/HOST/443' && echo OPEN || echo CLOSED   # TCP
openssl s_client -connect HOST:443 -tls1_2 </dev/null                       # 협상
openssl s_client -connect HOST:443 -CAfile cert.crt </dev/null              # 신뢰
openssl s_client -connect HOST:443 -servername NAME </dev/null              # 이름
```

Climb one layer at a time and see which layer fails first. That layer is the cause, and there is no need to look above it.

---

## 11. Exercises to try by hand

Knowing by reading and having built it by hand are different. Four are recommended.

1. Make a root CA with `openssl` alone, sign an intermediate CA with that root, and issue a server certificate with the intermediate CA to complete a three-level chain. Set `pathlen` to 0, insert one more intermediate CA and watch verification fail too.
2. Put that root into the local trust store, stand up a server with `openssl s_server` and connect with a browser and `curl`. Record the error text before and after putting it in, side by side.
3. Deliberately set the validity period to yesterday, remove the hostname from the SAN, or fail to send the intermediate CA, and gather in a table which text comes out for each. It is rebuilding section 6's table with your own hands.
4. Fix the server's supported TLS version at 1.0 and connect with a modern client to reproduce a **negotiation failure**. Then put a firewall rule in front of the same server to make a **timeout**, and bring the service down to make a **refused**. Compare how the text and the elapsed time of the three failures differ.

Number 4 is especially valuable. The reason we were deceived by the word "SSL" yesterday was never having distinguished those failures by hand.

---

## 12. Summary

Opening a single VM console was blocked once at each of three layers. The remote access button being unresponsive was because no app was registered with the OS to handle the `vmrc://` scheme; the certificate warning was because vCenter's self-signed root (VMCA) was not in the trust store; and VMRC's `could not negotiate SSL` was, despite its name, not a TLS problem but a TCP-stage failure arising because VMRC 11.0 and above has to connect directly to ESXi host port 443 and that path did not exist. The web console opened on the same network because vCenter goes to ESXi on the client's behalf.

A certificate is a signed statement that "this public key belongs to this name," and Subject equalling Issuer makes it a self-signed root. A root has to be trusted directly by the receiver, that trust is an action separate from storage, identity is confirmed by fingerprint, and it is deleted by fingerprint when its use ends. When a connection fails, do not follow the words in the error text but establish the layer from the bottom up: TCP → negotiation → trust → name.

Inferring the VMRC failure as a TLS version mismatch at the competition was wrong, and it was corrected by a Broadcom KB. That correction is the most valuable part of this piece.

---

## References

- [Connecting to the Virtual Machine Console Through a Firewall - vSphere 7 Security](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/vsphere-security/securing-vsphere-networking/securing-the-network-with-firewalls/connecting-to-the-virtual-machine-console-through-a-firewall.html) - the source for the web console's and VMRC's port requirements
- [KB 422935: "Connection error: could not negotiate SSL" when launching VMware Remote Console](https://knowledge.broadcom.com/external/article/422935/error-connection-error-could-not-negotia.html) - the basis for section 9. ESXi 443 reachability and the MKS proxy workaround
- [KB 411158: Failed to connect to VM using VMware Remote Console](https://knowledge.broadcom.com/external/article/411158/failed-to-connect-to-vm-using-vmware-rem.html) - the case of an ESXi firewall blocking 443
- [KB 436152: VMRC fails with "Invalid or expired session ticket"](https://knowledge.broadcom.com/external/article/436152/vmware-remote-console-vmrc-fails-with-in.html) - ticket errors and WebSocket inspection problems
- [Install VMware Remote Console on Linux - VMRC 12.0](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vmware-remote-console/12-0/vmware-remote-console-for-vrealize-automation-and-vcloud-director-12-0/install-vmware-remote-console/install-vmware-remote-console-on-linux.html) - the document the organizers pointed at. Mentions `vmrc` scheme registration
- [Managing Certificates for ESXi Hosts - vSphere 8](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/vsphere-security/securing-esxi-hosts/certificate-management-for-esxi-hosts.html) - the explanation that VMCA is the default root
- [KB 318946: Using vSphere Certificate Manager to Replace SSL Certificates](https://knowledge.broadcom.com/external/article/318946/how-to-use-vsphere-certificate-manager-t.html) - vCenter's four certificate kinds
- [RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446) - the order of handshake messages
- [RFC 5280 - Internet X.509 PKI Certificate and CRL Profile](https://www.rfc-editor.org/rfc/rfc5280) - basicConstraints, pathLenConstraint, SAN
- `man security` (macOS), `man update-ca-certificates` (Debian) - trust store commands
