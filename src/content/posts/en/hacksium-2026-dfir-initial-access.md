# [HACKSIUM 2026] Where Initial Access Leaves Its Traces

The last day of the 2026 HACKSIUM BUSAN finals brought not a Live Fire defence but an **incident analysis** challenge. The format was striking. Rather than giving a binary with a flag hidden in it, it gave **one compromised Windows host, whole**, and asked:

> Signs of compromise have been confirmed on this host. Identify the path of the file used for initial access.

Less a CTF than a real incident response task. And this style of challenge has kept increasing over the last few years. It means testing not the ability to find one vulnerability but **the ability to reconstruct an incident from the traces left behind.**

This piece is a record of working that challenge and at the same time a study note on **"how initial access actually happens and where it leaves traces."** Rather than listing answers, more space went to what each artifact does and does not prove, and where I got things wrong. The wrong side had more to learn from.

The analysis target was one Windows 10 virtual machine, user account `pc01`, with two network interfaces at `10.1.10.21/24` and `192.168.0.15/24`. Command output, hashes and times in the body are observed values as they were, and inferences are marked as inferences.

---

## 1. How the challenge was set

Four questions were four faces of one incident.

| # | Title | Points | What it asks | Answer format example |
| --- | --- | --- | --- | --- |
| 1 | Initial access | 100 | the **absolute path** of the file used for intrusion | `C:\Windows\System32\cmd.exe` |
| 2 | Malware analysis | 200 | the **C2 domains** (ascending order if several) | `abc.com, bbb.com` |
| 3 | Persistence and defence evasion | 200 | the **name of the item** masquerading as a normal component | `Dhcp` |
| 4 | Internal information gathering | 200 | the **file name** used for reconnaissance | `ping.exe` |

The prompts for each question were these.

**a. Initial access (100 points)**
> Signs of compromise have been confirmed on the target host. Analyse system artifacts and logs to identify **the path of the file used for initial access.**
> (e.g. `C:\Windows\System32\cmd.exe`)

**b. Malware analysis (200 points)**
> Suspicious program execution and external communication have been confirmed on the compromised host. Identify the **C2 domains** the malware used. If several C2 domains are identified, enumerate them in ascending order.
> (e.g. `abc.com, bbb.com`)

**c. Persistence and defence evasion analysis (200 points)**
> Identify **the name of the abnormal item** the attacker created for the purpose of securing persistence and masquerading as a normal process.
> (e.g. `Dhcp`)

**d. Internal information gathering analysis (200 points)**
> Signs of internal system information having been gathered after the compromise have been confirmed. Identify **the file name the attacker used for internal information gathering.**
> (e.g. `ping.exe`)

The examples given – `cmd.exe`, `Dhcp`, `ping.exe` – are all **normal Windows components.** The format tells you the shape of the answer without telling you its content, and there is still something to read here. `a` demands an absolute path, so it is limited to **vectors where a file exists**; `c` is the shape of a service name with no extension; and `d` is a file name with an extension. This format information alone narrows the hypothesis space considerably.

On top of this there was a 300-point **preliminary analysis report** task. A Word template was given, to be filled in and submitted with basic information / incident overview / initial access path analysis / initial response / IOCs / final analysis result. Which means solving the questions and **explaining the incident** are scored separately.

That the four questions are stage-by-stage faces of one scenario matters. That means **grab any one stage and the rest follow.** Choosing where to enter becomes the whole of the strategy. This judgement is revisited later.

---

## 2. Why challenges like this appear now

Traditional forensics CTFs took the form of extracting **a single answer from a single artifact** – "carve a file out of this pcap," "find the process in this memory dump." Scenario-based is different.

| Item | Traditional | Scenario-based |
| --- | --- | --- |
| Input | one artifact file | the whole system |
| Ability required | knowing the tools | reconstructing the incident |
| How you fail | you cannot use the tool | **you dig in the wrong place** |
| Similarity to real work | low | high |

The core of the difference is **the search space.** One pcap can be looked at to the end, while a single Windows host contains over 150,000 files, over 200 execution traces and tens of thousands of event log entries. Exhaustive inspection is impossible, and **choosing where to look is itself the skill.**

So these challenges measure "**what you look at first**" more than "what you know." In fact most of the time I lost on this challenge was not from being unable to use a tool but from digging the wrong place for a long time on a wrong premise.

---

## 3. What initial access precisely is

In MITRE ATT&CK, **Initial Access (TA0001)** is "the stage where an adversary secures their first foothold in a network." Confusion often arises here. **Touching something after getting in is not initial access.**

```
TA0001 Initial Access    최초 발판 확보         ← 문제 1
TA0002 Execution         코드 실행
TA0003 Persistence       재부팅 생존            ← 문제 3
TA0005 Defense Evasion   탐지 회피              ← 문제 3
TA0007 Discovery         내부 정찰              ← 문제 4
TA0008 Lateral Movement  옆으로 이동
TA0011 Command & Control 외부 통신              ← 문제 2
```

The main initial access techniques, and **whether each leaves a file on the host**, organize like this. This table matters because the very fact that the question asked for "the path of the file" narrows the vector.

| Technique | ID | Description | Does a file remain on the host |
| --- | --- | --- | --- |
| Spearphishing attachment | T1566.001 | document or executable attached to mail | yes |
| Spearphishing link | T1566.002 | mail link → download | yes |
| Drive-by | T1189 | infection from visiting the web alone | yes |
| Removable media | T1091 | USB autorun or manual execution | yes |
| Supply chain compromise | T1195 | a tampered legitimate installer | yes |
| Exploit public-facing application | T1190 | web server or VPN exploitation | yes, if a web shell is dropped |
| External remote services | T1133 | normal RDP or VPN login | **no** |
| Valid accounts | T1078 | login with stolen credentials | **no** |

The question demanded an absolute path, so the bottom two rows cannot be the answer in the first place. That **the answer format cuts the hypothesis space** proved repeatedly useful in a scenario-based challenge.

---

## 4. The lineages of evidence left on the host

