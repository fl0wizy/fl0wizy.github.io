---
id: "ai-everything-13-glossary-references"
title: "AI의 모든 것 (13) – 용어집 · 한 장 치트시트 · 레퍼런스 지도"
description: "막혔을 때 돌아오는 지도 – 한 장 치트시트, 용어집, 전체 레퍼런스."
date: "2026-08-02 11:10"
category: "ai"
tags: ["용어집", "치트시트", "레퍼런스", "Glossary"]
published: true
---

이 글은 시리즈를 공부하며 정리한 치트시트다. 읽다가 막혔을 때 돌아올 수 있는 지도이고, 기술 사전이라기보다 핵심 개념으로 다시 돌아가게 하는 안내판에 가깝다.

---

## 1부. 한 장 치트시트

하네스를 한 문장으로 정의하면 이렇다. 하네스는 AI가 일할 때 필요한 목표·자료·도구·권한·검증·기록·사람의 승인을 묶어 주는 실행 환경이다. 더 짧게 줄이면, AI가 덜 추측하고 더 안전하게 더 반복 가능하게 일하도록 만드는 작업 환경이다.

이 시리즈를 관통하는 공식은 하나다.

```
Agent = Model + Harness
```

모델은 똑똑한 사람이고, 하네스는 그 사람이 일할 수 있는 사무실이다.

하네스의 7요소는 다음과 같다. 각 요소 뒤에는 확인용 질문이 붙어 있다.

- **목표**: 무엇을 만들지 정하기. 최종 결과물은 무엇인가?
- **컨텍스트**: AI가 봐야 할 자료. 어떤 문서와 정보를 먼저 줄 것인가?
- **도구**: AI가 사용할 손과 발. 어떤 도구가 필요하고, 어디까지 허용할 것인가?
- **중간 산출물**: 최종 전의 중간 결과. 초안 전에 무엇을 먼저 확인할 것인가?
- **검증**: 좋은 결과의 기준. 무엇을 만족해야 괜찮은 결과인가?
- **권한과 승인**: 사람이 책임질 지점. 발송·게시·제출·삭제 전에 누가 확인하는가?
- **기록과 개선**: 다음번을 위한 기억. 무엇을 저장하고 다음번에 고칠 것인가?

작은 업무라면 목표·자료·검증 기준 셋만 있어도 훨씬 안정된다.

다음은 일을 맡기기 전에 확인할 질문 일곱 가지다.

```
1. 이 일의 최종 결과물은 무엇인가?
2. AI가 반드시 봐야 할 자료는 무엇인가?
3. AI가 모르면 먼저 물어봐야 할 질문은 무엇인가?
4. 최종 결과 전에 만들 중간 산출물은 무엇인가?
5. 좋은 결과인지 확인할 기준은 무엇인가?
6. 사람이 반드시 승인해야 할 지점은 어디인가?
7. 다음번에 더 잘하기 위해 무엇을 기록할 것인가?
```

여기서 답하지 못한 부분은 결국 AI가 추측하게 된다.

프롬프트가 아니라 하네스를 봐야 할 실패 신호는 다섯 가지다.

- 같은 요청인데 결과가 매번 다르다: 목표와 기준이 흐릿하다.
- 답은 그럴듯한데 믿기 어렵다: 근거 자료와 검증 기준이 부족하다.
- 최종 결과를 고치느라 시간이 더 든다: 중간 산출물이 없다.
- 위험한 행동을 그냥 진행하려 한다: 권한과 사람 승인 지점이 없다.
- 다음번에도 같은 실수를 반복한다: 기록과 개선 루프가 없다.

하네스 두께는 일의 무게에 맞춘다. 아이디어 브레인스토밍이나 개인 메모 정리는 얇게, 팀 회의록 공유는 중간, 고객에게 보내는 답변은 중간에서 두껍게, 사업계획서 제출은 두껍게, 결제·삭제·배포·법적 판단은 매우 두껍게 간다.

