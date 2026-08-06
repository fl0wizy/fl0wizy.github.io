---
id: "ai-everything-06-harness-products"
title: "AI의 모든 것 (06) – Claude Code · Codex · Antigravity: 모델과 하네스를 헷갈리지 말 것"
description: "Gemini는 모델이지 하네스가 아니다 – Claude Code 5층 구조, Codex 부품 지도, Antigravity 전환."
date: "2026-08-02 10:00"
category: "ai"
tags: ["ClaudeCode", "Codex", "Antigravity", "Gemini", "AGENTS.md", "Hooks", "Plugin"]
published: true
---

이 글에서는 실제 제품들을 하네스 관점에서 읽는다. 모델과 하네스라는 두 층위가 어떻게 다른지, 같은 회사·같은 모델군인 ChatGPT와 Codex가 왜 다른 결과를 내는지, Claude Code와 Codex의 구조는 어떻게 생겼는지 한 번에 훑어본다.

---

## 1. 모델과 하네스의 층위 구분

**모델**은 토큰을 입력받아 다음 토큰의 확률분포를 내놓는 신경망이고, **하네스**는 그 모델을 실제 업무 환경에 연결하는 실행 계층이다. 제품 이름을 나열할 때 이 둘이 자주 섞인다.

회사별로 이렇게 나란히 정리하기 쉽다.

```
O OpenAI  : codex
O Anthropic : claude code
X Google  : gemini
```

앞의 둘은 하네스 이름이 맞다. 세 번째 줄이 문제다. **Gemini는 모델이지 하네스가 아니다.** 세 개를 나란히 놓으면 층위가 어긋난다. 2026년 8월 기준으로 바로잡으면 이렇다.

| 회사 | 모델 (엔진) | 하네스 (운영체제) |
|---|---|---|
| Anthropic | Claude – Opus 5 / Sonnet 5 / Haiku 4.5 / Fable 5 | Claude Code (CLI · 데스크톱 · 웹 · IDE), Claude Agent SDK |
| OpenAI | GPT-5.x 계열 | Codex (CLI · 앱 · 클라우드), Agents SDK, Responses API |
| Google | Gemini 3.x 계열 | Antigravity (데스크톱 · CLI · SDK), Jules |

그 외에 흔히 섞이는 이름들도 층위를 나눠 보면 정리된다. ChatGPT는 제품/표면이고 그 뒤의 모델이 GPT 계열이다. Claude 앱도 마찬가지로 제품/표면이고 모델은 Claude 계열이다. Kimi는 중국 AI 기업 Moonshot AI의 모델이다. Perplexity는 검색 특화 제품/하네스로, 내부에서 여러 모델을 혼용한다. Cursor는 AI 코딩에 특화된 코드 에디터 제품으로 에디터형 하네스라 여러 모델을 골라 끼울 수 있고, LangGraph(LangChain이 만든, 에이전트의 실행 흐름을 그래프로 정의하는 프레임워크)나 CrewAI(여러 에이전트에 역할을 부여해 협업시키는 오픈소스 프레임워크)는 하네스를 만드는 프레임워크다.

**하네스는 모델을 바꿔 끼울 수 있다.** Cursor에서 모델을 Claude에서 GPT로 바꿔도 Cursor는 그대로다. 이게 두 층이 분리되어 있다는 증거다.

이 혼동에는 이유가 있다. 2026년 구글 쪽 변화 때문이다. 구글은 2026년 I/O에서 Gemini CLI를 Antigravity CLI로 전환한다고 발표했다. 2026년 6월 18일부로 Gemini CLI와 Gemini Code Assist IDE 확장이 일부 요금제에서 요청 처리를 중단했고, Antigravity 2.0은 데스크톱 앱, Go 기반 CLI, SDK, Google Cloud 엔터프라이즈 티어로 구성된다. 이 네 가지가 하나의 agent harness를 공유하기 때문에, 코어 에이전트가 개선되면 어디서 쓰든 자동 반영된다. Node.js 기반이던 Gemini CLI를 Go로 재작성해 메모리와 시작 시간도 개선했다 (출처: [Google Developers Blog](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/), [Google I/O 2026 developer highlights](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)).