This is the part this piece spends longest on. Windows records the same fact redundantly in several places. Knowing **what each artifact does and does not prove** is what lets you safely conclude "it is not there."

### 4.1 The execution evidence family — "this file ran"

| Artifact | Location | What it gives | Limits |
| --- | --- | --- | --- |
| **Prefetch** | `C:\Windows\Prefetch\*.pf` | executable name, **full path**, run count, the 8 most recent run times, a list of up to 1024 referenced files | only what ran. Absent if SysMain is off. **The time is only the last run** |
| **Amcache** | `C:\Windows\AppCompat\Programs\Amcache.hve` | full path, **SHA-1**, first registration time | not an exhaustive record. Omissions are frequent |
| **ShimCache** | `SYSTEM\...\AppCompatCache` | full path, file modification time | on Win10, **presence ≠ execution** |
| **BAM/DAM** | `SYSTEM\...\bam\State\UserSettings\<SID>` | full path + last run time + the SID that ran it | keeps only recent ones |
| **UserAssist** | `HKCU\...\Explorer\UserAssist` (ROT13) | what was launched through the GUI, run counts | nothing for console execution |
| **MUICache** | `HKCU\...\Shell\MuiCache` | paths of executed exes + description strings | no timestamps |
| **SRUM** | `C:\Windows\System32\sru\SRUDB.dat` | **bytes sent and received** per app | 60-day rolling |

The Prefetch filename convention is worth knowing.

```
RESPONDER.EXE-BEAF5D4D.pf
^^^^^^^^^^^^ ^^^^^^^^
실행파일명    전체 경로(+일부 인자)의 해시
```

Because the hash derives from the path, **the same name at a different path produces a different `.pf`.** Two `.pf` files with the same name are themselves a signal of masquerading or duplication. In this challenge there were in fact two `.pf` files for `DEFENDER.REMOVER.13.EXE` (`-FE2A0C05`, `-956C344E`), one having run from `C:\Users\pc01\Downloads\` and the other from `\VOLUME{0000000000000000-103e4cb2}\`.

And **Win10 Prefetch is MAM-compressed (Xpress Huffman)**, so `strings` cannot read it. A parser is needed.

```
PECmd.exe -f "C:\Windows\Prefetch\RESPONDER.EXE-BEAF5D4D.pf"
PECmd.exe -d C:\Windows\Prefetch --csv C:\out
```

For a GUI, NirSoft's WinPrefetchView is fast. Exported to CSV, the `Process Path` column is the absolute path.

```
WinPrefetchView.exe /scomma C:\pf.csv
```

### 4.2 The arrival evidence family — "this file came from here"

| Artifact | What it gives |
| --- | --- |
| **MOTW** (`Zone.Identifier` ADS) | the mark of external arrival + the **original URL** (`HostUrl`, `ReferrerUrl`) |
| **Browser History DB** | visited URLs, the `downloads` table's `target_path` and `tab_url` |
| **LNK** (`Recent\*.lnk`) | the original **absolute path**, arguments, target MAC times, **volume serial**, drive type, NetBIOS name |
| **JumpList** | per-app history of opened files. Survives longer than Recent |
| **ShellBag** | history of **folders** entered through Explorer. Survives folder deletion |
| **`$I` files in `$Recycle.Bin`** | the **original absolute path** of files deleted via the recycle bin |
| **USBSTOR / WPD** | history of connected removable media |

MOTW is especially useful and **has clear limits.** I got this badly wrong in this challenge, covered later (section 9).

Distinguish the paths that attach MOTW from those that do not.

| Arrival path | MOTW |
| --- | --- |
| browser download | attached |
| saving a mail client attachment | attached |
| USB or removable media | **not attached** |
| copy from a trusted-zone SMB share | **not attached** |
| extraction by older 7-Zip/WinRAR | **not propagated** |
| a script creating it directly | **not attached** |

LNK is easy to underrate, and **it survives even when the original is deleted, even when the USB is taken away.** File size, times and the serial of the volume it was on are all recoverable. For a quick sweep, PowerShell over COM suffices.

```powershell
$s = New-Object -Com WScript.Shell
$r = Join-Path $env:APPDATA 'Microsoft'
$r = Join-Path $r 'Windows'
$r = Join-Path $r 'Recent'
gci $r -Filter *.lnk | %{ $s.CreateShortcut($_.FullName).TargetPath }
```

When volume serials and MAC addresses are needed, Eric Zimmerman's `LECmd` is the tool.

```
LECmd.exe -d "C:\Users\pc01\AppData\Roaming\Microsoft\Windows\Recent" --csv C:\out
```

### 4.3 The filesystem family — "even the deleted"

| Artifact | What it gives |
| --- | --- |
| **`$MFT`** | creation/modification/access/record-change times for every file (two sets, `$SI` and `$FN`), surviving deleted records |
| **`$UsnJrnl:$J`** | a journal of file creation, deletion and renaming |
| **`$LogFile`** | the transaction log |
| **VSS** | the files themselves at past points in time |

Parsing `$MFT` recovers even deleted files.

```
MFTECmd.exe -f "C:\$MFT" --csv C:\mft
```

A mismatch between `$SI` (`$STANDARD_INFORMATION`) and `$FN` (`$FILE_NAME`) times is the classic indicator for **timestomping detection.** When an attacker manipulates times with `SetFileTime`, `$SI` often changes while `$FN` stays.

### 4.4 The event log family — which logs in which order

In forensics, "looking at the logs" usually means the **Windows Event Log (EVTX)**. The problem is that there are over 1,000 channels. Looking at them all is impossible, so you have to go in knowing **what is recorded where.**

Every EVTX is here.

```
C:\Windows\System32\winevt\Logs\*.evtx
```

#### 4.4.1 The channel map — where to look, per question

| What you want to know | Channel | Key event IDs |
| --- | --- | --- |
| what ran | Security / Sysmon | **4688** / Sysmon **1** |
| who logged on | Security | **4624**, 4625, 4634, 4647, 4648, 4672 |
| did they come in remotely (RDP) | TerminalServices-LocalSessionManager/Operational | **21** (logon), 22, 23, 24, 25 (reconnect) |
| the source of an RDP connection request | TerminalServices-RemoteConnectionManager/Operational | **1149** |
| was a new service created | **System** / Security | **7045** / 4697 |
| service state changes | System | 7034 (abnormal termination), 7036, 7040 (start type change) |
| was a scheduled task created | Security / TaskScheduler/Operational | 4698–4702 / **106** (registration), 140, 141, 200, 201 |
| what did a script do | PowerShell/Operational | **4104** (script block), 4103 (pipeline) |
| older PowerShell traces | Windows PowerShell | 400, 403, 600, **800** |
| what was done over WMI | WMI-Activity/Operational | 5857, 5858, **5860**, 5861 |
| remote management (WinRM) | WinRM/Operational | 6, 91, 168 |
| share folder access | Security | **5140**, 5145 |
| what DNS was queried for | DNS-Client/Operational / Sysmon | 3006, 3008 / Sysmon **22** |
| was there an outbound connection | Sysmon | **3** |
| what did the antivirus catch | Windows Defender/Operational | **1116** (detection), 1117 (action), 5001 (real-time protection off), 5007 (setting change) |
| was a file downloaded | BITS-Client/Operational | 59, 60 |
| was a USB plugged in | DriverFrameworks-UserMode / Kernel-PnP / Partition-Diagnostic | 2003, 2100, 2102 / 410 / 1006 |
| was an account created | Security | **4720**, 4722, 4724, 4728, 4732, 4738 |
| **were the logs cleared** | Security / System | **1102** / **104** |
| was the audit policy turned off | Security | **4719** |
| was the time manipulated | Security | 4616 |
| was unsigned code loaded | CodeIntegrity/Operational | 3033, 3077 (with WDAC/HVCI applied) |

Start from the bold ones. **1102, 104 and 4719** in particular are anti-forensics signals and are checked first. If logs were cleared, the meaning of every subsequent observation of "it is not there" changes.

#### 4.4.2 Always look at logon type alongside

`4624` alone is meaningless. The **Logon Type** tells you the intrusion vector.

| Type | Meaning | From an intrusion standpoint |
| --- | --- | --- |
| 2 | Interactive (directly at the console) | physical access |
| 3 | Network (SMB, shares) | **the staple of lateral movement** |
| 4 | Batch (scheduled tasks) | persistence execution |
| 5 | Service | service accounts |
| 7 | Unlock | unlocking the screen |
| 8 | NetworkCleartext | IIS basic authentication and the like |
| 9 | NewCredentials | `runas /netonly` — **use of stolen credentials** |
| 10 | RemoteInteractive | **RDP** |
| 11 | CachedInteractive | cached credentials |

Large volumes of `4625` (failure) at Type 3 is password spraying; at Type 10 it is RDP brute force. `4648` (explicit credential use) is the trace of **running as another account** and is especially valuable in lateral movement.

#### 4.4.3 The trap of default settings — the logs are mostly off

This is where practice and textbooks diverge. **The more useful the log, the more likely it defaults to OFF.**

| Log | Default state | How to turn it on |
| --- | --- | --- |
| 4688 process creation | **OFF** | Advanced audit policy → Detailed Tracking → Audit Process Creation |
| 4688's **command line** | **OFF** (separate setting) | the `ProcessCreationIncludeCmdLine_Enabled` GPO |
| Sysmon | **not installed** | separate deployment + a configuration file |
| PowerShell 4104 | **partial** | the Script Block Logging GPO (though "suspicious" blocks are partly recorded at warning level even by default) |
| DNS-Client/Operational | **OFF** | `wevtutil sl Microsoft-Windows-DNS-Client/Operational /e:true` |
| Security.evtx size | 20MB rolling by default | on a busy system it **wraps in hours** |

So the habit of taking a **log inventory** before starting analysis is necessary. It is the work of establishing "the range of questions the logs in this incident can answer."

```powershell
# 채널별 레코드 수 — 실제로 내용이 있는 것만
Get-WinEvent -ListLog * -ea 0 | ? RecordCount -gt 0 |
  sort RecordCount -desc | select -f 20 LogName, RecordCount, FileSize

