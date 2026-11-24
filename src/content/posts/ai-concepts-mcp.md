---
id: "ai-concepts-mcp"
title: "MCP: AI와 도구를 연결하는 표준"
titleEn: "MCP: A Standard for Connecting AI and Tools"
description: "MCP의 등장 배경과 Host·Client·Server 구조, 도구 호출 흐름과 Skill과의 차이를 정리한다."
descriptionEn: "Study the motivation for MCP, its host–client–server architecture, tool calls, and how it differs from skills."
date: "2026-11-24 00:00"
category: "ai"
tags: ["AI", "MCP", "Agent"]
cover: "/images/covers/ai-concepts-mcp.svg"
published: true
---

## 서론

하네스 페이지에서 MCP를 "외부 서비스를 하네스에 꽂는 공통 규격"이라고 한 줄로 적었다. 이 페이지는 그 규격이 왜 생겼고, 어떻게 생겼고, 실제로 어떤 순서로 호출되는지를 정리한다.

## 1. MCP는 왜 생겼나

MCP 이전에는 AI 앱마다 도구 연동을 따로 만드는 일이 많았다. Claude를 쓰는 앱용 연결부와 GPT를 쓰는 앱용 연결부를 각각 만든다고 해 보자. AI 앱 N개와 도구 M개의 모든 조합을 따로 구현하면 N × M개의 연동 코드가 필요하다. MCP는 이 중 서로 다른 말로 요청하고 답하던 부분을 공통 규격으로 맞춰, 연결 구현을 재사용하게 한다.

![MCP 전후의 구현 재사용 비교. N + M은 실행 중 연결 수가 아니다.](/images/ai-study/076938adff543f460e04.png)

MCP 전후의 구현 재사용 비교. N + M은 실행 중 연결 수가 아니다.

- MCP : AI 앱과 도구 사이의 공통 규격이다. 앱 쪽은 MCP client 구현을 재사용하고, 도구 쪽은 MCP server로 기능을 제공한다. N + M은 이런 구현 재사용을 설명하는 단순화다. 실행 중 연결 수가 반드시 N + M개가 되는 것은 아니며, 실제 연결에는 버전·기능 호환성과 인증·권한도 맞아야 한다. 그림의 공통 규격은 중앙에서 요청을 받아 주는 중계 서버가 아니다.
- 출처 : Anthropic이 2024년 11월에 공개했다. 에디터 × 언어 문제를 푼 LSP(Language Server Protocol)를 본떴다. 이후 OpenAI와 Google도 채택했다.
- 현재 버전 : 스펙 버전은 날짜(YYYY-MM-DD)로 붙이고, 현재 버전은 2026-07-28이다(공식 문서 Versioning 페이지, 2026-11-17 확인). 이 버전부터는 요청마다 프로토콜 버전을 적어 보내고 서버가 요청을 하나씩 따로 받아들인다. 2025-11-25 및 그 이전 버전은 처음에 initialize 핸드셰이크로 버전을 맞췄다.

---

## 2. 구조

```txt
사용자 - Host(AI 앱) 안의 에이전트 루프 - MCP Client - MCP Server - 실제 시스템(DB / API / 파일)
                     |
                    LLM (로컬 또는 원격 모델)
```

![MCP 구조](/images/ai-study/ffaccab9a67a3d7390fc.png)

MCP 구조

- Host : Claude Code, Claude Desktop, Cursor, ChatGPT 같은 AI 앱이다. 모델 호출, 도구 실행, 권한 확인을 조정하는 하네스가 이 앱 안에서 작동한다.
- MCP Client : Host가 특정 MCP Server와 통신할 때 쓰는 구성 요소다. 보통 서버마다 client를 두며, 사용자가 별도 앱처럼 다루는 대상은 아니다. 이는 역할의 구분이지, 모든 전송 방식이 계속 열린 연결을 유지한다는 뜻은 아니다.
- MCP Server : 도구나 데이터를 MCP 규격으로 제공하는 쪽이다. 노션, 슬랙, 리니어 같은 서비스 회사가 만들 수도 있고, 개인이나 팀이 기존 API를 감싸서 만들 수도 있다.
- LLM : 그림에서 Host와 따로 둔 것은 역할을 구분하기 위해서다. 회사 서버의 원격 모델일 수도 있고 로컬 모델일 수도 있다. 아래 흐름에서는 모델이 도구 사용을 요청하고, 실제 MCP 통신은 Host 안의 Client가 담당한다.