사람에게 남겨야 할 판단도 있다. 최종 제출은 책임이 생기고, 외부 발송은 상대에게 실제 영향을 주고, 결제와 계약은 금전·법적 책임이 따르고, 개인정보 처리는 민감하고, 삭제와 배포는 되돌리기 어렵고, 전략 결정은 맥락과 책임 판단이 필요하다. AI가 초안을 만들 수는 있지만, **책임 있는 행동은 사람이 확인해야 한다.**

프롬프트 중심과 하네스 중심의 차이는 이렇다. 프롬프트 중심은 이번 답을 잘 받는 데 집중하고, 문장을 계속 고치고, 결과가 좋으면 운 좋게 끝나고, 실패하면 다시 요청한다. 하네스 중심은 다음에도 반복 가능한 구조를 만들고, 목표·자료·검증 기준을 정리하고, 왜 좋았는지 기록하고, 실패 이유를 남기고 개선한다.

기본으로 복사해 쓸 수 있는 요청문은 다음과 같다.

```
아래 작업을 바로 최종 결과로 만들지 말고, 작은 하네스 흐름으로 진행해줘.

1. 먼저 목표와 필요한 자료를 확인해줘.
2. 정보가 부족하면 추측하지 말고 질문해줘.
3. 최종 결과 전에 중간 산출물을 먼저 만들어줘.
4. 결과를 검증할 기준을 3~5개 제안해줘.
5. 사람이 승인해야 할 지점을 따로 표시해줘.
6. 마지막에는 다음번에 개선할 기록을 남겨줘.

작업 주제:
[여기에 내가 맡기고 싶은 일을 적는다]
```

마지막 확인 질문은 하나다. 지금 AI에게 답만 요구하고 있는가, 아니면 AI가 일할 환경을 만들어 주고 있는가.

---

## 2부. 용어집

각 항목은 용어(일상 비유), 설명, 그리고 조심할 점 순서다.

### 기본 개념

- **Model** (엔진): 언어를 이해하고 다음 행동·답변을 만드는 중심 AI. 모델만 바꾸면 다 해결된다고 생각하지 않는다.
- **Agent** (업무를 맡은 직원): 목표를 위해 여러 단계를 수행하고 도구를 쓰는 AI 시스템. 단순 챗봇과 혼동하지 않는다. 에이전트는 행동한다.
- **Agent = Model + Harness** (엔진이 달린 업무 차량): 모델이 하네스와 결합되어 실제 일을 수행하는 상태. 모델 성능과 하네스 품질을 분리해서 봐야 한다.
- **Harness** (직원이 일하는 사무실 전체): 에이전트가 안전하고 반복 가능하게 일하도록 만든 외부 구조. 프롬프트 하나가 하네스 전체는 아니다.
- **Harness Engineering** (사무실 운영 설계): 모델이 일하는 환경·도구·권한·검증·기록을 설계하는 일. AI에게 일을 시키는 기술이 아니라 일하는 조건을 설계하는 기술이다.
- **Harnessability** (정리된 주방): 어떤 환경이 하네스를 걸기 쉬운 정도. 에이전트 설정만 보지 말고 문서·테스트·모듈 경계·로그도 본다.
- **Guide** (작업 전 안내문): 행동하기 전에 좋은 방향으로 가도록 돕는 지시와 자료. 안내만 있고 확인 장치가 없으면 지켜졌는지 모른다.
- **Sensor** (작업 후 확인 장치): 행동한 뒤 결과를 관찰하고 다시 고치게 하는 검사. 센서만 있으면 매번 틀린 뒤에야 고친다.
- **Feedforward** (요리 전 레시피 준비): 시작 전에 실패 가능성을 줄이는 사전 제어. 규칙을 많이 쓰는 것보다 모델이 읽고 따를 수 있게 만드는 게 중요하다.
- **Feedback** (맛보고 간 맞추기): 결과를 보고 다시 수정하게 하는 사후 제어. 피드백이 너무 늦으면 수정 비용이 커진다.

