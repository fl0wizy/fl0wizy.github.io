---
id: "hacksium-2026-pki-tls-vmrc"
title: "[HACKSIUM 2026] Why the Console Would Not Open: CA Certificates, the TLS Handshake, and VMRC"
description: "Opening a single VM console failed three times: the URL scheme handler, the trust store, and the direct-to-ESXi path. Which layer each failure lived in and why, plus what to check and where to register a certificate the moment you receive one, from real observed values."
date: "2026-09-12 20:00"
category: "security"
tags: ["HACKSIUM", "PKI", "X.509", "TLS", "VMRC", "vSphere", "vCenter", "VMCA", "Keychain", "Live Fire"]
published: true
---

# [HACKSIUM 2026] 콘솔이 열리지 않은 이유: CA 인증서, TLS 핸드셰이크, VMRC 해부

2026 HACKSIUM BUSAN 본선은 문제를 푸는 CTF가 아니라 할당된 자산을 지키는 Live Fire 방어전이었다. 그런데 정작 첫 한 시간은 방어가 아니라 **훈련 VM의 콘솔을 여는 일**에 전부 들어갔다. 플랫폼의 원격접속 버튼을 눌러도 아무 일이 없었고, 운영진이 인증서를 배포했고, 그걸 깔아도 안 됐고, 다시 배포된 인증서는 알고 보니 같은 것이었고, VMRC는 `could not negotiate SSL`을 뱉었고, 결국 vCenter 웹 콘솔로 우회해서야 자산에 붙을 수 있었다.

세 번 막혔는데 셋 다 "SSL 문제"처럼 보였다. 그러나 원인은 전부 달랐고, 각각 **네트워크 스택의 다른 층**에서 일어난 일이었다. 이 글은 그 세 층 - OS의 URL 스킴 핸들러, 인증서 신뢰 저장소, TLS 핸드셰이크와 그 아래 TCP 도달성 - 을 실제로 관측한 값으로 뜯어본 기록이다. 마지막에는 다음에 인증서 파일을 받았을 때 손이 저절로 움직이도록 절차를 정리했다.

관측 환경은 macOS 26.6.2, VMware Remote Console 13.1.1(App Store), 대회 플랫폼, vCenter `203.0.113.10`이었다. 본문의 인증서 필드, 명령 출력, 에러 문구는 당시 값을 그대로 옮겼고, 관측이 아닌 추론은 그렇다고 표시했다. 대회 규정(시스템·네트워크 구성 비공개)에 따라 IP 주소는 RFC 5737 문서용 예시 주소로 치환했고 플랫폼 이름은 뺐다. 인증서의 나머지 필드와 에러 문구는 원문 그대로다.

---

## 1. 어디서 막혔나

먼저 결론 표부터. 세 증상은 같은 "접속 실패"지만 층이 다르고, 그래서 처방도 다르다.

| 증상 | 층 | 진짜 원인 | 인증서를 깔면 고쳐지나 |
| --- | --- | --- | --- |
| 원격접속 버튼을 눌러도 아무 반응 없음 | OS 스킴 핸들러 | `vmrc://` URL을 처리할 앱이 등록돼 있지 않았다 | 아니다. TLS 이전 문제 |
| 브라우저 인증서 경고 | 신뢰 저장소 | vCenter가 자체 서명 CA(VMCA)를 쓰는데 그 루트가 키체인에 없었다 | 그렇다 |
| `Connection error: could not negotiate SSL` | TCP 도달성 | VMRC가 ESXi 호스트에 443으로 직결해야 하는데 그 경로가 없었다 | 아니다 |

세 번째 줄이 이 글을 쓰게 만든 이유다. 에러 문구에 SSL이 들어 있으니 인증서를 의심하는 게 자연스러운데, 실제로는 **인증서를 보기도 전 단계**에서 끝난 실패였다. 대회 당시에는 이걸 "VMRC 13.x와 구형 ESXi의 TLS 버전 불일치"로 추론했는데, 나중에 Broadcom KB를 확인해 보니 틀린 추론이었다. 그 교정은 9절에서 다룬다.

---

## 2. X.509 인증서는 무엇을 담고 있나

인증서는 암호화를 하는 물건이 아니다. **"이 공개키는 이 이름의 것이다"라는, 누군가가 서명한 진술문**이다. 암호화에 쓸 공개키가 진짜 그 서버 것인지 보증하는 문서이고, 그 보증의 신뢰도는 서명한 사람이 누구냐에 전적으로 달려 있다.

대회에서 배포된 인증서를 그대로 뜯어보면 이렇다.

```
$ openssl x509 -in vmca-root.crt -noout -subject -issuer -dates -ext basicConstraints

subject = CN=203.0.113.10, DC=vsphere, DC=local, C=KR, ST=California, O=localhost
issuer  = CN=203.0.113.10, DC=vsphere, DC=local, C=KR, ST=California, O=localhost
notBefore = Aug 18 07:48:36 2026 GMT
notAfter  = Aug 15 07:48:36 2036 GMT
X509v3 Basic Constraints: critical
    CA:TRUE, pathlen:0
```

### 필드별로 읽기

| 필드 | 뜻 | 이 인증서에서는 |
| --- | --- | --- |
| Subject | 이 인증서가 **누구**의 것인지 | vCenter 서버 자신 |
| Issuer | **누가** 서명했는지 | 자기 자신. Subject와 글자 하나 안 틀리고 같다 |
| notBefore / notAfter | 유효 기간 | 10년. 공인 CA가 발급하는 서버 인증서(보통 90일에서 1년)보다 훨씬 길다 |
| basicConstraints | 이 인증서가 CA인가 | `CA:TRUE` - 다른 인증서를 발급할 자격이 있다 |
| pathlen | 아래에 중간 CA를 몇 단 둘 수 있나 | 0 - 이 CA는 최종 인증서만 직접 발급한다 |
| 공개키 | 실제 암호 재료 | 서명 검증과 키 교환에 쓰인다 |