서버가 제공하는 대표 기능은 3가지다. 아래는 각 기능을 보통 누가 선택해서 쓰는지 보여 주는 구분이다. 구체적인 화면이나 호출 정책까지 MCP가 정하는 것은 아니다.

- Tools : 실행할 수 있는 함수다. 보통 모델이 사용을 제안한다(model-controlled). 실제 실행 여부는 Host의 정책과 권한 확인을 거친다.
- Resources : URI로 읽는 참조 데이터다. Host 앱이 읽어서 넣는다(application-controlled).
- Prompts : 사용자가 골라 쓰는 메시지 템플릿이다(user-controlled). 슬래시 명령으로 보여 줄 수 있지만, 화면에 어떻게 표시할지는 Host가 정한다.

---

## 3. 서버는 어디서 도나

- 로컬 단독(stdio) : Host가 사용자 PC에서 서버 프로세스를 직접 띄운다. PC의 파일이나 앱을 만져야 할 때 쓴다. 예 : playwright, ida
- 로컬 래퍼 : 사용자 PC에서 돌지만, 안에서 회사 API를 원격으로 부른다.
- 원격 호스팅(Streamable HTTP) : 서비스 회사의 서버에서 돈다. 사용자는 설치 없이 URL과 인증만으로 붙인다. SaaS 회사는 이쪽으로 가는 추세다. 예 : Linear, Notion, Slack

데이터와 키가 회사 쪽에 있으면 원격 호스팅, 사용자 PC를 만져야 하면 로컬로 간다.

---

## 4. 호출은 어떻게 일어나나

![MCP 호출 순서의 한 예. 도구 발견 시점과 선택 방식은 Host마다 다르다.](/images/ai-study/bc24c798a4dbbd0d44df.png)

MCP 호출 순서의 한 예. 도구 발견 시점과 선택 방식은 Host마다 다르다.

```txt
[도구 발견: 처음 연결할 때 또는 필요할 때]
1. Host의 Client -> MCP Server : tools/list
2. MCP Server -> Host : 도구 이름 / 설명 / 입력 스키마
   Host는 목록을 저장하거나 갱신하고, 필요한 도구를 모델에 제공한다.

[사용자 요청]
3. 사용자 -> Host : "이 페이지 요약해줘"
4. Host -> LLM : 요청 + 필요한 대화 맥락 + 사용할 도구 정의
5. LLM -> Host : 도구 호출 요청 (이 예에서는 모델이 선택)
6. Host의 Client -> MCP Server : 정책·권한 확인 후 tools/call
7. MCP Server -> Host : 실행 결과
8. Host -> LLM : 결과를 붙여서 다시 보냄
   (필요하면 5~8 반복)
9. LLM -> Host -> 사용자 : 최종 답
```

- 실제 요청을 보내는 주체 : MCP 통신은 Host 안의 Client가 맡는다. LLM은 "이 도구를 이 입력으로 불러 달라"는 구조화된 요청을 만든다. 서버는 전달받은 요청을 권한 범위 안에서 실행한다.
- 발견과 호출은 별개다 : MCP가 특정 키워드에 자동 반응하도록 정한 것은 아니다. 도구 목록을 언제 가져올지, 필요한 도구만 검색해 제공할지, 키워드나 고정 규칙으로 호출할지는 Host의 구현이다. 목록을 처음 한 번 받아 매 요청마다 전부 보내야 한다는 규칙도 없다.
- 도구 설명은 서버가 쓴다 : name, description, inputSchema를 서버 개발자가 쓴다. 사실상 "모델이 읽는 README"다.

---

## 5. 같은 요청인데 호출이 달라지는 이유

모델에게 도구 선택을 맡긴 앱에서는 같은 질문을 여러 번 해도 도구를 부를 때와 안 부를 때가 있을 수 있다. 이는 모델의 판단과 앱의 호출 정책에 따른 동작이다. MCP 자체가 “반드시 확률적으로 골라야 한다”고 정한 것은 아니다. 개발자가 정해 둔 순서로 도구를 호출하는 앱도 같은 MCP 규격을 사용할 수 있다.