### 컨텍스트와 토큰

- **Prompt** (업무 지시서): AI에게 주는 지시문. 지시만으로는 충분하지 않다.
- **Context** (책상 위 자료): AI가 현재 볼 수 있는 정보 전체. 많이 넣는다고 항상 좋아지지 않는다.
- **Context Window** (회의 중 화이트보드 공간): 모델이 한 번에 읽을 수 있는 토큰 범위. 공간이 차면 오래된 내용이 밀리거나 압축된다.
- **Context Engineering** (책상 정리와 자료 배치): 지시·문서·기억·도구 정보를 알맞게 배치하는 일. 프롬프트 문장만 다듬는 일보다 넓은 개념이다.
- **Context Rot** (어지러워진 책상): 오래된 대화·긴 로그·불필요한 도구 결과가 쌓여 판단을 흐리게 하는 현상. 해결책은 더 넣기가 아니라 요약·파일 저장·필요 시 검색이다.
- **Lost in the Middle** (긴 회의록의 중간): 관련 정보가 중간에 있으면 성능이 떨어지는 현상. 중요한 건 앞이나 뒤에 둔다.
- **Token** (문장 조각): 모델이 읽고 쓰는 정보 단위. 글자 수와 같지 않다. 모델마다 다르고 한국어는 더 먹는다.
- **Compaction** (긴 회의록 요약): 오래된 대화와 관찰을 짧게 압축하는 것. 요약은 항상 손실이다. 중요한 결정은 파일로 남긴다.
- **Progressive Disclosure** (필요한 서류만 단계적으로 꺼내기): 이름·설명만 먼저 보이고 필요할 때 본문을 읽는 방식. 모든 내용을 처음부터 넣지 않는다.

### 도구와 연결

- **Tool** (회사 시스템 버튼): AI가 호출할 수 있는 외부 기능. 많으면 능력이 아니라 혼란이 늘 수도 있다.
- **Tool Calling** (담당자에게 업무 요청): 모델이 검색·파일 읽기·코드 실행 등을 요청하는 방식. 결과를 모델에게 잘 포장해 돌려줘야 한다.
- **Client tool** (내 사무실 장비): 내 컴퓨터/애플리케이션에서 실행되는 도구. 사용자가 전부 통제할 수 있다.
- **Server tool** (외부 대행 서비스): 제공자 인프라에서 실행되는 도구. 내 훅으로 막을 수 없다.
- **MCP** (AI용 USB-C 포트): Model Context Protocol. Anthropic이 2024년 공개한, 외부 도구·데이터를 표준 방식으로 연결하는 개방 표준. 연결이 많아질수록 권한·보안도 설계해야 한다.
- **A2A** (팀 간 업무 연락망): Agent2Agent Protocol. Google이 주도한, 에이전트가 다른 에이전트에게 일을 맡기고 조율하는 개방 표준. MCP는 도구 연결, A2A는 에이전트 협업이다.
- **RAG** (사서가 책을 찾아 주는 방식): Retrieval-Augmented Generation. 답변 전에 외부 문서를 검색해 컨텍스트에 넣고 답하게 하는 방식. 검색 품질이 낮으면 답변 품질도 낮다.
- **Vector DB** (의미로 찾는 창고): Vector Database. 문서의 의미를 기준으로 검색하는 저장소. 저장을 잘한다고 검색까지 잘되는 건 아니다.
- **Embedding** (문서의 의미 좌표): 텍스트를 의미 공간의 숫자 벡터로 바꾼 것. 처음엔 "의미 주소" 정도로 이해하면 충분하다.

### 지시 파일과 스킬