# 파일 크기로 우선순위
gci C:\Windows\System32\winevt\Logs -Filter *.evtx |
  sort Length -desc | select -f 15 Length, Name

# 특정 채널의 설정(활성 여부·최대 크기·보존 정책)
wevtutil gl Security
```

#### 4.4.4 Practical extraction commands

`wevtutil` is everywhere and fast. When output is long, **dumping to a file and grepping** beats fighting with scrollback in a console.

```powershell
$sl = Join-Path $env:TEMP 'sec.txt'
wevtutil qe Security /c:5000 /rd:true /f:text > $sl
sls $sl -Pattern '새 프로세스 이름' | %{ $_.Line.Trim() } | sort -Unique
```

For particular events only, an XPath query is convenient.

```powershell
# 서비스 설치
wevtutil qe System /q:"*[System[(EventID=7045)]]" /c:30 /rd:true /f:text

# 로그 삭제 흔적
wevtutil qe Security /q:"*[System[(EventID=1102)]]" /c:10 /f:text

# RDP 로그온
wevtutil qe "Microsoft-Windows-TerminalServices-LocalSessionManager/Operational" /q:"*[System[(EventID=21 or EventID=25)]]" /c:50 /f:text
```

For structured handling, `Get-WinEvent`'s hashtable filter is fastest (being server-side filtering, it is tens of times faster than `Where-Object`).

```powershell
Get-WinEvent -FilterHashtable @{
  LogName   = 'Security'
  Id        = 4624
  StartTime = [datetime]'2026-09-11 14:00'
  EndTime   = [datetime]'2026-09-11 20:00'
} | select TimeCreated, @{n='Type';e={$_.Properties[8].Value}}, @{n='Acct';e={$_.Properties[5].Value}}, @{n='Src';e={$_.Properties[18].Value}}
```

Offline EVTX files can be opened directly too. Used when analysing a mounted image.

```powershell
Get-WinEvent -Path 'D:\evidence\Security.evtx' -MaxEvents 100
```

For bulk analysis a dedicated parser is better. The combination of exporting to CSV with `EvtxECmd` (Eric Zimmerman) and sorting and filtering in Timeline Explorer is close to standard.

```
EvtxECmd.exe -d C:\Windows\System32\winevt\Logs --csv C:\out
```

#### 4.4.5 The log triage order

The order actually used. From the top it goes **cheap and decisive** first.

1. **Inventory** — which channels hold how much (`Get-WinEvent -ListLog`)
2. **Anti-forensics** — 1102 (Security cleared), 104 (other logs cleared), 4719 (audit policy change)
3. **Execution** — Sysmon 1 or 4688. With a command line it is nearly finished here
4. **Logon** — 4624/4625 by Type. For external arrival look at 3 and 10
5. **Persistence** — 7045 (services), TaskScheduler 106 (tasks), 4697
6. **Remote** — RDP 1149/21, WinRM 91, SMB 5140
7. **Scripts** — PowerShell 4104
8. **Security products** — Defender 1116/1117/5001/5007

#### 4.4.6 What to substitute when there are no logs

This incident was exactly such an environment. Sysmon not installed, 4688 command line auditing OFF, the DNS-Client channel absent, Defender removed by the attacker. **"What commands the attacker typed" could not be known from logs.**

So what is needed is a **substitute evidence mapping.** One missing log line does not make the fact itself disappear.

| Missing log | Substitute evidence |
| --- | --- |
| Sysmon 1 / 4688 (execution) | **Prefetch**, BAM, Amcache, ShimCache, UserAssist, MUICache |
| 4688 command line (arguments) | **PSReadLine history**, LNK `Arguments`, Prefetch's referenced file list, per-app configuration and history files such as `.zenmap` |
| Sysmon 22 / DNS-Client (DNS) | the DNS cache (`ipconfig /displaydns`), `hosts`, **SRUM** (bytes sent/received per app), browser History, the malware's internal configuration |
| Sysmon 3 (network connections) | SRUM, firewall logs, `netstat` (live), traces of routing table changes |
| Defender logs (detections) | surviving `MPLog-*.log`, the Quarantine folder, `Defender\Scans\History` |
| 4624 (logon) | `Default.rdp` and RDP MRU, `%APPDATA%` profile creation times, profile folder creation in `$MFT` |
| 5140 (share access) | LNK volume/NetBIOS fields, `Map Network Drive MRU`, ShellBag |

In this incident that mapping actually worked. The **command string** `route -p add` could not be seen in logs, 4688 being absent, and it remained **in plaintext in the PSReadLine history**, and a `ROUTE.EXE` Prefetch at the same time cross-confirmed that execution. Two different artifacts pointing at the same fact is if anything stronger evidence than a single log.

#### 4.4.7 What the logs actually gave in this incident

| Channel | Size | Result |
| --- | --- | --- |
| Security | 5.3MB | 4688 exists but **only boot processes** (`smss`, `csrss`, `lsass`, `services`, `wininit`, `winlogon`, `autochk`). User process auditing not applied, command line field blank |
| PowerShell/Operational | 2.1MB | mostly module loading noise. The only meaningful thing was an execution policy block error for `Script_Run.ps1` |
| System | — | valid as a route to confirming service installation (7045) |
| Sysmon | **absent** | not installed |
| DNS-Client/Operational | **absent** | disabled by default |
| Defender/Operational | neutralized | removed by the attacker |

**The log axis was effectively bankrupt, and the whole incident was reconstructed from the artifacts of 4.1 to 4.3.** This is why the approach of "just look at the logs" frequently fails in practice. Logs are evidence **only when they were on**, while artifacts are **what the OS cannot help leaving for performance and convenience**, and are far harder to turn off.

### 4.5 Unexpectedly powerful: the PSReadLine history

```
%APPDATA%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
```

Commands **typed into the PowerShell console pile up in plaintext, as typed.** The decisive clue in this challenge came from here. At the very top of the file was this.

```
New-NetRoute -DestinationPrefix 10.1.30.5/32 -InterfaceAlias Ethernet1 -NextHop 192.168.0.11 -PolicyStore PersistentStore
route -p add 10.1.30.5 mask 255.255.255.255 192.168.0.11
route print 10.1.30.5
ipconfig
```

The attacker had opened a **persistent route** to the internal target `10.1.30.5` via `192.168.0.11`. This one block told us both the incident's start time (consistent with the `ROUTE.EXE` Prefetch's last run time) and the target at once.

> **Caution.** An analyst using PowerShell under the same account **contaminates this file.** I contaminated it. Copy it before analysis, or use a separate account and a separate console.

---

## 5. The actual analysis: how the timeline was built

### 5.1 Fix the timeline's lower bound first

Counting Prefetch by date gives the image's creation time immediately.

```powershell
gci C:\Windows\Prefetch\*.pf | group {$_.LastWriteTime.Date} | sort Name | ft Count,Name -auto
```

The result was 142 on 09-11 and 84 on 09-12. And the oldest entries were `SMSS.EXE`, `WINLOGON.EXE`, `FIRSTLOGONANIM.EXE` and `OOBENETWORKCONNECTIONFLOW.EXE` at 13:02 on 09-11 — **the OS's first boot.** Which is to say everything that happened on this system is after 09-11 13:02. The possibility of timestomping is verified separately by comparing `$SI` and `$FN`.

### 5.2 Separating the noise (I got this wrong once)

The 09-12 entries were all the analyst's (my) tools. `BURPSUITE`, `JAVA`, `WINPREFETCHVIEW`, `MSEDGE`. Discard them.

The problem was the 19:00 hour on 09-11. `NMAP-7.98-SETUP`, `NPCAP`, `DOTNET-SDK`, `REGISTRYEXPLORER`, `TIMELINEEXPLORER`, `VMMAP64`, `DEFENDER.REMOVER.13.EXE`... Seeing analysis tools everywhere, I **rejected the whole thing as "traces of the author preparing the image."**

Wrong. The attack was mixed in among them.

```
19:16:02  GETMAC.EXE
19:20:40  DEFENDER.REMOVER.13.EXE      ← 방어 회피
19:21:46  DEFENDER.REMOVER.13.EXE
19:23:20  version.dll 생성             ← 악성 파일 유입
19:23:32  vmmap64.exe 생성
19:25:50  VMMAP64.EXE 실행             ← 사이드로딩 발동
19:32:12  CMD.EXE
19:32:55  SC.EXE                       ← 서비스 생성
19:35:13  NMAP-7.98-SETUP.EXE
19:39:13  NMAP.EXE                     ← 내부 대역 스캔
```

**The lesson is clear. Judge noise per item, never per time window.** Preparation work and attack can be mixed in the same time window, and discarding the window wholesale loses the attack inside it.

### 5.3 Enumerate everything that ran outside system paths

This was the single highest-efficiency move. Export all Prefetch to CSV and keep only those whose `Process Path` is not a system directory.

```powershell
& $wpv /scomma C:\pf.csv
gc C:\pf.csv | sls 'USERS' | sls -NotMatch 'TOOLS' | select -exp Line
```

Of 226, what remained could be counted on the fingers, and the executables the attacker brought were ultimately just four.

```
C:\Users\pc01\Downloads\Responder\Responder.exe                 실행 10회, 15:03~15:06
C:\Users\pc01\Downloads\Defender.Remover.13.exe                 19:21:46
\VOLUME{0000000000000000-103e4cb2}\DEFENDER_REMOVER.13.EXE      19:20:40
C:\Users\pc01\Documents\nmap-7.98-setup.exe → C:\Program Files (x86)\Nmap\nmap.exe
C:\Program Files\Windows Mail\SysinternalsSuite\vmmap64.exe     19:25:50
```

**The search space fell from 150,000 files to five lines.** In scenario-based work this technique of "exhaustive enumeration then set difference" is far faster than verifying individual hypotheses one by one.

---

## 6. The answer: DLL sideloading

The file used for initial access was this.

```
C:\Program Files\Windows Mail\SysinternalsSuite\version.dll
```

This directory held exactly two files.

| File | Size | Signature | Created |
| --- | --- | --- | --- |
| `version.dll` | 66,293,048 B | **NotSigned** | 09-11 19:23:20 |
| `vmmap64.exe` | 1,312,640 B | **Valid** (genuine Sysinternals VMMap) | 09-11 19:23:32 |

```powershell
gci $d | %{ [pscustomobject]@{
  N=$_.Name
  Sig=(Get-AuthenticodeSignature $_.FullName).Status
  SHA256=(Get-FileHash $_.FullName -A SHA256).Hash } } | fl
