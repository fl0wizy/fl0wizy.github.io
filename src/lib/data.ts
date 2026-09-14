import { blogPosts } from './posts';
import type { LocalizedText } from './i18n';
export { blogPosts };

// ===== Type definitions =====

export interface BlogPost {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  content: string;
  // English body, present when src/content/posts/en/<slug>.md exists.
  // Absent means the post is untranslated and the Korean body is shown instead.
  contentEn?: string;
  date: string; // YYYY-MM-DD HH:MM format
  category: string;
  tags?: string[];
  published: boolean;
}

export interface Category {
  id: string;
  name: LocalizedText;
  icon?: string;
  children?: Category[];
  // Post category ids this category absorbs without appearing as nav entries.
  // Fine-grained kinds (research/study/CTF) that only show as a badge next to a
  // post are collected here.
  mergedIds?: string[];
}

export interface ContactInfo {
  type: 'discord' | 'telegram' | 'linkedin' | 'github' | 'email' | 'code4rena' | 'hackenproof' | 'cantina';
  label: LocalizedText;
  value: string;
  link?: string;
}

export interface Experience {
  title: LocalizedText;
  company: LocalizedText;
  period: LocalizedText;
  // A single paragraph, or a list rendered as bullets.
  description: LocalizedText | LocalizedText[];
  tags: string[];
  current?: boolean;
}

export interface Award {
  title: LocalizedText;
  organizer: LocalizedText;
  period: LocalizedText;
  description: LocalizedText;
  tags: string[];
}

export interface Project {
  title: LocalizedText;
  type: LocalizedText;
  year: string;
  description: LocalizedText;
  tags: string[];
  link?: string;
}

export interface Education {
  title: LocalizedText;
  institution: LocalizedText;
  subInfo?: LocalizedText;
  period: LocalizedText;
  description: LocalizedText;
  tags: string[];
  current?: boolean;
}

export interface Skill {
  name: LocalizedText;
  category: LocalizedText;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: LocalizedText;
  tags: string[];
}

export interface Certification {
  title: LocalizedText;
  issuer: LocalizedText;
  date: string;
}

