---
id: "ai-everything-06-harness-products"
title: "AI의 모든 것 (06) — Claude Code · Codex · Antigravity: 모델과 하네스를 헷갈리지 말 것"
description: "Gemini는 모델이지 하네스가 아니다 — Claude Code 5층 구조, Codex 부품 지도, Antigravity 전환."
date: "2026-08-02 10:00"
category: "ai"
tags: ["ClaudeCode", "Codex", "Antigravity", "Gemini", "AGENTS.md", "Hooks", "Plugin"]
published: true
---


> 이 편에서 정리할 것
> 1. **모델과 하네스는 다른 층위다** — 가장 흔한 혼동 바로잡기
> 2. Codex와 ChatGPT의 차이 = 이 시리즈 최고의 실증 사례
> 3. Claude Code를 **5층 하네스**로 읽는 법
> 4. Codex의 하네스 부품 지도

---

## 1. 가장 흔한 혼동부터 잡자

많은 사람이 이렇게 정리한다.

```
❌ OpenAI  : codex
❌ Anthropic : claude code
❌ Google  : gemini
```

앞의 둘은 하네스 이름이 맞지만 **세 번째가 틀렸다. Gemini는 모델이다.** 세 개를 나란히 놓으면 층위가 어긋난다.

### 정확한 3열 표 (2026년 8월 기준)

| 회사 | **모델** (엔진) | **하네스** (운영체제) |
|---|---|---|
| **Anthropic** | Claude — Opus 5 / Sonnet 5 / Haiku 4.5 / Fable 5 | **Claude Code** (CLI · 데스크톱 · 웹 · IDE), Claude Agent SDK |
| **OpenAI** | GPT-5.x 계열 | **Codex** (CLI · 앱 · 클라우드), Agents SDK, Responses API |
| **Google** | **Gemini** 3.x 계열 | **Antigravity** (데스크톱 · CLI · SDK), Jules |

그 외에 흔히 섞이는 이름들:

| 이름 | 정체 |
|---|---|
| ChatGPT | **제품/표면** (모델은 GPT 계열) |
| Claude (앱) | **제품/표면** (모델은 Claude 계열) |
| Kimi | **모델** (Moonshot AI) |
| Perplexity | **제품/하네스** (검색 특화, 내부 모델은 여러 개 혼용) |
| Cursor | **하네스** (에디터형, 여러 모델 선택 가능) |
| LangGraph / CrewAI | **하네스 프레임워크** |

**하네스는 모델을 바꿔 끼울 수 있다.** Cursor에서 모델을 Claude ↔ GPT로 바꿔도 Cursor는 그대로다. 이게 두 층이 분리되어 있다는 증거다.

### 2026년 구글 쪽 변화를 특히 주의

구글은 2026년 I/O에서 **Gemini CLI를 Antigravity CLI로 전환**한다고 발표했다.

- 2026년 6월 18일부로 Gemini CLI와 Gemini Code Assist IDE 확장이 일부 요금제에서 요청 처리를 중단
- Antigravity 2.0 = 데스크톱 앱 + **Go 기반** CLI + SDK + Google Cloud 엔터프라이즈 티어
- 네 가지가 **하나의 agent harness를 공유**한다. 코어 에이전트가 개선되면 어디서 쓰든 자동 반영
- Node.js 기반이던 Gemini CLI를 Go로 재작성해 메모리·시작 시간 개선

(출처: [Google Developers Blog](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/), [Google I/O 2026 developer highlights](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/))

**구글이 자기 문서에서 "agent harness"라는 단어를 1급 개념으로 쓴다는 사실 자체**가 이 시리즈의 논지를 뒷받침한다. 하네스는 이제 제품 아키텍처의 중심이다.

---

## 2. Codex와 ChatGPT의 차이 — 같은 회사, 같은 모델군, 다른 결과

이건 "하네스가 결과를 만든다"는 명제의 **가장 깨끗한 실증 사례**다.