```

### 6.1 Why `version.dll`

**DLL sideloading (T1574.002)** abuses Windows's DLL search order. When a program requests a DLL **without an absolute path**, as in `LoadLibrary("version.dll")`, Windows searches roughly in this order.

```
1. 이미 로드된 모듈
2. KnownDLLs (레지스트리에 등록된 시스템 DLL 목록)
3. 실행 파일이 있는 디렉터리      ← 여기
4. System32
5. System
6. Windows
7. 현재 디렉터리
8. PATH
```

`version.dll` is a common DLL that **is not in KnownDLLs** and that nearly every program loads (the file version information API). So placing a malicious DLL of the same name next to a genuinely signed executable makes that executable **load the malicious DLL in its own folder first.**

Knowing the staple sideloading DLL names speeds detection.

```
version.dll   dbghelp.dll   wininet.dll   winmm.dll
dwmapi.dll    textinputframework.dll   vcruntime140.dll
secur32.dll   profapi.dll   msimg32.dll   cryptsp.dll
```

### 6.2 What the attacker gains

| Advantage | Description |
| --- | --- |
| Signature bypass | only a **validly signed genuine binary** appears in the process tree |
| Reputation bypass | passes an EDR's executable reputation check |
| Automatic execution | the loader brings the DLL in for you. No separate execution code needed |
| Camouflage | the folder name `SysinternalsSuite` itself looks normal |

The placement was deliberate too. `C:\Program Files\Windows Mail\` is a **deprecated path no longer used** on Windows 10. No legitimate software puts files there, so nobody looks.

### 6.3 From a detection standpoint — what to look at to catch it

| Signal | How to check |
| --- | --- |
| an unsigned DLL sitting next to a signed EXE | scan per directory with `Get-AuthenticodeSignature` |
| a system DLL name in a non-standard path | `version.dll` outside System32 is suspicious |
| executables in deprecated or abnormal paths | `Windows Mail`, `Windows Photo Viewer` and the like |
| EXE and DLL creation times seconds apart | dropped in the same session |

```powershell
gci 'C:\Program Files','C:\ProgramData' -Recurse -Filter version.dll -ea 0 |
  select FullName, @{n='Sig';e={(Get-AuthenticodeSignature $_.FullName).Status}}
