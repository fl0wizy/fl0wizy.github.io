---
id: "ai-study-notes-verified"
title: "AI의 모든 것 (부록) – 내 학습 노트 팩트체크 리포트"
description: "내가 공부하며 적은 노트 원문을 보존하고, 15개 항목을 맞음/보정/틀림으로 판정한 팩트체크 리포트."
date: "2026-08-02 08:50"
category: "ai"
tags: ["AI", "LLM", "하네스", "팩트체크", "검증노트"]
published: true
---

# 내 학습 노트 원문 + 팩트체크 리포트

이 문서는 두 부분이다. 먼저 내가 공부하며 적은 노트를 한 글자도 빼지 않고 그대로 보존하고, 그다음 각 주장을 O 맞음 / △ 부분적으로 맞음(용어·범위 보정 필요) / X 틀림으로 판정하면서 근거와 정정문을 붙인다.

판정 원칙은 하나다. **결론이 아니라 전제를 검증한다.** "AI = LLM + 하네스"라는 결론이 실용적으로 유용해도, 그 안에 깔린 "AI라는 말의 범위"라는 전제가 틀렸으면 나중에 다른 곳에서 깨진다.

---

## 1부. 원문 (수정 없음)

> AI = artificial intelligence (인공 지능) → LLM(토큰 가중치를 이용해서 다음 말을 예측) + 하네스(예측한 말들을 통해 행동 양식을 정할 수 있게 도와주는 LLM 보조 프레임워크)
>
> input Token → LLM → output Token 이런 구조로 되어 있고, 여기서 오고가는 데이터를 통해 실제로 행동하고, 사고에 도움을 주고, LLM의 보조도구를 하네스라고 부름.
>
> openAI, Anthropic, google 등은 이 하네스를 본인들의 LLM 서버의 능력치에 맞게 임의로 만들어준 것임.
> 각각의 모델이 바로
>
> * openAI : codex(codex와 챗GPT의 차이가 무엇인가?)
> * Anthropic : claude code
> * google : gemini
>
> 등등 …
>
> 하네스나 skill이 아무리 많아도 LLM과 소통하는 agent가 한개라면 이건 단일 AI agent라고 볼 수 있을 것 같다. 인공 지능이라는 것을 구현하는 것은 LLM이라는 모델에서 나오는 것이기 때문이다. 하지만 하나의 하네스가 오케스트레이션으로 에이전트를 여러 개 만들어서 각각 같은 LLM(claude LLM, codex LLM 등)에게 input Token을 주고, Output Token을 받는다면 그것은 멀티 에이전트라고 볼 수 있을 것 같다.(하나의 모델에 대해 여러 에이전트가 응답을 하는 것이 멀티에이전트가 맞나? 하나의 세션에서 10개의 세션을 오케스트레이션하는데 그 10개의 에이전트가 모두 opus 4.8과만 소통한다면 이게 멀티 에이전트 맞는가? gemini, codex, falbe 이런식으로 모델이 섞일 필요는 없나?
>
> MCP 호출, 웹 검색 등은 모두 하네스(claude code, codex)에서 이루어진다. LLM이 직접 조회하는 것이 아니다. 대신 조회 관련된 명령어와 명령 문구는 모두 LLM이 output Token으로 뱉어줄 것이다.
>
> 자연어(프롬프트)를 토큰으로 바꿔서 전달하고 전달받음. 그러면 claude code(하네스)에 있는가? (Token, 모델마다 다름. gemini, claude 각각이 정의하는 토큰의 개념이 다름. 크기가 다르다던가)
>
> 하네스 엔지니어링 : claude code와 같이 LLM을 보조하는 프레임워크를 개선한다.
> 방법 :
>
> 1. 시스템 프롬프트 제어
> 2. claude code에 skill, MCP를 붙여서 특정 행동을 강제한다.(output Token을 받았을 때 그것을 특정 MCP에 넣는다거나, output token에서 특정 행동을 요구했을 때 skill에 md파일로 정의된 순서로 행동한다)
> 3. claude code, gemini, codex, kimi, perplexity.. (각각이 기본적 행동양식이 구현되어 있음, 기본 하네스)
>
> claude code : 어떤 프롬프트, 어떠한 세션이든 LLM에게 넘기기 전에 claude.md를 세션 메모리에 로드해서 같이 → A를 하면 B를 해라.
>
> 하네스를 만드는 사람이 아님. 기존의 하네스를 본인만의 색깔과 본인이 필요한 행동을 강제할 수 있게 엔지니어링 하는 행위 혹은 행위자 → 하네스 엔지니어링
>
> claude code를 움직이게 하는 Token : LLM의 output Token
> 우리가 넣는 프롬프트로는 먼저 움직이지 않음. (Token이 뜨면 그만큼 LLM서버에서 소모한거임)
> 바로 LLM에 보내서 LLM OutputToken을 받음. 이것으로 claude code(하네스)가 움직임.
>
> 하네스
>
> 1. 시스템 프롬프트
> 2. 오케스트레이션(개량 및 연구해서 수정)
> 3. …

---

## 2부. 팩트체크 총평

| # | 주장 | 판정 |
|---|------|------|
| 1 | AI = LLM + 하네스 | 범위 오류 – `Agent = Model + Harness`가 정확 |
| 2 | LLM은 "토큰 가중치"로 다음 말을 예측 | 용어 오류 – 가중치는 모델 파라미터, 출력은 확률분포 |
| 3 | input Token → LLM → output Token | 맞음 (단, output이 텍스트만은 아님) |
| 4 | 하네스 = LLM 보조 프레임워크 | 맞음, 업계 정의와 일치 |
| 5 | google의 하네스 = gemini | **틀림** – Gemini는 모델. 하네스는 Gemini CLI → Antigravity CLI |
| 6 | Codex와 ChatGPT의 차이 | (질문) 모델 차이가 아니라 **하네스 차이** |
| 7 | 에이전트 1개면 단일 에이전트 | 기준을 "에이전트 수"가 아니라 "독립 컨텍스트 루프 수"로 |
| 8 | 같은 모델만 써도 멀티에이전트인가? | **맞다. 모델이 섞일 필요 없다** |
| 9 | MCP·웹검색은 모두 하네스에서 실행 | 대체로 맞지만 예외 – server tool은 제공자 서버에서 실행 |
| 10 | 토크나이저가 claude code에 있나? | **아니다** – 토큰화는 제공자 서버에서 |
| 10b | 토큰은 모델마다 다르다 | 맞음 |
| 11 | 하네스 엔지니어링 3가지 방법 | 맞지만 "요청 계층"과 "집행 계층"이 빠짐 |
| 12 | CLAUDE.md는 LLM에 넘기기 전 로드된다 | 맞음 (단, 보안장치는 아님) |
| 13 | 하네스 엔지니어링 = 기존 하네스를 내 색으로 | 실무적으로 정확한 정의 |
| 14 | claude code를 움직이는 건 output Token | 핵심은 맞지만 "LLM 호출 이전 단계"가 존재 |
| 15 | 다이어그램(미들웨어 위치) | 구조 맞음, 화살표 방향만 보정 |

요약하면 14개 항목 중 명백한 오류 2개(#5, #10), 보정 필요 6개, 나머지는 맞다. 특히 #8(멀티에이전트에 모델 다양성이 필요 없다)은 스스로 던진 질문에 스스로 옳은 답을 내린 경우다.

---

## 3부. 항목별 상세

### #1 [보정] "AI = LLM + 하네스"

결론(오늘의 AI 제품은 모델과 그 주변 구조로 이루어진다)은 옳지만, 등호 왼쪽에 "AI"를 놓은 것이 범위 오류다. AI는 1950년대부터 있던 상위 개념이고, 규칙 기반 시스템, 탐색 알고리즘, 고전 머신러닝, 컴퓨터 비전, 강화학습을 모두 포함한다. 그중 딥러닝의 한 갈래가 LLM이다.

```
AI (인공지능)
└─ ML (머신러닝)
   └─ 딥러닝
      └─ Transformer 기반 LLM   ← 우리가 매일 쓰는 것
```

정정하면 이렇다. **Agent = Model + Harness.** LLM은 AI의 부분집합이고, 내가 "AI가 일한다"고 느끼는 것은 LLM이 하네스와 결합된 에이전트 상태다.

이 공식은 내가 만든 말이 아니라 LangChain의 「The Anatomy of an Agent Harness」와 Martin Fowler 사이트의 하네스 엔지니어링 글이 공통으로 쓰는 정의다. 이 등식이 실용적인 이유는 책임의 위치를 바꿔주기 때문이다. AI가 실패했을 때 "모델이 멍청하다"에서 멈추지 않고 "컨텍스트가 빠졌나 / 도구 설명이 모호했나 / 검증 루프가 없었나"로 질문이 내려간다.

---

### #2 [보정] "LLM = 토큰 가중치를 이용해서 다음 말을 예측"

"토큰 가중치"라는 이름의 물건은 없다. 내 표현에는 서로 다른 두 개가 섞여 있다. 하나는 **모델 파라미터(weights)** 다. 토큰마다 붙은 값이 아니라, 신경망 전체가 학습으로 얻은 수십~수천억 개의 숫자다. 다른 하나는 어텐션 가중치(attention weights)인데, 이건 진짜로 "토큰 간 관계의 가중치"가 맞다. 다만 추론 중 매번 새로 계산되는 중간값이지 저장된 지식이 아니다.

실제 동작은 이렇다.

1. 입력 텍스트를 토큰 시퀀스로 자른다.
2. 각 토큰을 벡터(임베딩)로 바꾼다.
3. 트랜스포머 층을 통과시킨다. 이때 어텐션이 "지금 토큰이 앞의 어떤 토큰을 얼마나 참조할지"를 계산한다.
4. 마지막 층이 어휘 전체에 대한 점수(logits)를 낸다. 어휘가 10만 개면 10만 개의 점수다.
5. softmax로 확률분포를 만든다.
6. temperature / top-p 같은 샘플링 규칙으로 다음 토큰 하나를 고른다.
7. 그 토큰을 입력 끝에 붙이고 1번으로 돌아간다.

정정하면 이렇다. LLM은 학습된 파라미터를 통해 어휘 전체에 대한 확률분포를 계산하고, 샘플링 규칙에 따라 다음 토큰 하나를 고르는 일을 반복한다. "다음 말"이 아니라 "다음 토큰"이고, "토큰 가중치"가 아니라 "모델 파라미터"다.

이 구분이 실무에서 중요한 이유가 있다. LLM이 같은 질문에 다른 답을 하는 것은 버그가 아니라 6번 샘플링 단계 때문이다. 그래서 5장의 평가 하네스가 "한 번 통과"가 아니라 "여러 번 실행한 평균·최악값"을 본다.

---

### #3 [맞음] "input Token → LLM → output Token"

맞다. 다만 한 가지를 더해야 한다. output이 항상 사람이 읽는 문장인 것은 아니다. 현대의 tool calling 환경에서 모델은 `tool_use` 같은 **구조화된 객체**를 뱉는다.

```jsonc
// 모델의 output이 실제로 이렇게 생겼다
{
  "type": "tool_use",
  "name": "Read",
  "input": { "file_path": "/Users/me/project/main.py" }
}
```

하네스는 이 출력을 받아 "최종 답변인가 / 도구 실행 요청인가 / 다른 에이전트로 넘기는 handoff인가"를 분류한다. 이게 에이전트 루프 7단계 중 3단계(출력 분류)다. 상세는 [03편](/post/ai-everything-03-agent-loop).

또 멀티모달 입력(이미지, 오디오, PDF)도 결국 토큰으로 변환되어 컨텍스트를 차지한다. "이미지는 공짜"가 아니다.

---

### #4 [맞음] "하네스 = LLM 보조 프레임워크"

맞다. 그리고 업계 정의는 이보다 더 과감하다. LangChain은 "모델이 아니라면, 그것은 하네스다"라고까지 말한다. 시스템 프롬프트, 도구, MCP, 파일시스템, 샌드박스, 오케스트레이션 로직, hook/middleware가 전부 하네스다. Martin Fowler 사이트의 Birgitta Böckeler는 하네스를 두 축으로 나눈다.

- Guides (feedforward): 행동 전에 방향을 잡는 것. CLAUDE.md, AGENTS.md, Skill, 출력 형식, 금지 규칙
- Sensors (feedback): 행동 후에 결과를 관찰하는 것. 테스트, 린터, 스크린샷, LLM 리뷰, 사람 검토

"보조"라는 말이 살짝 약하게 들릴 수 있다. 책 1장의 비유가 더 정확하다. **원시 LLM은 운영체제 없는 CPU다.** CPU만으로는 문서를 쓸 수 없다. RAM(컨텍스트 창), 디스크(파일·벡터DB), 장치 드라이버(도구·MCP), 운영체제(하네스)가 있어야 "컴퓨터를 쓴다"는 경험이 생긴다.

---

### #5 [틀림] "google : gemini" – 이 노트에서 가장 큰 오류

Gemini는 **모델 이름**이다(그리고 소비자용 챗 앱 이름이다). 하네스가 아니다. 같은 줄에 있는 `codex`와 `claude code`는 하네스가 맞아서, 세 개를 나란히 놓으면 층위가 어긋난다. 정확한 3열 표는 이렇다.

| 회사 | 모델 (엔진) | 하네스 (운영체제) |
|---|---|---|
| Anthropic | Claude (Opus 5 / Sonnet 5 / Haiku 4.5, Fable 5) | Claude Code, Claude Agent SDK |
| OpenAI | GPT-5.x 계열 | Codex(CLI / 앱 / 클라우드), Agents SDK, Responses API |
| Google | Gemini (3.x 계열) | Antigravity(데스크톱·CLI·SDK), 이전의 Gemini CLI, Jules |

2026년 구글 쪽 상황을 특히 조심해야 한다. 구글은 2026년 I/O에서 Gemini CLI를 Antigravity CLI로 전환한다고 발표했고, 2026년 6월 18일부로 Gemini CLI와 Gemini Code Assist IDE 확장이 일부 요금제에서 요청 처리를 중단했다. Antigravity 2.0은 데스크톱 앱 + Go 기반 CLI + SDK가 하나의 agent harness를 공유하는 구조다.
(출처: [Google Developers Blog – Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/), [Google I/O 2026 developer highlights](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/))

구글이 자기 문서에서 "agent harness"라는 단어를 쓰고, 데스크톱·CLI·SDK가 그 하네스를 공유한다고 설명한다는 사실 자체가 이 노트의 논지를 뒷받침한다. **하네스는 이제 제품 아키텍처의 1급 개념이다.**

정정하면 이렇다. Gemini는 모델이다. 구글의 하네스는 Gemini CLI였고, 2026년 Antigravity(CLI·데스크톱·SDK)로 통합·전환되었다.

참고로 노트 뒤쪽 "3. claude code, gemini, codex, kimi, perplexity" 줄도 같은 혼동이다. Kimi(Moonshot)는 모델, Perplexity는 검색 특화 제품/하네스, 이런 식으로 층이 섞여 있다.

---

### #6 (질문에 대한 답) "codex와 챗GPT의 차이가 무엇인가?"

한 문장으로 답하면, 모델이 달라서가 아니라 **하네스가 다르다.**

| | ChatGPT | Codex |
|---|---|---|
| 무엇인가 | 대화형 어시스턴트 표면 | 저장소 위에서 도는 코딩 에이전트 하네스 |
| 파일 접근 | 없음(업로드한 것만) | 지정한 디렉터리를 직접 읽고 수정함 |
| 명령 실행 | 샌드박스 코드 인터프리터 한정 | 프로젝트에서 실제 명령·테스트 실행 |
| 루프 | 질문 → 답변 (대체로 1턴) | 요청 → 추론 → 도구 실행 → 관찰 → 반복 → 종료 보고 |
| 산출물 | 복사해 붙일 텍스트 | 커밋, diff, PR, 테스트 결과 |
| 지침 파일 | 없음(커스텀 인스트럭션) | AGENTS.md |

거칠게 말하면 ChatGPT는 "무엇인가"에 답하고, Codex는 "어떻게 고치는가"를 실행한다. ChatGPT는 에러를 설명하고 Codex는 에러를 고친다. 계정과 사용량 창을 공유하는 경우도 있어서 더 헷갈리는데, 그럴수록 "같은 모델, 다른 하네스"라는 사실이 선명해진다.
(참고: [ChatGPT vs Codex – Same Account, Different Loop](https://www.morphllm.com/comparisons/chatgpt-vs-codex), [GrowwStacks 비교](https://growwstacks.com/blog/chatgpt-vs-openai-codex-vs-claude-code-best-ai-coding-agent-2026))

이건 이 시리즈 전체의 최고의 실증 사례다. 같은 회사, 사실상 같은 모델군인데 결과물의 성격이 완전히 다르다. 차이를 만든 건 모델이 아니라 하네스다.

---

### #7 [보정] "agent가 한 개면 단일 AI agent"

방향은 맞다. 다만 판정 기준을 더 정확하게 잡아야 한다. 세는 단위는 "에이전트"라는 말이 아니라 **독립된 컨텍스트 창 + 자기 루프**다.

Skill 50개, MCP 서버 10개, hook 20개가 붙어 있어도 컨텍스트 창이 하나면 단일 에이전트다. 확장된 단일 에이전트일 뿐이다. 반대로 아주 단순한 프롬프트라도, 별도 컨텍스트 창에서 도는 서브에이전트를 3개 띄우면 멀티에이전트다.

노트에 쓴 "인공 지능이라는 것을 구현하는 것은 LLM이라는 모델에서 나오기 때문"이라는 근거는 절반만 맞다. 지능의 원천이 모델인 건 맞지만, 에이전트의 개수를 세는 기준은 지능의 원천이 아니라 컨텍스트 경계다.

---

### #8 [맞음] "같은 LLM만 써도 멀티에이전트인가? 모델이 섞일 필요 없나?"

맞다. **모델이 섞일 필요 전혀 없다.** 스스로 던진 질문에 스스로 옳은 답을 냈다.

멀티에이전트를 정의하는 것은 모델 다양성이 아니라 다음 네 가지다.

1. 독립된 컨텍스트 창: 각 에이전트가 자기 책상을 가진다
2. 고유한 시스템 프롬프트/역할: "너는 조사 담당이다"
3. 분리된 도구 권한: 조사 담당에게 배포 권한을 주지 않는다
4. 조율 구조: 누가 나누고 누가 합치는가

그러니 세션 하나에서 10개 서브에이전트를 오케스트레이션하고 그 10개가 전부 Opus와만 통신해도 멀티에이전트가 맞다. Anthropic의 멀티에이전트 리서치 시스템도 lead agent와 subagent들이 같은 모델 계열을 쓴다. Claude Code의 서브에이전트도 기본은 같은 모델이다.

단, 노트에 없는 중요한 구분이 하나 있다. "여러 에이전트"는 두 종류로 갈린다. **Subagent**는 fire-and-forget 심부름이다. 에이전트 간 대화가 없고, 공유 메모리도 없고, 지속 상태도 거의 없이 끝나면 사라진다. 부모는 위임하고 요약을 받으며, 독립 조사·코드 탐색·요약에 어울린다. **Agent Teams**는 같은 회의실의 협업이다. 에이전트끼리 대화하고, 공유 작업 목록을 가지며, 시간이 지나며 문맥이 쌓인다. 부모는 팀 운영과 결과 종합을 맡고, 중간 발견이 다른 작업을 계속 바꾸는 일에 어울린다. "숙소 후보 세 곳만 조사해 와"는 Subagent이고, "숙소·교통·예산을 계속 서로 맞추자"는 Agent Teams다.

모델을 섞는 것은 별개의 기법이다. 강한 모델은 판단에, 싸고 빠른 모델은 단순 정리에 쓰는 계층화(model tiering)는 비용·지연 최적화 기법이지 멀티에이전트의 조건이 아니다. 둘을 분리해서 기억하는 게 좋다.

그리고 반드시 붙여야 할 경고가 있다. 멀티에이전트가 항상 좋은 게 아니다. 에이전트가 늘면 각자 문맥을 들고 움직여서 토큰 비용이 빠르게 커진다. "세 명이 10분씩 조사하면 30분이지만, 다섯 명이 한 시간 회의하면 5시간이 쓰인다." 먼저 단일 에이전트로 해보고, 어디서 깨지는지 본 다음, 그 지점에만 구조를 더하는 게 정석이다. 상세는 [07편](/post/ai-everything-07-multi-agent).

---

### #9 [보정] "MCP 호출, 웹 검색은 모두 하네스에서 이루어진다"

직관은 옳다. 모델 가중치가 직접 네트워크 소켓을 여는 일은 없다. 모델은 "이 도구를 이렇게 호출해줘"라는 요청을 텍스트/구조화 객체로 출력할 뿐이고, 실행은 항상 모델 바깥의 런타임이 한다.

보정할 것은 "어디의" 런타임이냐다. 도구는 두 종류로 나뉜다. **Client tool**은 내 컴퓨터나 내 애플리케이션에서 실행된다. 로컬 MCP 서버, 파일 읽기, bash, 로컬 브라우저가 여기 속하고, 하네스가 권한·샌드박스·훅으로 전면 통제한다. **Server tool**은 모델 제공자의 인프라에서 실행된다. Anthropic의 web search·code execution 도구와 MCP connector, OpenAI Responses API의 web search·file search·code interpreter·remote MCP가 여기 속하고, 통제는 제공자 정책에 따르는 제한적인 수준이다.

그러니 정정하면 이렇다. 실행 주체는 항상 모델이 아닌 런타임이다. 다만 그 런타임이 내 로컬 하네스일 수도 있고(client tool), 제공자 서버일 수도 있다(server tool). "웹 검색은 무조건 내 노트북에서 일어난다"는 아니다.

보안 관점에서 이 구분은 중요하다. server tool은 내가 훅으로 막을 수 없고, 로그도 내 손에 다 남지 않는다. 반대로 client tool은 내가 전부 통제할 수 있지만 내 컴퓨터가 위험에 노출된다.

노트 뒷문장 "조회 관련된 명령어와 명령 문구는 모두 LLM이 output Token으로 뱉어줄 것이다"는 정확히 맞다. 좋은 서술이다.

---

### #10 [틀림] "자연어를 토큰으로 바꿔서 전달 → 그러면 claude code(하네스)에 있는가?"

아니다. **토크나이저는 하네스에 없다**(있어도 참고용 추정치다).

실제 흐름:

```
[내가 타이핑]  "이 파일 고쳐줘"
      ↓ 하네스가 문자열을 JSON으로 조립 (여전히 텍스트!)
{ "model": "claude-opus-5",
  "system": "...CLAUDE.md 내용...",
  "messages": [{"role":"user","content":"이 파일 고쳐줘"}],
  "tools": [ ... ] }
      ↓ HTTPS
[제공자 서버]  ← ★ 여기서 토큰화가 일어난다
      ↓ 모델 추론
[응답 JSON]   content 블록 + usage: {input_tokens: 15234, output_tokens: 412}
      ↓
[하네스가 표시]  "15.2k tokens"
```

즉 하네스가 화면에 보여주는 토큰 수는 (a) 응답의 `usage` 필드에 서버가 알려준 값이거나 (b) 근사 추정치다. Anthropic은 미리 세고 싶을 때 쓰라고 별도의 token counting 엔드포인트를 제공하는데, 이게 필요하다는 사실 자체가 "클라이언트는 정확히 셀 수 없다"는 증거다.

#10b "토큰은 모델마다 다르다"는 O, 완전히 맞다. 모델마다 토크나이저와 어휘(vocabulary)가 다르다. OpenAI 계열은 tiktoken 기반 BPE를 공개했고, Anthropic·Google은 자체 토크나이저를 쓴다. 그래서 같은 문장이라도 모델마다 토큰 수가 다르다.

실무에서 한국어 사용자가 반드시 알아야 할 점이 있다. **한국어는 영어보다 토큰을 더 먹는다.** 대부분의 토크나이저가 영어 텍스트로 최적화되어 있어서, 같은 의미를 담아도 한국어 프롬프트가 1.5~3배의 토큰을 쓰는 경우가 흔하다. 컨텍스트 예산을 짤 때 "글자 수 ÷ 4 = 토큰"류의 영어권 어림셈을 그대로 쓰면 안 된다.

---

### #11 [보정] 하네스 엔지니어링의 3가지 방법

노트의 세 항목은 다 맞다. 다만 가장 중요한 축이 빠졌다. **규칙의 "강제력"에는 등급이 있다.** 노트는 "skill, MCP를 붙여서 특정 행동을 강제한다"고 썼는데, 실제로는 강제되는 것과 부탁하는 것이 섞여 있다.

- 요청 계층: 시스템 프롬프트, CLAUDE.md, Skill. 모델이 참고하지만 어길 수 있다. 벽에 붙인 "불조심" 안내문이다.
- 집행 계층: permissions(allow/ask/deny), Hooks. 시스템이 실제로 막는다. 자동 가스 차단기다.
- 격리 계층: 샌드박스, worktree, 컨테이너. 물리적으로 불가능하게 만든다. 잠긴 방이다.

이 구분이 하네스 엔지니어링의 핵심이다. 공식 문서도 같은 말을 한다. CLAUDE.md에 "`.env` 파일은 절대 수정하지 마"라고 쓰는 것은 요청이다. PreToolUse Hook으로 `.env` 수정을 차단하면 그것은 집행이다. 매번 일어나야 하는 일은 지침이 아니라 훅에 있어야 한다.

그리고 Claude Code를 기준으로 하면 층은 다섯 개로 정리된다(학습용 지도이고 공식 제품 분류는 아니다).

- 1층 CLAUDE.md, auto memory, `.claude/rules/`: 항상 보이는 기본 규칙과 오래 남길 기억
- 2층 Skills (SKILL.md, references, scripts, templates): 필요할 때 꺼내 쓰는 업무 매뉴얼
- 3층 Hooks, settings, permissions: 특정 순간 자동 실행되는 점검과 차단
- 4층 Subagents, Agent Teams: 일을 나누어 맡는 전문 담당자 구조
- 5층 Plugins, marketplaces: 여러 프로젝트·팀에 배포하는 기능 묶음

MCP는 이 다섯 층 중 하나가 아니라, 여러 층 옆에 붙는 외부 연결 통로로 보는 게 정확하다.

---

### #12 [맞음] "CLAUDE.md를 LLM에 넘기기 전에 세션 메모리에 로드"

맞다. 그리고 세 가지를 더하면 완성된다.

1. 계층이 있다. 사용자 수준(`~/.claude/`) → 프로젝트 수준(`./CLAUDE.md`) → 하위 폴더 수준. 작업 위치에 따라 여러 CLAUDE.md가 함께 들어올 수 있다.
2. 경로별 규칙이 따로 있다. `.claude/rules/` 에 `paths:` 프론트매터를 붙이면 테스트 파일에만, 문서 파일에만 적용되는 규칙을 줄 수 있다.
3. CLAUDE.md는 보안 장치가 아니다. 공식 문서도 CLAUDE.md와 memory를 "컨텍스트"로 다룬다. 반드시 막아야 하는 것은 permissions와 Hook으로 옮겨야 한다(#11 참조).

그리고 흔한 함정이 있다. **길게 쓰면 오히려 안 지켜진다.** 매 세션 책상 위에 두꺼운 바인더를 펼쳐 두는 것과 같아서, 작업 공간이 줄고 중요한 문장이 묻힌다. AGENTS.md/CLAUDE.md는 백과사전이 아니라 지도여야 한다. 자세한 절차는 Skill로, 깊은 지식은 `docs/`로 뺀다.

---

### #13 [맞음] "하네스를 만드는 사람이 아니라 기존 하네스를 내 색깔로"

실무적으로 아주 정확한 정의다. 대부분의 사람은 Claude Code / Codex / Antigravity라는 기본 하네스 위에 자기 CLAUDE.md, 자기 Skill, 자기 Hook, 자기 권한 정책을 얹는다. 이게 하네스 엔지니어링의 90%다.

한 가지만 넓혀 두자. 업계에서 "하네스 엔지니어링"은 자체 하네스 구축까지 포함한다. Claude Agent SDK나 OpenAI Agents SDK로 자기 제품 안에 에이전트 루프를 직접 짜는 것도 하네스 엔지니어링이다. 즉 스펙트럼이다.

```
기본 하네스 그대로 쓰기 → 설정으로 튜닝 → Skill/Hook 작성 → Plugin 배포 → SDK로 자체 하네스 구축
```

내 정의는 이 스펙트럼의 왼쪽~가운데를 정확히 짚었다.

---

### #14 [보정] "claude code를 움직이게 하는 Token = LLM의 output Token"

핵심 통찰이고, 대부분 맞다. 도구 실행, 파일 수정, 서브에이전트 생성 같은 행동의 방아쇠는 output token(정확히는 `tool_use` 블록)이다. 이걸 스스로 알아낸 건 좋은 관찰이다.

보정할 것은 하나다. **하네스는 LLM을 호출하기 전에도 움직인다.** 사용자 입력을 그대로 API에 던지는 게 아니다.

```
사용자 입력
  ↓  ← 여기부터 LLM 호출 전, 전부 하네스가 하는 일
1. 슬래시 커맨드 파싱 (/review 같은 것)
2. @파일 참조 확장 → 실제 파일 내용 읽어 붙이기
3. CLAUDE.md · 규칙 파일 로드
4. Skill 메타데이터(이름+설명) 주입  ← 본문은 아직 안 넣음(progressive disclosure)
5. 도구 스키마 조립
6. UserPromptSubmit / SessionStart Hook 실행
7. 대화 기록 + 압축된 요약 붙이기
  ↓
[LLM 호출]  ← 이제 처음으로 모델이 등장
  ↓
output token (텍스트 or tool_use)
  ↓  ← 여기부터가 노트가 말한 "output token이 하네스를 움직인다"
8. 출력 분류 → 9. 권한 검사 → 10. 도구 실행 → 11. 결과 포장 → 12. 다시 LLM 호출...
```

정정하면 이렇다. 하네스는 두 번 움직인다. LLM 호출 전에는 프롬프트를 조립하려고(입력이 방아쇠), LLM 호출 후에는 행동을 실행하려고(output token이 방아쇠). 노트가 짚은 것은 후자이고, 후자가 에이전트를 에이전트답게 만드는 부분이 맞다.

"Token이 뜨면 그만큼 LLM 서버에서 소모한 거임"은 대체로 맞지만 세 가지 보정이 필요하다.

1. input token도 과금된다. 오히려 코딩 에이전트는 input이 압도적으로 많다. 파일 내용, 도구 스키마, 대화 기록이 매 턴 다시 들어가기 때문이다.
2. prompt caching이 있다. 반복되는 앞부분(시스템 프롬프트, CLAUDE.md, 도구 정의)을 캐시하면 cache read는 일반 input보다 훨씬 싸다. 대신 cache write는 조금 더 비싸다. 그래서 화면의 토큰 수와 실제 청구액은 선형 비례하지 않는다.
3. reasoning(사고) 토큰도 출력에 포함된다. 화면에 안 보여도 과금된다.

---

### #15 [맞음] 다이어그램 검증

원본 스케치의 구조는 맞다. 요소별로 확인하면 이렇다.

- User ↔ claude code 양방향: O.
- claude code ↔ MCP 양방향(아래): O. 로컬 MCP 기준이고, remote MCP는 경계 오른쪽으로 가야 한다.
- claude code → LLM "MCP를 호출해줘": O. 정확히는 "도구 정의 + 사용자 요청"을 보낸다.
- LLM → claude code "1번 MCP 호출해. A 사이트가서 HTML 읽어": O. 이게 `tool_use` 출력이다. 아주 정확한 이해다.
- 세로선 = local / remote 경계: O. 좋은 표현이다. 이 선이 곧 "토큰화가 일어나는 지점"이기도 하다.
- 미들웨어 위치(경계 위, LLM 옆): △. 위치는 맞는데 화살표가 한 방향처럼 보인다.

미들웨어 보정. 미들웨어(프록시/게이트웨이/LangChain middleware 등)는 **요청과 응답을 모두 가로채는 양방향 인터셉터**다. 하는 일은 로깅·트레이싱, 비용 집계, 라우팅(쉬운 요청은 싼 모델로), 캐싱, PII 마스킹, 가드레일, 재시도다. 그래서 화살표는 `하네스 ⇄ 미들웨어 ⇄ LLM`으로 양방향이어야 한다.

또 원본에 없어서 추가하면 좋은 것이 두 가지 있다. 하나는 server tool 경로다. LLM 쪽(경계 오른편)에도 제공자가 실행하는 도구가 붙는다(#9). 다른 하나는 하네스 내부 구성이다. 하네스 상자를 열면 시스템 프롬프트 / 컨텍스트 조립기 / 도구 실행기 / 권한 게이트 / 훅 / 메모리가 들어 있다.

재구성한 다이어그램은 `/images/ai/harness-architecture.excalidraw` 에 있다.

---

## 4부. 노트에 없었지만 채워야 할 빈칸

검증하면서 발견한, 노트에 아직 없는 개념들. 각각 시리즈의 해당 편으로 연결된다.

- Agent loop 7단계 (03편): 에이전트가 "마법"이 아니라 반복문임을 이해하는 뼈대
- 컨텍스트는 희소 자원 (04편): 많이 넣으면 좋다는 직관이 틀렸다는 것 (Lost in the Middle)
- Progressive disclosure (05편): Skill이 왜 "긴 프롬프트"가 아닌지
- 도구 폭발 문제 (05편): 도구를 늘릴수록 정확도가 떨어질 수 있다
- 평가 하네스(eval) (08편): "체감상 좋아졌다"는 지표가 아니다
- 세션 인계 / progress file (09편): 긴 작업에서 컨텍스트가 끝나는 지점의 문제
- 메모리 소유권과 락인 (09편): 기억을 소유하지 못하면 에이전트를 소유하기 어렵다
- Prompt injection (10편): 외부 콘텐츠가 도구 권한을 조종하는 공격
- 하네스 두께 / 비계 (11편): 하네스는 언젠가 일부를 걷어내야 한다
- ACI (Agent-Computer Interface) (12편): 인터페이스 설계가 성능을 바꾼다는 연구 근거

---

## 5부. 이 검증에 쓴 근거

- 위키독스 **《하네스 엔지니어링 백과사전》** (김동학, v1.86) – <https://wikidocs.net/book/19689>
- LangChain, *The Anatomy of an Agent Harness* – <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
- Birgitta Böckeler, *Harness engineering for coding agent users* (martinfowler.com) – <https://martinfowler.com/articles/harness-engineering.html>
- Anthropic, *Building Effective AI Agents* – <https://www.anthropic.com/engineering/building-effective-agents>
- Anthropic, *Effective context engineering for AI agents* – <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- OpenAI, *Harness engineering: leveraging Codex in an agent-first world* – <https://openai.com/index/harness-engineering/>
- Google Developers Blog, *Transitioning Gemini CLI to Antigravity CLI* – <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- Google, *I/O 2026 developer highlights* – <https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/>
- Nelson F. Liu et al., *Lost in the Middle* – <https://arxiv.org/abs/2307.03172>
- John Yang et al., *SWE-agent: Agent-Computer Interfaces* – <https://arxiv.org/abs/2405.15793>

검증 기준일은 2026-08-02이다. 이 분야는 분기 단위로 바뀐다. 특히 제품명·모델명·CLI 이름은 원문 공식 문서를 다시 확인하는 것을 권한다.
