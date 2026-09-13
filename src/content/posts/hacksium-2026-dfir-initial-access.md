---
id: "hacksium-2026-dfir-initial-access"
title: "[HACKSIUM 2026] 초기 침투는 어디에 흔적을 남기는가: 시나리오형 DFIR 문제 해부"
description: "침해 단말 하나를 던져주고 초기 침투 경로, C2, 지속성, 내부 정찰을 묻는 시나리오형 포렌식 문제를 풀며 정리한 기록. Prefetch·LNK·Amcache·BAM·$MFT가 각각 무엇을 증명하고 무엇을 증명하지 못하는지, DLL 사이드로딩이 왜 초기 침투의 표준 답이 되었는지, 그리고 내가 세 번 잘못 세운 전제가 무엇이었는지."
date: "2026-09-13 12:00"
category: "web-security"
tags: ["HACKSIUM", "DFIR", "Forensics", "Initial Access", "MITRE ATT&CK", "DLL Sideloading", "Prefetch", "Amcache", "MFT", "Remcos", "capa", "Windows"]
published: true
---

# [HACKSIUM 2026] 초기 침투는 어디에 흔적을 남기는가

2026 HACKSIUM BUSAN 본선 마지막 날에는 Live Fire 방어전이 아니라 **침해 사고 분석** 문제가 나왔다. 형식이 인상적이었다. 플래그를 숨겨둔 바이너리를 주는 게 아니라, **침해당한 Windows 단말 한 대를 통째로** 주고 이렇게 물었다.

> 이 단말에서 침해 정황이 확인되었습니다. 초기 침투에 사용된 파일의 경로를 식별하십시오.

CTF라기보다 실무 인시던트 리스폰스 과제에 가깝다. 그리고 이런 출제 방식은 최근 몇 년간 계속 늘고 있다. 취약점 하나를 찾는 능력보다, **남겨진 흔적에서 사건을 복원하는 능력**을 보겠다는 것이다.

이 글은 그 문제를 푼 기록이면서, 동시에 **"초기 침투는 실제로 어떻게 이루어지고 어디에 흔적을 남기는가"**를 정리한 학습 노트다. 정답을 나열하는 대신, 각 아티팩트가 무엇을 증명하고 무엇을 증명하지 못하는지, 그리고 내가 어디서 틀렸는지에 지면을 더 썼다. 틀린 쪽이 배울 게 많았다.

분석 대상은 Windows 10 가상머신 한 대, 사용자 계정 `pc01`, 네트워크는 `10.1.10.21/24`와 `192.168.0.15/24` 두 인터페이스였다. 본문의 명령 출력·해시·시각은 관측값 그대로이고, 추론은 추론이라고 표시했다.

---

## 1. 문제는 이렇게 나왔다

네 문제가 한 사건의 네 단면이었다.

| # | 제목 | 배점 | 묻는 것 | 답 형식 예시 |
| --- | --- | --- | --- | --- |
| 1 | 초기 침투 | 100 | 침투에 사용된 파일의 **절대경로** | `C:\Windows\System32\cmd.exe` |
| 2 | 악성코드 분석 | 200 | **C2 도메인** (복수면 오름차순) | `abc.com, bbb.com` |
| 3 | 지속성 및 방어 회피 | 200 | 정상 구성요소를 위장한 **항목 이름** | `Dhcp` |
| 4 | 내부 정보 수집 | 200 | 정찰에 사용된 **파일 이름** | `ping.exe` |

각 문제의 지문은 이랬다.

**a. 초기 침투 (100점)**
> 대상 단말에서 침해 정황이 확인되었습니다. 시스템 아티팩트와 로그를 분석하여 **초기 침투에 사용된 파일의 경로**를 식별하십시오.
> (예: `C:\Windows\System32\cmd.exe`)

**b. 악성코드 분석 (200점)**
> 침해 단말에서 의심스러운 프로그램 실행 및 외부 통신 정황이 확인되었습니다. 해당 악성코드가 사용한 **C2 도메인**을 식별하십시오. 여러 C2 도메인이 식별될 경우 오름차순으로 열거하십시오.
> (예: `abc.com, bbb.com`)

**c. 지속성 및 방어 회피 분석 (200점)**
> 공격자가 지속성 확보 및 정상 프로세스 위장을 목적으로 생성한 **비정상 항목의 이름**을 식별하십시오.
> (예: `Dhcp`)

**d. 내부 정보 수집 행위 분석 (200점)**
> 침해 이후 시스템 내부 정보가 수집된 정황이 확인되었습니다. 공격자가 **내부 정보 수집 행위에 사용한 파일 이름**을 식별하십시오.
> (예: `ping.exe`)

예시로 주어진 `cmd.exe`, `Dhcp`, `ping.exe`는 전부 **정상 Windows 구성요소**다. 답의 형태만 알려주고 내용은 알려주지 않는 방식인데, 그래도 여기서 읽어낼 게 있다. `a`는 절대경로를 요구하니 **파일이 존재하는 벡터**로 한정되고, `c`는 확장자 없는 서비스 이름 형태이며, `d`는 확장자가 붙은 파일 이름이다. 이 형식 정보만으로도 가설 공간이 상당히 줄어든다.

여기에 더해 300점짜리 **초동 분석 보고서** 과제가 붙어 있었다. 워드 양식을 주고, 기본 정보 / 사고 개요 / 초기 침투 경로 분석 / 초동 조치 / IOC / 최종 분석 결과를 채워 제출하는 형식이었다. 문제를 푸는 것과 **사건을 설명하는 것**이 따로 채점된다는 뜻이다.

네 문제가 한 시나리오의 단계별 단면이라는 점이 중요하다. 그러면 **어느 한 단계를 잡으면 나머지가 딸려온다**. 어디로 진입할지 고르는 게 전략의 전부가 된다. 이 판단은 뒤에서 다시 다룬다.

---

## 2. 왜 요즘 이런 문제가 나오나

전통적인 포렌식 CTF는 "pcap에서 파일을 카빙해라", "메모리 덤프에서 프로세스를 찾아라"처럼 **단일 아티팩트에서 단일 답**을 뽑는 형태였다. 시나리오형은 다르다.

| 항목 | 전통형 | 시나리오형 |
| --- | --- | --- |
| 입력 | 아티팩트 파일 하나 | 시스템 전체 |
| 요구 능력 | 도구 사용법 | 사건 복원 |
| 오답 방식 | 도구를 못 씀 | **엉뚱한 곳을 팜** |
| 실무 유사성 | 낮음 | 높음 |

차이의 핵심은 **탐색 공간**이다. pcap 하나는 끝까지 볼 수 있지만, Windows 단말 하나에는 15만 개가 넘는 파일과 200개가 넘는 실행 흔적, 수만 건의 이벤트 로그가 들어 있다. 전수 조사는 불가능하고, **어디를 볼지 고르는 것 자체가 실력**이 된다.

그래서 이런 문제는 "무엇을 아느냐"보다 "**무엇부터 보느냐**"를 측정한다. 실제로 내가 이 문제에서 잃은 시간의 대부분은 도구를 못 써서가 아니라, 잘못된 전제로 잘못된 곳을 오래 팠기 때문이었다.

---

## 3. 초기 침투란 정확히 무엇인가