구글이 자기 문서에서 **agent harness라는 단어를 1급 개념으로 쓴다는 사실 자체**가 상징적이다. 하네스는 이제 제품 아키텍처의 중심이다.

---

## 2. Codex와 ChatGPT의 구조 차이

**Codex**는 저장소 위에서 도는 코딩 에이전트 하네스이고, **ChatGPT**는 대화형 어시스턴트 표면이다. 같은 회사가 같은 모델군을 쓰는데도 산출물이 다르다는 점에서, 하네스가 결과를 만든다는 명제의 실증 사례가 된다.

| | ChatGPT | Codex |
|---|---|---|
| 무엇인가 | 대화형 어시스턴트 표면 | 저장소 위에서 도는 코딩 에이전트 하네스 |
| 파일 접근 | 없음 (업로드한 것만) | 지정 디렉터리를 직접 읽고 수정 |
| 명령 실행 | 샌드박스 코드 인터프리터 한정 | 프로젝트에서 실제 명령·테스트 실행 |
| 루프 | 질문 → 답변 (대체로 1턴) | 요청 → 추론 → 도구 실행 → 관찰 → 반복 → 종료 보고 |
| 산출물 | 복사해 붙일 텍스트 | 커밋, diff, PR, 테스트 결과 |
| 지침 파일 | 커스텀 인스트럭션 | AGENTS.md |
| 병렬성 | 없음 | 격리된 worktree에서 여러 에이전트 동시 실행 |

ChatGPT는 무엇인가에 답하고, Codex는 어떻게 고치는가를 실행한다. ChatGPT는 에러를 설명하고, Codex는 에러를 고친다. 계정과 사용량 창을 공유하는 경우도 있어 더 헷갈리는데, 그럴수록 결론이 선명해진다. **차이를 만든 건 모델이 아니라 하네스다.**

