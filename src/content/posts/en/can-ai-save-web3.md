## A bottleneck nobody saw coming

That Samsung Electronics and SK hynix hold memory semiconductors was a known fact. Only, that this would become **the AI era's jugular** was probably unknown even to them. Who would have guessed the bottleneck would sit at memory bandwidth rather than compute? HBM's supply shortfall now reaches 40%, and most global demand is already consumed by pre-contracts. It is why the two companies are pouring some 70 trillion won of investment in 2026 alone. That the AI era's core resource turned out to be not the GPU but the memory attached next to it is, in hindsight, quite the irony.

## We built it to make life easier

AI has laid hands on nearly every domain of human life. From food, clothing and shelter to how we work, because it has substitutable intelligence and the development speed pushing it forward. So many jobs have disappeared, and I find it hard to say AI's advance is simply good.

Looking at analysis from the Korea Labor Institute, young people have experienced a marked decline in employment in AI-exposed occupations since November 2022, while middle-aged and older workers maintained stable employment regardless of AI exposure. The shock did not arrive evenly but concentrated on the entry tier. In the 2026 Global Talent Trends survey from Mercer, the global HR consultancy, respondents saying "I think I will lose my job because of AI" jumped from 28% in 2024 to 40% in 2026.

Humanity built AI to make life easier, and how many people around you actually feel things got better thanks to AI? Around me at least, most are sighing over making a living.

## How IT changed

In development, humans coding has clearly decreased. When AI first appeared it wrote easy algorithms quickly and struggled with complex ones. Completeness was low and performance was not optimized. It carried inefficient code and inefficient ways of thinking as they were.

It is different now. Many developers throw things at the AI from the idea stage, leave the implementation to it, and find **review has become the main job**. A 2026 survey counted 42% of production code as AI-generated, while more than 95% of developers still do not trust mission-critical logic without human review. That gap is review time. Reports of a large increase in time spent on code review keep coming. The era of typing speed has ended and the era of judgement speed has come.

Security is the same. Solution development got faster, and the speed of building automatic code scanning and detection tools rose dramatically. So the method of dividing a codebase's assets by hand from the start and splitting roles to audit has lost much of its meaning.

I certainly thought defence would get easier, and reality is closer to vulnerability discovery and attack getting easier. XBOW, an autonomous AI pentester, took first place on HackerOne's US leaderboard in 2025, submitting over 1,060 vulnerabilities in two years while executing a 48-step exploit chain and matching a senior pentester's 40-hour assessment in 28 minutes. Google's Big Sleep autonomously found 20 real zero-days in open source. The problem is asymmetry. The point being made is that **attack has autonomous agents while defence is still at assistant level.**

There is one thing in common. Wherever AI is used, responsibility still falls entirely on humans. So it is certain that final approval and reviewing the deliverable are the human's part.

## And here comes blockchain

Web3 came out dreaming the ideological cyberpunk of decentralization. Behind that ideology was the practical advantage of blockchain's security.

But as said above, AI's advance exposes more vulnerabilities. It would be nice if white hats found them first, reported them and the code hardened, and in reality black hats are faster. In a way that is natural. The white hat's path is *find → report → verify → patch*, while the black hat's path is *find → execute*. Starting from the same discovery, the side that detonates is structurally bound to be faster.

In this situation web3's myth of security began to break. On the surface the attack surface is narrower than web2's. But that is only the story of the world inside the blockchain. A blockchain is ultimately existing web2 security and CS knowledge reconstituted into a new distributed system. Existing vulnerabilities are bound to carry over. It is not that a C suddenly dropped into a world of compounds A and B; C was made by combining A and B. So it is affected by A and B.

DeFi in particular took an enormous hit because deposits are large. March to May 2026 felt like genuinely absurd hacks going off daily.

- **1 April, $285 million at Drift Protocol.** It was not a code vulnerability. The attacker built a relationship with the team over several months, then used Solana's durable nonce feature to make Security Council members pre-sign transactions without knowing it. They took over admin rights that way, whitelisted a fake token as collateral, and then drained the real assets. It is assessed as the work of a North Korea-linked group.
- **18 April, $292 million at KelpDAO.** A LayerZero bridge was operating with a single verifier (1-of-1 DVN), and rather than breaking the verifier the attacker **took over the two RPC nodes** that verifier read data from and injected fake messages. There was no bug in the contracts.