MITRE ATT&CK에서 **Initial Access(TA0001)**는 "공격자가 네트워크에 최초 발판을 확보하는 단계"다. 여기서 흔히 혼동이 생긴다. **들어온 뒤에 무언가를 건드린 것은 초기 침투가 아니다.**

```
TA0001 Initial Access    최초 발판 확보         ← 문제 1
TA0002 Execution         코드 실행
TA0003 Persistence       재부팅 생존            ← 문제 3
TA0005 Defense Evasion   탐지 회피              ← 문제 3
TA0007 Discovery         내부 정찰              ← 문제 4
TA0008 Lateral Movement  옆으로 이동
TA0011 Command & Control 외부 통신              ← 문제 2
```

주요 Initial Access 기법과, **각 기법이 호스트에 파일을 남기는가**를 정리하면 이렇다. 이 표가 중요한 이유는 문제가 "파일의 경로"를 물었다는 사실 자체가 벡터를 좁혀주기 때문이다.

| 기법 | ID | 설명 | 호스트에 파일이 남나 |
| --- | --- | --- | --- |
| 스피어피싱 첨부 | T1566.001 | 메일 첨부 문서·실행파일 | 남는다 |
| 스피어피싱 링크 | T1566.002 | 메일 링크 → 다운로드 | 남는다 |
| 드라이브바이 | T1189 | 웹 방문만으로 감염 | 남는다 |
| 이동식 매체 | T1091 | USB 자동실행·수동실행 | 남는다 |
| 공급망 침해 | T1195 | 변조된 정상 설치파일 | 남는다 |
| 공개 서비스 취약점 | T1190 | 웹서버·VPN 익스플로잇 | 웹셸을 떨구면 남는다 |
| 외부 원격 서비스 | T1133 | RDP·VPN 정상 로그인 | **안 남는다** |
| 유효 계정 | T1078 | 탈취 계정 로그인 | **안 남는다** |

문제가 절대경로를 요구했으니 아래 두 줄은 애초에 답이 될 수 없다. 이렇게 **문제의 답 형식이 가설 공간을 잘라준다**는 점은 시나리오형에서 반복해서 쓸모가 있었다.

---

## 4. 호스트에 남는 증거의 계보

여기가 이 글에서 가장 오래 쓸 부분이다. Windows는 같은 사실을 여러 곳에 중복 기록한다. 각 아티팩트가 **무엇을 증명하고 무엇을 증명하지 못하는지**를 알아야 "없다"는 결론을 안전하게 내릴 수 있다.

### 4.1 실행 증거 계열 — "이 파일이 돌았다"

| 아티팩트 | 위치 | 주는 것 | 한계 |
| --- | --- | --- | --- |
| **Prefetch** | `C:\Windows\Prefetch\*.pf` | 실행 파일명, **전체 경로**, 실행 횟수, 최근 실행 시각 8개, 참조 파일 목록 1024개 | 실행된 것만. SysMain 꺼지면 없음. **시각은 마지막 실행뿐** |
| **Amcache** | `C:\Windows\AppCompat\Programs\Amcache.hve` | 전체 경로, **SHA-1**, 최초 등록 시각 | 전수 기록이 아님. 누락 잦음 |
| **ShimCache** | `SYSTEM\...\AppCompatCache` | 전체 경로, 파일 수정 시각 | Win10에서는 **존재 ≠ 실행** |
| **BAM/DAM** | `SYSTEM\...\bam\State\UserSettings\<SID>` | 전체 경로 + 마지막 실행 시각 + 실행 SID | 최근 것만 유지 |
| **UserAssist** | `HKCU\...\Explorer\UserAssist` (ROT13) | GUI로 실행한 것, 실행 횟수 | 콘솔 실행은 없음 |
| **MUICache** | `HKCU\...\Shell\MuiCache` | 실행된 exe 경로 + 설명 문자열 | 시각 없음 |
| **SRUM** | `C:\Windows\System32\sru\SRUDB.dat` | 앱별 **송수신 바이트** | 60일 롤링 |

Prefetch 파일 이름 규칙은 알아둘 가치가 있다.

```
RESPONDER.EXE-BEAF5D4D.pf
^^^^^^^^^^^^ ^^^^^^^^
실행파일명    전체 경로(+일부 인자)의 해시
```