### Subject == Issuer이면 자체 서명이다

이 한 줄이 핵심이다. 스스로가 발급자인 인증서가 **루트 CA**다. 위에 아무도 없으니 보증해 줄 상위가 없고, 따라서 **믿을지 말지는 순전히 받는 쪽이 결정**한다. 브라우저가 경고를 띄우는 이유가 정확히 이것이다. 인증서가 잘못됐다는 게 아니라, 이 뿌리를 믿기로 한 적이 없다는 뜻이다.

이 인증서에는 재미있는 흔적이 하나 있다. `C=KR`인데 `ST=California`, `O=localhost`다. 나라는 한국인데 주는 캘리포니아이고 조직은 localhost다. 이건 VMware의 내장 CA(VMCA)가 vCenter 설치 시점에 자동 생성하면서 남긴 기본값이다. 아무도 손대지 않았다는 흔적이고, 자체 서명 인증서에서 흔히 보는 모양이다. 공인 CA였다면 이런 값이 통과될 수 없다.

### 지문 - 인증서의 진짜 신원

같은 인증서인지 확인할 때는 이름이 아니라 **지문(fingerprint)**을 본다. DER로 인코딩된 인증서 바이트 전체의 해시다. 이름은 겹칠 수 있지만 지문은 겹치지 않는다.

```
$ openssl x509 -in vmca-root.crt -noout -fingerprint -sha256
SHA256 Fingerprint=4D:C3:C4:06:...:B5:EA:90:4A
```

대회 중 운영진이 인증서를 두 번 배포했다. 처음엔 `certs/mac/34fa2217.0`과 `dbad4059.0` 두 파일이었고, 나중에 `vmca-root.crt` 하나가 다시 왔다. 두 번째 파일은 인증서 두 장이 이어 붙은 묶음이었는데, 각각의 SHA-256 지문이 이미 설치한 두 장과 완전히 같았다. **이름만 다른 동일 인증서**였고, 그래서 재설치가 필요 없었다. 지문을 안 봤으면 확인할 방법이 없었을 것이다.

### `.0`과 `.r1` - 파일명이 말해 주는 것

배포된 폴더에는 이런 파일들이 있었다.

```
certs/mac/34fa2217.0     PEM certificate
certs/mac/34fa2217.r1    ASCII text
certs/mac/dbad4059.0     PEM certificate
certs/mac/dbad4059.r1    ASCII text
```

이 명명은 OpenSSL의 해시 디렉토리 규칙(`c_rehash`)이다. 파일명 앞부분 `34fa2217`은 인증서 subject의 해시이고, 확장자 `.0`은 인증서, `.r1`은 CRL(폐기 목록)이다. 검증기가 디렉토리를 전부 뒤지지 않고 해시값만으로 곧바로 해당 파일을 찾게 하려는 구조다. 같은 해시가 겹치면 `.0`, `.1`, `.2`로 번호가 올라간다.

macOS 키체인이나 Windows 인증서 저장소는 이 확장자를 인식하지 못한다. 그래서 `.crt`로 복사해서 넣어야 했다. `win/` 폴더의 파일들이 `34fa2217.0.crt`처럼 확장자가 하나 더 붙어 있었던 건 그 때문이다.

---

## 3. 신뢰 사슬 - 어떻게 믿는가

서버가 보내온 인증서를 어떻게 믿는가. 답은 **사슬을 따라 올라가서, 이미 믿기로 한 뿌리에 닿는지 보는 것**이다.

![공인 CA 사슬과 자체 서명 루트의 비교](/images/pki-tls-vmrc/chain.svg)

공인 CA 체계에서는 루트가 OS와 브라우저에 미리 들어 있다. 서버는 자기 인증서와 중간 CA 인증서를 함께 보내고, 클라이언트는 중간 CA의 서명이 루트로 풀리는지 확인한다. 뿌리가 이미 신뢰 목록에 있으니 사슬이 저절로 닫힌다.

자체 서명 루트는 닫을 상대가 없다. 루트이자 곧 서버 인증서이고, 위에 아무도 없다. 그래서 받는 쪽이 이 인증서를 직접 뿌리로 인정해 주어야 한다. 대회에서 키체인에 수동 등록한 게 바로 이 일이었다.

### 검증기가 실제로 확인하는 다섯 가지

1. **서명** - 상위 인증서의 공개키로 하위 인증서의 서명이 풀리는가
2. **유효 기간** - 지금이 notBefore와 notAfter 사이인가
3. **이름 일치** - 접속한 호스트명이 SAN(Subject Alternative Name)에 들어 있는가
4. **용도** - `CA:TRUE`인 인증서만 다른 인증서를 서명할 수 있고, `pathlen`이 허용하는 깊이를 넘지 않는가
5. **폐기 여부** - CRL 또는 OCSP로 취소되지 않았는가

3번을 특히 주의해야 한다. 최신 클라이언트는 CN 필드를 아예 보지 않는다. 호스트명 검증은 전적으로 SAN으로 한다. IP 주소로 접속했는데 SAN에 도메인 이름만 있으면, 사슬이 아무리 완벽해도 `hostname mismatch`가 난다. 루트 등록으로는 안 고쳐지는 실패다.