- **AGENTS.md** (업무 인수인계 메모): OpenAI/Codex 계열의 프로젝트 규칙·지침 파일. 길게 쓰면 읽히지 않고 낡은 규칙이 쌓인다.
- **CLAUDE.md** (Claude용 프로젝트 메모): Claude Code가 반복 참고할 규칙과 명령. 컨텍스트지 보안 장치가 아니다.
- **`.claude/`** (프로젝트 공용 서랍장): 프로젝트용 agents·skills·설정 폴더. 개인 설정(`~/.claude/`)과 구분한다.
- **Skill** (반복 업무 매뉴얼): 지시·참고자료·스크립트를 묶은 작은 실행 단위. 그냥 긴 프롬프트가 아니다. 언제 실행될지도 설계한다.
- **Skill Description** (문 앞 안내판): Skill을 언제 쓸지 모델이 판단하게 돕는 문구. 모호하면 실행 안 되거나 엉뚱할 때 실행된다.
- **Hook** (센서등): 특정 이벤트에서 자동 실행되는 절차. 중요한 반복 절차는 프롬프트가 아니라 훅에 둔다.
- **Middleware** (중간 검문소): 모델 호출·도구 실행 전후에 끼어들어 검사·수정·기록하는 장치. 너무 많으면 흐름이 복잡하고 디버깅이 어렵다.
- **Plugin** (표준 운영 패키지): Skills·Hooks·Subagents·MCP를 묶은 배포 단위. 신뢰할 수 없는 Plugin은 문서 하나보다 훨씬 위험하다.

### 에이전트 구조

- **Orchestrator** (팀장): 여러 단계·에이전트의 일을 나누고 결과를 합치는 조정자. 나누는 것만큼 합치는 기준도 필요하다.
- **Handoff** (전문 부서로 넘기기): 한 에이전트가 다른 전문 에이전트에게 작업을 넘기는 것. 넘길 때 핵심 맥락이 빠지지 않게 한다.
- **Subagent** (외부 조사 담당자): 독립 작업을 맡기고 결과만 받는 하위 에이전트. 계속 조율해야 하는 일에는 맞지 않는다.
- **Fire-and-forget** (심부름 맡기고 결과만 받기): Subagent의 기본 성격. 중간 발견 공유가 필요하면 부족하다.
- **Agent Teams** (같은 회의실의 협업팀): 팀 리드와 여러 에이전트가 공유 작업 목록으로 지속 협업하는 구조. 단순 작업에는 과하다.
- **Shared Task List** (공동 체크리스트): 대기·진행중·완료 상태와 의존성을 함께 보는 목록. 실제 상태와 어긋나면 팀 전체가 잘못 움직인다.
- **Context Boundary** (업무 칸막이): 어떤 정보를 함께 봐야 하고 어떤 정보는 떼어도 되는지 나누는 기준. 역할 이름으로 나누면 전달 손실이 생긴다.
- **ReAct** (보면서 즉석으로 움직이기): Reasoning + Acting. 생각-행동-관찰을 반복하는 방식이자 2022년 논문 이름. 유연하지만 비용이 많이 든다.
- **Plan-and-Execute** (계획 세우고 실행): 계획 후 실행. 먼저 계획을 만든 뒤 단계별로 실행하는 방식. 구조가 분명한 작업에 유리하다.
- **Prompt Chaining** (릴레이 작업): 앞 단계 결과를 다음 단계 입력으로 넘긴다. 앞이 틀리면 뒤도 흔들린다.
- **Routing** (접수 창구 분류): 요청을 보고 적절한 모델·도구·에이전트로 보낸다. 분류 기준이 흐리면 엉뚱한 담당자에게 간다.
- **Parallelization** (여러 사람이 동시 준비): 독립 작업을 동시에 처리한다. 병합이 어렵거나 같은 파일을 동시 수정하면 위험하다.

### 평가와 검증

