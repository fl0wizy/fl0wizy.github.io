import { blogPosts } from './posts';
export { blogPosts };

// ===== Type definitions =====

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string; // YYYY-MM-DD HH:MM format
  category: string;
  tags?: string[];
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  children?: Category[];
  // Post category ids this category absorbs without appearing as nav entries.
  // Fine-grained kinds (research/study/CTF) that only show as a badge next to a
  // post are collected here.
  mergedIds?: string[];
}

export interface ContactInfo {
  type: 'discord' | 'telegram' | 'linkedin' | 'github' | 'email' | 'code4rena' | 'hackenproof' | 'cantina';
  label: string;
  value: string;
  link?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export interface Award {
  title: string;
  organizer: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Project {
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Education {
  title: string;
  institution: string;
  subInfo?: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export interface Skill {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  tags: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
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
  { id: 'all', name: 'All', icon: 'grid' },
  {
    id: 'security',
    name: 'Security',
    icon: 'shield',
    children: [
      { id: 'web-security', name: 'Web Security', icon: 'globe' },
      {
        id: 'web3-blockchain',
        name: 'Web3 / Blockchain',
        icon: 'zap',
        // Keep the sidebar shallow. research/study/CTF are not things a reader
        // picks -- they only describe the nature of a post -- so they surface as
        // badges (categoryLabels) and collapse into this single node in the list.
        mergedIds: ['research-article', 'study-dev-security', 'wargame-ctf'],
      },
      { id: 'reversing', name: 'Reversing', icon: 'cpu' },
      { id: 'pwn', name: 'Pwn', icon: 'terminal' },
      { id: 'crypto', name: 'Crypto', icon: 'lock' },
      { id: 'hardware', name: 'Hardware', icon: 'circuit' },
    ],
  },
  { id: 'ai', name: 'AI', icon: 'bot' },
  { id: 'development', name: 'Development', icon: 'code' },
  { id: 'travel', name: 'Travel', icon: 'map' },
  { id: 'daily', name: 'Daily', icon: 'user' },
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
export const categoryLabels: Record<string, string> = {
  daily: 'DAILY',
  security: 'SECURITY',
  'web-security': 'Web Security',
  'web3-blockchain': 'Web3/Blockchain',
  'research-article': 'Research/Article',
  'study-dev-security': 'Study',
  'wargame-ctf': 'Wargame/CTF',
  reversing: 'Reversing',
  pwn: 'Pwn',
  crypto: 'Crypto',
  hardware: 'Hardware',
  ai: 'AI',
  development: 'DEVELOPMENT',
  travel: 'TRAVEL',
};

export function getCategoryColor(id: string): string {
  return categoryColors[id] ?? '#9580ff';
}

export function getCategoryLabel(id: string): string {
  return categoryLabels[id] ?? id;
}

// ===== Profile data =====
// Edit this object to change the information on the profile page.

export const profileData: ProfileData = {
  name: 'flowizy',
  title: 'SECURITY RESEARCHER',
  bio: 'I treat a vulnerability as a property of asset flows and participant privilege structures rather than of any single line of code: I build a per-actor threat model first, then trace the point where an invariant breaks. I have authored 9 formal vulnerability reports with PoCs and CVSS scores against data availability layers (EigenDA, Celestia, Avail), and I audit DeFi and RWA protocols.',
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
    { type: 'email', label: 'PERSONAL EMAIL', value: 'dhcorjs063@gmail.com', link: 'mailto:dhcorjs063@gmail.com' },
    { type: 'email', label: 'ACADEMIC EMAIL', value: 'dhcorjs@ajou.ac.kr', link: 'mailto:dhcorjs@ajou.ac.kr' },
  ],
  experiences: [
    {
      title: 'President of Layer-A',
      company: 'Layer-A (Blockchain Society, Ajou University)',
      period: '2026-08 ~ 2027-01',
      description: 'Currently serving as president of Layer-A, the blockchain society at Ajou University.',
      tags: ['Blockchain', 'Society Operations', 'Leadership'],
      current: true,
    },
    {
      title: 'Security Team Lead, Layer-A 4th Cohort',
      company: 'Layer-A (Blockchain Society, Ajou University)',
      period: 'H2 2025',
      description: 'Designed and ran the curriculum for the Web3 security study team. Led the group through the full Ethernaut, Damn Vulnerable DeFi and onlypwner sets alongside a weekly security incident case study.',
      tags: ['Web3 Security', 'Audit', 'Study Group Operations'],
    },
    {
      title: 'The 10th President of the Student Council',  // position
      company: 'Ajou University - Department of Cyber Security',           // organization
      period: '2025-02 ~ 2025-12',                 // period
      description: 'Served as the 10th president of the student council of the Department of Cyber Security, Ajou University, for the 2025 term.',  // description
      tags: ['Student Council', 'Student Governance', 'Ownership'],  // related tags
    },
  ],
  awards: [
    {
      title: '2025-1 Ajou University Paran Semester Project (Awarded)',
      organizer: 'Ajou University',
      period: '2025-03 ~ 2025-06',
      description: 'Built a project that analyzes and visualizes on-chain data, which placed in the Paran Semester project showcase.',
      tags: ['Data Analysis', 'Visualization', 'Project'],
    },
    {
      title: 'EwhaChain x BNB Idea Hackathon (Grand Prize)',
      organizer: 'EwhaChain x BNB',
      period: '2025-08',
      description: 'Planned and pitched a blockchain product idea and took the grand prize at the hackathon.',
      tags: ['Hackathon', 'Ideation', 'Blockchain'],
    },
    {
      title: 'Monad Blitz 3rd (4th place)',
      organizer: 'Monad',
      period: '2025-11',
      description: 'Competed in Monad Blitz 3rd and placed 4th, recognized for the completeness of the build and the idea behind it.',
      tags: ['Monad', 'Competition', 'Prototyping'],
    },
    {
      title: 'Hypersonic CTF 2026 (1st place)',
      organizer: 'Hypersonic',
      period: 'H1 2026',
      description: 'Finished 1st at Hypersonic CTF 2026.',
      tags: ['CTF', 'Web3', 'Security'],
    },
  ],
  projects: [
    {
      title: 'BonDA - Threat Modeling & Monitoring for the DA Ecosystem',
      type: 'Threat Modeling & Vulnerability Research',
      year: '2026-05 ~ 2026-06',
      description: 'STRIDE threat modeling across four data availability layers - EthereumDA (PeerDAS), EigenDA, Celestia and Avail - covering $35.98B in total value secured across 73 L2s, together with a real-time monitoring dashboard. Collected the data myself by operating full Ethereum nodes (EL/CL), and wrote 9 formal vulnerability reports with PoCs and CVSS 3.1 scores. Example: EigenDA operator DoS - a gRPC flood PoC measured driving CPU to roughly 800% saturation.',
      tags: ['STRIDE', 'DA Layer', 'PoC', 'CVSS'],
      link: 'https://bonda.me',
    },
    {
      title: 'hack-tree - Security Knowledge Learning Platform',
      type: 'Full-stack & DevSecOps',
      year: '2026-07 ~ ongoing',
      description: 'Sole designer, builder and operator of an invite-only platform that navigates 292 security nodes across web hacking, pwnable and CS as a tree and attack-chain graph. Implemented invite-based authentication and RBAC from scratch (IDOR prevention, argon2, rate limiting, verified by 114 pytest cases), a GitHub Actions -> GHCR -> SSH CI/CD pipeline with automatic rollback, and GCP infrastructure as code with Terraform and cloud-init.',
      tags: ['Next.js', 'FastAPI', 'Terraform', 'CI/CD', 'DevSecOps'],
    },
    {
      title: 'Blockchain Audit Project',              // project name
      type: 'DeFi Security & Audit',             // project type
      year: '2025-07 ~ ongoing',                         // year
      description: 'Beginning with a five-week audit of Flare FAsset (a cross-chain asset system), extended an audit methodology centered on deriving attack vectors per participant across Trader Joe and Ekubo (DEX), Rootstock (sidechain) and Centrifuge v3.1 (RWA).',
      tags: ['EVM', 'Solidity', 'Audit', 'RWA'],
    },
    {
      title: 'Visualize on-chain data',              // project name
      type: 'Data Analytics & Visualization',             // project type
      year: '2025-03 ~ 2025-06',                         // year
      description: 'Loaded roughly 200 million on-chain records from multiple chains into a database and made them legible as node graphs, treemaps and heatmaps.',
      tags: ['Java', 'SpringBoot', 'Vue.js'],
      link: 'https://github.com/paran-timestamper/blockchain-analytics',
    },
  ],
  education: [
    {
      title: 'Department of Cyber Security',
      institution: 'Ajou University',
      subInfo: 'B.S. in Cyber Security',
      period: '2022-03 ~ 2027-08 (expected)',
      description: 'Studying systems security and decentralization, down to the network layer over which those systems communicate. Active in the Whois information security club and the Layer-A blockchain society.',
      tags: ['Systems Security', 'Operating Systems', 'Networking'],
      current: true,                        // currently enrolled (highlighted in blue)
    },
    {
      title: 'Hspace Internship',  // program name
      institution: 'Hspace',                   // institution
      subInfo: 'Intern',                 // additional info (optional)
      period: '2025-07 ~ 2025-08',           // period
      description: 'Built broad working knowledge across web, Web3 and infrastructure, and helped run security community programs.',
      tags: ['Web Security', 'Web3', 'Secureum', 'DEFCON'],
    },
    {
      title: 'HuntingMaster (KISA) Web/Web3 Track Trainee',  // program name
      institution: 'KISA',                   // institution
      subInfo: 'Distinguished graduate - Team lead, Audit4ce',                 // additional info (optional)
      period: '2025-07 ~ 2025-10',           // period
      description: 'Studied web hacking theory and DeFi (MEV, ecosystem structure), and led team Audit4ce as team lead on Web3 audit projects (Flare FAsset, Trader Joe).',
      tags: ['Web Security', 'Web3', 'Audit', 'Bug Bounty'],
    },
    {
      title: 'Upside Academy 4th',  // program name
      institution: 'Theori x Dunamu',                   // institution
      subInfo: 'A.K.A flowizy',                 // additional info (optional)
      period: '2026-02 ~ 2026-06',           // period
      description: 'Completed offensive and defensive coursework spanning value chain, EVM, DeFi, cryptography, cloud/infrastructure, LLM security and ERC-4337, and delivered BonDA as the capstone project.',
      tags: ['Solidity', 'Foundry', 'Web3', 'Audit', 'Threat Modeling'],
    },
  ],
  certifications: [
    {
      title: 'JLPT N2',
      issuer: 'Japan Educational Exchanges and Services (Japanese-Language Proficiency Test)',
      date: '2024-07',
    },
    {
      title: 'Craftsman Information Processing',
      issuer: 'Human Resources Development Service of Korea (HRD Korea)',
      date: '2022-12',
    },
    {
      title: "Driver's License (Class 2, Ordinary)",
      issuer: 'Korean National Police Agency',
      date: '2021-02',
    },
  ],
  skills: [
    {
      name: 'Web3 security',                     // skill name
      category: 'Smart Contracts',          // category
      level: 'intermediate',                      // level: beginner, intermediate, advanced, expert
      description: 'Audits on EVM with Foundry, STRIDE threat modeling, and DeFi invariant analysis across DEX, lending, perp DEX and staking.',
      tags: ['Solidity', 'EVM', 'Foundry', 'STRIDE'],
    },
    {
      name: 'Web Security',
      category: 'Network Security',
      level: 'intermediate',
      description: 'Extensive wargame experience across SQLi, XSS, SSRF and authorization bypass.',
      tags: ['Burp Suite', 'XSS', 'SQLi', 'SSRF', 'JWT'],
    },
    {
      name: 'Pwnable',
      category: 'System Hacking',
      level: 'intermediate',
      description: 'Stack and heap exploitation, ROP, format string and tcache - system hacking centered on bypassing mitigations.',
      tags: ['ROP', 'Heap', 'Tcache', 'Format String'],
    },
    {
      name: 'Dev / Infra',
      category: 'DevSecOps',
      level: 'intermediate',
      description: 'Develops in Python, Go and TypeScript, and codifies and operates infrastructure with Docker, GCP, Terraform and CI/CD.',
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