해시가 경로에서 나오므로 **같은 이름이라도 경로가 다르면 다른 `.pf`가 생긴다**. 동명의 `.pf`가 두 개 보이면 그 자체가 위장·복제 신호다. 실제로 이 문제에서 `DEFENDER.REMOVER.13.EXE`의 `.pf`가 두 개(`-FE2A0C05`, `-956C344E`) 있었고, 하나는 `C:\Users\pc01\Downloads\`에서, 다른 하나는 `\VOLUME{0000000000000000-103e4cb2}\`에서 실행된 것이었다.

그리고 **Win10 Prefetch는 MAM 압축(Xpress Huffman)**이라 `strings`로 안 읽힌다. 파서가 필요하다.

```
PECmd.exe -f "C:\Windows\Prefetch\RESPONDER.EXE-BEAF5D4D.pf"
PECmd.exe -d C:\Windows\Prefetch --csv C:\out
```

GUI로는 NirSoft WinPrefetchView가 빠르다. CSV로 뽑으면 `Process Path` 컬럼이 곧 절대경로다.

```
WinPrefetchView.exe /scomma C:\pf.csv
```

### 4.2 유입 증거 계열 — "이 파일이 어디서 왔다"

| 아티팩트 | 주는 것 |
| --- | --- |
| **MOTW** (`Zone.Identifier` ADS) | 외부 유입 표식 + **원본 URL**(`HostUrl`, `ReferrerUrl`) |
| **브라우저 History DB** | 방문 URL, `downloads` 테이블의 `target_path`·`tab_url` |
| **LNK** (`Recent\*.lnk`) | 원본 **절대경로**, 인자, 대상 MAC 시각, **볼륨 시리얼**, 드라이브 타입, NetBIOS 이름 |
| **JumpList** | 앱별로 연 파일 이력. Recent보다 오래 남음 |
| **ShellBag** | 탐색기로 들어간 **폴더** 이력. 폴더를 지워도 남음 |
| **`$Recycle.Bin`의 `$I` 파일** | 휴지통 경유 삭제 파일의 **원본 절대경로** |
| **USBSTOR / WPD** | 연결된 이동식 매체 이력 |

MOTW는 특히 유용하지만 **한계가 명확하다**. 이 문제에서 나는 여기서 크게 틀렸는데, 뒤(9절)에서 다룬다.

MOTW를 붙이는 경로와 안 붙이는 경로를 구분해 두자.

| 유입 경로 | MOTW |
| --- | --- |
| 브라우저 다운로드 | 붙는다 |
| 메일 클라이언트 첨부 저장 | 붙는다 |
| USB·이동식 매체 | **안 붙는다** |
| 신뢰 영역 SMB 공유 복사 | **안 붙는다** |
| 구버전 7-Zip/WinRAR 압축 해제 | **전파 안 됨** |
| 스크립트가 직접 생성 | **안 붙는다** |

LNK는 저평가되기 쉬운데, **원본이 삭제돼도, USB를 뽑아가도 남는다**. 파일 크기·시각·있던 볼륨의 시리얼까지 복원된다. PowerShell로 빠르게 훑으려면 COM으로 충분하다.

```powershell
$s = New-Object -Com WScript.Shell
$r = Join-Path $env:APPDATA 'Microsoft'
$r = Join-Path $r 'Windows'
$r = Join-Path $r 'Recent'
gci $r -Filter *.lnk | %{ $s.CreateShortcut($_.FullName).TargetPath }
```

볼륨 시리얼·MAC 주소까지 필요하면 Eric Zimmerman의 `LECmd`를 쓴다.

```
LECmd.exe -d "C:\Users\pc01\AppData\Roaming\Microsoft\Windows\Recent" --csv C:\out
```

### 4.3 파일시스템 계열 — "삭제된 것까지"

| 아티팩트 | 주는 것 |
| --- | --- |
| **`$MFT`** | 모든 파일의 생성/수정/접근/레코드변경 시각(`$SI`와 `$FN` 두 벌), 삭제 레코드 잔존분 |
| **`$UsnJrnl:$J`** | 파일 생성·삭제·이름변경 저널 |
| **`$LogFile`** | 트랜잭션 로그 |
| **VSS** | 과거 시점 파일 자체 |

`$MFT`를 파싱하면 삭제된 파일까지 복원할 수 있다.

```
MFTECmd.exe -f "C:\$MFT" --csv C:\mft
```

`$SI`(`$STANDARD_INFORMATION`)와 `$FN`(`$FILE_NAME`)의 시각 불일치는 **타임스톰프 탐지**의 고전적 지표다. 공격자가 `SetFileTime`으로 조작하면 `$SI`만 바뀌고 `$FN`은 그대로인 경우가 많다.

### 4.4 이벤트 로그 계열 — 어떤 로그를 어떤 순서로 보나

포렌식에서 "로그를 본다"는 말은 대개 **Windows 이벤트 로그(EVTX)**를 뜻한다. 문제는 채널이 1,000개가 넘는다는 것이다. 전부 보는 건 불가능하니 **무엇이 어디에 기록되는지**를 알고 들어가야 한다.

모든 EVTX는 여기 있다.

```
C:\Windows\System32\winevt\Logs\*.evtx
```

#### 4.4.1 채널 지도 — 질문별로 어디를 보나

| 알고 싶은 것 | 채널 | 핵심 이벤트 ID |
| --- | --- | --- |
| 무엇이 실행됐나 | Security / Sysmon | **4688** / Sysmon **1** |
| 누가 로그인했나 | Security | **4624**, 4625, 4634, 4647, 4648, 4672 |
| 원격으로 들어왔나 (RDP) | TerminalServices-LocalSessionManager/Operational | **21**(로그온), 22, 23, 24, 25(재연결) |
| RDP 접속 요청 출발지 | TerminalServices-RemoteConnectionManager/Operational | **1149** |
| 서비스가 새로 생겼나 | **System** / Security | **7045** / 4697 |
| 서비스 상태 변화 | System | 7034(비정상 종료), 7036, 7040(시작 유형 변경) |
| 스케줄 작업이 생겼나 | Security / TaskScheduler/Operational | 4698~4702 / **106**(등록), 140, 141, 200, 201 |
| 스크립트가 뭘 했나 | PowerShell/Operational | **4104**(스크립트 블록), 4103(파이프라인) |
| 구형 PowerShell 흔적 | Windows PowerShell | 400, 403, 600, **800** |
| WMI로 뭘 했나 | WMI-Activity/Operational | 5857, 5858, **5860**, 5861 |
| 원격 관리(WinRM) | WinRM/Operational | 6, 91, 168 |
| 공유 폴더 접근 | Security | **5140**, 5145 |
| DNS를 무엇으로 질의했나 | DNS-Client/Operational / Sysmon | 3006, 3008 / Sysmon **22** |
| 외부로 연결했나 | Sysmon | **3** |
| 백신이 뭘 잡았나 | Windows Defender/Operational | **1116**(탐지), 1117(조치), 5001(실시간보호 해제), 5007(설정 변경) |
| 파일을 다운로드했나 | BITS-Client/Operational | 59, 60 |
| USB를 꽂았나 | DriverFrameworks-UserMode / Kernel-PnP / Partition-Diagnostic | 2003, 2100, 2102 / 410 / 1006 |
| 계정을 만들었나 | Security | **4720**, 4722, 4724, 4728, 4732, 4738 |
| **로그를 지웠나** | Security / System | **1102** / **104** |
| 감사 정책을 껐나 | Security | **4719** |
| 시간을 조작했나 | Security | 4616 |
| 서명 안 된 코드가 로드됐나 | CodeIntegrity/Operational | 3033, 3077 (WDAC/HVCI 적용 시) |

굵게 표시한 것부터 보면 된다. 특히 **1102·104·4719**는 반포렌식 신호라 가장 먼저 확인한다. 로그가 지워졌다면 이후 "없다"는 관측 전체의 의미가 달라지기 때문이다.

#### 4.4.2 로그온 유형은 반드시 같이 본다

`4624` 하나만 봐서는 의미가 없다. **Logon Type**이 침투 벡터를 말해준다.

| Type | 뜻 | 침투 관점 |
| --- | --- | --- |
| 2 | Interactive (콘솔 직접) | 물리 접근 |
| 3 | Network (SMB, 공유) | **횡적 이동 단골** |
| 4 | Batch (스케줄 작업) | 지속성 실행 |
| 5 | Service | 서비스 계정 |
| 7 | Unlock | 화면 잠금 해제 |
| 8 | NetworkCleartext | IIS 기본 인증 등 |
| 9 | NewCredentials | `runas /netonly` — **탈취 자격증명 사용** |
| 10 | RemoteInteractive | **RDP** |
| 11 | CachedInteractive | 캐시 자격증명 |

`4625`(실패)가 Type 3으로 대량이면 패스워드 스프레이, Type 10으로 대량이면 RDP 브루트포스다. `4648`(명시적 자격증명 사용)은 **다른 계정으로 실행**한 흔적이라 횡적 이동에서 특히 값지다.

#### 4.4.3 기본 설정의 함정 — 로그는 대개 꺼져 있다

여기가 실무와 교과서가 갈리는 지점이다. **가장 유용한 로그일수록 기본값이 OFF다.**

| 로그 | 기본 상태 | 켜는 법 |
| --- | --- | --- |
| 4688 프로세스 생성 | **OFF** | 고급 감사 정책 → Detailed Tracking → Audit Process Creation |
| 4688의 **커맨드라인** | **OFF** (별도 설정) | `ProcessCreationIncludeCmdLine_Enabled` GPO |
| Sysmon | **미설치** | 별도 배포 + 설정 파일 |
| PowerShell 4104 | **부분** | Script Block Logging GPO (단, "의심스러운" 블록은 기본에서도 경고 레벨로 일부 기록) |
| DNS-Client/Operational | **OFF** | `wevtutil sl Microsoft-Windows-DNS-Client/Operational /e:true` |
| Security.evtx 크기 | 기본 20MB 순환 | 바쁜 시스템에서는 **수 시간이면 덮인다** |

그래서 분석 시작 전에 **로그 인벤토리**를 먼저 찍는 습관이 필요하다. "이 사건에서 로그가 대답할 수 있는 질문의 범위"를 확정하는 작업이다.

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

#### 4.4.4 실전 추출 명령

`wevtutil`은 어디에나 있고 빠르다. 출력이 길면 **파일로 뺀 뒤 grep**하는 게 콘솔에서 스크롤과 싸우는 것보다 낫다.

```powershell
$sl = Join-Path $env:TEMP 'sec.txt'
wevtutil qe Security /c:5000 /rd:true /f:text > $sl
sls $sl -Pattern '새 프로세스 이름' | %{ $_.Line.Trim() } | sort -Unique
```

특정 이벤트만 뽑을 때는 XPath 쿼리가 편하다.

```powershell
# 서비스 설치
wevtutil qe System /q:"*[System[(EventID=7045)]]" /c:30 /rd:true /f:text