### 루트를 신뢰한다는 것의 범위

루트 CA를 신뢰 목록에 넣으면 그 CA가 서명한 **모든 도메인**의 인증서를 신뢰하게 된다. `google.com`이든 은행이든 마찬가지다. 이 CA의 개인키를 가진 사람은 어떤 사이트로든 위장할 수 있고, 내 컴퓨터는 그걸 경고 없이 받아들인다. 대회용 vCenter CA가 그런 권한을 영구히 갖는 건 곤란하다. 그래서 대회가 끝나고 지웠고, 지운 결과를 확인했다.

---

## 4. 저장과 신뢰는 다르다

여기서 가장 많이 헤맨다. **인증서를 키체인에 넣는 것과, 그것을 루트로 신뢰하는 것은 별개의 두 동작**이다. 앞만 하고 뒤를 빠뜨리면 경고가 그대로 뜬다. 운영진 공지가 굳이 "신뢰할 수 있는 루트 인증 기관으로 설치해 주세요"라고 강조한 이유가 이것이다.

### macOS

macOS의 키체인은 자격증명과 인증서를 담는 시스템 저장소이고, 범위가 다른 여러 개가 있다.

| 키체인 | 범위 | 경로 | 쓰임 |
| --- | --- | --- | --- |
| login | 해당 사용자만 | `~/Library/Keychains/login.keychain-db` | 개인 비밀번호, 개인 인증서 |
| System | 컴퓨터 전체 | `/Library/Keychains/System.keychain` | 시스템 서비스가 쓰는 CA, Wi-Fi 프로필 |
| System Roots | 읽기 전용 | `/System/Library/Keychains/SystemRootCertificates.keychain` | 애플이 배포하는 공인 루트 목록 |

VMRC나 vSphere Client 같은 앱이 시스템 전체에서 신뢰하게 하려면 System 키체인이다. 등록 명령 하나에 두 동작이 다 들어 있다.

```bash
sudo security add-trusted-cert \
  -d \                                          # 적용 범위: admin 도메인 (전체 사용자)
  -r trustRoot \                                # ② 루트 CA로 신뢰
  -k /Library/Keychains/System.keychain \       # ① 어디에 저장
  vmca-root.crt
```

`-k`가 저장이고 `-r trustRoot`가 신뢰다. GUI로 하면 키체인 접근 앱에서 인증서를 더블클릭해 추가한 뒤(①), 다시 그 항목을 열어 "신뢰" 섹션을 펼치고 "이 인증서 사용 시: 항상 신뢰"로 바꾸는 것(②)에 해당한다.

확인 명령도 두 개가 각각 다른 것을 본다.

```bash
# ① 저장됐나 - 키체인 안에 존재하는지, 지문과 함께
security find-certificate -a -Z /Library/Keychains/System.keychain | grep -A1 'SHA-256'

# ② 신뢰됐나 - 신뢰 설정에 올라갔는지
sudo security dump-trust-settings -d
```

대회 중 두 번째 명령의 출력은 이랬다.

```
Cert 0: VERAPORT-CA
Cert 1: 127.0.0.1
Cert 2: DELFINO-CA
Cert 3: 127.0.0.1
Cert 4: 203.0.113.10      ← vCenter VMCA (방금 등록)
Cert 5: CA                ← VMware Engineering (방금 등록)
```

`VERAPORT-CA`와 `DELFINO-CA`는 한국 금융 사이트가 요구하는 보안 플러그인이 설치해 둔 루트다. 그 아래 `127.0.0.1` 두 장은 **그 플러그인들이 localhost에 띄우는 HTTPS 서버용 인증서**다. 은행 웹페이지의 자바스크립트가 `https://127.0.0.1:16105` 같은 주소를 경고 없이 부를 수 있게 하려고 깔아 둔 것이다. 즉 웹페이지가 로컬 데몬을 호출하도록 설계된 구조이고, 이 구조 자체가 공격면이라는 점은 별도 주제다.

지울 때는 이름이 아니라 지문으로 지정한다. `CN=CA` 같은 흔한 이름으로 지우면 엉뚱한 인증서가 날아갈 수 있다.

```bash
sudo security delete-certificate -Z <SHA256> \
  /Library/Keychains/System.keychain
```

대회 종료 후 이 명령으로 두 장을 지웠고, `dump-trust-settings`에서 `Cert 4`, `Cert 5`가 사라진 것을 확인했다.

### Linux (Debian/Ubuntu)

시스템 신뢰 저장소는 `/etc/ssl/certs/ca-certificates.crt` 한 파일로 합쳐진 번들이다. 직접 편집하지 않고, 지정된 디렉토리에 넣고 갱신 명령을 돌린다.

```bash
sudo cp vmca-root.crt /usr/local/share/ca-certificates/vmca-root.crt   # 확장자 .crt 필수
sudo update-ca-certificates
```

확장자가 `.crt`가 아니면 `update-ca-certificates`가 파일을 무시한다. 배포된 `.0` 파일을 그대로 넣으면 아무 일도 안 일어나는 이유다. RHEL 계열은 `/etc/pki/ca-trust/source/anchors/`에 넣고 `sudo update-ca-trust`다.

단, 이건 시스템 저장소이고, Firefox나 일부 Java 앱은 자기만의 저장소를 따로 쓴다. 브라우저에서 여전히 경고가 뜨면 그쪽을 봐야 한다.

### Windows

```
certutil -addstore -f Root vmca-root.crt
```