export interface ProfileData {
  name: string;
  title: LocalizedText;
  bio: LocalizedText;
  profileImage?: string;
  contacts: ContactInfo[];
  experiences: Experience[];
  awards: Award[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
}

// ===== Category structure =====
// Edit this structure to change the sidebar category menu.

export const categories: Category[] = [
  { id: 'all', name: { ko: '전체', en: 'All' }, icon: 'grid' },
  {
    id: 'security',
    name: { ko: '보안', en: 'Security' },
    icon: 'shield',
    children: [
      { id: 'web-security', name: { ko: '웹 보안', en: 'Web Security' }, icon: 'globe' },
      {
        id: 'web3-blockchain',
        name: { ko: 'Web3 / 블록체인', en: 'Web3 / Blockchain' },
        icon: 'zap',
        // Keep the sidebar shallow. research/study/CTF are not things a reader
        // picks -- they only describe the nature of a post -- so they surface as
        // badges (categoryLabels) and collapse into this single node in the list.
        mergedIds: ['research-article', 'study-dev-security', 'wargame-ctf'],
      },
      { id: 'reversing', name: { ko: '리버싱', en: 'Reversing' }, icon: 'cpu' },
      { id: 'pwn', name: { ko: '시스템 해킹', en: 'Pwn' }, icon: 'terminal' },
      { id: 'crypto', name: { ko: '암호', en: 'Crypto' }, icon: 'lock' },
      { id: 'hardware', name: { ko: '하드웨어', en: 'Hardware' }, icon: 'circuit' },
    ],
  },
  { id: 'ai', name: 'AI', icon: 'bot' },
  { id: 'development', name: { ko: '개발', en: 'Development' }, icon: 'code' },
  { id: 'travel', name: { ko: '여행', en: 'Travel' }, icon: 'map' },
  { id: 'daily', name: { ko: '일상', en: 'Daily' }, icon: 'user' },
];

// ===== Per-category signature colors =====
// Card badges, the active sidebar row and the post-page accent rule all follow these.
// Desaturated, soft tones so they do not glare against the dark background.
export const categoryColors: Record<string, string> = {
  all: '#a79bea',
  security: '#a79bea', // parent (security) - brand purple (soft)
  'web-security': '#6f9fd8', // blue
  'web3-blockchain': '#a79bea', // purple
  'research-article': '#5fc2b2', // teal
  'study-dev-security': '#8b8ee0', // indigo
  'wargame-ctf': '#db8585', // red
  reversing: '#74c195', // green
  pwn: '#e6a572', // orange
  crypto: '#db8fb4', // pink
  hardware: '#bfa07a', // bronze - PCB / solder tone
  ai: '#a3c76d', // lime green (soft)
  development: '#6fbecf', // cyan
  travel: '#d4c277', // amber
  daily: '#9ca3af', // gray
};

// ===== Category id -> display label =====
export const categoryLabels: Record<string, LocalizedText> = {
  daily: { ko: '일상', en: 'DAILY' },
  security: { ko: '보안', en: 'SECURITY' },
  'web-security': { ko: '웹 보안', en: 'Web Security' },
  'web3-blockchain': { ko: 'Web3/블록체인', en: 'Web3/Blockchain' },
  'research-article': { ko: '리서치/아티클', en: 'Research/Article' },
  'study-dev-security': { ko: '스터디', en: 'Study' },
  'wargame-ctf': { ko: '워게임/CTF', en: 'Wargame/CTF' },
  reversing: { ko: '리버싱', en: 'Reversing' },
  pwn: { ko: '시스템 해킹', en: 'Pwn' },
  crypto: { ko: '암호', en: 'Crypto' },
  hardware: { ko: '하드웨어', en: 'Hardware' },
  ai: 'AI',
  development: { ko: '개발', en: 'DEVELOPMENT' },
  travel: { ko: '여행', en: 'TRAVEL' },
};

export function getCategoryColor(id: string): string {
  return categoryColors[id] ?? '#9580ff';
}

export function getCategoryLabel(id: string): LocalizedText {
  return categoryLabels[id] ?? id;
}

// ===== Profile data =====
// Edit this object to change the information on the profile page.

export const profileData: ProfileData = {
  name: 'flowizy',
  title: { ko: '보안 연구자', en: 'SECURITY RESEARCHER' },
  bio: {
    ko: '취약점을 코드 한 줄의 성질이 아니라 자산 흐름과 참여자 권한 구조의 성질로 접근. 행위자별 위협 모델을 먼저 세우고 불변식이 깨지는 지점을 추적. 데이터 가용성 계층(EigenDA, Celestia, Avail) 대상 PoC·CVSS 포함 정식 취약점 리포트 9건 작성. DeFi·RWA 프로토콜 감사.',
    en: 'Treats a vulnerability as a property of asset flows and participant privilege structures, not of any single line of code — per-actor threat model first, then the point where an invariant breaks. 9 formal vulnerability reports with PoCs and CVSS scores against data availability layers (EigenDA, Celestia, Avail). DeFi and RWA protocol audits.',
  },
  profileImage: '/images/chaegeon.jpg', // profile image path
  contacts: [
    // Security research profiles first: these are the third-party verifiable record.
    { type: 'code4rena', label: 'CODE4RENA', value: '@fl0wizy', link: 'https://code4rena.com/@fl0wizy' },
    { type: 'hackenproof', label: 'HACKENPROOF', value: 'fl0wizy', link: 'https://hackenproof.com/hackers/fl0wizy' },
    { type: 'cantina', label: 'CANTINA', value: 'fl0wizy', link: 'https://cantina.xyz/u/fl0wizy' },
    { type: 'discord', label: 'DISCORD', value: '_flowizy' },
    { type: 'telegram', label: 'TELEGRAM', value: '@chaegunn', link: 'https://t.me/chaegunn' },
    { type: 'linkedin', label: 'LINKEDIN', value: 'Chaegeon Oh', link: 'https://www.linkedin.com/in/%EC%B1%84%EA%B1%B4-%EC%98%A4-159157342/' },
    { type: 'github', label: 'GITHUB', value: 'fl0wizy', link: 'https://github.com/fl0wizy' },
    { type: 'email', label: { ko: '개인 이메일', en: 'PERSONAL EMAIL' }, value: 'dhcorjs063@gmail.com', link: 'mailto:dhcorjs063@gmail.com' },
    { type: 'email', label: { ko: '학교 이메일', en: 'ACADEMIC EMAIL' }, value: 'dhcorjs@ajou.ac.kr', link: 'mailto:dhcorjs@ajou.ac.kr' },
  ],
  experiences: [
    {
      title: { ko: 'Layer-A 회장', en: 'President of Layer-A' },
      company: { ko: 'Layer-A (아주대학교 블록체인 학회)', en: 'Layer-A (Blockchain Society, Ajou University)' },
      period: '2026-08 ~ 2027-01',
      description: {
        ko: '아주대학교 블록체인 학회 Layer-A 회장 재임 중',
        en: 'Currently president of Layer-A, the blockchain society at Ajou University',
      },
      tags: ['Blockchain', 'Society Operations', 'Leadership'],
      current: true,
    },
    {
      title: { ko: 'Layer-A 4기 보안 팀장', en: 'Security Team Lead, Layer-A 4th Cohort' },
      company: { ko: 'Layer-A (아주대학교 블록체인 학회)', en: 'Layer-A (Blockchain Society, Ajou University)' },
      period: { ko: '2025 하반기', en: 'H2 2025' },
      description: {
        ko: 'Web3 보안 스터디 팀 커리큘럼 설계·운영 / Ethernaut·Damn Vulnerable DeFi·onlypwner 전 세트 완주 / 주간 보안 사고 사례 분석 병행',
        en: 'Designed and ran the Web3 security study curriculum / full Ethernaut, Damn Vulnerable DeFi and onlypwner sets / weekly security incident case studies',
      },
      tags: ['Web3 Security', 'Audit', 'Study Group Operations'],
    },
    {
      title: { ko: '제10대 학생회장', en: 'The 10th President of the Student Council' },
      company: { ko: '아주대학교 사이버보안학과', en: 'Ajou University - Department of Cyber Security' },
      period: '2025-02 ~ 2025-12',
      description: [
        {
          ko: '제10대 사이버보안학과 학생회장 (2025-02 ~ 2025-12)',
          en: '10th president of the Department of Cyber Security student council (2025-02 ~ 2025-12)',
        },
        {
          ko: '제9대 사이버보안학과 학생회 Log 집행국 (2024-07 ~ 2024-12)',
          en: 'Executive bureau, Log - 9th Department of Cyber Security student council (2024-07 ~ 2024-12)',
        },
        {
          ko: '제26대 소프트웨어융합대학 학생회 한빛 교육복지국 (2022-02 ~ 2022-12)',
          en: 'Education and welfare bureau, Hanbit - 26th College of Software and Convergence Technology student council (2022-02 ~ 2022-12)',
        },
      ],
      tags: ['Student Council', 'Student Governance', 'Ownership'],
    },
  ],
  awards: [
    {
      title: { ko: '2025-1 아주대학교 파란학기 프로젝트 (수상)', en: '2025-1 Ajou University Paran Semester Project (Awarded)' },
      organizer: { ko: '아주대학교', en: 'Ajou University' },
      period: '2025-03 ~ 2025-06',
      description: {
        ko: '온체인 데이터 분석·시각화 프로젝트로 파란학기 발표회 입상',
        en: 'Placed at the Paran Semester showcase with an on-chain data analysis and visualization project',
      },
      tags: ['Data Analysis', 'Visualization', 'Project'],
    },
    {
      title: { ko: 'EwhaChain x BNB 아이디어 해커톤 (대상)', en: 'EwhaChain x BNB Idea Hackathon (Grand Prize)' },
      organizer: 'EwhaChain x BNB',
      period: '2025-08',
      description: {
        ko: '블록체인 제품 아이디어 기획·발표로 해커톤 대상 수상',
        en: 'Grand prize for a blockchain product idea, planned and pitched',
      },
      tags: ['Hackathon', 'Ideation', 'Blockchain'],
    },
    {
      title: { ko: 'Monad Blitz 3rd (4위)', en: 'Monad Blitz 3rd (4th place)' },
      organizer: 'Monad',
      period: '2025-11',
      description: {
        ko: 'Monad Blitz 3rd 4위 / 구현 완성도와 아이디어 부문 평가',
        en: '4th place at Monad Blitz 3rd, recognized for build completeness and the idea behind it',
      },
      tags: ['Monad', 'Competition', 'Prototyping'],
    },
    {
      title: { ko: 'Hypersonic CTF 2026 (1위)', en: 'Hypersonic CTF 2026 (1st place)' },
      organizer: 'Hypersonic',
      period: { ko: '2026 상반기', en: 'H1 2026' },
      description: {
        ko: 'Hypersonic CTF 2026 1위',
        en: '1st place, Hypersonic CTF 2026',
      },
      tags: ['CTF', 'Web3', 'Security'],
    },
    {
      title: { ko: 'KISIA CTF 2026 본선 (9위)', en: 'KISIA CTF 2026 Finals (9th place)' },
      organizer: { ko: 'KISIA (한국정보보호산업협회)', en: 'KISIA (Korea Information Security Industry Association)' },
      period: '2026-08',
      description: {
        ko: '온라인 예선 통과 후 2026-08-09 본선 9위 / 오답 응답을 라벨링 오라클로 전환, CRNN+CTC 인식기 학습으로 CAPTCHA·CAPTCHA V2 체인 해결',
        en: '9th at the finals on 2026-08-09 after the online qualifier / solved the CAPTCHA and CAPTCHA V2 chain by turning the wrong-answer response into a labeling oracle and training a CRNN+CTC recognizer',
      },
      tags: ['CTF', 'Web Security', 'Machine Learning'],
    },
    {
      title: { ko: 'HACKSIUM 2026 BUSAN 본선 (10위)', en: 'HACKSIUM 2026 BUSAN Finals (10th place)' },
      organizer: { ko: '부산정보산업진흥원·동남권정보보호클러스터', en: 'Busan IT Industry Promotion Agency & Southeast Information Security Cluster' },
      period: '2026-09',
      description: {
        ko: '해양·항만·위성 OT 시나리오 기반 2일간(2026-09-11 ~ 09-12) 라이브파이어 사이버 방어전 본선 진출 / 4인 방어팀 10위',
        en: 'Two-day live-fire cyber defense finals (2026-09-11 to 09-12) on a maritime, port and satellite OT scenario / 10th as part of a four-person defense team',
      },
      tags: ['Live Fire', 'Blue Team', 'OT Security'],
    },
  ],
  projects: [
    {
      title: { ko: 'BonDA - DA 생태계 위협 모델링·모니터링', en: 'BonDA - Threat Modeling & Monitoring for the DA Ecosystem' },
      type: { ko: '위협 모델링 · 취약점 연구', en: 'Threat Modeling & Vulnerability Research' },
      year: '2026-05 ~ 2026-06',
      description: {
        ko: '73개 L2가 의존하는 총 $35.98B 규모 데이터 가용성 계층 4종(EthereumDA/PeerDAS, EigenDA, Celestia, Avail) STRIDE 위협 모델링 + 실시간 모니터링 대시보드 / 이더리움 풀노드(EL·CL) 직접 운영해 데이터 수집 / PoC·CVSS 3.1 포함 정식 취약점 리포트 9건 / 예: EigenDA 오퍼레이터 DoS - gRPC 플러딩 PoC로 CPU 약 800% 포화 실측',
        en: 'STRIDE threat modeling across four data availability layers (EthereumDA/PeerDAS, EigenDA, Celestia, Avail) securing $35.98B across 73 L2s, plus a real-time monitoring dashboard / data collected from self-operated Ethereum full nodes (EL, CL) / 9 formal vulnerability reports with PoCs and CVSS 3.1 scores / e.g. EigenDA operator DoS - gRPC flood PoC measured at roughly 800% CPU saturation',
      },
      tags: ['STRIDE', 'DA Layer', 'PoC', 'CVSS'],
      link: 'https://bonda.me',
    },
    {
      title: { ko: 'hack-tree - 보안 지식 학습 플랫폼', en: 'hack-tree - Security Knowledge Learning Platform' },
      type: { ko: '풀스택 · DevSecOps', en: 'Full-stack & DevSecOps' },
      year: '2026-07 ~ ongoing',
      description: {
        ko: '웹 해킹·포너블·CS 292개 보안 노드를 트리와 공격 체인 그래프로 탐색하는 초대제 플랫폼 단독 설계·구축·운영 / 초대 기반 인증·RBAC 자체 구현(IDOR 방지, argon2, rate limiting, pytest 114건 검증) / GitHub Actions -> GHCR -> SSH CI/CD 자동 롤백 / Terraform·cloud-init 기반 GCP IaC',
        en: 'Sole designer, builder and operator of an invite-only platform navigating 292 security nodes across web hacking, pwnable and CS as a tree and attack-chain graph / invite-based auth and RBAC from scratch (IDOR prevention, argon2, rate limiting, 114 pytest cases) / GitHub Actions -> GHCR -> SSH CI/CD with automatic rollback / GCP infrastructure as code with Terraform and cloud-init',
      },
      tags: ['Next.js', 'FastAPI', 'Terraform', 'CI/CD', 'DevSecOps'],
    },
    {
      title: { ko: '블록체인 감사 프로젝트', en: 'Blockchain Audit Project' },
      type: { ko: 'DeFi 보안 · 감사', en: 'DeFi Security & Audit' },
      year: '2025-07 ~ ongoing',
      description: {
        ko: '크로스체인 자산 시스템 Flare FAsset 5주 감사를 시작으로 Trader Joe·Ekubo(DEX), Rootstock(사이드체인), Centrifuge v3.1(RWA)까지 참여자별 공격 벡터 도출 방법론 확장',
        en: 'From a five-week audit of Flare FAsset (cross-chain assets) through Trader Joe and Ekubo (DEX), Rootstock (sidechain) and Centrifuge v3.1 (RWA) - an audit methodology built on deriving attack vectors per participant',
      },
      tags: ['EVM', 'Solidity', 'Audit', 'RWA'],
    },
    {
      title: { ko: '온체인 데이터 시각화', en: 'Visualize on-chain data' },
      type: { ko: '데이터 분석 · 시각화', en: 'Data Analytics & Visualization' },
      year: '2025-03 ~ 2025-06',
      description: {
        ko: '멀티체인 온체인 레코드 약 2억 건 적재 후 노드 그래프·트리맵·히트맵으로 시각화',
        en: 'Roughly 200 million on-chain records from multiple chains, loaded and made legible as node graphs, treemaps and heatmaps',
      },
      tags: ['Java', 'SpringBoot', 'Vue.js'],
      link: 'https://github.com/paran-timestamper/blockchain-analytics',
    },
  ],
  education: [
    {
      title: { ko: '사이버보안학과', en: 'Department of Cyber Security' },
      institution: { ko: '아주대학교', en: 'Ajou University' },
      subInfo: { ko: '사이버보안 학사', en: 'B.S. in Cyber Security' },
      period: { ko: '2022-03 ~ 2027-08 (졸업 예정)', en: '2022-03 ~ 2027-08 (expected)' },
      description: {
        ko: '시스템 보안과 탈중앙화를 네트워크 계층까지 학습 / 정보보호 동아리 Whois·블록체인 학회 Layer-A 활동',
        en: 'Systems security and decentralization, down to the network layer those systems communicate over / active in the Whois information security club and the Layer-A blockchain society',
      },
      tags: ['Systems Security', 'Operating Systems', 'Networking'],
      current: true,
    },
    {
      title: { ko: 'Hspace 인턴십', en: 'Hspace Internship' },
      institution: 'Hspace',
      subInfo: { ko: '인턴', en: 'Intern' },
      period: '2025-07 ~ 2025-08',
      description: {
        ko: '웹·Web3·인프라 전반 실무 경험 / 보안 커뮤니티 프로그램 운영 지원',
        en: 'Hands-on work across web, Web3 and infrastructure / support for security community programs',
      },
      tags: ['Web Security', 'Web3', 'Secureum', 'DEFCON'],
    },
    {
      title: { ko: 'HuntingMaster(KISA) 웹/Web3 트랙 교육생', en: 'HuntingMaster (KISA) Web/Web3 Track Trainee' },
      institution: 'KISA',
      subInfo: { ko: '우수 수료 - Audit4ce 팀장', en: 'Distinguished graduate - Team lead, Audit4ce' },
      period: '2025-07 ~ 2025-10',
      description: {
        ko: '웹 해킹 이론과 DeFi(MEV, 생태계 구조) 학습 / Web3 감사 프로젝트(Flare FAsset, Trader Joe)에서 Audit4ce 팀장 역임',
        en: 'Web hacking theory and DeFi (MEV, ecosystem structure) / team lead of Audit4ce on Web3 audit projects (Flare FAsset, Trader Joe)',
      },
      tags: ['Web Security', 'Web3', 'Audit', 'Bug Bounty'],
    },
    {
      title: { ko: 'Upside Academy 4기', en: 'Upside Academy 4th' },
      institution: 'Theori x Dunamu',
      subInfo: 'A.K.A flowizy',
      period: '2026-02 ~ 2026-06',
      description: {
        ko: '밸류체인·EVM·DeFi·암호학·클라우드/인프라·LLM 보안·ERC-4337 공수 교육 과정 수료 / 캡스톤 프로젝트로 BonDA 제출',
        en: 'Offensive and defensive coursework across value chain, EVM, DeFi, cryptography, cloud/infrastructure, LLM security and ERC-4337 / BonDA delivered as the capstone',
      },
      tags: ['Solidity', 'Foundry', 'Web3', 'Audit', 'Threat Modeling'],
    },
  ],
  certifications: [
    {
      title: 'JLPT N2',
      issuer: { ko: '일본국제교류기금 · 일본국제교육지원협회 (JLPT)', en: 'Japan Educational Exchanges and Services (Japanese-Language Proficiency Test)' },
      date: '2024-07',
    },
    {
      title: { ko: '정보처리기능사', en: 'Craftsman Information Processing' },
      issuer: { ko: '한국산업인력공단', en: 'Human Resources Development Service of Korea (HRD Korea)' },
      date: '2022-12',
    },
    {
      title: { ko: '운전면허 2종 보통', en: "Driver's License (Class 2, Ordinary)" },
      issuer: { ko: '경찰청', en: 'Korean National Police Agency' },
      date: '2021-02',
    },
  ],
  skills: [
    {
      name: { ko: 'Web3 보안', en: 'Web3 security' },
      category: { ko: '스마트 컨트랙트', en: 'Smart Contracts' },
      level: 'intermediate',
      description: {
        ko: 'Foundry 기반 EVM 감사 / STRIDE 위협 모델링 / DEX·렌딩·퍼프 DEX·스테이킹 DeFi 불변식 분석',
        en: 'EVM audits with Foundry / STRIDE threat modeling / DeFi invariant analysis across DEX, lending, perp DEX and staking',
      },
      tags: ['Solidity', 'EVM', 'Foundry', 'STRIDE'],
    },
    {
      name: { ko: '웹 보안', en: 'Web Security' },
      category: { ko: '네트워크 보안', en: 'Network Security' },
      level: 'intermediate',
      description: {
        ko: 'SQLi·XSS·SSRF·인가 우회 전반 워게임 경험',
        en: 'Extensive wargame experience across SQLi, XSS, SSRF and authorization bypass',
      },
      tags: ['Burp Suite', 'XSS', 'SQLi', 'SSRF', 'JWT'],
    },
    {
      name: { ko: '포너블', en: 'Pwnable' },
      category: { ko: '시스템 해킹', en: 'System Hacking' },
      level: 'intermediate',
      description: {
        ko: '스택·힙 익스플로잇 / ROP·포맷 스트링·tcache / 완화 기법 우회 중심',
        en: 'Stack and heap exploitation / ROP, format string, tcache / centered on bypassing mitigations',
      },
      tags: ['ROP', 'Heap', 'Tcache', 'Format String'],
    },
    {
      name: { ko: '개발 / 인프라', en: 'Dev / Infra' },
      category: 'DevSecOps',
      level: 'intermediate',
      description: {
        ko: 'Python·Go·TypeScript 개발 / Docker·GCP·Terraform·CI/CD 기반 인프라 코드화·운영',
        en: 'Development in Python, Go and TypeScript / infrastructure as code and operations with Docker, GCP, Terraform and CI/CD',
      },
      tags: ['Python', 'Go', 'TypeScript', 'Docker', 'Terraform'],
    },
  ],
};

// ===== Utility functions =====

/**
 * Counts the posts in a category.
 */
// Collect the node and every descendant id from the category tree.
// Parent categories (security, web3-blockchain) never carry posts directly, so this
// list is what makes a parent click surface the posts hanging off its descendants.
// Returns null for an id that is not in the tree.
function collectSubtreeIds(categoryId: string, list: Category[] = categories): string[] | null {
  for (const category of list) {
    if (category.id === categoryId) {
      const ids: string[] = [];
      const walk = (node: Category) => {
        ids.push(node.id);
        node.mergedIds?.forEach(mergedId => ids.push(mergedId));
        node.children?.forEach(walk);
      };
      walk(category);
      return ids;
    }

    if (category.children) {
      const found = collectSubtreeIds(categoryId, category.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function matchesCategory(categoryId: string): (post: BlogPost) => boolean {
  const ids = new Set(collectSubtreeIds(categoryId) ?? [categoryId]);
  return post => post.published && ids.has(post.category);
}

export function getPostCountByCategory(categoryId: string): number {
  if (categoryId === 'all') {
    return blogPosts.filter(post => post.published).length;
  }
  return blogPosts.filter(matchesCategory(categoryId)).length;
}

/**
 * Returns the posts in a given category.
 */
export function getPostsByCategory(categoryId: string): BlogPost[] {
  if (categoryId === 'all') {
    return blogPosts.filter(post => post.published);
  }
  return blogPosts.filter(matchesCategory(categoryId));
}

/**
 * Finds a post by id.
 */
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

/**
 * Returns the posts that sit next to a given one in reading order.
 *
 * Neighbours are taken from the post's own category and ordered oldest first,
 * so a series reads front to back. `blogPosts` arrives newest first, hence the
 * reversal. Posts outside the category are skipped: jumping from the last web
 * security post into an unrelated travel entry would not be a "next post".
 */
export function getAdjacentPosts(id: string): {
  prev: BlogPost | undefined;
  next: BlogPost | undefined;
} {
  const current = getPostById(id);
  if (!current || !current.published) return { prev: undefined, next: undefined };

  const ordered = blogPosts
    .filter(post => post.published && post.category === current.category)
    .slice()
    .reverse();

  const index = ordered.findIndex(post => post.id === id);
  if (index === -1) return { prev: undefined, next: undefined };

  return { prev: ordered[index - 1], next: ordered[index + 1] };
}

/**
 * Converts a date string into an "about N hr ago" form.
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString.replace(' ', 'T'));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `about ${diffMins} min ago`;
  if (diffHours < 24) return `about ${diffHours} hr ago`;
  if (diffDays < 7) return `about ${diffDays} d ago`;
  if (diffWeeks < 4) return `about ${diffWeeks} wk ago`;
  if (diffMonths < 12) return `about ${diffMonths} mo ago`;
  return `about ${diffYears} yr ago`;
}

/**
 * Converts a date string into "YYYY-MM-DD / HH:MM".
 */
export function formatDate(dateString: string): string {
  const [datePart, timePart] = dateString.split(' ');
  return `${datePart} / ${timePart}`;
}

/**
 * Estimates reading time in minutes from the body length.
 * Approximated at ~500 Korean characters/min and ~200 English words/min.
 */
export function getReadingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ') // skip code blocks
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~\-|]/g, ' ');
  const korean = (text.match(/[가-힣]/g) || []).length;
  const words = (text.match(/[A-Za-z0-9]+/g) || []).length;
  const minutes = Math.ceil(korean / 500 + words / 200);
  return Math.max(1, minutes);
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Builds the table of contents by extracting only top-level headings (h2, `##`)
 * from the markdown body, in order. h1 (the post title) and h3 (sub-headings) are
 * excluded because they make the TOC too dense. The ids assigned here (`heading-N`)
 * use the same numbering as the ids Post attaches to h2 at render time, so TOC
 * clicks and scroll tracking line up exactly. (`#` inside fenced code is skipped.)
 */
export function extractHeadings(content: string): TocHeading[] {
  const lines = content.split('\n');
  const out: TocHeading[] = [];
  let inFence = false;
  let i = 0;
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    if (m[1].length !== 2) continue; // top-level headings (##) only
    const text = m[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();
    out.push({ id: `heading-${i}`, text, level: m[1].length });
    i++;
  }
  return out;
}