# 로그 삭제 흔적
wevtutil qe Security /q:"*[System[(EventID=1102)]]" /c:10 /f:text

# RDP 로그온
wevtutil qe "Microsoft-Windows-TerminalServices-LocalSessionManager/Operational" /q:"*[System[(EventID=21 or EventID=25)]]" /c:50 /f:text
```

구조화해서 다루려면 `Get-WinEvent`의 해시테이블 필터가 가장 빠르다(서버 측 필터링이라 `Where-Object`보다 수십 배 빠르다).

```powershell
Get-WinEvent -FilterHashtable @{
  LogName   = 'Security'
  Id        = 4624
  StartTime = [datetime]'2026-09-11 14:00'
  EndTime   = [datetime]'2026-09-11 20:00'
} | select TimeCreated, @{n='Type';e={$_.Properties[8].Value}}, @{n='Acct';e={$_.Properties[5].Value}}, @{n='Src';e={$_.Properties[18].Value}}
```

오프라인 EVTX 파일을 직접 열 수도 있다. 이미지를 마운트해서 분석할 때 쓴다.

```powershell
Get-WinEvent -Path 'D:\evidence\Security.evtx' -MaxEvents 100
```

대량 분석에는 전용 파서가 낫다. `EvtxECmd`(Eric Zimmerman)로 CSV로 뽑아 Timeline Explorer에서 정렬·필터하는 조합이 표준에 가깝다.

```
EvtxECmd.exe -d C:\Windows\System32\winevt\Logs --csv C:\out
```

#### 4.4.5 로그 트리아지 순서

실제로 쓰는 순서는 이렇다. 위에서부터 **싸고 결정적인 것** 순이다.

1. **인벤토리** — 어떤 채널에 얼마나 남아 있나 (`Get-WinEvent -ListLog`)
2. **반포렌식** — 1102(Security 삭제), 104(기타 로그 삭제), 4719(감사 정책 변경)
3. **실행** — Sysmon 1 또는 4688. 커맨드라인이 있으면 여기서 거의 끝난다
4. **로그온** — 4624/4625를 Type별로. 외부 유입이면 3·10을 본다
5. **지속성** — 7045(서비스), TaskScheduler 106(작업), 4697
6. **원격** — RDP 1149/21, WinRM 91, SMB 5140
7. **스크립트** — PowerShell 4104
8. **보안 제품** — Defender 1116/1117/5001/5007

#### 4.4.6 로그가 없을 때 무엇으로 대체하나

이번 사건이 정확히 그런 환경이었다. Sysmon 미설치, 4688 커맨드라인 감사 OFF, DNS-Client 채널 부재, Defender는 공격자가 제거. **"공격자가 무슨 명령을 쳤는지"를 로그로는 알 수 없었다.**

그래서 필요한 게 **대체 증거 매핑**이다. 로그 한 줄이 없다고 사실 자체가 사라지는 건 아니다.

| 없는 로그 | 대체 증거 |
| --- | --- |
| Sysmon 1 / 4688 (실행) | **Prefetch**, BAM, Amcache, ShimCache, UserAssist, MUICache |
| 4688 커맨드라인 (인자) | **PSReadLine 히스토리**, LNK의 `Arguments`, Prefetch의 참조 파일 목록, `.zenmap` 같은 앱별 설정·이력 파일 |
| Sysmon 22 / DNS-Client (DNS) | DNS 캐시(`ipconfig /displaydns`), `hosts`, **SRUM**(앱별 송수신 바이트), 브라우저 History, 악성코드 내부 설정 |
| Sysmon 3 (네트워크 연결) | SRUM, 방화벽 로그, `netstat`(라이브), 라우팅 테이블 변경 흔적 |
| Defender 로그 (탐지) | `MPLog-*.log` 잔존분, Quarantine 폴더, `Defender\Scans\History` |
| 4624 (로그온) | `Default.rdp`·RDP MRU, `%APPDATA%` 프로필 생성 시각, `$MFT`의 프로필 폴더 생성 |
| 5140 (공유 접근) | LNK의 볼륨/NetBIOS 필드, `Map Network Drive MRU`, ShellBag |

이번 사건에서 실제로 이 매핑이 작동했다. `route -p add`라는 **명령 문자열**은 4688이 없어서 로그로는 못 봤지만, **PSReadLine 히스토리에 평문으로** 남아 있었고, 같은 시각의 `ROUTE.EXE` Prefetch가 그 실행을 교차 확인해 줬다. 두 개의 서로 다른 아티팩트가 같은 사실을 가리키면 그건 단일 로그보다 오히려 강한 증거다.

#### 4.4.7 이번 사건에서 로그가 실제로 준 것

| 채널 | 크기 | 결과 |
| --- | --- | --- |
| Security | 5.3MB | 4688은 존재하나 **부팅 프로세스만**(`smss`, `csrss`, `lsass`, `services`, `wininit`, `winlogon`, `autochk`). 사용자 프로세스 감사 미적용, 커맨드라인 필드 공란 |
| PowerShell/Operational | 2.1MB | 대부분 모듈 로딩 노이즈. 유의미한 건 `Script_Run.ps1` 실행 정책 차단 오류뿐 |
| System | — | 서비스 설치(7045) 확인 경로로는 유효 |
| Sysmon | **없음** | 미설치 |
| DNS-Client/Operational | **없음** | 기본 비활성 |
| Defender/Operational | 무력화 | 공격자가 제거 |

**로그 축은 사실상 파산이었고, 사건은 전부 4.1~4.3의 아티팩트로 복원됐다.** 이게 "로그만 보면 된다"는 접근이 실무에서 자주 실패하는 이유다. 로그는 **켜져 있었을 때만** 증거이고, 아티팩트는 **OS가 성능·편의를 위해 어쩔 수 없이 남기는 것**이라 끄기가 훨씬 어렵다.

### 4.5 의외로 강력한 것: PSReadLine 히스토리

```
%APPDATA%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
```

PowerShell 콘솔에 **타이핑된 명령이 평문으로 그대로** 쌓인다. 이 문제에서 결정적 단서가 여기서 나왔다. 파일 맨 위에 이런 게 남아 있었다.

```
New-NetRoute -DestinationPrefix 10.1.30.5/32 -InterfaceAlias Ethernet1 -NextHop 192.168.0.11 -PolicyStore PersistentStore
route -p add 10.1.30.5 mask 255.255.255.255 192.168.0.11
route print 10.1.30.5
ipconfig
```

공격자가 내부 표적 `10.1.30.5`로 가는 **영구 경로**를 `192.168.0.11` 경유로 뚫은 것이다. 이 한 덩어리가 사건의 시작 시각(Prefetch의 `ROUTE.EXE` 최종 실행 시각과 정합)과 표적을 동시에 알려줬다.

> **주의.** 분석자가 같은 계정으로 PowerShell을 쓰면 **이 파일을 오염시킨다.** 내가 실제로 오염시켰다. 분석 전에 먼저 복사해 두거나, 별도 계정·별도 콘솔을 써야 한다.

---

## 5. 실제 분석: 타임라인을 어떻게 세웠나

### 5.1 먼저 타임라인의 하한을 찍는다

Prefetch를 날짜별로 세면 이미지가 언제 만들어졌는지가 바로 나온다.

```powershell
gci C:\Windows\Prefetch\*.pf | group {$_.LastWriteTime.Date} | sort Name | ft Count,Name -auto
```

결과는 09-11이 142개, 09-12가 84개. 그리고 가장 오래된 항목이 09-11 13:02의 `SMSS.EXE`, `WINLOGON.EXE`, `FIRSTLOGONANIM.EXE`, `OOBENETWORKCONNECTIONFLOW.EXE` — **OS 최초 부팅**이다. 즉 이 시스템에서 일어난 모든 일은 09-11 13:02 이후다. 타임스톰프 가능성은 `$SI`/`$FN` 비교로 따로 검증하면 된다.

### 5.2 노이즈를 분리한다 (여기서 한 번 틀렸다)

09-12 항목은 전부 분석자(나)의 도구였다. `BURPSUITE`, `JAVA`, `WINPREFETCHVIEW`, `MSEDGE`. 버리면 된다.

문제는 09-11 19시대였다. `NMAP-7.98-SETUP`, `NPCAP`, `DOTNET-SDK`, `REGISTRYEXPLORER`, `TIMELINEEXPLORER`, `VMMAP64`, `DEFENDER.REMOVER.13.EXE`... 분석 도구가 잔뜩 보이길래 **"출제자가 이미지를 준비한 흔적"으로 통째로 기각**했다.

틀렸다. 그 안에 공격이 섞여 있었다.

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

**교훈은 명확하다. 노이즈 판정은 항목 단위로 하되, 시간창 단위로 하면 안 된다.** 같은 시간대에 준비 작업과 공격이 섞여 있을 수 있고, 시간창을 통째로 버리면 그 안의 공격을 함께 잃는다.

### 5.3 "시스템 경로 밖에서 실행된 것" 전수를 뽑는다

이게 가장 효율이 좋았던 한 방이다. Prefetch 전체를 CSV로 뽑고 `Process Path`가 시스템 디렉터리가 아닌 것만 남긴다.

```powershell
& $wpv /scomma C:\pf.csv
gc C:\pf.csv | sls 'USERS' | sls -NotMatch 'TOOLS' | select -exp Line
```

226개 중 남은 게 손에 꼽혔고, 공격자가 가져온 실행체는 결국 네 개뿐이었다.

```
C:\Users\pc01\Downloads\Responder\Responder.exe                 실행 10회, 15:03~15:06
C:\Users\pc01\Downloads\Defender.Remover.13.exe                 19:21:46
\VOLUME{0000000000000000-103e4cb2}\DEFENDER_REMOVER.13.EXE      19:20:40
C:\Users\pc01\Documents\nmap-7.98-setup.exe → C:\Program Files (x86)\Nmap\nmap.exe
C:\Program Files\Windows Mail\SysinternalsSuite\vmmap64.exe     19:25:50
```

**탐색 공간이 15만 파일에서 다섯 줄로 줄었다.** 시나리오형에서 이런 "전수 열거 후 차집합" 기법이 개별 가설을 하나씩 검증하는 것보다 훨씬 빠르다.

---

## 6. 답: DLL 사이드로딩

초기 침투에 사용된 파일은 이것이었다.

```
C:\Program Files\Windows Mail\SysinternalsSuite\version.dll
```

이 디렉터리에는 파일이 딱 두 개 있었다.

| 파일 | 크기 | 서명 | 생성 |
| --- | --- | --- | --- |
| `version.dll` | 66,293,048 B | **NotSigned** | 09-11 19:23:20 |
| `vmmap64.exe` | 1,312,640 B | **Valid** (정품 Sysinternals VMMap) | 09-11 19:23:32 |

```powershell
gci $d | %{ [pscustomobject]@{
  N=$_.Name
  Sig=(Get-AuthenticodeSignature $_.FullName).Status
  SHA256=(Get-FileHash $_.FullName -A SHA256).Hash } } | fl