| | **ChatGPT** | **Codex** |
|---|---|---|
| 무엇인가 | 대화형 어시스턴트 표면 | 저장소 위에서 도는 코딩 에이전트 하네스 |
| 파일 접근 | 없음 (업로드한 것만) | 지정 디렉터리를 직접 읽고 **수정** |
| 명령 실행 | 샌드박스 코드 인터프리터 한정 | 프로젝트에서 실제 명령·테스트 실행 |
| 루프 | 질문 → 답변 (대체로 1턴) | 요청 → 추론 → 도구 실행 → 관찰 → 반복 → 종료 보고 |
| 산출물 | 복사해 붙일 텍스트 | 커밋, diff, PR, 테스트 결과 |
| 지침 파일 | 커스텀 인스트럭션 | **AGENTS.md** |
| 병렬성 | 없음 | 격리된 worktree에서 여러 에이전트 동시 실행 |

> **ChatGPT는 "무엇인가"에 답하고, Codex는 "어떻게 고치는가"를 실행한다.**
> ChatGPT는 에러를 설명하고, Codex는 에러를 고친다.

계정과 사용량 창을 공유하는 경우도 있어 더 헷갈리는데, 그럴수록 결론이 선명해진다. **차이를 만든 건 모델이 아니라 하네스다.**