Which is to say, both incidents targeted social engineering and infrastructure trust boundaries, not breaking smart contract logic. It means the subject of audits and the real attack surface are out of step.

One thing to correct. Upbit's outflow of Solana-family assets happened not in 2026 but on **27 November 2025**. It was around 44.5 billion won, and it happened not in a cold wallet but in an internet-connected hot wallet. The cause was identified as a key management failure. The timing differs and the character is the same. It was operations and people that were breached, not cryptography.

And looking at the statistics, my impression was half right and half wrong. In the first half of 2026 the **number of attacks, 207, was the highest on record**, while **losses of $972 million were less than half the $2.3 billion of the first half of 2025**. So the sense that "it goes off daily" is accurate, and the sense that "damage is the worst ever" is not. Jabs increased and the knockout punches decreased. Although those punches (Drift, KelpDAO) accounted for most of the first half's losses.

Either way, what would people expect of a blockchain whose security has collapsed? DeFi TVL **fell about 39%** entering 2026, from $115 billion to the $70 billion range. A dark age arrived just like that.

## The dark age is not only about hacks

### 1. It failed to persuade the public

Web3 does not exist physically. Vaccine passes such as COOV used a blockchain DID in the backend, and the public had no occasion to feel it. COOV did in fact run on a public blockchain based on the W3C DID standard and was even selected as an outstanding government innovation case, and **the service was shut down at the end of 2023.** And honestly, was COOV a system that could not run without blockchain? It would not have been.

Ultimately the question is this. **Is web3 technology essential to humanity's IT advance?**

Looking at history, it has kept coming while giving something up. Decentralization was good, so speed was given up and Bitcoin appeared. Convenience was poor, so smart contracts appeared. The attack surface widened so security fell, and raising security raised complexity. Raising complexity lowers speed. Throughput rose and speed fell, so data naturally came to be kept outside.

There are DA-layer L1s such as Celestia and Avail, and things went in the direction of, like EigenDA, pulling in a considerable share of web2 infrastructure's character. EigenDA has a structure of borrowing economic security through restaking by Ethereum validators while the data itself is held by an off-chain operator network. Pure on-chain was never the answer to begin with.

It is also true that incident response is easier on the centralized side. When Sui's Cetus was drained for $223 million in May 2025, validators coordinated within hours and **froze $162 million**. Here there is a part that differs from what I had understood. It was not that the foundation owned most of the validators; it was that **the foundation could coordinate more than two-thirds of the 114 validators at the time, almost instantly.** That the problem was coordinability rather than ownership is if anything more painful. Afterwards, with more than 90% of staked supply in favour, a hard fork returned the funds to their owners. It drew criticism as centralization, and it left a precedent of minimizing damage and responding quickly.

### 2. The technology to cover the weaknesses is still immature

Privacy long depended on external contracts such as RAILGUN. Looking at Ethereum's recent moves, there are attempts to pull this inside. The Ethereum Foundation released the **Kohaku SDK** in May 2026, an open-source toolkit letting protocols such as RAILGUN and Privacy Pools be attached directly at the wallet layer. The 2026 roadmap itself puts institutional privacy and fast finality front and centre.

The problem was ZK's overhead. So the real choice mostly leaned optimistic. The **GIWA** chain released by Dunamu is also an OP Stack-based optimistic rollup. Optimistic rollups are fast for transactions inside L2, while withdrawals out to L1 go through a **seven-day challenge period.** Because fraud proofs are made after the fact, honest watchers have to be given time to find a wrong state root and submit a proof. A blockchain that should have its greatest advantage in finance being this slow is a problem.

Although this part is something I should update my understanding on. In 2024 proof generation cost was ZK's decisive barrier, and in 2026, with ZK-dedicated ASICs and optimized GPU clusters, **proving cost has fallen by more than 90%.** zkSync Era and Polygon zkEVM handle actual withdrawals in 15–45 minutes. The shelf life of the proposition "ZK is too expensive" was shorter than expected.

### 3. Usability is far too poor

There is a recent movement to bring UX right down. It is the **intent layer**. Anoma, Across, CoW Swap and the like – the broad picture is similar. The user signs and throws out "the result they want" in natural language or code, solvers compete behind the scenes to find and execute the optimal path, and the user is shown only the result.

The answer to the question I had thrown out – "but is it all dutch auction?" – is **no**.