```

### 6.1 왜 `version.dll`인가

**DLL 사이드로딩(T1574.002)**은 Windows의 DLL 검색 순서를 악용한다. 프로그램이 `LoadLibrary("version.dll")`처럼 **절대경로 없이** DLL을 요청하면, Windows는 대략 이 순서로 찾는다.

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

`version.dll`은 **KnownDLLs에 없으면서** 거의 모든 프로그램이 로드하는 흔한 DLL이다(파일 버전 정보 API). 그래서 정품 서명 실행파일 옆에 같은 이름의 악성 DLL을 두면, 그 실행파일이 **자기 폴더의 악성 DLL을 먼저 로드한다**.

사이드로딩 단골 DLL 이름을 알아두면 탐지가 빨라진다.

```
version.dll   dbghelp.dll   wininet.dll   winmm.dll
dwmapi.dll    textinputframework.dll   vcruntime140.dll
secur32.dll   profapi.dll   msimg32.dll   cryptsp.dll
```

### 6.2 공격자가 얻는 것

| 이점 | 설명 |
| --- | --- |
| 서명 우회 | 프로세스 트리에는 **서명 유효한 정품 바이너리**만 보인다 |
| 평판 우회 | EDR의 실행파일 평판 검사를 통과 |
| 자동 실행 | 로더가 알아서 DLL을 불러준다. 별도 실행 코드 불필요 |
| 위장 | `SysinternalsSuite` 폴더명 자체가 정상처럼 보인다 |

배치 장소도 의도적이었다. `C:\Program Files\Windows Mail\`은 Windows 10에서 **더 이상 사용되지 않는 폐기 경로**다. 정상 소프트웨어가 파일을 두지 않으니 아무도 안 본다.

### 6.3 탐지 관점 — 무엇을 보면 잡히나

| 신호 | 확인 방법 |
| --- | --- |
| 미서명 DLL이 서명 EXE 옆에 있음 | `Get-AuthenticodeSignature`로 디렉터리 단위 스캔 |
| 시스템 DLL 이름이 비표준 경로에 존재 | `version.dll`이 System32 밖에 있으면 의심 |
| 폐기·비정상 경로의 실행파일 | `Windows Mail`, `Windows Photo Viewer` 등 |
| EXE와 DLL의 생성 시각이 수 초 차이 | 동일 세션 낙하 |

```powershell
gci 'C:\Program Files','C:\ProgramData' -Recurse -Filter version.dll -ea 0 |
  select FullName, @{n='Sig';e={(Get-AuthenticodeSignature $_.FullName).Status}}