- **Eval** (AI용 시험지): Evaluation의 줄임말. AI 결과를 테스트하고 점수화하는 절차. 한두 예시가 아니라 반복 가능한 기준이 필요하다.
- **Computational Sensor** (체온계, 맞춤법 검사기): 테스트·린터·타입 검사처럼 빠르고 결정적인 검사. 의미와 의도까지 판단한다고 기대하지 않는다.
- **Inferential Sensor** (선생님의 서술형 채점): LLM 리뷰처럼 맥락을 읽고 판단하는 검사. 느리고 비싸며 결과가 흔들린다.
- **Grader** (시험 채점자): 평가 점수를 매기는 함수/모델. 채점자도 틀린다.
- **Rubric** (채점표): 좋은 결과와 나쁜 결과를 구분하는 기준표. "좋다/나쁘다"보다 항목별 기준이 낫다.
- **Generator** (초안 작성자): 답변·코드·계획·문서를 만드는 역할. 생성만 하고 검토가 없으면 품질이 흔들린다.
- **Evaluator** (검토자): 결과가 기준을 만족하는지 확인하는 역할. "괜찮아 보인다"가 아니라 구체적 기준으로 본다.
- **Regression Fixture** (재시험 문제 묶음): 변경 후에도 기대 행동을 유지하는지 확인하는 테스트 세트. 업데이트 후 조용히 깨지는 문제를 막는다.
- **Artifact** (영수증, 사진, 작업 증거): 계획서·스크린샷·테스트 결과 같은 검토 가능한 산출물. "완료했다"는 말보다 증거가 중요하다.

### 안전과 운영

- **Guardrail** (도로 가드레일): 위험하거나 잘못된 행동을 막는 규칙. 느슨하면 위험하고 빡빡하면 일이 안 된다.
- **Permission** (출입카드): AI가 어떤 도구·파일을 쓸 수 있는지 정하는 권한. allow / ask / deny로 나누면 이해하기 쉽다.
- **Sandbox** (모래놀이장): 실제 시스템을 망가뜨리지 않게 격리한 실행 환경. 샌드박스 안에서도 비밀 정보는 조심한다.
- **Prompt Injection** (문서 속 가짜 상사 지시): 외부 콘텐츠가 AI에게 악성 지시를 심는 공격. 웹페이지와 도구 결과를 무조건 신뢰하지 않는다.
- **Observability** (CCTV와 계기판): 로그·메트릭·트레이스로 시스템 상태를 보는 방법. 보이지 않는 실패는 고치기 어렵다.
- **Trace** (작업 동선 기록): 어떤 단계와 도구를 거쳤는지 남긴 기록. 비용·지연·오류 원인을 찾는 데 중요하다.
- **Audit Log** (결재 이력): 누가·언제·무엇을·왜 했는지 기록. 결과만 보면 이유를 알 수 없다.
- **Harness Entropy** (정리하지 않은 집안): 임시 코드·중복 문서·낡은 규칙이 쌓여 복잡해지는 현상. 처리량이 늘수록 정리 루프도 필요하다.
- **Harness Debt** (미뤄둔 수리): 하네스 파일이 stale해지며 쌓이는 부채. 기술 부채만큼 심각하지만 측정 도구가 없다.
- **Garbage Collection** (정기적인 집안 정리): 필요 없는 임시 구조·낡은 지시·중복 문서 정리. 무조건 삭제가 아니라 기준으로 판단한다.

### 장시간 작업

- **Progress File** (교대근무 인수인계 노트): 장시간 작업의 진행 상태 기록. "계속해" 대신 이어갈 내용을 파일로 남긴다.
- **Feature List** (완료 체크박스): 완료해야 할 기능과 통과 여부 목록. 기능 설명을 지우거나 바꾸지 못하게 관리한다.
- **Context Reset** (새 회의 시작): 인계 문서만 읽고 새 세션을 시작하는 것. 인계 문서가 없으면 그냥 기억상실이다.
- **Context Anxiety** (회의 끝나갈 때 서두르기): 컨텍스트가 찼다고 느끼면 서둘러 마무리하려는 경향. 적절한 시점에 세션을 넘길 구조가 필요하다.
- **Worktree** (별도 작업실): 같은 저장소를 여러 작업 공간으로 나누는 Git 기능. 병렬 에이전트가 서로 발을 밟지 않게 한다.
- **Checkpoint** (임시 저장): 세션 중 편집을 추적해 되돌릴 수 있게 하는 장치. Git을 대체하지 않는다.