또는 파일을 더블클릭하고 "인증서 설치" → 저장 위치 **로컬 컴퓨터** → "모든 인증서를 다음 저장소에 저장" → **신뢰할 수 있는 루트 인증 기관**을 고른다. "현재 사용자"에 넣으면 서비스로 도는 프로그램은 못 본다.

### 어디에 넣든 확인은 실제 접속으로

등록이 됐는지의 최종 확인은 명령 출력이 아니라 실제 접속이다. 대회에서 `https://203.0.113.10/ui`가 인증서 경고 없이 열렸을 때 비로소 등록이 맞았다고 말할 수 있었다. `openssl`로도 같은 확인을 할 수 있다.

```bash
openssl s_client -connect 203.0.113.10:443 -CAfile vmca-root.crt </dev/null 2>/dev/null | grep 'Verify return code'
# Verify return code: 0 (ok)   ← 이 줄이 나와야 사슬이 닫힌 것
```

---

## 5. TLS 핸드셰이크 - 인증서 검증은 그 일부일 뿐이다

인증서 검증은 핸드셰이크의 한 단계이고, 그 앞뒤로 다른 협상이 있다. 각 단계는 고유한 실패 방식을 갖는다. TLS 1.3 기준으로 본다.

![TLS 1.3 핸드셰이크 단계와 실패 지점](/images/pki-tls-vmrc/handshake.svg)

### 0단계: TCP

TLS 이전에 TCP 연결이 먼저다. 여기서 실패하면 TLS는 시작도 못 한다. 이 단계의 실패는 두 종류로 갈리고, 그 구분이 진단의 절반이다.

- **Connection refused** - 호스트는 살아 있고 응답했는데(RST), 그 포트에 아무도 듣고 있지 않다. 서비스가 안 떠 있다.
- **Timeout** - 아무 응답이 없다. 패킷이 중간에 버려졌다. 방화벽이거나 라우팅이 없다.

대회에서 관제 에이전트가 `192.0.2.31:1515`에 계속 등록 실패했을 때 이 구분이 결정적이었다.

```
$ timeout 3 bash -c 'echo >/dev/tcp/192.0.2.31/1515'
bash: connect: Connection refused
```

refused였으므로 "네트워크가 막혔다"는 가설이 즉시 죽고 "등록 서비스가 안 떠 있다" 쪽으로 좁혀졌다. 한 줄로 가설 하나를 없앤 것이다.

### 1단계: ClientHello - 내가 할 수 있는 것들

클라이언트가 자기가 지원하는 TLS 버전 목록, 암호군(cipher suite) 목록, 키 교환 재료(key_share), 그리고 접속하려는 호스트명(SNI)을 한꺼번에 보낸다. 아직 암호화되지 않은 평문이다. SNI가 평문이라는 사실은 네트워크 관제에서 "어느 사이트에 붙는지"를 볼 수 있게 해 주는 근거이기도 하다.

### 2단계: ServerHello - 그중 하나를 고른다

서버가 목록에서 자기도 지원하는 버전과 암호군을 하나씩 골라 답한다. **교집합이 비면 여기서 연결이 끊긴다.** 이때 나오는 게 `handshake failure`, `protocol version`, `no shared cipher` 같은 문구다. 인증서는 아직 오가지도 않았다.

### 3단계: Certificate + CertificateVerify - 신원 제시와 검증

TLS 1.3에서는 ServerHello 직후부터 이미 암호화가 시작되고, 그 안에서 서버가 인증서 사슬을 보낸다. 함께 오는 CertificateVerify는 서버가 그 인증서의 개인키를 실제로 갖고 있다는 서명이다. 인증서만 복사해서 보내는 것으로는 통과할 수 없는 이유다. 클라이언트는 여기서 3절의 다섯 가지를 검증하고, 실패하면 `unable to get local issuer certificate`, `self signed certificate`, `certificate has expired`, `hostname mismatch` 같은 문구가 나온다.

### 4단계: Finished - 키 확정

양쪽이 교환한 재료로 같은 세션키를 도출했음을 서로 확인한다. 이후 모든 응용 데이터는 이 대칭키로 암호화된다. 인증서의 공개키는 서명 검증에만 쓰였고, 실제 데이터 암호화에는 쓰이지 않는다.

### 암호군이란

TLS 1.2까지 암호군은 `ECDHE-RSA-AES256-GCM-SHA384`처럼 네 가지가 한 덩어리였다. 키 교환(ECDHE), 인증(RSA), 대칭 암호(AES-256-GCM), 해시(SHA-384)다. TLS 1.3에서는 `TLS_AES_256_GCM_SHA384`로 줄었다. 키 교환과 인증 방식이 암호군에서 분리되어 따로 협상되고, 안전하지 않은 조합(RSA 키 교환, CBC 모드, RC4, SHA-1)이 규격에서 아예 빠졌기 때문이다.

협상 실패는 대개 **한쪽이 너무 오래됐거나 한쪽이 너무 엄격할 때** 생긴다. 구형 서버가 TLS 1.0과 1.1만 지원하는데 최신 클라이언트가 1.2 미만을 거부하면 교집합이 빈다. 서버가 실제로 뭘 지원하는지는 직접 물어보면 된다.

```bash
openssl s_client -connect HOST:443 -tls1_2 </dev/null   # 1.2로 강제. 성공하면 지원
openssl s_client -connect HOST:443 -tls1_3 </dev/null
openssl s_client -connect HOST:443 -showcerts </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
nmap --script ssl-enum-ciphers -p 443 HOST              # 지원 암호군 전체 열거
```

---