```

---

## 7. Persistence: a one-character masquerade

Pulling only the entries in the service list pointing at binaries outside system paths gave it immediately.

```powershell
gwmi win32_service |
  ?{ $_.PathName -notmatch 'C:\\Windows\\(System32|SysWOW64|servicing)' } |
  select Name, DisplayName, PathName, StartMode | fl
```

```
SERVICE_NAME       : Prof3vc
DISPLAY_NAME       : User Profile Service
BINARY_PATH_NAME   : C:\Program Files\Windows Mail\SysinternalsSuite\vmmap64.exe
START_TYPE         : 2  AUTO_START
SERVICE_START_NAME : LocalSystem
```

The legitimate service is `ProfSvc`. **The `S` was changed to a `3`.** And the display name was **appropriated from the legitimate service character for character.** Open `services.msc` and skim the display names and it will never be caught.

Gathering the staple variants of this type (**T1036 Masquerading**) sharpens the eye.

| Legitimate | Masquerade example | Method |
| --- | --- | --- |
| `ProfSvc` | `Prof3vc` | S → 3 |
| `WinDefend` | `WinDefends`, `WlnDefend` | added character / l ↔ I |
| `SysMain` | `SysMaln`, `Sysmain` | i → l |
| `lsass.exe` | `1sass.exe`, `lsasss.exe` | l → 1 |
| `svchost.exe` | `svch0st.exe`, `scvhost.exe` | 0 ↔ O / transposition |

### The inspection routine

The surest thing is **the set difference against a list of legitimate services.** Looking for similar names by eye is not trustworthy.

```powershell
# 최근 생성된 서비스 키
gci HKLM:\SYSTEM\CurrentControlSet\Services | sort LastWriteTime -desc |
  select -f 20 PSChildName, LastWriteTime