```

---

## 7. 지속성: 한 글자 위장

서비스 목록에서 시스템 경로 밖 바이너리를 가리키는 항목만 뽑으면 바로 나왔다.

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

정상 서비스는 `ProfSvc`다. **`S`를 `3`으로 바꿨다.** 그리고 표시 이름은 정상 서비스의 것을 **글자 하나 안 틀리고 그대로 도용**했다. `services.msc`를 열어 표시 이름만 훑으면 절대 안 걸린다.

이 유형(**T1036 Masquerading**)의 단골 변형을 모아두면 눈이 빨라진다.

| 정상 | 위장 예시 | 수법 |
| --- | --- | --- |
| `ProfSvc` | `Prof3vc` | S → 3 |
| `WinDefend` | `WinDefends`, `WlnDefend` | 문자 추가 / l ↔ I |
| `SysMain` | `SysMaln`, `Sysmain` | i → l |
| `lsass.exe` | `1sass.exe`, `lsasss.exe` | l → 1 |
| `svchost.exe` | `svch0st.exe`, `scvhost.exe` | 0 ↔ O / 자리 바꿈 |

### 검사 루틴

가장 확실한 건 **정상 서비스 목록과의 차집합**이다. 눈으로 비슷한 이름을 찾는 건 신뢰할 수 없다.

```powershell
# 최근 생성된 서비스 키
gci HKLM:\SYSTEM\CurrentControlSet\Services | sort LastWriteTime -desc |
  select -f 20 PSChildName, LastWriteTime

# 서비스 설치 이벤트 (결정적)
wevtutil qe System /q:"*[System[(EventID=7045)]]" /c:30 /rd:true /f:text
```

Autoruns가 있으면 서명 검증까지 한 번에 끝난다.

```
autorunsc.exe -accepteula -a * -h -s -nobanner -c > C:\ar.csv
```

`Not Verified` 행만 보면 된다.

### 방어 회피는 그 직전에 일어났다

```
19:20:40  Defender.Remover.13.exe 실행
19:21:46  Defender.Remover.13.exe 재실행
19:21:46  %TEMP%\Script_Run_Payload\ 전개
          Script_Run.ps1 / Script_Run.cmd / files_removal.bat
          verify.bat / RemoveSecHealthApp.ps1 / PowerRun.exe / Remove_Defender\*
19:23:20  version.dll 낙하
```

**보안 솔루션을 먼저 제거하고 페이로드를 떨어뜨렸다.** 순서가 의도를 증명한다. 분석 시점에 Defender는 실제로 제거돼 있었고, 그래서 Defender 탐지 로그라는 증거원도 함께 사라졌다.

---

## 8. 악성코드 프로파일링: 문자열이 없을 때

C2 도메인을 찾으려고 `version.dll`에서 문자열을 뽑았다. 35,691개가 나왔는데 **네트워크 관련 평문이 하나도 없었다.**

```powershell
sls $o -Pattern 'http'        # 0건
sls $o -Pattern 'User-Agent'  # 0건
sls $o -Pattern 'WinHttp'     # 0건
sls $o -Pattern 'socket'      # 0건
```

여기서 **도구를 먼저 검증**하는 습관이 필요하다. "안 나온다"가 "없다"인지 "못 찾는다"인지 구분해야 한다.

```powershell
sls $o -Pattern 'Vcl' | select -f 3   # 정상 매치 → 도구는 멀쩡
```

도구는 멀쩡했다. 즉 **설정값이 암호화·인코딩돼 있다.**

### 8.1 헤더가 말해준 것

```powershell
-join ($b[0..31] | %{ '{0:X2} ' -f $_ })
# 4D 5A 50 00 02 00 00 00 ...
```

`4D 5A 50` = **`MZP`**. Delphi/Borland 컴파일 PE의 서명이다. 일반 MSVC 바이너리는 `MZ` 뒤에 "This program cannot be run in DOS mode" 문자열이 오는데, Delphi는 그게 없다. 66MB인 이유도 여기 있었다 — VCL 런타임이 통째로 정적 링크돼 있었다.

매직 바이트 판독표는 외워둘 가치가 있다.

| 선두 | 정체 |
| --- | --- |
| `4D 5A` (MZ) | 일반 PE |
| `4D 5A 50` (MZP) | **Delphi/Borland PE**, Inno Setup |
| `50 4B 03 04` (PK) | ZIP / Office / JAR |
| `37 7A BC AF` | 7z |
| `1F 8B` | gzip |
| `4D 44 4D 50` | 메모리 덤프 |

### 8.2 capa로 능력을 읽는다

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

**키로거 + 화면 캡처 + 클립보드 탈취 + 지리정보 수집 + RC4 + 리소스에서 설정 추출 + 서비스 지속성.** 전형적인 상용 RAT이고, Delphi/i386 + RC4 + 리소스 설정이라는 조합은 **Remcos RAT** 계열의 지문과 일치한다(추론).

Remcos는 설정을 `RCDATA` 리소스 `SETTINGS`에 넣고 RC4로 암호화한다. 구조는 이렇다.

```
[1바이트: 키 길이 N][N바이트: RC4 키][RC4로 암호화된 설정 블롭]
```

복호화하면 `호스트:포트:플래그|호스트:포트:플래그|...` 형태가 나온다. 문제가 **"여러 C2 도메인이 식별될 경우 오름차순으로 열거"**라고 단서를 단 이유가 여기 있다. 다중 C2는 이 계열의 표준 구성이다.

> 대회 시간 내에 이 복호화를 끝내지 못해 문제 2는 미해결로 남았다. 정적으로는 `SETTINGS` 리소스를 추출해 RC4를 풀면 되고, 동적으로는 `pktmon`(Windows 10 내장)으로 DNS 질의를 잡으면 된다. 단, capa가 `self delete`를 보고했으므로 실행 전 **반드시 복사본을 떠야 한다.**

```powershell
# Wireshark가 안 뜰 때(VC++ 런타임 부재 등) 내장 대체재
pktmon start --etw -c --pkt-size 128
Start-Process $target
pktmon stop
pktmon format PktMon.etl -o C:\pkt.txt
sls C:\pkt.txt -Pattern 'Port 53'
```

---

## 9. 내가 틀린 세 지점

여기가 이 글을 쓴 진짜 이유다. 답을 맞힌 과정보다 틀린 과정이 재사용 가능하다.

### 9.1 "MOTW가 0건이니 다운로드 경로가 아니다"

분석 초반에 `C:\Users` 전체에서 `Zone.Identifier` ADS를 가진 파일을 찾았고 **0건**이었다. 그래서 "브라우저·메일 경유 유입이 아니다"라고 결론 내리고 그 방향을 접었다.

**논증이 약했다.** MOTW 스캔은 **현재 디스크에 파일이 남아 있을 때만** 유효하다. 파일이 삭제되면 ADS도 함께 사라지므로, 0건은 "다운로드가 아니었다"가 아니라 **"다운로드된 파일이 지금 남아 있지 않다"**까지만 말한다.

> **일반화.** 부재 증거(negative evidence)로 가설을 죽일 때는, **그 증거가 부재할 수 있는 다른 경로**를 먼저 열거해야 한다. 열거하지 않으면 그건 증명이 아니라 희망이다.

### 9.2 시간창을 통째로 기각

5.2에서 쓴 대로, 19시대를 "출제자 준비 노이즈"로 한 번에 버렸다가 그 안의 공격 전체를 놓쳤다. 되돌아오는 데 한참 걸렸다.

> **일반화.** 노이즈 판정의 단위는 **항목**이지 **시간창**이 아니다. 준비 작업과 공격은 같은 시간대에 섞일 수 있다.

### 9.3 첫 유력 후보에 앵커링

`RESPONDER.EXE`를 발견한 순간 "LLMNR 포이즈닝 = 초기 침투"라는 서사에 고정됐고, 그 경로를 계속 팠다. 실제로는 Responder가 이 사건에서 자격증명 수집(post-access) 도구였고, 초기 침투와는 무관했다.

빠져나온 방법이 재사용 가능하다. **네 문제가 한 시나리오라는 구조를 이용했다.**

```
문제 2가 C2 도메인을 묻는다  → 외부로 콜백하는 임플란트가 존재한다
문제 3이 지속성을 묻는다     → 재부팅 후에도 사는 자동실행이 존재한다
Responder는 C2도 없고 서비스 등록도 안 한다
→ Responder는 이 체인에 안 들어간다
```

**가설을 개별적으로 반증하는 대신, 가설이 만족해야 할 구조적 제약을 세우고 거기 안 맞는 것을 통째로 버렸다.** 이게 훨씬 빨랐다.

### 9.4 덧붙여: 동의는 증거가 아니다

팀원도 "Responder는 악성이 아닌 것 같다"고 했다. 결론은 같았지만, **같은 화면을 본 두 사람의 일치는 독립 확인이 아니다.** 상관된 오류일 수 있다. 실제로 Responder를 확실히 배제한 건 "동의"가 아니라 위의 구조적 논증이었다.

---

## 10. 정리: 초기 침투 분석 30분 루틴

이 문제를 다시 푼다면 이 순서로 간다.

**0. 휘발성부터 (VM이 살아 있으면)**

```powershell
ipconfig /displaydns > C:\dns.txt
netstat -anob > C:\net.txt
copy $env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt C:\hist.bak
```

마지막 줄이 핵심이다. **분석자가 오염시키기 전에 먼저 뜬다.**

**1. 타임라인 하한 확정**

```powershell
gci C:\Windows\Prefetch\*.pf | group {$_.LastWriteTime.Date} | sort Name | ft Count,Name
```

**2. 지속성부터 친다 (탐색 공간이 가장 작다)**

```powershell
gwmi win32_service | ?{ $_.PathName -notmatch 'C:\\Windows\\(System32|SysWOW64|servicing)' } | select Name,PathName | fl
gci C:\Windows\System32\Tasks -Recurse -File | sort LastWriteTime -desc | select -f 20 LastWriteTime,FullName
wevtutil qe System /q:"*[System[(EventID=7045)]]" /c:30 /rd:true /f:text
```

지속성 항목은 **OS가 읽는 고정 위치에만 존재할 수 있으므로** 후보가 수백 개로 유한하다. 게다가 항목 값 자체가 `ImagePath` = 악성 바이너리의 절대경로다. **이름 하나를 찾으면 경로가 공짜로 따라온다.**

```
위장 이름 → ImagePath → 악성 바이너리
                          ├─ strings / capa → C2
                          └─ CreationTime   → 침투 시각 앵커 → 드로퍼