## 6. 에러 문구로 층을 가르는 표

같은 "연결 실패"라도 문구가 층을 알려 준다. 이 표는 어제 세 번 헤맨 대가로 만든 것이다.

| 문구 | 층 | 뜻 | 인증서 등록으로 고쳐지나 |
| --- | --- | --- | --- |
| `Connection refused` | TCP | 호스트는 살아 있고 포트에 서비스가 없다 | 아니다 |
| `Connection timed out` | TCP | 패킷이 버려졌다. 방화벽 또는 라우팅 부재 | 아니다 |
| `handshake failure`, `protocol version`, `no shared cipher` | TLS 2단계 | 공통 TLS 버전 또는 암호군이 없다 | 아니다 |
| `unable to get local issuer certificate` | TLS 3단계 | 사슬이 신뢰 뿌리까지 못 올라갔다 | **그렇다** |
| `self signed certificate` | TLS 3단계 | 루트가 자체 서명인데 신뢰 목록에 없다 | **그렇다** |
| `certificate has expired` | TLS 3단계 | 유효 기간 밖 | 아니다. 시계 또는 인증서 갱신 |
| `hostname mismatch` | TLS 3단계 | SAN에 접속한 호스트명이 없다 | 아니다. 이름으로 접속하거나 SAN 수정 |
| `could not negotiate SSL` (VMRC) | **TCP** | 아래 9절. 문구와 달리 TLS 문제가 아니다 | 아니다 |

마지막 줄이 이 글의 반전이다.

---

## 7. vSphere는 어떻게 생겼나

VMRC를 이해하려면 그것이 어디에 붙는지를 알아야 하고, 그러려면 vSphere의 구성이 필요하다.

| 구성요소 | 역할 |
| --- | --- |
| ESXi | 실제 하이퍼바이저. 물리 서버에 설치되어 VM을 직접 돌린다 |
| vCenter Server | 여러 ESXi 호스트를 묶어 관리하는 중앙 서버. 웹 UI와 API를 제공한다 |
| vSphere Client | vCenter의 HTML5 웹 인터페이스. `https://vcenter/ui` |
| VMCA | vCenter에 내장된 인증 기관. 설치 시 자체 서명 루트를 자동 생성한다 |
| VMRC | VM 콘솔에 붙는 네이티브 데스크톱 앱 |

### VMCA - 모든 것의 출발점

vCenter를 설치하면 공인 CA에서 인증서를 사 오는 대신, 자기 안에 CA를 만들고 스스로 서명한다. 이것이 VMware Certificate Authority(VMCA)다. 기본 모드(Fully Managed)에서 VMCA는 설치 때 만든 루트로 환경 안의 모든 인증서 - vCenter 자신의 Machine SSL 인증서, 각 ESXi 호스트의 인증서, 내부 서비스 간 인증서 - 를 발급한다. 그래서 대회 인증서에 `DC=vsphere, DC=local`이라는 내부 SSO 도메인 이름이 붙어 있었고, 유효 기간이 10년이었고, 외부에서 보면 신뢰할 수 없는 인증서였다.

vCenter에는 서로 다른 역할의 인증서가 여럿 있다. Machine SSL(웹 UI와 API가 제시하는 것), VMCA 루트, STS 서명용, 그리고 Trusted Root 목록이다. 운영진이 배포한 `vmca-root.crt`에 인증서가 두 장 들어 있었던 것도 이 구조 때문이다. 하나는 `CN=203.0.113.10`인 VMCA 루트였고, 다른 하나는 `CN=CA, OU=VMware Engineering`인 또 다른 루트였다. 두 vCenter 계보이거나, 한 vCenter의 루트가 교체된 흔적일 것이다. 이건 확인하지 못한 추론이다.

VMCA를 기업 내부 CA의 하위(Subordinate) CA로 두는 모드도 있지만, VMware 자신이 복잡성과 운영 위험을 이유로 권장하지 않는다. 그래서 실무에서 만나는 vCenter는 대부분 자체 서명 루트를 쓰고, 그래서 vCenter 접속의 첫 관문은 거의 항상 "루트를 신뢰 저장소에 넣는 일"이 된다.

---

## 8. VMRC 해부

### 무엇인가

VMware Remote Console은 VM의 **화면·키보드·마우스**를 원격으로 다루는 독립 실행 앱이다. VMware 문서 표현으로는 "vSphere, vRealize Automation, vCloud Director의 가상 머신, 그리고 VNC 서버에 접속하는 클라이언트 애플리케이션"이다. 브라우저 안의 웹 콘솔과 달리 네이티브 앱이라, 로컬 USB 장치나 ISO 이미지를 VM에 연결하거나, 전원을 조작하거나, 전체 화면으로 쓰는 등 기능이 더 많다. 반면 설치가 필요하고, 뒤에서 보듯 네트워크 요구사항이 더 까다롭다.

Windows와 macOS는 13.x 계열이 현행이고(App Store에서 받은 게 13.1.1이었다), Linux는 운영진이 안내한 문서도 12.0 계열이었다. Linux 배포가 12.0에서 멈춘 것으로 보이지만 이건 문서 트리에서 읽은 관측이지 공식 발표를 확인한 건 아니다.

### 어떻게 실행되나 - 스킴 핸들러

VMRC는 열고 주소를 치는 앱이 아니다. 설치하면 OS에 "`vmrc://` 스킴은 내가 처리한다"고 등록되고, 웹 클라이언트에서 콘솔 실행 버튼을 누르면 브라우저가 `vmrc://...` 링크를 OS에 넘기고, OS가 등록된 앱을 띄우면서 그 URL을 전달한다. 설치 직후 앱을 실행하면 뜨는 안내문이 정확히 이 얘기를 한다. "원격 가상 머신 콘솔에 접근하려면 vSphere 웹 클라이언트에서 해당 링크를 여십시오."