- **1inch Fusion, UniswapX**: the classic dutch auction, where a signed order's price decays over time. The resolver that accepts first takes it and pays the gas.
- **CoW Swap**: not a dutch auction but a **batch auction**. Orders are gathered and bundled over about 30 seconds, and solvers bid at auction for the right to settle that batch. Within the same batch a uniform clearing price applies, and where a CoW (coincidence of wants) matches, the AMM is not touched at all. So residual MEV exposure is the lowest.
- **Across**: less an auction than a structure where specialist relayers quote in real time and fill immediately.

The mechanisms diverge and the direction is the same. **Make the back complicated to make the front simple.** The role of today's web3 agents is exactly this: executing quickly what the user had in mind and removing the difficult UX. So AI has come to take one axis of reviving web3 too.

**An aside – a newly opened attack surface.** Doing this means handing a personal wallet to things like Minara AI. In an era rife with AI hijacking, a surface has newly appeared where **hijacking an individual's AI session alone is enough.** In fact, in May 2026, an X user sent a message encoded in Morse code and extracted $150,000 worth of tokens from an AI-connected wallet. It was an incident where prompt injection and excessive agency overlapped. Cases of a prompt hidden on a malicious site making an AI agent pay in cryptocurrency have been reported too, and OWASP places prompt injection first among LLM vulnerabilities.

Minara separates wallets with this in mind. Precisely, rather than pure MPC, it divides a per-user ERC-4337 smart contract wallet (the Funding Wallet) from a Controller Wallet, and puts the controller side on TEE, key sharding and multi-party approval signing. An approach making the actions available against the wallet restricted even if the AI is hijacked. In the end there seems to be no answer other than **giving the AI authority while nailing the ceiling of that authority down in code.**

### 4. In the end there is no adoption

Adoption by large corporations, financial institutions and states is needed. But it cannot keep up with web2 technically, usability is difficult, and it has not persuaded the public. From a financial institution's standpoint there is no advantage. Which is to say, **there is no reason to use it.**

## Even so, the vitality AI gave web3

In this situation there seems to be a part where AI opened a breathing space for web3.

First, **AI has not replaced payment systems.** For two reasons. First, payment carries responsibility for every act, and AI cannot take responsibility. Second, AI cannot yet carry out the complex procedures that pass through the legal net. In internet banking, which has both of these, AI cannot exert force.

But what if you give the AI an on-chain wallet and have it pay?

An AI made of code exerts force where there is code. In web3, where **code is law**, it is easy for an AI to act and pay within fixed algorithms and rules. Services such as KAST in fact top up stablecoins on Solana and make a card usable at any Visa merchant. (Though I could not confirm whether payment works at particular domestic commerce sites. In principle the structure works wherever Visa is accepted.)

Machine-to-machine payment is already producing numbers. The **x402** protocol, built by Coinbase and transferred to the Linux Foundation in April 2026, had by that point processed a cumulative 165 million transactions worth $50 million, with 69,000 active agents. An agent signs an EIP-3009 payload, the stablecoin moves across in seconds, and on L2 the fee is under one cent.

If tokens lay a payment network like this and **web3 becomes the settlement layer**, it could be a new leap for the AI era.

Absorbing finance at a higher level requires national currency. That is stablecoins and CBDCs. Preparation is in fact underway. The Bank of Korea's **Project Hangang** is, in its second phase, raising deposit token wallets to up to 500,000 and adding transfers, entering open-ended real-transaction testing. Discussion on a won stablecoin is converging towards a bank-led consortium, with a legal basis expected within 2026. On the international settlement side, SWIFT has stood up a shared ledger based on **Hyperledger Besu** and entered a 24-hour tokenized deposit settlement pilot with 17 global banks.

And the means for agents to act autonomously within web3 are being prepared too. **ERC-8004** defines three on-chain registries – identity, reputation and validation – so that agents can be discovered, compared and verified without a central body's guarantee. Each agent has a unique identifier issued as an ERC-721, pointing at an agent card carrying its capabilities, endpoints and payment address. It is a standard proposed jointly in August 2025 by contributors from MetaMask, the Ethereum Foundation, Google and Coinbase.

---

To sum up: web3 failed to persuade the public on its own strength, and even its last justification, security, collapsed at social engineering and infrastructure trust boundaries. And then, for the very reason that AI cannot take responsibility and so cannot enter existing finance, **a payment network with the rules nailed down in code** became necessary. That spot is what web3 can take hold of now.

Perhaps what survives out of necessity rather than ideology lasts longer.
