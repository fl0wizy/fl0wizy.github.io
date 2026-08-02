---
id: "ai-everything-00-index"
title: "AI의 모든 것 (00) – 시리즈 지도: 왜 '모델'이 아니라 '하네스'인가"
description: "왜 '모델'이 아니라 '하네스'인가 – AI의 모든 것 시리즈 전체 지도와 8개 핵심 문장."
date: "2026-08-02 09:00"
category: "ai"
tags: ["AI", "LLM", "하네스", "Agent", "ClaudeCode", "Codex", "MCP"]
published: true
---

이 글은 AI 에이전트와 하네스를 공부하며 정리한 시리즈의 전체 지도다. 시리즈가 답하려는 질문, 전체 실행 구조도, 14편의 구성, 시리즈를 관통하는 여덟 문장을 정리한다.

---

## 1. 이 시리즈가 답하려는 질문

같은 모델을 쓰는데 왜 어떤 사람은 안정적으로 결과를 내고 어떤 사람은 매번 흔들리는가. 이 질문을 따라가면 "GPT가 나을까, Claude가 나을까"라는 비교에서 "이 모델이 일하는 환경은 제대로 설계되어 있는가"라는 질문으로 내려간다. 그 환경의 이름이 하네스(harness)다.

핵심 공식은 **Agent = Model + Harness**다. 모델은 생각하는 엔진이고, 하네스는 그 엔진이 실제 길 위를 달리게 만드는 차체·핸들·브레이크·계기판·안전벨트다. 이건 비유가 아니라 업계가 실제로 쓰는 정의다. LangChain은 「The Anatomy of an Agent Harness」에서 모델이 아니라면 그것은 하네스라고 못 박는다. 시스템 프롬프트, 도구, MCP, 파일시스템, 샌드박스, 오케스트레이션 로직, hook과 middleware까지 전부 하네스다.

---

## 2. 왜 이 관점이 강력한가

AI가 실패했을 때 가장 흔한 반응은 모델부터 의심하는 것이다. 하네스 관점은 그 의심을 **고칠 수 있는 대상**으로 바꿔준다.

- 모델이 회사 정책을 반영하지 못했다면: 정책 문서가 컨텍스트에 있었는가, 최신이었는가
- 도구를 잘못 사용했다면: 도구 설명이 명확했는가, 너무 많이 노출한 건 아닌가
- 이전 작업을 잊었다면: progress 파일이나 상태 기록이 있었는가
- 테스트 없이 완료라고 했다면: 검증 루프가 하네스에 있었는가
- 위험한 행동을 시도했다면: 권한·승인·샌드박스가 설계되어 있었는가
- 답변이 매번 달랐다면: 출력 형식·평가 기준·예시가 고정되어 있었는가

"모델이 멍청하다"는 고칠 수 없다. "도구 설명이 모호하다"는 오늘 고칠 수 있다.

---

## 3. 전체 구조도

에이전트 한 턴의 전체 실행 구조를 그림으로 보면 다음과 같다.

![AI 에이전트 실행 구조](/images/ai/harness-architecture.svg)

편집 가능한 원본은 [`harness-architecture.excalidraw`](/images/ai/harness-architecture.excalidraw)에 있다. excalidraw.com에서 파일 열기로 불러오면 그대로 수정된다.

같은 흐름을 텍스트로 보면 이렇다.

```
User → 하네스   ① 프롬프트 (자연어)
하네스 내부      CLAUDE.md 로드 · @파일 확장 · Skill 메타데이터 · 도구 스키마 조립 · Hook 실행
                 ← LLM 호출 전에도 움직인다
하네스 → LLM    ② 조립된 요청 (JSON 문자열) – 미들웨어가 있으면 로깅·라우팅·캐싱 후 전달
LLM 서버        ★ 여기서 문자열 → 토큰
LLM → 하네스    ③ output token = tool_use
하네스          ④ 권한 게이트 (allow / ask / deny)
하네스 → 도구   ⑤ 실제 실행 (MCP / 로컬 도구)
도구 → 하네스   ⑥ 결과
하네스 → LLM    ⑦ 관찰 메시지로 포장해 재요청
LLM → 하네스    ⑧ 최종 답변
하네스 → User   ⑨ 결과 보고
```

---

## 4. 14편 지도

1부는 이해의 길이다. 무엇이 어떻게 도는지를 본다.