이 구조 때문에 **VMRC가 없으면 버튼이 조용히 아무 일도 하지 않는다.** 브라우저는 처리할 수 없는 스킴을 만나면 OS에 묻고, 핸들러가 없으면 에러도 없이 그냥 끝난다. 대회 첫 30분 동안 원격접속 버튼이 무반응이었던 이유가 이것이었고, TLS와는 아무 관계가 없었다. 같은 원리가 `mailto:`, `slack://`, `zoommtg://`에도 적용된다. "클릭했는데 아무 일도 안 난다"는 거의 항상 스킴 핸들러 부재다.

macOS에서 이 등록부를 관리하는 것이 LaunchServices이고, 등록 여부는 이렇게 본다.

```bash
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -dump \
  | grep -A2 'vmrc:'
```

앱이 설치되어 있는데도 등록이 안 됐으면 앱을 한 번 실행하면 된다. 대회에서는 그 팝업의 Close를 누른 것만으로 등록이 끝났다.

### `vmrc://` URL의 해부

플랫폼이 발급하는 링크는 대략 이런 모양이다.

```
vmrc://clone:<ticket>@<host>:443/?moid=vm-1234
       └──┬──┘└───┬───┘ └──┬──┘        └───┬───┘
      인증 방식  세션 티켓  접속 대상    Managed Object ID
```

- `clone:` 뒤의 문자열이 **세션 티켓**이다. vCenter가 로그인한 사용자에게 발급하는 1회용 콘솔 티켓이고, 이것이 곧 자격증명이다. 이 문자열만 있으면 누구든 그 VM 콘솔에 붙는다.
- `<host>`는 붙을 서버다. 대회 인증서의 CN이 `203.0.113.10`이었으니 vCenter가 이 자리에 온다.
- `moid`는 vCenter 인벤토리 안에서 VM을 가리키는 Managed Object ID다. `vm-1234` 형식이다.

티켓의 수명은 짧다. 정확한 값은 문서에서 확인하지 못했지만, 몇 분 지난 링크를 다시 열면 `Invalid or expired session ticket`이 난다. 짧은 수명이 유일한 방어선이므로, 이 링크를 로그나 게시판이나 채팅에 붙여 넣으면 안 된다. 터미널에서 직접 열 때는 따옴표로 감싸야 한다. `?`, `&`, `:`가 셸에서 깨진다.

```bash
open "vmrc://clone:TICKET@HOST:443/?moid=vm-123"
```

### 어디에 붙는가 - 902에서 443으로

여기가 VMRC를 이해하는 핵심이고, 9절의 실패를 설명하는 지점이다.

VMRC는 vCenter에서 티켓을 받은 뒤, **VM이 실제로 도는 ESXi 호스트에 직접 연결**한다. vCenter가 관리하는 환경이어도 그렇다. 화면·키보드·마우스 데이터(VMware 용어로 MKS, Mouse-Keyboard-Screen)는 vCenter를 거치지 않고 ESXi와 클라이언트 사이를 직접 오간다.

이 직결 포트가 버전에 따라 바뀌었다. VMRC 11.0 이전에는 TCP 902를 썼고, **11.0부터는 WebSocket을 기본 전송으로 채택하면서 TCP 443**을 쓴다. vSphere 7 보안 문서의 방화벽 절이 이렇게 명시한다.

> The firewall must allow the VMRC to access vCenter Server on port 443 and to access the ESXi host on port 902 for VMRC versions before 11.0, and port 443 for VMRC version 11.0 and greater.

즉 VMRC 11.0 이상을 쓰려면 클라이언트에서 **vCenter의 443과 모든 ESXi 호스트의 443** 양쪽이 열려 있어야 한다. vCenter만 보이는 네트워크에서는 티켓은 받지만 콘솔은 못 연다.

반면 브라우저 웹 콘솔은 다르다. 같은 문서의 웹 콘솔 절은 클라이언트가 vCenter의 443에 붙고, **vCenter가 ESXi의 902에 붙는다**고 되어 있다. 클라이언트가 직접 닿아야 하는 곳이 vCenter 하나뿐이다.

![브라우저 웹 콘솔과 VMRC의 연결 경로 비교](/images/pki-tls-vmrc/console-paths.svg)

---

## 9. 왜 웹 콘솔은 열리고 VMRC는 안 열렸나

대회 당시의 상황을 다시 놓으면 이렇다.

- 노트북은 대회장 LAN에 있었다.
- vCenter `203.0.113.10`은 공인 IP였고 여기에는 닿았다. 웹 UI 로그인이 됐다.
- 훈련망은 별도 사설 대역이었고 노트북에서 라우팅되지 않았다. ESXi 관리망은 어느 대역인지조차 알려지지 않았다.
- 웹 콘솔은 열렸다. VMRC는 `Connection error: could not negotiate SSL`로 실패했다.

당시에는 이걸 "VMRC 13.x의 TLS 스택과 구형 ESXi의 TLS 버전이 안 맞는다"로 추론했다. 그럴듯했지만 틀렸다. 대회가 끝나고 Broadcom KB 422935를 확인하니, 이 에러 문구를 다루는 문서가 따로 있었고 증상과 원인이 우리 상황과 정확히 일치했다.