# 서비스 설치 이벤트 (결정적)
wevtutil qe System /q:"*[System[(EventID=7045)]]" /c:30 /rd:true /f:text
```

With Autoruns it finishes in one go, signature verification included.

```
autorunsc.exe -accepteula -a * -h -s -nobanner -c > C:\ar.csv
```

Just look at the `Not Verified` rows.

### The defence evasion happened right before it

```
19:20:40  Defender.Remover.13.exe 실행
19:21:46  Defender.Remover.13.exe 재실행
19:21:46  %TEMP%\Script_Run_Payload\ 전개
          Script_Run.ps1 / Script_Run.cmd / files_removal.bat
          verify.bat / RemoveSecHealthApp.ps1 / PowerRun.exe / Remove_Defender\*
19:23:20  version.dll 낙하
```

**The security solution was removed first and then the payload dropped.** The order proves the intent. At analysis time Defender really had been removed, and so the evidence source of Defender detection logs disappeared with it.

---

## 8. Malware profiling: when there are no strings

To find the C2 domains I pulled strings from `version.dll`. 35,691 came out, and **not one piece of network-related plaintext.**

```powershell
sls $o -Pattern 'http'        # 0건
sls $o -Pattern 'User-Agent'  # 0건
sls $o -Pattern 'WinHttp'     # 0건
sls $o -Pattern 'socket'      # 0건
```

Here the habit of **verifying the tool first** is necessary. "Nothing comes out" has to be distinguished between "it is not there" and "I cannot find it."

```powershell
sls $o -Pattern 'Vcl' | select -f 3   # 정상 매치 → 도구는 멀쩡
```

The tool was fine. Which means **the configuration is encrypted or encoded.**

### 8.1 What the header told us

```powershell
-join ($b[0..31] | %{ '{0:X2} ' -f $_ })
# 4D 5A 50 00 02 00 00 00 ...
```

`4D 5A 50` = **`MZP`**. The signature of a Delphi/Borland-compiled PE. A normal MSVC binary has the string "This program cannot be run in DOS mode" after `MZ`, and Delphi does not. The reason it was 66MB was here too — the VCL runtime was statically linked whole.

The magic byte table is worth memorizing.

| Leading bytes | Identity |
| --- | --- |
| `4D 5A` (MZ) | ordinary PE |
| `4D 5A 50` (MZP) | **Delphi/Borland PE**, Inno Setup |
| `50 4B 03 04` (PK) | ZIP / Office / JAR |
| `37 7A BC AF` | 7z |
| `1F 8B` | gzip |
| `4D 44 4D 50` | memory dump |

### 8.2 Reading capabilities with capa

```
capa.exe -v "C:\Program Files\Windows Mail\SysinternalsSuite\version.dll"
```

```
WARNING: This sample appears to be packed.

md5      02fdb8b22f6c73eeb92063e3ae3991bf
sha1     3b454b075f767f1cf66611cfb6acd153d4c8ee6b
sha256   ac24bf2ffa7c4c3e0f6b634ecc795ecc493c9ef55b98b2b0f7745e2ec8a80187
arch     i386        function count 15,966

collection/keylog             log keystrokes (+ via polling, 10곳)
collection/screenshot         capture screenshot
host-interaction/clipboard    read / write clipboard
collection                    get geographical location (5곳)
data-manipulation             RC4 encrypt / XOR encode / CRC32 / Delphi LCG
executable/resource           extract resource via kernel32
persistence/service           persist via Windows service
anti-analysis                 self delete / GetTickCount 지연 검사
                              마우스 미이동 기반 VM 탐지 / generic packer