### 설계 판단

- **Harness Thickness** (체크리스트의 두께): 로직을 모델에 맡길지 코드로 통제할지의 정도. 정답은 없고 위험도와 모델 성숙도에 따라 다르다.
- **Scaffolding, 비계** (건설 현장의 비계): 모델이 약한 부분을 임시로 떠받치는 구조. 언젠가 걷어내야 한다. 단, 하나씩.
- **Load-bearing** (내력벽): 실제로 성능을 지탱하는 하네스 요소. 장식처럼 보여도 안전장치일 수 있다.
- **ACI** (직원용 작업대): Agent-Computer Interface. 에이전트가 컴퓨터와 만나는 인터페이스. 사람용 UI가 에이전트용으로 최적은 아니다.
- **Agent Experience (AX)** (직원용 레시피와 주문표): 에이전트가 화면·상태·오류·로그를 의미로 읽고 행동하게 하는 경험. 사람 눈에 예쁜 화면이 에이전트에게도 읽기 쉽다고 가정하지 않는다.
- **Human UX** (손님용 메뉴판): 사람이 맡기고, 이해하고, 승인·중단·수정할 수 있게 하는 경험. AI가 알아서 한다는 이유로 통제권을 없애지 않는다.
- **Operator UX** (점장용 대시보드): 운영자가 실행 상태·승인 대기·실패·비용·로그를 관리하는 경험. 운영 화면을 미루면 실패 원인을 늦게 안다.
- **Black-box Harness** (내부를 볼 수 없는 대행 서비스): 내부 동작과 메모리 구조가 보이지 않는 하네스. 편리하지만 이식성과 소유권을 확인해야 한다.

---

## 3부. 레퍼런스 지도

### 한국어 단행본

- **김동학, 《하네스 엔지니어링 백과사전》** (위키독스, v1.86) – <https://wikidocs.net/book/19689>
  이 시리즈의 뼈대. 전 15장 + 부록 A~O. 각 장 끝에 가족 여행 준비·이사 체크리스트 같은 일상생활 실습이 붙어 있고, 부록에는 하네스 성숙도 체크리스트, 업무 하네스 설계 카드, 도입 실패 사례, 직군별 적용 예시, Q&A 71문항, 워크숍 진행안, 실습 키트가 들어 있다. 유료 전자책이다.
  실습 도구: Claude Code용 `/harness-lab`, Codex CLI용 `$harness-lab` 스킬

### 공식 문서 – Anthropic

- *Building Effective AI Agents* – <https://www.anthropic.com/engineering/building-effective-agents>
- *Effective context engineering for AI agents* – <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>
- *Writing effective tools for AI agents* – <https://www.anthropic.com/engineering/writing-tools-for-agents>
- *Effective harnesses for long-running agents* – <https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>
- *Demystifying evals for AI agents* – <https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents>
- *Harness design for long-running application development* – <https://www.anthropic.com/engineering/harness-design-long-running-apps>
- *Building agents with the Claude Agent SDK* – <https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk>
- *Equipping agents for the real world with Agent Skills* – <https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills>
- *Introducing the Model Context Protocol* – <https://www.anthropic.com/news/model-context-protocol>

### 공식 문서 – Claude Code

- Overview – <https://code.claude.com/docs/en/overview>
- Configure permissions – <https://code.claude.com/docs/en/permissions>
- Automate workflows with hooks – <https://code.claude.com/docs/en/hooks-guide>
- Create custom subagents – <https://code.claude.com/docs/en/sub-agents>
- Orchestrate teams of Claude Code sessions – <https://code.claude.com/docs/en/agent-teams>
- Connect Claude Code to tools via MCP – <https://code.claude.com/docs/en/mcp>
- Settings – <https://code.claude.com/docs/en/settings>
- How Claude remembers your project – <https://code.claude.com/docs/en/memory>
- Checkpointing – <https://code.claude.com/docs/en/checkpointing>
- Interactive mode – <https://code.claude.com/docs/en/interactive-mode>
- CLI reference – <https://code.claude.com/docs/en/cli-reference>
- Agent SDK overview – <https://code.claude.com/docs/en/agent-sdk/overview>
- Extend Claude with skills – <https://docs.anthropic.com/en/docs/claude-code/skills>
- Create plugins – <https://docs.anthropic.com/en/docs/claude-code/plugins>
- Hooks reference – <https://docs.anthropic.com/en/docs/claude-code/hooks>