- 안 부르는 경우 : 요청이 모호함 / 대화에 이미 답이 있음 / 도구가 너무 많음 / 사용자가 도구를 꺼 둠 / 설명이 요청과 안 맞음
- 사용자 입장에서 요청을 명확하게 하는 법 : "노션에서 이 페이지를 읽어 줘"처럼 대상과 작업을 말하면 도움이 된다. 다만 서비스 이름을 말하거나 Prompt를 골랐다는 사실만으로 호출이 보장되지는 않는다. 고정 동작을 실행하는 명령인지, 모델에게 메시지를 전달하는 템플릿인지는 앱마다 다르다.
- API 개발자 입장에서 제어하는 법 : 모델 API의 tool\_choice 같은 설정으로 도구 선택을 제어하거나, 앱 코드에서 정해진 도구를 직접 호출할 수 있다. 지원하는 설정은 API마다 다르다. 도구 호출을 선택하게 하는 것과 인증·권한을 통과해 실행에 성공하는 것은 별개다.
- 설명과 지침은 다르다 : 원래 도구 설명은 서버 개발자가 정한다. 서버를 직접 운영하거나 Host가 변환 기능을 제공하면 수정할 수도 있다. 일반 사용자가 [CLAUDE.md](http://CLAUDE.md)나 Skill에 지시를 쓰는 것은 서버 설명 자체를 고치는 것이 아니라, 도구를 어떻게 사용할지 별도 지침을 더하는 일이다.
- 경쟁 지점이자 보안 표면 : 비슷한 도구가 여러 개 있으면 설명이 선택에 영향을 줄 수 있지만, 구체적으로 썼다고 반드시 선택되는 것은 아니다. 외부 서버의 설명이 모델 입력에 포함되면 악의적인 지시가 함께 들어올 수도 있다. 이런 도구 설명 오염 공격을 tool poisoning이라고 부른다.

---

## 6. MCP와 Skill의 차이

- Skill : 절차와 규칙을 적은 매뉴얼(`SKILL.md` + 스크립트)이다. 모델 컨텍스트에 들어가서 이미 있는 도구를 잘 쓰게 한다. 새 접근 권한은 주지 않는다.
- MCP : 외부 시스템의 도구와 데이터를 연결하는 공통 규격이다. 사용할 기능을 연결해 주지만, 연결 자체가 없던 접근 권한을 자동으로 주지는 않는다. 예를 들어 Notion MCP를 붙여도 인증된 계정과 연동에 허용된 페이지만 읽을 수 있다. 실제 권한은 서비스의 인증·권한 설정이 정한다.
- 같이 쓴다 : 예를 들어 "주간 회의록 정리법" Skill이 Notion MCP 도구를 어떤 순서로 부를지 지시한다.

---

## 7. Claude Code에 붙이기

여기부터는 MCP 공통 규격이 아니라 Claude Code에서 연결하는 구현 예다. 설정 위치와 다시 연결되는 시점은 앱과 버전에 따라 달라질 수 있다.

자신의 Claude Code에는 별도의 공개 등록 없이 MCP 서버를 연결할 수 있다. 다만 조직의 관리 정책이나 서버가 요구하는 인증·권한은 따라야 한다.

```bash
claude mcp add --transport http <이름> <URL> --header "Authorization: Bearer <KEY>"   # 원격
claude mcp add --transport http <이름> http://localhost:8080/mcp                     # 로컬 개발
claude mcp add <이름> -- <실행 명령>                                                  # stdio
```

- `claude mcp add`가 하는 일 : 설정 파일에 연결 정보를 쓸 뿐이다. 이 시점에는 아무것도 실행되지 않는다.
- 실제 연결 시점 : 하네스가 세션 시작 때 설정을 읽고 서버마다 MCP client를 만든다. 그래서 추가한 서버는 다음 세션부터 보인다.
- scope : local(기본, 나만 / 이 프로젝트만), project(레포의 `.mcp.json`, 팀원 전원 / 처음 쓸 때 승인), user(나만 / 모든 프로젝트)
- 확인 : `claude mcp list`, 대화형 claude 안에서 `/mcp`
- AI 없이 서버만 테스트 : MCP Inspector(`npx @modelcontextprotocol/inspector`)
- 다른 Host : Claude Desktop(설정 파일 또는 커넥터 메뉴), Cursor(`.cursor/mcp.json`), ChatGPT(원격 서버만 지원하는 것으로 알고 있음, 미검증). 웹 기반 Host는 API 키 헤더 대신 OAuth를 요구할 수 있다(미검증).