증상 항목에 이렇게 적혀 있다. VMRC 실행이 SSL 협상 에러로 실패하고, **웹 콘솔은 정상 동작한다.** 원인 항목은 클라이언트가 **ESXi 호스트의 443 포트에 닿지 못하는 것**이고, VMRC 11.0에서 902가 443으로 바뀐 변경을 함께 언급한다. 해결책은 클라이언트와 모든 ESXi 호스트 사이의 443을 여는 것이고, 그게 불가능할 때의 우회책으로 vCenter 고급 설정에 `config.mksdevproxy.enable = true`를 넣어 **콘솔 트래픽을 vCenter가 대신 중계하게 만드는 방법**이 안내되어 있다.

정리하면 이렇다.

1. VMRC는 vCenter에서 티켓을 받는 데까지는 성공했다. vCenter 443은 열려 있었다.
2. 그 다음 ESXi 호스트의 443에 직접 붙으려 했는데, 대회장 LAN에서 ESXi 관리망으로는 경로가 없었다.
3. 이 연결 실패가 VMRC 안에서는 "SSL 협상 실패"라는 문구로 표면화됐다. 실제로는 TLS가 시작되기 전, TCP 단계의 실패다.
4. 웹 콘솔은 vCenter가 중간에서 ESXi로 대신 가 주므로 클라이언트가 ESXi에 닿을 필요가 없었다. 그래서 열렸다.

에러 문구가 층을 속인 사례다. "SSL"이라는 단어 때문에 인증서와 TLS 버전을 뒤졌지만, 답은 라우팅 테이블에 있었다. 당시 이 KB를 알았다면 인증서 두 번 설치하는 대신 `nc -zv <ESXi> 443` 한 줄로 10초 만에 결론이 났을 것이다. 다만 대회 중에는 ESXi 호스트 주소 자체를 몰랐으니, 어차피 웹 콘솔로 우회하는 게 유일한 답이긴 했다.

이 교정에서 얻은 원칙은 하나다. **에러 문구의 단어가 아니라 그 문구가 나온 층을 먼저 확정하라.** 그러려면 아래 층부터 위로 올라가며 확인해야 한다. TCP가 닿는가, 협상이 되는가, 인증서가 믿어지는가, 이름이 맞는가. 이 순서를 건너뛰고 문구가 가리키는 곳부터 파면 어제처럼 된다.

---

## 10. 인증서를 받자마자 하는 일

다음에 어떤 환경에서든 `*.crt` 파일을 받았을 때 손이 저절로 움직이도록, 순서를 고정해 둔다.

### 1) 열어서 정체를 확인한다 - 설치 전

```bash
openssl x509 -in cert.crt -noout -subject -issuer -dates -ext basicConstraints,subjectAltName
openssl x509 -in cert.crt -noout -fingerprint -sha256
grep -c 'BEGIN CERT' cert.crt      # 묶음이면 2 이상
```

- Subject와 Issuer가 같은가 → 루트다. 신뢰 등록 대상이다.
- 다르면 중간 CA이거나 서버 인증서다. 루트로 신뢰하면 안 된다. 사슬의 위를 찾아야 한다.
- `CA:TRUE`인가 → 아니면 애초에 루트로 등록할 수 없는 물건이다.
- 유효 기간이 지금을 포함하는가.
- 묶음이면 각 장을 분리해서 위를 반복한다.

```bash
# 묶음 분리
awk '/BEGIN CERT/{n++} {print > "cert_" n ".pem"}' bundle.crt
```

### 2) 이미 있는지 확인한다 - 지문으로

같은 인증서를 두 번 넣을 필요는 없고, 이름이 같은 다른 인증서를 덮어쓰면 안 된다.

```bash
# macOS
security find-certificate -a -Z /Library/Keychains/System.keychain | grep -i '<지문 앞 8자리>'
# Linux
grep -rl "$(openssl x509 -in cert.crt -noout -serial | cut -d= -f2)" /etc/ssl/certs/ 2>/dev/null
```

### 3) 어느 저장소에 넣을지 정한다

- 시스템 서비스나 데스크톱 앱(VMRC 등)이 써야 한다 → 시스템 저장소
- 내 브라우저에서만 쓴다 → 사용자 저장소로 충분하고, 범위가 좁아서 더 안전하다
- Firefox, Java, Python `requests`처럼 자기 저장소를 따로 쓰는 프로그램이면 그쪽에 별도로

### 4) 등록한다 - 저장과 신뢰를 둘 다

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

### 5) 실제 접속으로 검증한다

```bash
openssl s_client -connect HOST:443 </dev/null 2>/dev/null | grep 'Verify return code'
# 0 (ok)가 아니면 아직 안 끝난 것
```

브라우저로 열어 자물쇠에 경고가 없는지까지 본다. 명령이 성공했다는 것과 앱이 그 저장소를 쓴다는 것은 다른 얘기다.

### 6) 끝나면 지운다 - 지문으로

임시 환경, 대회, 테스트용 CA는 쓰임이 끝나면 제거한다. 루트 CA 하나가 남아 있다는 건 그 개인키를 가진 누군가가 내 컴퓨터에서 어떤 사이트로든 위장할 수 있다는 뜻이다.

```bash
sudo security delete-certificate -Z <SHA256> /Library/Keychains/System.keychain
sudo security dump-trust-settings -d      # 사라졌는지 확인
```

### 그리고 접속이 안 될 때는 아래에서 위로