- [01. LLM과 토큰](/post/ai-everything-01-llm-and-token) – "다음 말"이 아니라 "다음 토큰". 가중치는 토큰에 붙어 있지 않다
- [02. 하네스란 무엇인가](/post/ai-everything-02-what-is-harness) – 배선 하네스에서 테스트 하네스, AI 하네스로. 원시 LLM은 OS 없는 CPU다
- [03. 에이전트 루프](/post/ai-everything-03-agent-loop) – 관찰-계획-행동-검증-기록. 7단계로 해부한다

2부는 구현의 길이다. 무엇을 어떻게 만드는지를 본다.

- [04. 컨텍스트 엔지니어링](/post/ai-everything-04-context-engineering) – 컨텍스트는 희소 자원이다. 많이 넣으면 오히려 나빠진다
- [05. 도구·MCP·A2A](/post/ai-everything-05-tools-and-mcp) – 버튼 200개짜리 리모컨을 만들지 마라
- [06. Claude Code · Codex · Antigravity](/post/ai-everything-06-harness-products) – Gemini는 모델이지 하네스가 아니다
- [07. 멀티에이전트](/post/ai-everything-07-multi-agent) – 모델이 섞일 필요는 없다. Subagent와 Agent Teams는 다르다

3부는 운영의 길이다. 어떻게 믿고 맡기는지를 본다.

- [08. 평가 하네스](/post/ai-everything-08-eval-harness) – "체감상 좋아졌다"는 지표가 아니다
- [09. 장시간 실행·메모리](/post/ai-everything-09-memory-longrunning) – 기억을 소유하지 못하면 에이전트를 소유하기 어렵다
- [10. 안전·거버넌스](/post/ai-everything-10-safety-governance) – 부탁은 규칙이 아니다. 훅이 규칙이다

4부는 판단의 길이다. 무엇을 고를지를 본다.

- [11. 12패턴 + 7결정 + 3역발상](/post/ai-everything-11-patterns-decisions) – 개발 때 기분 좋은 선택이 운영에서 살아남는 선택은 아니다
- [12. 실전 사례·생태계](/post/ai-everything-12-cases-ecosystem) – Codex, Vercel d0, SWE-agent, Magentic-One
- [13. 용어집·치트시트·레퍼런스](/post/ai-everything-13-glossary-references) – 막혔을 때 돌아오는 지도

부록으로 [학습 노트 팩트체크](/post/ai-study-notes-verified)가 있다. 15개 항목을 검증해 틀린 것 2개, 보정 6개를 정리한 기록이다.

---

## 5. 이 시리즈를 관통하는 8문장

시리즈 전체를 관통하는 여덟 문장이다.

1. Agent = Model + Harness. 모델만 바꿔서 해결되는 문제는 생각보다 적다.
2. 원시 LLM은 운영체제 없는 CPU다. 계산은 하지만 혼자서 일을 끝내지 못한다.
3. 컨텍스트는 무한한 창고가 아니라 제한된 책상이다. 많이 올리면 중요한 게 묻힌다.
4. 매번 일어나야 하는 일은 지침이 아니라 훅에 있어야 한다. 부탁과 집행은 다르다.
5. 도구를 많이 주는 게 아니라, 지금 필요한 도구를 이해하기 쉽게 준다.
6. "완료했다"는 말보다 증거가 중요하다. 테스트, 스크린샷, diff, 예약번호.
7. 비계는 건물을 짓지 않는다. 하지만 비계 없이는 위층에 닿지 못한다. 그리고 언젠가 걷어내야 한다.
8. 좋은 AI 활용은 좋은 질문에서 시작하지만, 오래가는 AI 시스템은 좋은 하네스에서 완성된다.

---

## 출처

이 시리즈의 뼈대가 된 자료다. 특히 첫 번째는 한국어로 이 주제를 통째로 다룬 유일한 단행본이다.

- 김동학, 《하네스 엔지니어링 백과사전》 – <https://wikidocs.net/book/19689> (유료 전자책. 실습 워크시트·성숙도 체크리스트·Q&A 71문항 등 전자책 전용 부록이 있다)
- LangChain, *The Anatomy of an Agent Harness* – <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
- Birgitta Böckeler, *Harness engineering for coding agent users* – <https://martinfowler.com/articles/harness-engineering.html>
- OpenAI, *Harness engineering* – <https://openai.com/index/harness-engineering/>
- Anthropic, *Building Effective AI Agents* – <https://www.anthropic.com/engineering/building-effective-agents>

전체 레퍼런스 지도는 [13편](/post/ai-everything-13-glossary-references)에 있다.

---

다음 편: [01. LLM과 토큰 – 예측 기계의 해부](/post/ai-everything-01-llm-and-token)