load-code/shellcode           execute shellcode via indirect call
host-interaction/process      allocate RWX memory / create process suspended
```

**Keylogger + screen capture + clipboard theft + geolocation collection + RC4 + configuration extraction from resources + service persistence.** A typical commercial RAT, and the combination of Delphi/i386 + RC4 + resource configuration matches the fingerprint of the **Remcos RAT** family (inference).

Remcos puts its configuration into the `RCDATA` resource `SETTINGS` and encrypts it with RC4. The structure is this.

```
[1바이트: 키 길이 N][N바이트: RC4 키][RC4로 암호화된 설정 블롭]
```

Decrypted, it gives the form `host:port:flags|host:port:flags|...`. This is why the question added the qualifier **"if several C2 domains are identified, enumerate them in ascending order."** Multiple C2s are the standard configuration of this family.

> This decryption was not finished within the competition time, so question 2 was left unsolved. Statically it is a matter of extracting the `SETTINGS` resource and undoing RC4; dynamically, catching DNS queries with `pktmon` (built into Windows 10) does it. Since capa reported `self delete`, though, **a copy must always be taken before running it.**

```powershell
# Wireshark가 안 뜰 때(VC++ 런타임 부재 등) 내장 대체재
pktmon start --etw -c --pkt-size 128
Start-Process $target
pktmon stop
pktmon format PktMon.etl -o C:\pkt.txt
sls C:\pkt.txt -Pattern 'Port 53'
```

---

## 9. The three places I got it wrong

This is the real reason this piece was written. The process of getting it wrong is more reusable than the process of getting it right.

### 9.1 "Zero MOTW, therefore not a download path"

Early in the analysis I searched all of `C:\Users` for files with a `Zone.Identifier` ADS and found **zero.** So I concluded "arrival was not through a browser or mail" and folded that direction.

**The argument was weak.** An MOTW scan is valid **only while the file remains on disk.** When a file is deleted the ADS goes with it, so zero says not "it was not a download" but only **"the downloaded file is not here now."**

> **Generalization.** When killing a hypothesis with negative evidence, first enumerate **the other paths by which that evidence could be absent.** Without enumerating, it is not proof but hope.

### 9.2 Rejecting a whole time window

As written in 5.2, I discarded the 19:00 hour in one go as "the author's preparation noise" and missed the entire attack inside it. Coming back took a long while.

> **Generalization.** The unit of noise judgement is the **item**, not the **time window.** Preparation and attack can mix in the same window.

### 9.3 Anchoring on the first plausible candidate

The moment I found `RESPONDER.EXE` I fixed on the narrative "LLMNR poisoning = initial access" and kept digging that path. In reality Responder was a credential collection (post-access) tool in this incident, unrelated to initial access.

How I got out is reusable. **I used the structure that the four questions are one scenario.**

```
문제 2가 C2 도메인을 묻는다  → 외부로 콜백하는 임플란트가 존재한다
문제 3이 지속성을 묻는다     → 재부팅 후에도 사는 자동실행이 존재한다
Responder는 C2도 없고 서비스 등록도 안 한다
→ Responder는 이 체인에 안 들어간다
```

**Rather than refuting hypotheses individually, I set up the structural constraints a hypothesis has to satisfy and discarded wholesale what did not fit.** This was far faster.

### 9.4 An addendum: agreement is not evidence

A teammate also said "Responder does not seem to be malicious." The conclusion was the same, and **the agreement of two people looking at the same screen is not independent confirmation.** It can be correlated error. What definitively excluded Responder was not "agreement" but the structural argument above.

---

## 10. In summary: a 30-minute initial access analysis routine

Solving this challenge again, this is the order I would go in.

**0. Volatile data first (if the VM is alive)**

```powershell
ipconfig /displaydns > C:\dns.txt
netstat -anob > C:\net.txt
copy $env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt C:\hist.bak
```

The last line is the core. **Take it before the analyst contaminates it.**

**1. Fix the timeline's lower bound**

```powershell
gci C:\Windows\Prefetch\*.pf | group {$_.LastWriteTime.Date} | sort Name | ft Count,Name
```

**2. Hit persistence first (the smallest search space)**

```powershell
gwmi win32_service | ?{ $_.PathName -notmatch 'C:\\Windows\\(System32|SysWOW64|servicing)' } | select Name,PathName | fl
gci C:\Windows\System32\Tasks -Recurse -File | sort LastWriteTime -desc | select -f 20 LastWriteTime,FullName
wevtutil qe System /q:"*[System[(EventID=7045)]]" /c:30 /rd:true /f:text
```

Persistence items **can exist only in fixed locations the OS reads**, so candidates are finite, in the hundreds. On top of that the item's value is itself `ImagePath` = the malicious binary's absolute path. **Find one name and the path comes free.**

```
위장 이름 → ImagePath → 악성 바이너리
                          ├─ strings / capa → C2
                          └─ CreationTime   → 침투 시각 앵커 → 드로퍼
```

**3. Enumerate every executable outside system paths**

```
WinPrefetchView.exe /scomma C:\pf.csv
```

**4. Arrival evidence (presuming possible deletion)**

```powershell
# MOTW
gci C:\Users -Recurse -Force -File -ea 0 | %{ $z = gc -LiteralPath $_.FullName -Stream Zone.Identifier -ea 0; if($z){ $_.FullName; $z } }
# LNK 타겟
# $MFT / 휴지통 $I / USBSTOR
```

**5. Signature verification sweep**

```powershell
gci 'C:\Program Files','C:\ProgramData','C:\Users' -Recurse -Include *.dll,*.exe -ea 0 |
  %{ [pscustomobject]@{ P=$_.FullName; S=(Get-AuthenticodeSignature $_.FullName).Status } } |
  ?{ $_.S -ne 'Valid' }