### 공식 문서 – OpenAI

- *Harness engineering: leveraging Codex in an agent-first world* – <https://openai.com/index/harness-engineering/>
- *Unrolling the Codex agent loop* – <https://openai.com/index/unrolling-the-codex-agent-loop/>
- Agents SDK – <https://developers.openai.com/api/docs/guides/agents>
- Using tools – <https://developers.openai.com/api/docs/guides/tools>
- Function calling – <https://developers.openai.com/api/docs/guides/function-calling>
- Web search – <https://developers.openai.com/api/docs/guides/tools-web-search>
- MCP and Connectors – <https://developers.openai.com/api/docs/guides/tools-connectors-mcp>
- Structured Outputs – <https://developers.openai.com/api/docs/guides/structured-outputs>
- Codex: AGENTS.md – <https://developers.openai.com/codex/guides/agents-md>
- Codex CLI – <https://developers.openai.com/codex/cli>
- Codex: Agent Skills – <https://developers.openai.com/codex/skills>
- Codex: Subagents – <https://developers.openai.com/codex/subagents>
- Codex: Hooks – <https://developers.openai.com/codex/hooks>
- Codex: Worktrees – <https://developers.openai.com/codex/app/worktrees>
- Codex App Server – <https://developers.openai.com/codex/app-server>
- Agents SDK Tracing – <https://openai.github.io/openai-agents-python/tracing/>
- Agents SDK Handoffs – <https://openai.github.io/openai-agents-python/handoffs/>

### 공식 문서 – Google

- *An important update: Transitioning Gemini CLI to Antigravity CLI* – <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- *I/O 2026 developer highlights: Antigravity, Gemini API, AI Studio* – <https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/>
- *Announcing the Agent2Agent Protocol (A2A)* – <https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/>
- *Developer's Guide to AI Agent Protocols* – <https://developers.googleblog.com/en/developers-guide-to-ai-agent-protocols/>
- Google PAIR(People + AI Research), *People + AI Guidebook* – <https://pair.withgoogle.com/guidebook/>

### 프로토콜 · 표준

- Model Context Protocol – <https://modelcontextprotocol.io/docs/getting-started/intro>
- A2A Protocol – <https://a2a-protocol.org/latest/>
- AGENTS.md open format – <https://agents.md/>

### 논문 · 연구

- **ReAct** (Yao et al., 2022): 추론과 행동을 번갈아 수행 – <https://arxiv.org/abs/2210.03629>
- **Toolformer** (Schick et al., 2023): 모델이 도구 호출 시점을 학습 – <https://arxiv.org/abs/2302.04761>
- **Reflexion** (Shinn et al., 2023): 언어적 피드백을 기억으로 남겨 개선 – <https://arxiv.org/abs/2303.11366>
- **Self-Refine** (Madaan et al., 2023): 자기 피드백으로 반복 개선 – <https://arxiv.org/abs/2303.17651>
- **Lost in the Middle** (Liu et al., 2023): 정보 위치가 성능을 바꾼다 – <https://arxiv.org/abs/2307.03172>
- **SWE-bench** (Jimenez et al., 2023): 실제 GitHub 이슈 해결 벤치마크 – <https://arxiv.org/abs/2310.06770>
- **SWE-agent** (Yang et al., 2024): Princeton 연구팀이 만든, GitHub 이슈를 코드 수정으로 해결하는 에이전트. ACI가 성능을 크게 바꾼다 – <https://arxiv.org/abs/2405.15793>
- **AgentBench** (Liu et al., 2023): LLM을 에이전트로 평가 – <https://arxiv.org/abs/2308.03688>
- **Voyager** (Wang et al., 2023): 개방형 환경의 자율 에이전트 – <https://arxiv.org/abs/2305.16291>
- **ACON** (Kang et al., 2025): Agent Context Optimization. 장기 에이전트의 컨텍스트 압축 최적화 – <https://arxiv.org/abs/2510.00615>
- **Human-AI Interaction Guidelines** (Amershi et al., CHI 2019): AI UX 18원칙 – <https://doi.org/10.1145/3290605.3300233>
- **UXAgent** (Wang et al., 2025): LLM 에이전트로 사용성 테스트 시뮬레이션 – <https://arxiv.org/abs/2504.09407>