(참고: [ChatGPT vs Codex – Same Account, Different Loop](https://www.morphllm.com/comparisons/chatgpt-vs-codex), [AI 코딩 에이전트 비교](https://growwstacks.com/blog/chatgpt-vs-openai-codex-vs-claude-code-best-ai-coding-agent-2026))

---

## 3. Claude Code의 5층 구조

공식 문서는 CLAUDE.md, Skills, MCP, Subagents, Agent Teams, Hooks, Plugins를 각각 독립된 확장 지점으로 설명한다. 아래 5층은 공식 제품 분류가 아니라 **학습용으로 그린 지도**다.

```
5층  Plugins / marketplaces           여러 프로젝트·팀에 배포하는 기능 묶음
4층  Subagents / Agent Teams          일을 나누어 맡는 전문 담당자
3층  Hooks / settings / permissions   자동 실행되는 점검과 차단 = 집행
2층  Skills (SKILL.md, references)    필요할 때 꺼내 쓰는 업무 매뉴얼
1층  CLAUDE.md / auto memory / rules  항상 보이는 기본 규칙 = 요청

 MCP ─ 어느 한 층이 아니라 여러 층 옆에 붙는 외부 연결 통로
```

일상 비유로 풀면 1층은 사무실 벽에 붙은 규칙과 개인 업무 수첩, 2층은 반복 업무용 레시피 카드, 3층은 가스 차단기와 출입카드, 4층은 조사·검토·실행 담당이 있는 작은 팀, 5층은 전 지점에 보내는 표준 운영 패키지다.

이건 전부 켜야 하는 체크리스트가 아니다. 반복되는 문제가 생길 때마다 그 문제에 맞는 층을 하나씩 추가한다.

```
같은 규칙을 두 번 놓쳤다        → CLAUDE.md에 적는다
같은 절차를 세 번째 붙여넣고 있다 → Skill로 뺀다
반드시 매번 실행되어야 하는 검사  → Hook으로 옮긴다
한 작업이 대화를 어지럽힌다      → Subagent에게 맡긴다
여러 저장소에서 같은 걸 쓴다     → Plugin으로 묶는다
```

무엇을 어디에 둘지도 같은 원리로 정해진다.

- **항상 알아야 하는 규칙**: `CLAUDE.md` 또는 `.claude/rules/`
- **가끔 필요한 긴 절차**: Skill
- **반드시 자동으로 실행되어야 하는 검사**: Hook
- **별도 담당자에게 맡겨도 되는 독립 작업**: Subagent
- **여러 프로젝트·팀에 배포할 것**: Plugin
- **외부 도구나 데이터 연결**: MCP

`.claude` 폴더는 작업 서랍장에 해당한다. `CLAUDE.md`는 벽에 붙인 기본 규칙(프로젝트 설명, 명령, 원칙, 구조)이고, `.claude/skills/`는 반복 업무 매뉴얼, `.claude/agents/`는 역할별 담당자 카드(조사자·리뷰어·작성자 subagent), `.claude/settings.json`은 출입카드와 보안 규칙표(권한, 승인 흐름, hooks 설정), `.claude/commands/`는 자주 쓰는 버튼(반복 호출하는 slash command)이다. `~/.claude/`는 개인 책상 서랍으로, 개인 선호와 개인 Skill·명령, 사용자 메모리가 들어간다. **프로젝트 공용 서랍과 개인 서랍은 섞지 않는다.** 회사 냉장고에 공용 반찬과 개인 간식을 뒤섞어 두면 헷갈리는 것과 같다.

---

## 4. CLAUDE.md 운영 규칙 6영역

CLAUDE.md는 두 실수 사이에서 균형을 잡아야 한다. 너무 적게 쓰면 매번 같은 설명을 반복하게 되고, 너무 많이 쓰면 Claude가 무엇을 우선할지 모르게 된다. 담을 내용은 여섯 영역으로 나누면 정리된다.

- **대화 방식**: 인사말 제거, 답변 길이, 모르면 모른다고 말하기. 출력 톤과 불확실성 표시에 해당한다.
- **변경 통제**: 큰 변경 전 확인, 요청 범위만 수정, 변경 요약. 작업 범위와 승인 루프다.
- **사용자·프로젝트 맥락**: 사용자가 누구인지, 무엇을 만드는지, 선호 톤. 기본 컨텍스트다.
- **기억과 연속성**: MEMORY.md, 세션 요약, 실패 기록. 장기 메모리와 인수인계다.
- **개발 작업 안전**: 관련 파일만 수정, 파괴적 작업 전 확인, 스택 고정. 최소 권한과 변경 안전성이다.
- **고위험 행동 차단**: 배포, DB 변경, 외부 전송, 이메일은 사람 승인. 거버넌스 영역이다.

바로 쓸 수 있는 최소 템플릿은 다음과 같다.

```markdown
# CLAUDE.md

## 대화 방식
- 불필요한 인사말 없이 바로 답한다.
- 확실하지 않은 사실·날짜·수치·출처는 먼저 불확실하다고 말한다.
- 간단한 질문은 짧게, 복잡한 작업은 충분히 자세히 답한다.

## 변경 통제
- 사용자가 요청하지 않은 파일·문단·구조는 바꾸지 않는다.
- 큰 변경, 삭제, 덮어쓰기, 외부 전송은 먼저 무엇을 바꿀지 설명하고 확인을 받는다.
- 작업이 끝나면 변경 내용과 확인이 필요한 점을 짧게 정리한다.

## 사용자와 프로젝트 맥락
- 대상 사용자: [예: 하네스 엔지니어링을 처음 접하는 사람]
- 선호 톤: [예: 친절하고 차분하지만 장황하지 않게]
- 피할 것: [예: 검증되지 않은 수치, 과장된 표현]

## 기억과 연속성
- 중요한 결정은 `MEMORY.md`에 남긴다.
- 세션을 끝낼 때 완료한 일, 진행 중인 일, 다음 할 일을 요약한다.

## 개발 작업 안전
- 현재 요청과 직접 관련된 파일과 코드만 수정한다.
- 기술 스택과 테스트 명령은 프로젝트 규칙을 따른다.

## 고위험 행동 차단
- 배포, DB 변경, 외부 전송, 삭제처럼 되돌리기 어려운 행동은 먼저 확인을 받는다.
```

작업이 길어지면 파일을 셋으로 나누는 편이 낫다. `CLAUDE.md`에는 매 세션 적용되는 기본 규칙을, `MEMORY.md`에는 중요한 결정과 세션 요약을, `ERRORS.md`에는 실패한 접근과 해결 방법을 둔다. 며칠에서 몇 주에 걸친 작업, 같은 실수를 반복해서 고치고 싶을 때 각각 효과가 있다.

**CLAUDE.md는 마법의 계약서가 아니다.** 너무 길거나 서로 충돌하는 규칙이 많으면 오히려 품질이 떨어진다. 반드시 지켜야 하는 일은 settings, permissions, hooks, 테스트처럼 더 강한 장치로 옮겨야 한다. 이 요청과 집행의 구분은 [10편](/post/ai-everything-10-safety-governance)에서 본격적으로 다룬다.

---

## 5. 주요 기능 12가지와 5층 대응

주요 기능을 5층 지도 위에 놓으면 이렇게 된다.

- **CLAUDE.md** (1층 기억·규칙): 매번 알아야 하는 원칙을 적는 벽보
- **Permissions** (3층 권한·안전): 읽기/쓰기/실행을 어디까지 허용할지 정하는 출입카드
- **Skills** (2층 업무 매뉴얼): 같은 절차를 계속 설명하고 있다면 레시피로 뺀다
- **Hooks** (3층 자동 점검): 사람이 자주 빼먹는 검사를 가스 차단기처럼 자동화
- **Slash Commands** (운영 버튼): 긴 요청을 짧은 명령으로 바꾼다
- **Plan Mode** (실행 전 승인): 공사 전에 설계도를 먼저 확인한다
- **Checkpoints** (복구 안전망): 문제가 생기면 돌아갈 저장 지점
- **Compaction** (문맥 정리): 긴 회의록 요약. 대화가 길어져 핵심이 묻힐 때
- **Context Control** (1층 문맥 관리): 지금 무엇을 보고 일할지 책상 위 자료를 고른다
- **MCP** (외부 연결 통로): 외부 도구·데이터에 연결하는 전선
- **Subagents** (4층 전문 담당자): 독립 담당자에게 맡기면 더 깨끗한 작업
- **Headless Mode `-p`** (자동화 실행): 사람 없이 반복 실행하는 무인 접수 창구

이 중 특히 효과가 큰 것이 네 가지다.

첫째, **Plan Mode**. 여러 파일을 고치는 작업은 바로 실행시키지 말고 계획부터 본다.

```
먼저 계획만 세워줘. 어떤 파일을 읽고, 무엇을 바꿀지 설명한 뒤 내가 승인하면 진행해.
```

둘째, **Checkpoints와 `/rewind`**. Claude의 파일 편집을 자동 추적해 이전 지점으로 돌아갈 수 있다. 단, Git을 대체하지 않는다. bash 명령으로 바뀐 파일이나 Claude Code 바깥에서 생긴 변경은 되돌릴 수 없는 경우가 있다. checkpoint는 임시 저장이고 Git이 정식 기록이다.

셋째, **`/memory`와 `/compact`**. Claude가 앞의 결정을 놓치는 것처럼 보이면 모델을 탓하기 전에 `/memory`로 지금 어떤 기억이 올라와 있는지 확인한다. 대화가 너무 길면 `/compact`를 쓰되, 요약은 손실이니 중요한 결정은 `MEMORY.md`나 `PROGRESS.md`에도 남긴다.

넷째, **독립 리뷰 세션**. Claude가 직접 만든 결과를 같은 세션에서 검토하게 하면 앞의 가정에 끌린다. 사람이 자기 글의 오탈자를 못 찾는 것과 같다.

```
(새 세션에서)
이 변경사항을 독립 리뷰어 관점으로 검토해줘.
구현 의도는 추측하지 말고, 실제 diff와 테스트 근거만 보고 위험을 찾아줘.
```

이게 [08편 Generator-Evaluator 구조](/post/ai-everything-08-eval-harness)와 연결된다.

자동화 쪽에서는 `-p`와 구조화 출력이 핵심이다.

```bash
claude -p "변경 내용을 검토하고 위험 항목을 JSON으로 요약해줘" --output-format json
```

```bash
claude -p "변경 위험을 분류해줘" --json-schema '{"type":"object","properties":{"risk":{"type":"string"}}}'
```

CI, 반복 검토, 자동 보고서에 쓴다. 다만 **사람이 보지 않는 곳에서 실행되는 Claude일수록 하네스는 더 두꺼워져야 한다.** 입력 범위, 권한, 출력 형식, 실패 시 멈춤 조건이 함께 있어야 한다.

---

## 6. Codex 하네스의 구성 부품

Codex의 기능들을 하네스 관점으로 읽으면 각각이 하나의 부품처럼 보인다.

- **AGENTS.md**: 매장 운영 수칙. 프로젝트 규칙·실행 명령·주의사항을 작업 전에 읽게 한다.
- **Skill**: 반복 업무 레시피 카드. 자주 하는 작업의 절차·자료·스크립트를 재사용 가능하게 묶는다.
- **Subagent**: 따로 보낸 조사 담당자. 독립 작업을 병렬로 맡기고 결과만 회수한다.
- **Worktree**: 별도 작업대. 여러 작업을 서로 방해하지 않고 진행하게 한다.
- **Hook**: 자동으로 켜지는 센서등. 특정 시점에 검사·기록·승인·요약을 자동 실행한다.
- **App Server**: 매장 시스템과 주문 앱의 연결 통로. Codex를 제품·클라이언트 안에 깊게 연결하는 인터페이스다.

OpenAI의 Responses API는 모델 호출을 위한 통합 엔드포인트로, 모델 응답, 도구 호출, built-in tools, function calling, MCP 연결을 한 흐름으로 구성한다. 그 위에 Handoff(전문 에이전트에게 넘기기), Guardrail(결제·외부 발송·민감 정보 처리 전에 멈추는 확인 규칙), Tracing(누가 어떤 도구를 썼는지 남기는 기록), Eval(주기적 품질 점검)이 얹힌다.

OpenAI 하네스 글에서 가장 눈여겨볼 부분은 "에이전트가 코드를 많이 썼다"가 아니라 **에이전트가 스스로 관찰하고 수정할 수 있는 환경을 만들었다**는 점이다. 에이전트가 보기 어려운 환경에서는 오류가 화면에만 흐릿하게 보이고, 테스트 실패 이유가 길고 산만하며, 앱 상태를 사람 눈으로만 확인하고, 문서와 규칙이 여러 채팅방에 흩어져 있다. 반대로 읽기 쉬운 환경에서는 오류 메시지와 로그가 파일과 trace로 남고, 실패 위치·기대값·실제값이 분명하고, 브라우저 검증·스크린샷·접근성 정보로 상태를 확인할 수 있고, 저장소 안의 짧은 지도와 `docs/` 구조로 문서가 정리되어 있으며, 수정 후 `git diff`와 테스트 결과가 남는다.

사람에게 좋은 화면이 항상 에이전트에게 좋은 화면은 아니다. 에이전트에게는 화면뿐 아니라 로그, 테스트 결과, trace, 오류 메시지, 파일 구조, 실행 명령이 모두 인터페이스다.

에이전트가 만드는 것도 코드만이 아니다. 제품 코드 외에 테스트 코드(다음 변경에서도 깨지지 않게 하는 안전망), 문서(다음 에이전트와 사람이 읽을 업무 기억), 릴리스/배포 도구, eval 케이스(하네스가 좋아졌는지 비교하는 시험지), trace와 대시보드(어디서 실패했는지 찾는 계기판), 리뷰 응답(의사결정과 수정 이유의 기록)이 함께 나온다. "AI가 코드를 써준다"로만 이해하면 하네스의 절반만 보는 셈이다.

---

## 7. 세 진영의 강조점 비교

세 회사의 하네스 담론은 강조점이 다르다.

Anthropic은 하네스를 **조직 지식의 결정체**로 본다. CLAUDE.md, hooks, skills, agents가 대표 구조이고, 가장 경계하는 것은 staleness, 즉 하네스 파일이 낡아 생기는 컨텍스트 드리프트다. 다음 방향으로는 세션 상태 관리, 게이트 시스템, 레이어드 아키텍처를 이야기한다.

OpenAI는 개발자를 **환경 설계자**로 다시 정의한다. AGENTS.md와 에이전트 간 코드 리뷰 루프가 대표 구조이고, 1,000페이지 매뉴얼 대신 지도를 주라고 경계한다. 다음 방향은 Self-Harness, 즉 에이전트가 하네스를 스스로 개선하는 것이다.

Google은 **관찰 가능성**을 하네스의 생명선으로 놓는다. MCP(Model Context Protocol, Anthropic이 2024년 공개한 AI-도구 연결 표준)와 A2A(Agent2Agent Protocol, Google이 주도한 에이전트 간 통신 표준) 같은 표준 레이어가 대표 구조이고, 복잡한 하네스는 수명이 짧다고 경계하며, 표준화를 통한 멀티에이전트 민주화를 다음 방향으로 잡는다.

강조점은 갈리지만 합의도 있다. 하네스는 프롬프트·컨텍스트 엔지니어링의 대체가 아니라 상위 레이어이고, 모델 선택보다 하네스 설계가 프로덕션 결과에 더 큰 영향을 주며, 하네스 부재는 에이전틱 AI 프로젝트의 주요 실패 원인이 될 수 있고, 개발자가 아닌 사람도 참여할 수 있지만 레벨이 올라갈수록 기술 요구가 커진다는 것이다.

하네스 파일이 낡으며 쌓이는 부채인 **harness debt**도 이 맥락에서 나온 개념이다. 자세한 것은 [10편의 하네스 가비지 컬렉션](/post/ai-everything-10-safety-governance)에서 다룬다.

---

## 8. 도입 순서

거창하게 시작할 필요는 없다. 프로젝트 루트에 짧은 CLAUDE.md(또는 AGENTS.md)를 만들어 매번 다시 말하지 않아도 되는 기본 규칙의 감각을 익히고, 반복해서 붙여넣는 절차를 Skill로 만들고, 꼭 실행해야 하는 검사를 Hook으로 옮기고, 긴 조사나 독립 검토를 Subagent에게 맡기고, 여러 프로젝트에서 쓰는 구성이 생기면 그때 Plugin으로 묶는다. 순서대로 하나씩이다.

**읽기 전용 리뷰부터 시작하면 권한과 검증 흐름을 안전하게 익힐 수 있다.**

---

## 9. 정리

Gemini는 모델이고 구글의 하네스는 Antigravity(구 Gemini CLI)다. 모델과 하네스는 다른 층위이며, 같은 회사·같은 모델군인데 결과가 다른 Codex와 ChatGPT가 그 가장 깨끗한 증거다. Claude Code는 규칙/매뉴얼/집행/분업/배포의 5층으로 읽으면 정리되고, MCP는 옆에 붙는 통로다. CLAUDE.md는 마법의 계약서가 아니므로 요청(context)과 집행(hook/permission)을 구분해야 하고, Codex의 부품들(AGENTS.md · Skill · Subagent · Worktree · Hook · App Server)도 같은 원리로 읽힌다. 좋은 하네스는 에이전트가 로그·테스트·trace·diff를 읽고 스스로 다음 행동을 정할 수 있게 만들며, 세 진영 모두 모델 선택보다 하네스 설계가 프로덕션 결과에 더 큰 영향을 준다는 데 동의한다.

---

## 더 읽을거리

- Claude Code Docs – <https://code.claude.com/docs/en/overview>
- Anthropic, *Building agents with the Claude Agent SDK* – <https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk>
- OpenAI, *Harness engineering* – <https://openai.com/index/harness-engineering/>
- OpenAI Codex, *Custom instructions with AGENTS.md* – <https://developers.openai.com/codex/guides/agents-md>
- Google Developers Blog, *Transitioning Gemini CLI to Antigravity CLI* – <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- 김동학, 《하네스 엔지니어링 백과사전》 제6장·제7장 – <https://wikidocs.net/346798>, <https://wikidocs.net/346799>

---

다음 편: [07. 멀티에이전트](/post/ai-everything-07-multi-agent)
이전 편: [05. 도구 엔지니어링과 MCP](/post/ai-everything-05-tools-and-mcp)