```

**6. Capability determination**

```
capa.exe -v <sample>
```

---

## 11. A few environment traps

Unrelated to the analysis itself, and they ate real time, so they are recorded.

| Symptom | Cause | Response |
| --- | --- | --- |
| `Get-Content -Stream` says "parameter cannot be found" | `[` or `]` in the path is interpreted as a wildcard so the dynamic parameter is not attached | use `-LiteralPath` |
| in pasted commands `\` becomes `\|` and `${` breaks | VMware Remote Console injects the clipboard as keystrokes + Korean keyboard mapping | remove backslashes with `Join-Path`, keep lines under 60 characters |
| long commands truncated midway | the same as above (lost keys) | split into short lines |
| `Import-Csv` says "member already exists" | duplicate headers in the tool's output CSV | specify `-Header`, or grep as text |
| `sc start` gives error 1053 | a GUI binary registered as a service fails the SCM handshake | **normal behaviour.** The process does start. Substitute direct execution |
| Wireshark missing `VCRUNTIME140.dll` | the x64 VC++ redistributable is not installed | substitute `pktmon` / `netsh trace` |
| `-and` breaks into `- and` | whitespace inserted during pasting | avoid with a `?{} \| ?{}` chain |

---

## 12. Reflection: with one screen in between

This analysis had different conditions from usual. **I could not touch the target system.** The VM was inside a VMware Remote Console window on the competition network, and I saw the world only through screenshots a person pasted. The person was the hands and I was the eyes and the hypotheses.

### Each round trip was expensive

One command → one screenshot. In this structure **"a command that checks narrowly" is a luxury.** Commands that cut as wide a space as possible in one round trip win. In fact the highest-efficiency move in this analysis was not hypothesis verification but **exhaustive enumeration.**

```
WinPrefetchView.exe /scomma C:\pf.csv
gc C:\pf.csv | sls 'USERS' | sls -NotMatch 'TOOLS'
```

Out of 226 execution traces, five lines of executables the attacker brought remained. I should have done this earlier. Until then I had been skimming Prefetch bit by bit with name filters, and that method **structurally cannot see what the filter does not catch.** `WMIC` and `NETSH` were in fact not in my first filter pattern and so did not even make the candidate list for a while.

### The time when the problem was the keyboard, not the tools

VMRC injects pastes **as keystrokes.** Layered with Korean keyboard mapping, this kept happening.

```
C:\Users\pc01\Desktop\Tools(1)   →   C:\Users\pc01\Desktop|Tools(1)
${env:ProgramFiles}                 →   $env:ProgramFiles}
-and                                →   - and
$o=Join-Path $env:TEMP 'vs.txt'     →   (줄 중간에서 잘림)
```

The reason this was not a mere inconvenience is that **a broken command's empty output can be misread as the absence of evidence.** There was in fact a moment when I judged that `strings64.exe` "was not there," when actually the backslash in the path had turned into a pipe and execution had failed. The file was perfectly present.

So partway through I changed the rules. **Build paths with `Join-Path` only, using no backslashes or braces, and keep lines short.** And when a result is empty, **first check whether the tool is alive.**

```powershell
sls $o -Pattern 'Vcl' | select -f 3   # 나와야 정상. 안 나오면 도구/파일 문제
```

That one line distinguishing "nothing comes out" between "it is not there" and "I cannot find it" was the cheapest insurance in this session.

### The attempt to take the screen directly

Midway the person said "why don't you just drive my screen?" The VM was in fact running **on that Mac.**

```
$ osascript -e 'tell application "System Events" to get name of every process whose background only is false'
Finder, Tailscale, Discord, iTerm2, Code, Preview, Google Chrome, Keychain Access,
VMware Remote Console, KakaoTalk, Claude
```

Screen capture (`screencapture`) worked. And key input was blocked.

```
execution error: System Events에 오류 발생: osascript에서 키스트로크를 보내도록 허용되지 않습니다. (1002)
```

It was a macOS TCC Accessibility permission problem, and even trying to grant permission, **the subject TCC sees is not `/Applications/Claude.app` but the `claude-code` bundle nested inside it**, so a normal addition did not catch it. Rather than digging further here I went back to the original method. **The judgement to stop digging when blocked and return to the original track** belongs on the well-done side.

### The three times the person corrected me

The reason this session ran well is that the person **did not merely receive results.** There were at least three interventions that changed direction.

**"But does a hacker intrude into pc01?"** — the question that came while I was deep in digging with `Responder.exe` placed as the initial access tool. Responder is not a tool run **on the victim host** but one an attacker runs from a foothold. This one sentence collapsed my narrative's premise, and from there it moved to the structural refutation that "if the four questions are one scenario, Responder has no C2 and registers no service, so it is not in the chain."

**"But a teammate says Responder is not malicious."** — an independent source for the same conclusion. There is one more thing to note here, though. **The agreement of two people looking at the same screen is not independent confirmation.** Even with the same conclusion, the same grounds can mean correlated error. What definitively excluded Responder was not "we both think so" but the structural argument above.

**"But what are you looking at, in what order, right now?"** — this was the best question. Answering it, I redrew the exhausted artifacts and the open axes as a table, and in the process the fact emerged that **"there are only four executables and I have already marked three of them wrong."** Which is to say the remaining answer had to be structurally either `vmmap64.exe` or `version.dll`. The answer was `version.dll`.

> Asking a model **"what are you looking at and why, right now"** is not a courtesy but **a debugging technique.** Making it state its state in words exposes the contradictions.

### What I did wrong

Besides the three premise errors written in section 9, there is one more on the **working method** side.

When question 4 (internal information gathering) got stuck, I made a long candidate list and kept having the person submit them. `nmap.exe`, `getmac.exe`, `responder.exe`, `wmic.exe`, `route.exe`, `netsh.exe`, `ipconfig.exe`, `regedit.exe`, `certutil.exe`, `rundll32.exe`. All wrong.

This was **outsourcing groundless guesses to a person's submission attempts.** The cost of an attempt is not zero (competition time, a person's attention) and I treated it as zero. In the same time I should have done things that **increase evidence**, such as exhaustive enumeration of `pf.csv` or checking `.zenmap` output. In fact question 1, where the answer came, came from enumeration, not from guessing.

### The result

| Question | Result |
| --- | --- |
| a. Initial access | **solved** — `C:\Program Files\Windows Mail\SysinternalsSuite\version.dll` |
| b. C2 domains | unsolved — the RC4 configuration decryption was not finished in time |
| c. Persistence/defence evasion | **solved** — `Prof3vc` |
| d. Internal information gathering | unsolved |
| Preliminary analysis report | submitted |

Half. And the asset left from this session is, I think, not the two that were right but **the record of where and why I got it wrong.** Meeting a challenge of the same format again, I will run section 10's routine as it is, and that routine came out of the places I got wrong this time.

## 13. Wrapping up

Scenario-based forensics challenges measure **search strategy** more than tool knowledge. What I learned from this challenge compresses into three things.

1. **Hit the narrowest place first.** The initial access file and the C2 have the whole disk as their search space, while persistence exists only in fixed locations the OS reads. And the persistence item holds the route to the other two.

2. **Before killing a hypothesis with negative evidence, enumerate the other paths by which that evidence could be absent.** Zero MOTW was not "it was not a download."

3. **Judge noise only per item.** Discard a time window wholesale and you discard the attack inside it too.

And one perspective gained from the attack side. The combination of **a genuinely signed binary + an unsigned DLL placed next to it** is now close to standard grammar for initial access. Every control that uses signatures as grounds for trust is bypassed by this single move. What a defender has to look at is not "is this EXE signed" but **"where did the DLL this EXE loads come from."**

---

## References

- MITRE ATT&CK — [T1574.002 DLL Side-Loading](https://attack.mitre.org/techniques/T1574/002/), [T1036 Masquerading](https://attack.mitre.org/techniques/T1036/), [TA0001 Initial Access](https://attack.mitre.org/tactics/TA0001/)
- Eric Zimmerman Tools — `PECmd`, `MFTECmd`, `AmcacheParser`, `LECmd`, `AppCompatCacheParser`, `Timeline Explorer`
- Mandiant — capa (capability-based malware classification)
- Microsoft Learn — Dynamic-Link Library Search Order
- NirSoft — WinPrefetchView