### 보안 · 거버넌스

- OWASP(웹·애플리케이션 보안 비영리 재단), *Top 10 for Large Language Model Applications* – <https://owasp.org/www-project-top-10-for-large-language-model-applications/>
- NIST(미국 국립표준기술연구소), *AI RMF: Generative AI Profile (AI 600-1)* – <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf>
- Simon Willison(Django 공동 창시자이자 LLM 보안 분야 저술가), *Prompt injection* 시리즈 – <https://simonwillison.net/series/prompt-injection/>

### 프레임워크 · 기업 블로그

- LangChain(LLM 애플리케이션 개발 프레임워크 회사), *The Anatomy of an Agent Harness* – <https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
- LangChain, *Improving Deep Agents with harness engineering* – <https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering>
- LangChain, *Better Harness: A Recipe for Harness Hill-Climbing with Evals* – <https://www.langchain.com/blog/better-harness-a-recipe-for-harness-hill-climbing-with-evals>
- LangChain, *Plan-and-Execute Agents* – <https://www.langchain.com/blog/planning-agents>
- Birgitta Böckeler(ThoughtWorks의 AI 코딩 어시스턴트 분야 저술가), *Harness engineering for coding agent users* (martinfowler.com) – <https://martinfowler.com/articles/harness-engineering.html>
- Mitchell Hashimoto(HashiCorp 공동 창업자, Ghostty 개발자), *My AI Adoption Journey* (2026.02.05) – 하네스 관점을 명확히 사용한 초기 글

### 배경 개념

- Synopsys(반도체 설계 소프트웨어 회사), *What is Wiring Harness?* – <https://www.synopsys.com/glossary/what-is-wiring-harness.html>
- ISTQB(국제 소프트웨어 테스팅 자격위원회) Glossary, *test harness* – <https://glossary.istqb.org/en_US/term/test-harness>

---

## 4부. 마지막 정리 – 이 시리즈의 8문장

1. **Agent = Model + Harness.** 모델만 바꿔서 해결되는 문제는 생각보다 적다.
2. 원시 LLM은 운영체제 없는 CPU다. 계산은 하지만 혼자서 일을 끝내지 못한다.
3. 컨텍스트는 무한한 창고가 아니라 제한된 책상이다. 많이 올리면 중요한 게 묻힌다.
4. 매번 일어나야 하는 일은 지침이 아니라 훅에 있어야 한다. 부탁과 집행은 다르다.
5. 도구를 많이 주는 게 아니라, 지금 필요한 도구를 이해하기 쉽게 준다.
6. "완료했다"는 말보다 증거가 중요하다. 테스트, 스크린샷, diff, 예약번호.
7. 비계는 건물을 짓지 않는다. 하지만 비계 없이는 위층에 닿지 못한다. 그리고 언젠가 걷어내야 한다.
8. 좋은 AI 활용은 좋은 질문에서 시작하지만, 오래가는 AI 시스템은 좋은 하네스에서 완성된다.

---

이전 편: [12. 실전 사례와 생태계](/post/ai-everything-12-cases-ecosystem)