```bash
timeout 3 bash -c 'echo >/dev/tcp/HOST/443' && echo OPEN || echo CLOSED   # TCP
openssl s_client -connect HOST:443 -tls1_2 </dev/null                       # 협상
openssl s_client -connect HOST:443 -CAfile cert.crt </dev/null              # 신뢰
openssl s_client -connect HOST:443 -servername NAME </dev/null              # 이름
```

한 층씩 올라가며, 어느 층에서 처음 실패하는지를 본다. 그 층이 원인이고, 그 위는 볼 필요가 없다.

---

## 11. 직접 해볼 실습

읽어서 아는 것과 손으로 만들어 본 것은 다르다. 네 가지를 권한다.

1. `openssl`만으로 루트 CA를 만들고, 그 루트로 중간 CA를 서명하고, 중간 CA로 서버 인증서를 발급해 3단 사슬을 완성한다. `pathlen`을 0으로 두고 중간 CA를 하나 더 끼워 넣어 검증이 실패하는 것도 본다.
2. 그 루트를 로컬 신뢰 저장소에 넣고 `openssl s_server`로 서버를 띄운 뒤 브라우저와 `curl`로 붙어 본다. 넣기 전과 후의 에러 문구를 나란히 기록한다.
3. 일부러 유효 기간을 어제로 만들거나, SAN에서 호스트명을 빼거나, 중간 CA를 안 보내 보고, 각각 어떤 문구가 나오는지 표로 모은다. 6절의 표를 자기 손으로 다시 만드는 것이다.
4. 서버의 지원 TLS 버전을 1.0으로 고정하고 최신 클라이언트로 붙어 **협상 실패**를 재현한다. 그런 다음 같은 서버 앞에 방화벽 규칙을 넣어 **timeout**을 만들고, 서비스를 내려 **refused**를 만든다. 세 실패의 문구와 소요 시간이 어떻게 다른지 비교한다.

4번이 특히 값지다. 어제 "SSL"이라는 단어에 속은 이유는 그 실패들을 손으로 구분해 본 적이 없어서였다.

---

## 12. 요약

VM 콘솔 하나를 여는 데 세 층에서 각각 한 번씩 막혔다. 원격접속 버튼이 무반응이었던 건 `vmrc://` 스킴을 처리할 앱이 OS에 등록되지 않아서였고, 인증서 경고는 vCenter의 자체 서명 루트(VMCA)가 신뢰 저장소에 없어서였으며, VMRC의 `could not negotiate SSL`은 이름과 달리 TLS 문제가 아니라 VMRC 11.0 이상이 ESXi 호스트의 443에 직결해야 하는데 그 경로가 없어서 생긴 TCP 단계의 실패였다. 웹 콘솔은 vCenter가 ESXi로 대신 가 주기 때문에 같은 네트워크에서도 열렸다.

인증서는 "이 공개키는 이 이름의 것"이라는 서명된 진술이고, Subject와 Issuer가 같으면 자체 서명 루트다. 루트는 받는 쪽이 직접 신뢰해야 하고, 그 신뢰는 저장과 별개의 동작이며, 지문으로 동일성을 확인하고, 쓰임이 끝나면 지문으로 지운다. 접속이 안 될 때는 에러 문구의 단어를 따라가지 말고 TCP → 협상 → 신뢰 → 이름 순으로 아래에서 위로 층을 확정한다.

대회 당시 VMRC 실패를 TLS 버전 불일치로 추론한 것은 틀렸고, Broadcom KB로 교정했다. 그 교정이 이 글에서 가장 값진 부분이다.

---

## 참고 자료

- [Connecting to the Virtual Machine Console Through a Firewall - vSphere 7 Security](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/vsphere-security/securing-vsphere-networking/securing-the-network-with-firewalls/connecting-to-the-virtual-machine-console-through-a-firewall.html) - 웹 콘솔과 VMRC의 포트 요구사항 원문
- [KB 422935: "Connection error: could not negotiate SSL" when launching VMware Remote Console](https://knowledge.broadcom.com/external/article/422935/error-connection-error-could-not-negotia.html) - 9절의 근거. ESXi 443 도달성과 MKS 프록시 우회
- [KB 411158: Failed to connect to VM using VMware Remote Console](https://knowledge.broadcom.com/external/article/411158/failed-to-connect-to-vm-using-vmware-rem.html) - ESXi 방화벽이 443을 막는 경우
- [KB 436152: VMRC fails with "Invalid or expired session ticket"](https://knowledge.broadcom.com/external/article/436152/vmware-remote-console-vmrc-fails-with-in.html) - 티켓 에러와 WebSocket 검사 문제
- [Install VMware Remote Console on Linux - VMRC 12.0](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vmware-remote-console/12-0/vmware-remote-console-for-vrealize-automation-and-vcloud-director-12-0/install-vmware-remote-console/install-vmware-remote-console-on-linux.html) - 운영진이 안내한 문서. `vmrc` 스킴 등록 언급
- [Managing Certificates for ESXi Hosts - vSphere 8](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/8-0/vsphere-security/securing-esxi-hosts/certificate-management-for-esxi-hosts.html) - VMCA가 기본 루트라는 설명
- [KB 318946: Using vSphere Certificate Manager to Replace SSL Certificates](https://knowledge.broadcom.com/external/article/318946/how-to-use-vsphere-certificate-manager-t.html) - vCenter 인증서 4종
- [RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446) - 핸드셰이크 메시지 순서
- [RFC 5280 - Internet X.509 PKI Certificate and CRL Profile](https://www.rfc-editor.org/rfc/rfc5280) - basicConstraints, pathLenConstraint, SAN
- `man security` (macOS), `man update-ca-certificates` (Debian) - 신뢰 저장소 명령