(참고: [ChatGPT vs Codex — Same Account, Different Loop](https://www.morphllm.com/comparisons/chatgpt-vs-codex), [AI 코딩 에이전트 비교](https://growwstacks.com/blog/chatgpt-vs-openai-codex-vs-claude-code-best-ai-coding-agent-2026))

---

## 3. Claude Code를 5층 하네스로 읽기

공식 문서는 CLAUDE.md, Skills, MCP, Subagents, Agent Teams, Hooks, Plugins를 **각각 독립된 확장 지점**으로 설명한다. 아래 "5층"은 공식 제품 분류가 아니라 **학습을 돕기 위한 지도**다.

```
5층  Plugins / marketplaces           여러 프로젝트·팀에 배포하는 기능 묶음
4층  Subagents / Agent Teams          일을 나누어 맡는 전문 담당자
3층  Hooks / settings / permissions   자동 실행되는 점검과 차단 = 집행
2층  Skills (SKILL.md, references)    필요할 때 꺼내 쓰는 업무 매뉴얼
1층  CLAUDE.md / auto memory / rules  항상 보이는 기본 규칙 = 요청

 MCP ─ 어느 한 층이 아니라 여러 층 옆에 붙는 외부 연결 통로
```

| 층 | 구성요소 | 하네스 역할 | 일상 비유 |
|---|---|---|---|
| 1층 | CLAUDE.md, auto memory, `.claude/rules/` | 항상 보이는 기본 규칙과 오래 남길 기억 | 사무실 벽에 붙은 규칙, 개인 업무 수첩 |
| 2층 | Skills | 필요할 때 꺼내 쓰는 업무 매뉴얼 | 반복 업무용 레시피 카드 |
| 3층 | Hooks, settings, permissions | 특정 순간 자동 실행되는 점검과 차단 | 가스 차단기, 출입카드 |
| 4층 | Subagents, Agent Teams | 일을 나누어 맡는 전문 담당자 구조 | 조사·검토·실행 담당이 있는 작은 팀 |
| 5층 | Plugins, marketplaces | 배포 가능한 기능 묶음 | 전 지점에 보내는 표준 운영 패키지 |

**"전부 켜야 하는 체크리스트"가 아니다.** 반복되는 문제가 생길 때마다 그 문제에 맞는 층을 하나씩 추가한다.

```
같은 규칙을 두 번 놓쳤다        → CLAUDE.md에 적는다
같은 절차를 세 번째 붙여넣고 있다 → Skill로 뺀다
반드시 매번 실행되어야 하는 검사  → Hook으로 옮긴다
한 작업이 대화를 어지럽힌다      → Subagent에게 맡긴다
여러 저장소에서 같은 걸 쓴다     → Plugin으로 묶는다
```

### 판단 기준표 — "이건 어디에 넣지?"

| 질문 | 어울리는 위치 |
|---|---|
| 항상 알아야 하는 규칙인가? | `CLAUDE.md` 또는 `.claude/rules/` |
| 가끔 필요한 긴 절차인가? | **Skill** |
| 반드시 자동으로 실행되어야 하는 검사인가? | **Hook** |
| 별도 담당자에게 맡겨도 되는 독립 작업인가? | **Subagent** |
| 여러 프로젝트·팀에 배포할 것인가? | **Plugin** |
| 외부 도구나 데이터에 연결해야 하는가? | **MCP** |

### `.claude` 폴더 = 작업 서랍장

| 위치 | 비유 | 담는 내용 |
|---|---|---|
| `CLAUDE.md` | 벽에 붙인 기본 규칙 | 프로젝트 설명, 명령, 원칙, 구조 |
| `.claude/skills/` | 반복 업무 매뉴얼 | 특정 업무를 수행하는 Skill |
| `.claude/agents/` | 역할별 담당자 카드 | 조사자·리뷰어·작성자 subagent |
| `.claude/settings.json` | 출입카드와 보안 규칙표 | 권한, 승인 흐름, hooks 설정 |
| `.claude/commands/` | 자주 쓰는 버튼 | 반복 호출하는 slash command |
| `~/.claude/` | **개인 책상 서랍** | 개인 선호, 개인 Skill·명령, 사용자 메모리 |

**프로젝트 공용 서랍(`.claude/`)과 개인 서랍(`~/.claude/`)을 섞지 마라.** 회사 냉장고에 모두가 먹을 반찬과 내 개인 간식을 뒤섞어 두면 헷갈린다.

---

## 4. CLAUDE.md 운영 규칙 6영역

CLAUDE.md를 처음 만들 때 흔한 실수는 두 가지다. **너무 적게 써서** 매번 같은 설명을 반복하거나, **너무 많이 써서** Claude가 무엇을 우선할지 모르게 만드는 것.

| 영역 | 담을 내용 | 일상 비유 | 하네스 관점 |
|---|---|---|---|
| 1. **대화 방식** | 인사말 제거, 답변 길이, 모르면 모른다고 | 대화 예절 | 출력 톤과 불확실성 표시 |
| 2. **변경 통제** | 큰 변경 전 확인, 요청 범위만 수정, 변경 요약 | 물건 옮기기 전 허락받기 | 작업 범위와 승인 루프 |
| 3. **사용자·프로젝트 맥락** | 내가 누구인지, 무엇을 만드는지, 톤 | 자기소개 | 기본 컨텍스트와 선호도 |
| 4. **기억과 연속성** | MEMORY.md, 세션 요약, 실패 기록 | 가족 회의록과 실수 노트 | 장기 메모리와 인수인계 |
| 5. **개발 작업 안전** | 관련 파일만 수정, 파괴적 작업 전 확인, 스택 고정 | 공구함 사용 규칙 | 최소 권한과 변경 안전성 |
| 6. **고위험 행동 차단** | 배포, DB 변경, 외부 전송, 이메일 승인 | 현관 열쇠와 결제 카드 | 사람 승인과 거버넌스 |

### 바로 쓰는 최소 템플릿

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

### 세 개 파일로 나누기

| 파일 | 역할 | 언제 쓰면 좋은가 |
|---|---|---|
| `CLAUDE.md` | 매 세션 적용되는 기본 규칙 | 말투·배경·수정 원칙을 반복 설명하기 싫을 때 |
| `MEMORY.md` | 중요한 결정과 세션 요약 | 며칠~몇 주에 걸친 작업을 할 때 |
| `ERRORS.md` | 실패한 접근과 해결 방법 | 같은 실수를 반복해서 고치고 싶을 때 |

> ⚠️ **CLAUDE.md는 마법의 계약서가 아니다.**
> 너무 길거나 서로 충돌하는 규칙이 많으면 오히려 품질이 떨어진다.
> 반드시 지켜야 하는 일은 settings, permissions, hooks, 테스트처럼 **더 강한 장치**로 옮겨야 한다.
> 가족 규칙표에 "불조심"을 적어 두는 것만으로 부족하고, 실제로 가스 차단기와 화재경보기가 필요한 것과 같다.

---

## 5. Claude Code 파워 기능 12가지 — 5층 지도에 붙이기

| 기능 | 하네스 위치 | 쉬운 비유 | 핵심 질문 |
|---|---|---|---|
| CLAUDE.md | 1층 기억·규칙 | 벽에 붙은 기본 규칙 | 매번 알아야 하는 원칙인가? |
| Permissions | 3층 권한·안전 | 출입카드와 잠금장치 | 읽기/쓰기/실행을 어디까지? |
| Skills | 2층 업무 매뉴얼 | 반복 업무 레시피 | 같은 절차를 계속 설명하고 있나? |
| Hooks | 3층 자동 점검 | 가스 차단기 | 사람이 자주 빼먹는 검사인가? |
| Slash Commands | 운영 버튼 | 단골 주문 버튼 | 긴 요청을 짧은 명령으로 바꿀 수 있나? |
| **Plan Mode** | 실행 전 승인 | 공사 전 설계도 확인 | 바로 실행하기 전에 계획을 봐야 하나? |
| **Checkpoints** | 복구 안전망 | 저장 지점과 되돌리기 | 문제 생기면 어디로 돌아가나? |
| Compaction | 문맥 정리 | 긴 회의록 요약 | 대화가 길어져 핵심이 묻히나? |
| Context Control | 1층 문맥 관리 | 책상 위 자료 고르기 | 지금 무엇을 보고 일해야 하나? |
| MCP | 외부 연결 통로 | 외부 창고와 연결된 전선 | 어떤 도구·데이터에 연결하나? |
| Subagents | 4층 전문 담당자 | 역할을 나눈 팀원 | 독립 담당자에게 맡기면 더 깨끗한가? |
| Headless Mode (`-p`) | 자동화 실행 | 무인 접수 창구 | 사람 없이 반복 실행할 일인가? |

### 특히 실무에서 효과가 큰 4가지

**① Plan Mode** — 여러 파일을 고치는 작업은 바로 실행시키지 말고 계획부터 본다.

```
먼저 계획만 세워줘. 어떤 파일을 읽고, 무엇을 바꿀지 설명한 뒤 내가 승인하면 진행해.
```

**② Checkpoints / `/rewind`** — Claude의 파일 편집을 자동 추적해 이전 지점으로 돌아갈 수 있다. 단, **Git을 대체하지 않는다.** bash 명령으로 바뀐 파일이나 Claude Code 바깥에서 생긴 변경은 되돌릴 수 없는 경우가 있다.

> checkpoint = 임시 저장, Git = 정식 기록.

**③ `/memory`와 `/compact`** — Claude가 앞의 결정을 놓치는 것처럼 보이면 모델을 탓하기 전에 `/memory`로 "지금 어떤 기억이 올라와 있는가"를 확인한다. 대화가 너무 길면 `/compact`. 단 요약은 손실이니 중요한 결정은 `MEMORY.md` / `PROGRESS.md`에도 남긴다.

**④ 독립 리뷰 세션** — Claude가 직접 만든 결과를 같은 세션에서 검토하게 하면 앞의 가정에 끌린다. 사람이 자기 글의 오탈자를 못 찾는 것과 같다.

```
(새 세션에서)
이 변경사항을 독립 리뷰어 관점으로 검토해줘.
구현 의도는 추측하지 말고, 실제 diff와 테스트 근거만 보고 위험을 찾아줘.
```

이게 [08편 Generator-Evaluator 구조](/post/ai-everything-08-eval-harness)와 연결된다.

### 자동화: `-p`와 구조화 출력

```bash
claude -p "변경 내용을 검토하고 위험 항목을 JSON으로 요약해줘" --output-format json
```

```bash
claude -p "변경 위험을 분류해줘" --json-schema '{"type":"object","properties":{"risk":{"type":"string"}}}'
```

CI, 반복 검토, 자동 보고서에 쓴다. **다만 사람이 보지 않는 곳에서 실행되는 Claude일수록 하네스는 더 두꺼워져야 한다.** 입력 범위, 권한, 출력 형식, 실패 시 멈춤 조건이 함께 있어야 한다.

---

## 6. Codex 하네스 부품 지도

Codex의 기능들을 하네스 관점으로 읽으면 각각이 하나의 부품처럼 보인다.

| Codex 구성요소 | 일상 비유 | 하네스에서 하는 일 |
|---|---|---|
| **AGENTS.md** | 매장 운영 수칙 | 프로젝트 규칙·실행 명령·주의사항을 작업 전에 읽게 한다 |
| **Skill** | 반복 업무 레시피 카드 | 자주 하는 작업의 절차·자료·스크립트를 재사용 가능하게 묶는다 |
| **Subagent** | 따로 보낸 조사 담당자 | 독립 작업을 병렬로 맡기고 결과만 회수한다 |
| **Worktree** | 별도 작업대 | 여러 작업을 서로 방해하지 않고 진행하게 한다 |
| **Hook** | 자동으로 켜지는 센서등 | 특정 시점에 검사·기록·승인·요약을 자동 실행 |
| **App Server** | 매장 시스템과 주문 앱의 연결 통로 | Codex를 제품·클라이언트 안에 깊게 연결하는 인터페이스 |

동네 카페 비유: 운영 수칙(위생 기준·마감 절차) + 레시피 카드(음료 제조 순서) + 직원 분담(원가 조사 / 포스터 문구) + 별도 작업대(신메뉴 실험) + 자동 체크리스트(마감 시간). **이 전체가 카페 운영 하네스다.**

### OpenAI Responses API — 도구를 하나의 흐름으로

Responses API는 모델 응답, 도구 호출, built-in tools, function calling, MCP 연결을 한 흐름으로 구성한다.

| OpenAI 구성요소 | 개인 비서 사무실에서의 모습 |
|---|---|
| Responses API | 모든 요청이 처음 들어오는 접수 창구 |
| Function calling | 캘린더·메일·예약 앱을 실제로 여는 행동 |
| Built-in tools | 검색·파일 찾기·계산 같은 기본 도구 |
| Handoff | 법무·회계·여행 예약처럼 전문 담당자에게 넘기기 |
| Guardrail | 결제·외부 발송·민감 정보 처리 전에 멈추는 확인 규칙 |
| Tracing | 누가 어떤 도구를 썼고 어떤 결과가 나왔는지 남기는 업무 일지 |
| Eval | 비서 업무가 정확했는지 주기적으로 확인하는 점검표 |

### 에이전트가 **읽기 쉬운** 애플리케이션

OpenAI 하네스 글에서 가장 눈여겨볼 부분은 "에이전트가 코드를 많이 썼다"가 아니라 **"에이전트가 스스로 관찰하고 수정할 수 있는 환경을 만들었다"** 는 점이다.

| 에이전트가 보기 어려운 환경 | 에이전트가 읽기 쉬운 환경 |
|---|---|
| 오류가 화면에만 흐릿하게 보인다 | 오류 메시지와 로그가 파일·trace로 남는다 |
| 테스트 실패 이유가 길고 산만하다 | 실패 위치·기대값·실제값이 분명하다 |
| 앱 상태를 사람 눈으로만 확인한다 | 브라우저 검증·스크린샷·접근성 정보로 확인한다 |
| 문서와 규칙이 여러 채팅방에 흩어져 있다 | 저장소 안의 짧은 지도와 `docs/` 구조로 정리된다 |
| 수정 후 무엇이 바뀌었는지 알기 어렵다 | `git diff`, 테스트 결과, 리뷰 체크리스트가 남는다 |

**사람에게 좋은 화면이 항상 에이전트에게 좋은 화면은 아니다.** 에이전트에게는 화면뿐 아니라 로그, 테스트 결과, trace, 오류 메시지, 파일 구조, 실행 명령이 모두 인터페이스다.

### 에이전트가 만드는 것은 코드만이 아니다

| 산출물 | 하네스 관점 |
|---|---|
| 제품 코드 | 사용자가 직접 만나는 기능 |
| 테스트 코드 | 다음 변경에서도 깨지지 않게 하는 안전망 |
| 문서 | 다음 에이전트와 사람이 읽을 업무 기억 |
| 릴리스/배포 도구 | 반복 배포를 손으로 하지 않게 하는 절차 |
| eval 케이스 | 하네스가 좋아졌는지 비교하는 시험지 |
| trace와 대시보드 | 어디서 실패했는지 찾는 계기판 |
| 리뷰 응답 | 의사결정과 수정 이유를 남기는 작업 기록 |

**"AI가 코드를 써준다"로만 이해하면 하네스의 절반만 보는 셈이다.**

---

## 7. 세 진영의 강조점 비교

| | **Anthropic / Claude** | **OpenAI / Codex** | **Google / Gemini** |
|---|---|---|---|
| 핵심 강조 | 하네스는 **조직 지식의 결정체** | **환경 설계자**로서의 개발자 | **관찰 가능성**이 하네스의 생명선 |
| 대표 구조 | CLAUDE.md + hooks + skills + agents | AGENTS.md + 에이전트 간 코드 리뷰 루프 | MCP + A2A 표준 레이어 |
| 가장 경계하는 것 | **Staleness** — 하네스 파일이 낡아 컨텍스트 드리프트 | 1,000페이지 매뉴얼 (지도를 줘라) | 복잡한 하네스는 수명이 짧다 |
| 다음 방향 | 세션 상태 관리, 게이트 시스템, 레이어드 아키텍처 | **Self-Harness** — 에이전트가 하네스를 스스로 개선 | 표준화로 멀티에이전트 민주화 |

**세 관점의 합의:**

1. 하네스는 프롬프트·컨텍스트 엔지니어링의 **대체가 아니라 상위 레이어**다
2. 모델 선택보다 **하네스 설계가 프로덕션 결과에 더 큰 영향**을 준다
3. **하네스 부재는 에이전틱 AI 프로젝트의 주요 실패 원인**이 될 수 있다
4. 개발자가 아닌 사람도 참여할 수 있지만, 레벨이 올라갈수록 기술 요구가 커진다

**새로 등장한 개념: Harness Debt.** 하네스 파일이 stale해지면서 쌓이는 부채. 기존 기술 부채만큼 심각하지만 **아직 측정 도구가 없다.**

---

## 8. 처음 익히는 순서

| 순서 | 먼저 해볼 일 | 익히는 감각 |
|---|---|---|
| 1 | 프로젝트 루트에 **짧은 CLAUDE.md**(또는 AGENTS.md)를 만든다 | 매번 다시 말하지 않아도 되는 기본 규칙 |
| 2 | 반복해서 붙여넣는 절차를 **Skill**로 만든다 | 긴 프롬프트 → 재사용 가능한 매뉴얼 |
| 3 | 꼭 실행해야 하는 검사를 **Hook**으로 옮긴다 | 부탁 → 자동 점검 |
| 4 | 긴 조사·독립 검토를 **Subagent**에게 맡긴다 | 주 대화의 책상을 깨끗하게 |
| 5 | 여러 프로젝트에서 쓰는 구성을 **Plugin**으로 묶는다 | 개인 설정 → 팀·조직 운영 패키지 |

**읽기 전용 리뷰부터 시작하는 것을 권한다.** 권한과 검증 흐름을 안전하게 익힐 수 있다.

---

## 9. 이 편의 요약

- **Gemini는 모델이다. 구글의 하네스는 Antigravity(구 Gemini CLI)다.** 모델과 하네스는 다른 층위
- **Codex ≠ ChatGPT.** 같은 회사·같은 모델군인데 결과가 다른 것은 순전히 하네스 차이다
- Claude Code는 **5층 하네스**로 읽으면 정리된다: 규칙 / 매뉴얼 / 집행 / 분업 / 배포. MCP는 옆에 붙는 통로
- "이건 어디에 넣지?"의 답: 항상 알아야 하면 CLAUDE.md, 가끔 필요한 긴 절차면 Skill, 반드시 실행되어야 하면 Hook, 독립 작업이면 Subagent
- **CLAUDE.md는 마법의 계약서가 아니다.** 요청(context)과 집행(hook/permission)을 구분하라
- Codex의 부품(AGENTS.md · Skill · Subagent · Worktree · Hook · App Server)도 같은 원리
- 좋은 하네스는 에이전트가 **로그·테스트·trace·diff를 읽고 스스로 다음 행동을 정할 수 있게** 만든다
- 세 진영의 합의: **모델 선택보다 하네스 설계가 프로덕션 결과에 더 큰 영향**을 준다

---

## 더 읽을거리

- Claude Code Docs — <https://code.claude.com/docs/en/overview>
- Anthropic, *Building agents with the Claude Agent SDK* — <https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk>
- OpenAI, *Harness engineering* — <https://openai.com/index/harness-engineering/>
- OpenAI Codex, *Custom instructions with AGENTS.md* — <https://developers.openai.com/codex/guides/agents-md>
- Google Developers Blog, *Transitioning Gemini CLI to Antigravity CLI* — <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- 김동학, 《하네스 엔지니어링 백과사전》 제6장·제7장 — <https://wikidocs.net/346798>, <https://wikidocs.net/346799>

---

👉 다음 편: [07. 멀티에이전트](/post/ai-everything-07-multi-agent)
👈 이전 편: [05. 도구 엔지니어링과 MCP](/post/ai-everything-05-tools-and-mcp)