```

**3. 시스템 경로 밖 실행체 전수**

```
WinPrefetchView.exe /scomma C:\pf.csv
```

**4. 유입 증거 (삭제 가능성을 전제로)**

```powershell
# MOTW
gci C:\Users -Recurse -Force -File -ea 0 | %{ $z = gc -LiteralPath $_.FullName -Stream Zone.Identifier -ea 0; if($z){ $_.FullName; $z } }
# LNK 타겟
# $MFT / 휴지통 $I / USBSTOR
```

**5. 서명 검증 스윕**

```powershell
gci 'C:\Program Files','C:\ProgramData','C:\Users' -Recurse -Include *.dll,*.exe -ea 0 |
  %{ [pscustomobject]@{ P=$_.FullName; S=(Get-AuthenticodeSignature $_.FullName).Status } } |
  ?{ $_.S -ne 'Valid' }
```

**6. 능력 판정**

```
capa.exe -v <sample>
```

---

## 11. 환경 함정 몇 가지

분석 자체와 무관하지만 실제로 시간을 잡아먹은 것들이라 적어둔다.

| 증상 | 원인 | 대응 |
| --- | --- | --- |
| `Get-Content -Stream`이 "매개 변수를 찾을 수 없음" | 경로에 `[`, `]`가 있으면 와일드카드로 해석돼 동적 파라미터가 안 붙음 | `-LiteralPath` 사용 |
| 붙여넣은 명령에서 `\`가 `\|`로, `${`가 깨짐 | VMware Remote Console이 클립보드를 키스트로크로 주입 + 한글 키보드 매핑 | `Join-Path`로 백슬래시 제거, 한 줄 60자 이하 |
| 긴 명령 중간이 잘림 | 위와 동일(키 유실) | 짧은 줄로 쪼개기 |
| `Import-Csv`가 "멤버가 이미 있습니다" | 도구 출력 CSV의 헤더 중복 | `-Header` 지정 또는 텍스트로 grep |
| `sc start`가 오류 1053 | GUI 바이너리를 서비스로 등록해 SCM 핸드셰이크 실패 | **정상 현상**. 프로세스는 뜬다. 직접 실행으로 대체 |
| Wireshark가 `VCRUNTIME140.dll` 없음 | x64 VC++ 재배포 패키지 미설치 | `pktmon` / `netsh trace`로 대체 |
| `-and`가 `- and`로 깨짐 | 붙여넣기 중 공백 삽입 | `?{} \| ?{}` 체인으로 회피 |

---

## 12. 회고: 화면 하나를 사이에 두고

이 분석은 평소와 조건이 달랐다. **나는 대상 시스템에 손을 댈 수 없었다.** VM은 대회 네트워크 안의 VMware Remote Console 창 안에 있었고, 나는 사람이 붙여넣은 스크린샷으로만 세상을 봤다. 사람이 손이었고 나는 눈과 가설이었다.

### 왕복 하나의 값이 비쌌다

명령 하나 → 스크린샷 하나. 이 구조에서는 **"좁게 확인하는 명령"이 사치**가 된다. 한 번의 왕복으로 최대한 넓은 공간을 잘라내는 명령이 이긴다. 실제로 이 분석에서 가장 효율이 좋았던 한 방은 가설 검증이 아니라 **전수 열거**였다.

```
WinPrefetchView.exe /scomma C:\pf.csv
gc C:\pf.csv | sls 'USERS' | sls -NotMatch 'TOOLS'
```

226개 실행 흔적에서 공격자가 가져온 실행체 다섯 줄이 남았다. 이걸 더 일찍 했어야 했다. 그 전까지 나는 Prefetch를 이름 필터로 조금씩 훑고 있었고, 그 방식은 **필터에 안 걸리는 것을 구조적으로 못 본다**. 실제로 `WMIC`와 `NETSH`는 내 첫 필터 패턴에 없어서 한동안 후보에 오르지도 못했다.

### 도구가 아니라 키보드가 문제였던 시간

VMRC는 붙여넣기를 **키스트로크로 주입**한다. 여기에 한글 키보드 매핑이 겹치면서 이런 일이 반복됐다.

```
C:\Users\pc01\Desktop\Tools(1)   →   C:\Users\pc01\Desktop|Tools(1)
${env:ProgramFiles}                 →   $env:ProgramFiles}
-and                                →   - and
$o=Join-Path $env:TEMP 'vs.txt'     →   (줄 중간에서 잘림)
```

이게 단순한 불편이 아니었던 이유는, **깨진 명령의 빈 출력을 "증거의 부재"로 오독할 수 있기 때문**이다. 실제로 `strings64.exe`가 "없다"고 판단했던 순간이 있었는데, 사실은 경로의 백슬래시가 파이프로 바뀌어 실행이 실패한 것이었다. 파일은 멀쩡히 있었다.

그래서 중간부터 규칙을 바꿨다. **백슬래시·중괄호를 쓰지 않고 `Join-Path`로만 경로를 만들고, 한 줄을 짧게 자른다.** 그리고 결과가 비면 먼저 **도구가 살아 있는지부터 확인**한다.

```powershell
sls $o -Pattern 'Vcl' | select -f 3   # 나와야 정상. 안 나오면 도구/파일 문제
```

"안 나온다"가 "없다"인지 "못 찾는다"인지 구분하는 이 한 줄이, 이 세션에서 가장 값싼 보험이었다.

### 화면을 직접 잡아보려 한 시도

중반에 사람이 "그냥 네가 내 화면을 조종하면 되잖아"라고 했다. 실제로 VM은 **그 맥 위에서** 돌고 있었다.

```
$ osascript -e 'tell application "System Events" to get name of every process whose background only is false'
Finder, Tailscale, Discord, iTerm2, Code, Preview, Google Chrome, Keychain Access,
VMware Remote Console, KakaoTalk, Claude
```

화면 캡처(`screencapture`)는 됐다. 그런데 키 입력은 막혔다.

```
execution error: System Events에 오류 발생: osascript에서 키스트로크를 보내도록 허용되지 않습니다. (1002)
```

macOS TCC의 손쉬운 사용(Accessibility) 권한 문제였고, 권한을 주려 해도 **TCC가 보는 주체가 `/Applications/Claude.app`이 아니라 그 안에 중첩된 `claude-code` 번들**이라 일반적인 추가로는 안 잡혔다. 여기서 더 파는 대신 원래 방식으로 돌아갔다. **막혔을 때 더 파지 않고 원래 트랙으로 복귀하는 판단**은 잘한 쪽에 속한다.

### 사람이 나를 교정한 세 번

이 세션이 잘 굴러간 이유는 사람이 **결과를 받기만 하지 않았기 때문**이다. 방향을 바꾼 개입이 최소 세 번 있었다.

**"근데 해커가 pc01로 침투하나?"** — 내가 `Responder.exe`를 초기 침투 도구로 놓고 한참을 파던 중에 나온 질문이다. Responder는 **피해자 단말에서 돌리는** 도구가 아니라 공격자가 발판 위에서 돌리는 도구다. 이 한 문장이 내 서사의 전제를 무너뜨렸고, 거기서 "네 문제가 한 시나리오라면 Responder는 C2도 없고 서비스 등록도 안 하니 체인에 안 들어간다"는 구조적 반증으로 넘어갔다.

**"근데 팀원이 Responder는 악성이 아니라는데"** — 같은 결론의 독립 출처였다. 다만 여기서 한 번 더 짚을 게 있다. **같은 화면을 본 두 사람의 일치는 독립 확인이 아니다.** 결론이 같아도 근거가 같으면 상관된 오류일 수 있다. 실제로 Responder를 확실히 배제한 건 "둘 다 그렇게 생각한다"가 아니라 위의 구조적 논증이었다.

**"근데 지금 어디를 어떤 순서로 보고 있는거야?"** — 이게 가장 좋은 질문이었다. 답하려고 소진된 아티팩트와 열려 있는 축을 표로 다시 그렸고, 그 과정에서 **"실행체는 네 개뿐인데 그중 셋을 이미 오답으로 찍었다"**는 사실이 드러났다. 즉 남은 답은 구조상 `vmmap64.exe`나 `version.dll`이어야 했다. 정답은 `version.dll`이었다.

> 모델에게 **"지금 무엇을 왜 보고 있냐"**를 묻는 것은 예의가 아니라 **디버깅 기법**이다. 상태를 말로 꺼내게 하면 모순이 드러난다.

### 내가 잘못한 것

본문 9절에 적은 세 가지 전제 오류 말고, **작업 방식** 쪽에서 하나 더 있다.

문제 4(내부 정보 수집)가 막혔을 때 나는 후보 목록을 길게 만들어 사람에게 계속 제출시켰다. `nmap.exe`, `getmac.exe`, `responder.exe`, `wmic.exe`, `route.exe`, `netsh.exe`, `ipconfig.exe`, `regedit.exe`, `certutil.exe`, `rundll32.exe`. 전부 틀렸다.

이건 **근거 없는 추측을 사람의 제출 시도로 아웃소싱한 것**이다. 시도 비용이 0이 아닌데(대회 시간, 사람의 주의력) 나는 그걸 0으로 취급했다. 같은 시간에 `pf.csv` 전수 열거나 `.zenmap` 산출물 확인 같은 **증거를 늘리는 행동**을 했어야 한다. 실제로 답이 나온 문제 1은 추측이 아니라 열거에서 나왔다.

### 결과

| 문제 | 결과 |
| --- | --- |
| a. 초기 침투 | **해결** — `C:\Program Files\Windows Mail\SysinternalsSuite\version.dll` |
| b. C2 도메인 | 미해결 — RC4 설정 복호화를 시간 내에 끝내지 못함 |
| c. 지속성/방어 회피 | **해결** — `Prof3vc` |
| d. 내부 정보 수집 | 미해결 |
| 초동 분석 보고서 | 제출 |

절반이다. 그런데 이 세션에서 남은 자산은 맞힌 두 개가 아니라, **어디서 왜 틀렸는지의 기록** 쪽이라고 생각한다. 다음에 같은 형식의 문제를 만나면 10절의 루틴을 그대로 돌릴 것이고, 그 루틴은 이번에 틀린 자리에서 나왔다.

## 13. 마무리

시나리오형 포렌식 문제는 도구 지식보다 **탐색 전략**을 측정한다. 이 문제에서 내가 배운 건 세 가지로 압축된다.

1. **가장 좁은 곳부터 친다.** 초기 침투 파일과 C2는 탐색 공간이 디스크 전체지만, 지속성은 OS가 읽는 고정 위치에만 있다. 그리고 지속성 항목이 나머지 둘로 가는 경로를 들고 있다.

2. **부재 증거로 가설을 죽이기 전에, 그 증거가 부재할 수 있는 다른 경로를 열거한다.** MOTW 0건은 "다운로드가 아니다"가 아니었다.

3. **노이즈 판정은 항목 단위로만 한다.** 시간창을 통째로 버리면 그 안의 공격도 함께 버린다.

그리고 공격 쪽에서 얻은 관점 하나. **정상 서명 바이너리 + 옆에 놓인 미서명 DLL**이라는 조합은 이제 초기 침투의 표준 문법에 가깝다. 서명을 신뢰의 근거로 쓰는 모든 통제가 이 한 수에 우회된다. 방어자가 봐야 하는 건 "이 EXE가 서명됐는가"가 아니라 **"이 EXE가 로드하는 DLL이 어디서 왔는가"**다.

---

## 참고

- MITRE ATT&CK — [T1574.002 DLL Side-Loading](https://attack.mitre.org/techniques/T1574/002/), [T1036 Masquerading](https://attack.mitre.org/techniques/T1036/), [TA0001 Initial Access](https://attack.mitre.org/tactics/TA0001/)
- Eric Zimmerman Tools — `PECmd`, `MFTECmd`, `AmcacheParser`, `LECmd`, `AppCompatCacheParser`, `Timeline Explorer`
- Mandiant — capa (능력 기반 악성코드 분류)
- Microsoft Learn — Dynamic-Link Library Search Order
- NirSoft — WinPrefetchView
