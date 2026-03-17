// Apollo Academy – Curriculum Structure
// 7 modules with lessons, each containing sections, citations, and quiz questions



export const modules = [
    {
        id: 'foundations',
        title: 'Apollo Masterclass',
        subtitle: 'Foundations',
        icon: 'Landmark',
        description: 'What Apollo is, its 10-K reported segments, and the scorecard that drives its financial performance.',
        estimatedMinutes: 60,
        order: 1,
        lessons: [
            {
                id: 'what-is-apollo',
                title: 'What Is Apollo?',
                objective: 'Understand Apollo\'s identity as an integrated asset management and retirement services platform.',
                estimatedMinutes: 12,
                order: 1,
                keyConcepts: ['Integrated AM + RS platform', 'Yield-Hybrid-Equity spectrum', 'Athene merger (Jan 2022)', '$938B AUM'],
                citations: ['c-aum-data', 'c-athene-pres'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo Global Management is a high-growth, global alternative asset manager with two tightly integrated business segments: **Asset Management** and **Retirement Services** (through its subsidiary Athene).'
                    },
                    {
                        type: 'text',
                        body: 'Unlike firms that simply manage traditional alternative investment funds, Apollo has built a differentiated model that spans the entire risk-reward spectrum — from investment grade credit all the way to private equity. The firm frames its investing approach across three categories: **yield** (credit/fixed income), **hybrid** (structured equity with downside protection), and **equity** (traditional PE and growth).'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Why This Matters',
                        body: 'Apollo\'s integration with Athene means it functions as both an asset manager earning fees AND a principal investor earning spread. This dual-engine model generates two highly durable, complementary earnings streams: Fee Related Earnings (FRE) and Spread Related Earnings (SRE).',
                        citations: ['c-athene-def']
                    },
                    {
                        type: 'text',
                        body: 'As of December 31, 2025, Apollo managed approximately **$938 billion** in total assets under management, employed over 6,100 people globally, and maintained investment-grade corporate ratings of A2/A/A from Moody\'s, S&P, and Fitch.'
                    },
                    {
                        type: 'formula',
                        formula: 'Apollo = Asset Management (FRE) + Retirement Services (SRE) + Principal Investing (PII)',
                        description: 'Apollo\'s three earnings streams'
                    }
                ],
                checkpoint: {
                    question: 'What are Apollo\'s two main business segments?',
                    options: [
                        'Private Equity and Venture Capital',
                        'Asset Management and Retirement Services',
                        'Credit Trading and Real Estate',
                        'Investment Banking and Wealth Management'
                    ],
                    correctIndex: 1,
                    explanation: 'Apollo operates through two integrated segments: Asset Management (earning FRE) and Retirement Services through Athene (earning SRE), plus Principal Investing Income (PII).'
                }
            },
            {
                id: 'the-scorecard',
                title: 'The Apollo Scorecard',
                objective: 'Learn the core financial metrics: Segment Income, FRE, SRE, PII, and ANI.',
                estimatedMinutes: 15,
                order: 2,
                keyConcepts: ['Segment Income = FRE + SRE + PII', 'ANI = Segment Income − HoldCo costs − Taxes', 'FRE: 20% growth target', 'SRE: 10% growth target'],
                citations: ['c-segment-income-def', 'c-fre-def', 'c-sre-def', 'c-pii-def', 'c-ani-def'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo uses a non-GAAP financial framework centered on **Segment Income** as its primary measure of total profitability at the segment level. Understanding this scorecard is essential to reading any Apollo earnings release, investor presentation, or strategy discussion.'
                    },
                    {
                        type: 'formula',
                        formula: 'Segment Income = FRE + SRE + PII',
                        description: 'The sum of all three segment earnings streams'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Fee Related Earnings (FRE)',
                        body: 'FRE measures the profitability of the **Asset Management** segment. It equals management fees + capital solutions fees + fee-related performance fees + other income, less fee-related compensation and non-comp expenses. FRE is a **recurring, predictable** earnings stream. FY 2025: **$2.5B** (23% YoY growth). Target: 20%+ annual growth.',
                        citations: ['c-fre-def', 'c-fre-record']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Spread Related Earnings (SRE)',
                        body: 'SRE measures the profitability of **Retirement Services** (Athene). It derives from the net investment spread — the difference between what Athene earns on its assets and what it pays on its liabilities. FY 2025: **$3.4B** (record). Target: 10% annual growth through 2029.',
                        citations: ['c-sre-def', 'c-sre-record']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Principal Investing Income (PII)',
                        body: 'PII represents net realized performance fees (carry) from fund investments. Unlike FRE and SRE, PII is a **cycle-average** metric — it varies quarter to quarter based on realizations. FY 2025: **$338M**.',
                        citations: ['c-pii-def', 'c-pii-cycle']
                    },
                    {
                        type: 'formula',
                        formula: 'ANI = Segment Income − HoldCo Costs − Taxes',
                        description: 'Adjusted Net Income: Apollo\'s bottom-line non-GAAP metric'
                    },
                    {
                        type: 'text',
                        body: 'For FY 2025, **ANI was $5.2B or $8.38 per share**, with a five-year target of **$15 per share by 2029**. Since the Athene merger in 2022, ANI has grown at a 17% CAGR — more than double the S&P 500 over the same period.'
                    }
                ],
                checkpoint: {
                    question: 'What is the correct formula for Segment Income?',
                    options: [
                        'Revenue − Expenses − Taxes',
                        'FRE + SRE + PII',
                        'Management Fees + Performance Fees',
                        'AUM × Fee Rate'
                    ],
                    correctIndex: 1,
                    explanation: 'Segment Income = FRE (Asset Management) + SRE (Retirement Services) + PII (Principal Investing). It is Apollo\'s primary segment-level profitability metric.'
                }
            },
            {
                id: 'investor-language-primer',
                title: 'Investor Language Primer',
                objective: 'Decode leadership phrases: "replacement," "origination," "capital formation," "six markets."',
                estimatedMinutes: 15,
                order: 3,
                keyConcepts: ['Six Markets framework', 'Fixed income & equity replacement', 'Origination moat', 'Principal vs. agent mindset', 'Capital formation machine'],
                citations: ['c-six-markets-rowan', 'c-replacement-thesis', 'c-moat-zelter', 'c-principal-rowan', 'c-capform-zelter'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo\'s leadership uses a specific vocabulary in investor communications. These phrases map directly to strategic initiatives and measurable outcomes. Understanding them is critical for anyone engaging with senior stakeholders, reading earnings materials, or discussing Apollo with external audiences.'
                    },
                    {
                        type: 'keyConcept',
                        label: '"Six Markets"',
                        body: 'Marc Rowan\'s framework for the six buyer pools Apollo now serves: (1) Institutional alts, (2) Individuals/wealth, (3) Insurance, (4) Traditional asset managers, (5) Fixed income & equity replacement, (6) DC/401(k). Each market is "roughly the same size as the original market which powered the entire industry."',
                        citations: ['c-six-markets-rowan']
                    },
                    {
                        type: 'keyConcept',
                        label: '"Replacement"',
                        body: 'Apollo\'s thesis that private assets will replace public fixed income (first) and then public equities. A $50T+ addressable market. Fixed income replacement products offer ~200bps excess yield with monthly (vs. daily) liquidity. Equity replacement uses products like AAA ($25B+ AUM, 12% returns, 43/44 positive quarters).',
                        citations: ['c-replacement-thesis', 'c-replacement-fi']
                    },
                    {
                        type: 'keyConcept',
                        label: '"Origination Moat"',
                        body: 'Jim Zelter describes Apollo\'s 16-platform origination machine as "our Mona Lisa — irreplaceable." Built over a decade with $8B+ invested, 4,000+ originators generating assets with 100-200bps excess spread. This is Apollo\'s competitive moat: the ability to manufacture investable assets at scale.',
                        citations: ['c-moat-zelter', 'c-moat-platforms']
                    },
                    {
                        type: 'keyConcept',
                        label: '"Principal Mindset"',
                        body: 'A recurring theme from Marc Rowan. A principal approaches every asset as if they\'ll own it forever (because via Athene, they often do). An agent chases popularity. This mindset drives conservative positioning — Apollo has near-zero software PE exposure and a $24B defensive cash position at Athene.',
                        citations: ['c-principal-rowan']
                    },
                    {
                        type: 'keyConcept',
                        label: '"Capital Formation Machine"',
                        body: 'The system connecting origination to capital raising. Capital formation shapes what gets originated upstream — it\'s not just downstream distribution. The flywheel: origination → products → investment → capital formation → more origination.',
                        citations: ['c-capform-zelter']
                    }
                ],
                checkpoint: {
                    question: 'Which phrase does Jim Zelter use to describe Apollo\'s origination platform?',
                    options: [
                        '"The Golden Goose"',
                        '"The Crown Jewel"',
                        '"Our Mona Lisa — irreplaceable"',
                        '"The Engine Room"'
                    ],
                    correctIndex: 2,
                    explanation: 'Jim Zelter describes the origination platform as "our Mona Lisa — irreplaceable," emphasizing that it was built over a decade with $8B+ invested and cannot be easily replicated.'
                }
            },
            {
                id: 'three-growth-pillars',
                title: 'Three Growth Pillars',
                objective: 'Understand the strategic growth pillars: Origination, Global Wealth, and Capital Solutions.',
                estimatedMinutes: 12,
                order: 4,
                keyConcepts: ['Origination: $275B+ by 2029', 'Global Wealth: $150B+ cumulative', 'Capital Solutions: ~$1B by 2029'],
                citations: ['c-origination-target', 'c-wealth-target', 'c-acs-target', 'c-origination-record', 'c-wealth-data'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo has organized its growth strategy around three interconnected pillars, each with specific five-year targets communicated at the 2024 Investor Day:'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Pillar 1: Origination ($275B+ annual by 2029)',
                        body: 'Origination is Apollo\'s "North Star." In FY 2025, Apollo achieved record origination of **$309B** (already exceeding the 2029 target in year one of the plan). 80% was investment grade (average A rating), generating ~350bps spread over Treasuries. 16 origination platforms spanning core credit, high-grade capital solutions, and equity.',
                        citations: ['c-origination-record', 'c-origination-spread']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Pillar 2: Global Wealth ($150B+ cumulative 2025-2029)',
                        body: 'FY 2025: **$18B** raised (record, +50% YoY), with 9 strategies exceeding $500M annually. Products span qualified purchaser (AAA), mass affluent (ADS, ABC, ADCF, ARIS), and non-US offerings. Apollo targets top-3 position in every wealth product category.',
                        citations: ['c-wealth-data', 'c-wealth-target']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Pillar 3: Capital Solutions (~$1B annual revenue by 2029)',
                        body: 'Apollo Capital Solutions (ACS) is the "connective tissue" of the firm. FY 2025: **$808M** in fees (record), ~430 transactions. Prior $500M target was hit in year 2. New target: $1B by 2029. ACS coordinates origination, structuring, syndication — and deepens client relationships.',
                        citations: ['c-acs-data', 'c-acs-target']
                    }
                ],
                checkpoint: {
                    question: 'What is Apollo\'s annual origination target by 2029?',
                    options: [
                        '$150B+',
                        '$275B+',
                        '$500B+',
                        '$100B+'
                    ],
                    correctIndex: 1,
                    explanation: 'Apollo\'s origination target is $275B+ annually by 2029. Remarkably, FY 2025 origination of $309B already exceeded this target in the first year of the five-year plan.'
                }
            }
        ]
    },
    {
        id: 'segment-am',
        title: 'Asset Management',
        subtitle: 'Segment Deep Dive',
        icon: 'BarChart3',
        description: 'FRE mechanics, AUM composition, origination platforms, and the credit/equity/hybrid product suite.',
        estimatedMinutes: 60,
        order: 2,
        lessons: [
            {
                id: 'credit-vs-equity',
                title: 'The Credit vs. Equity Spectrum',
                objective: 'Understand how Apollo spans the risk-reward spectrum from investment grade to traditional PE.',
                estimatedMinutes: 15,
                order: 1,
                keyConcepts: ['Excess yield', 'Proprietary origination', 'Hybrid value', 'Yield-Hybrid-Equity continuum'],
                citations: ['c-am-credit', 'c-am-equity'],
                content: [
                    {
                        type: 'text',
                        body: 'At the center of Apollo\'s Asset Management business is its leading credit franchise, which is fundamentally driven by two concepts: **excess yield** and **proprietary origination**.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'The Credit Franchise',
                        body: 'Apollo seeks to deliver 100 to 200 basis points of excess yield across its credit strategies compared to public market benchmarks with similar risk profiles. This is achieved not by taking more credit risk, but by capturing the "illiquidity premium" and structuring premium through direct origination.',
                        citations: ['c-am-credit']
                    },
                    {
                        type: 'text',
                        body: 'From its roots in traditional private equity ($117B AUM, 39% gross IRR since inception), Apollo has evolved into a full-spectrum capital provider. The firm frames its approach across a continuum:'
                    },
                    {
                        type: 'keyConcept',
                        label: 'The Investing Continuum',
                        body: '• **Yield**: Focuses on fixed income replacement and investment-grade alternatives.\n• **Hybrid**: Sits between debt and equity, offering structured downside protection with equity-like upside (e.g., Hybrid Value, Accord).\n• **Equity**: Traditional control private equity, infrastructure, and real estate.',
                        citations: ['c-am-equity']
                    }
                ],
                checkpoint: {
                    question: 'How does Apollo primarily seek to generate 100-200 bps of excess yield in its credit franchise?',
                    options: [
                        'By taking on lower-rated, higher-risk distressed debt',
                        'By using high levels of fund-level leverage',
                        'Through proprietary origination and capturing the illiquidity/structuring premium',
                        'By investing heavily in emerging market sovereign debt'
                    ],
                    correctIndex: 2,
                    explanation: 'Apollo achieves excess yield not by sliding down the credit quality spectrum, but by originating assets directly, cutting out intermediaries, and capturing premiums for illiquidity and complexity.'
                }
            },
            {
                id: 'fre-mechanics',
                title: 'FRE Mechanics & Drivers',
                objective: 'Master the components and drivers of Fee Related Earnings.',
                estimatedMinutes: 15,
                order: 1,
                keyConcepts: ['FRE components breakdown', 'Management fee drivers', 'FRE margin and operating leverage', 'Capital solutions fee growth'],
                citations: ['c-fre-def', 'c-fre-record', 'c-fre-margin', 'c-mgmt-fees-data', 'c-acs-data'],
                content: [
                    {
                        type: 'text',
                        body: 'Fee Related Earnings is the primary profitability metric for Apollo\'s Asset Management segment. Understanding its components and drivers is essential for analyzing Apollo\'s earnings power and growth trajectory.'
                    },
                    {
                        type: 'formula',
                        formula: 'FRE = Management Fees + ACS Fees + FRPF + Other − Compensation − Non-Comp',
                        description: 'Where FRPF = Fee-Related Performance Fees'
                    },
                    {
                        type: 'text',
                        body: '**Revenue components (FY 2025):**\n• Management fees: **$3.4B** (22% YoY growth) — the largest and most stable line\n• Capital solutions fees: **$808M** (record, ~430 transactions)\n• Fee-related performance fees: **$266M** (28% YoY growth)\n\n**Expense components (FY 2025):**\n• Fee-related compensation: **$1.2B** (includes Bridge full-year impact)\n• Non-compensation expenses: **$759M**\n\n**Result: FRE of $2.5B at ~57% margin**'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Key FRE Drivers',
                        body: '1. **AUM/FGAUM growth** → drives management fees\n2. **Origination volume** → drives ACS fees and new FGAUM\n3. **Wealth product scaling** → drives FRPF (recurring spread-based performance fees)\n4. **Operating leverage** → FRE margin stable at ~57% even with heavy platform investment',
                        citations: ['c-fre-2026']
                    }
                ],
                checkpoint: {
                    question: 'What was Apollo\'s FRE margin for FY 2025?',
                    options: ['~45%', '~57%', '~65%', '~72%'],
                    correctIndex: 1,
                    explanation: 'Apollo\'s FRE margin was approximately 57% for FY 2025, stable year-over-year. Excluding the Bridge acquisition impact, the margin improved by ~50bps.'
                }
            },
            {
                id: 'aum-and-capital',
                title: 'AUM, Inflows & Capital Activity',
                objective: 'Understand AUM composition, funding sources, and how capital flows through Apollo.',
                estimatedMinutes: 15,
                order: 2,
                keyConcepts: ['$938B total AUM', '$709B Fee-Generating AUM', 'Credit vs. equity AUM mix', 'Organic vs. inorganic inflows'],
                citations: ['c-aum-def', 'c-aum-data', 'c-fgaum-def', 'c-inflows-data'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo\'s total AUM of **$938B** as of December 31, 2025 grew 25% year-over-year. But AUM composition matters as much as the headline number — different pools of AUM generate different types and levels of fee revenue.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'AUM Breakdown',
                        body: '• **Fee-Generating AUM (FGAUM)**: $709B — the portion earning management/monitoring fees\n• **Non-Fee-Generating AUM**: ~$229B — includes fair value above invested capital, GP interests, unused facilities\n• **~60% of credit AUM is investment grade** — Apollo is the #1 IG alternative credit manager\n• Athene AUM (~37% of total) represents Apollo\'s largest single capital source',
                        citations: ['c-aum-data', 'c-fgaum-def']
                    },
                    {
                        type: 'text',
                        body: '**FY 2025 Inflows: $228B (record)**\n• AM organic: $100B (~75% credit, 25% equity)\n• AM inorganic: $45B (including Bridge acquisition)\n• Athene: $83B (retail $34B, funding agreements $35B, reinsurance $12B)\n• Global Wealth: $18B\n• Third-party insurance: $15B new mandates'
                    }
                ],
                checkpoint: {
                    question: 'What percentage of Apollo\'s credit AUM is investment grade?',
                    options: ['About 30%', 'About 45%', 'About 60%', 'About 80%'],
                    correctIndex: 2,
                    explanation: 'Approximately 60% of Apollo\'s credit AUM is investment grade, making it the #1 investment grade alternative credit manager.'
                }
            },
            {
                id: 'perpetual-capital',
                title: 'The Perpetual Capital Advantage',
                objective: 'Explore the role of perpetual capital and retail/institutional channels in Apollo\'s AUM stability.',
                estimatedMinutes: 15,
                order: 3,
                keyConcepts: ['$406B Perpetual AUM', 'Athene balance sheet', 'Retail channels', 'Institutional platforms'],
                citations: ['c-perpetual-cap', 'c-retail-wealth'],
                content: [
                    {
                        type: 'text',
                        body: 'One of the most profound shifts in Apollo\'s business model over the last decade has been the staggering growth of **Perpetual Capital**.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'What is Perpetual Capital?',
                        body: 'Unlike traditional private equity funds that return capital after 7-10 years, perpetual capital vehicles have no fixed maturity date. This provides a highly stable, predictable base of Fee-Generating AUM. As of the latest 10-K, Apollo manages **$406 billion** across perpetual capital vehicles.',
                        citations: ['c-perpetual-cap']
                    },
                    {
                        type: 'text',
                        body: 'Athene represents the most significant perpetual capital vehicle on Apollo\'s platform, accounting for the vast majority of this $406B. However, non-Athene perpetual capital is also growing rapidly through new channels.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Retail and Wealth Management Channels',
                        body: 'Apollo has built a dedicated Global Wealth business to distribute strategies to high-net-worth and mass-affluent investors. Products like Apollo Debt Solutions (ADS) and Apollo Commercial Real Estate Finance are distributed through major wirehouses, private banks, and RIAs. The firm now has ~$57B in AUM distributed through these retail channels.',
                        citations: ['c-retail-wealth']
                    }
                ],
                checkpoint: {
                    question: 'Which entity represents the most significant perpetual capital vehicle on Apollo\'s platform?',
                    options: [
                        'Apollo Debt Solutions (ADS)',
                        'Fund X',
                        'Athene',
                        'MidCap Financial'
                    ],
                    correctIndex: 2,
                    explanation: 'Athene is by far the largest single capital source and the most significant perpetual capital vehicle for Apollo.'
                }
            },
            {
                id: 'origination-platforms',
                title: 'The Origination Machine',
                objective: 'Explore Apollo\'s 16 origination platforms and how they generate excess spread.',
                estimatedMinutes: 15,
                order: 3,
                keyConcepts: ['16 platforms across core credit, HG cap solutions, equity', 'Excess spread 100-200bps', 'Atlas, MidCap, Redding Ridge', 'Sponsor ecosystem quadrupling'],
                citations: ['c-moat-platforms', 'c-moat-zelter', 'c-origination-spread', 'c-origination-record'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo\'s origination machine is what Jim Zelter calls "our Mona Lisa — irreplaceable." It consists of 16 proprietary origination platforms employing 4,000+ originators, built over a decade with $8B+ of invested capital.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'How Origination Creates Value',
                        body: 'Each originated transaction touches every part of Apollo\'s financials:\n1. **Excess return** to Athene balance sheet (SRE)\n2. **Management fees** from third-party AUM growth (FRE)\n3. **Syndication/structuring fees** via ACS (FRE)\n4. **Performance fees** on fund returns (PII)\n\nTarget: 100-200bps outperformance vs. equivalent-rated public corporates.',
                        citations: ['c-moat-platforms']
                    },
                    {
                        type: 'text',
                        body: 'Key platforms include **Atlas** (securitized products), **MidCap** (middle-market lending), and **Redding Ridge** (structured credit). The sponsor ecosystem has been a particular success: origination volumes with sponsors grew from $20B in 2022 to nearly **$80B in 2025** — quadrupling in four years.'
                    }
                ],
                checkpoint: {
                    question: 'How many origination platforms does Apollo operate?',
                    options: ['8', '12', '16', '24'],
                    correctIndex: 2,
                    explanation: 'Apollo operates 16 origination platforms spanning core credit, high-grade capital solutions, and equity. These platforms employ 4,000+ originators.'
                }
            }
        ]
    },
    {
        id: 'segment-rs',
        title: 'Retirement Services',
        subtitle: 'Segment Deep Dive',
        icon: 'Building',
        description: 'SRE mechanics, Athene\'s competitive advantages, inflow channels, and the retirement market opportunity.',
        estimatedMinutes: 40,
        order: 3,
        lessons: [
            {
                id: 'sre-mechanics',
                title: 'SRE Mechanics & Drivers',
                objective: 'Understand how Spread Related Earnings are generated and what drives them.',
                estimatedMinutes: 15,
                order: 1,
                keyConcepts: ['Net investment spread', 'Cost of funds', 'Net invested assets', 'Alternatives portfolio return'],
                citations: ['c-sre-def', 'c-nis-def', 'c-nis-data', 'c-cof-def', 'c-nia-data'],
                content: [
                    {
                        type: 'text',
                        body: 'Spread Related Earnings (SRE) is the profitability metric for Athene\'s Retirement Services segment. SRE measures Athene\'s ability to earn excess return on the assets backing its policyholder obligations, after accounting for all costs.'
                    },
                    {
                        type: 'formula',
                        formula: 'SRE = Net Investment Spread − Operating Expenses − Interest/Financing Costs',
                        description: 'Where Net Investment Spread = Investment Earned Rate − Cost of Funds'
                    },
                    {
                        type: 'keyConcept',
                        label: 'The Spread Engine',
                        body: 'Athene earns income on its **$292B net invested assets** (NIA). The key metric is **net investment spread** — Q4 2025 spread ex-notables was **120 bps**. This means for every dollar of NIA, Athene nets approximately 1.2% annualized after paying policyholders and covering liabilities.\n\nThe alternatives portfolio (~5% of NIA) is assumed at an 11% return. When alt returns are at target, the spread is 4bps higher.',
                        citations: ['c-nis-data', 'c-nia-data']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Cost of Funds',
                        body: 'What Athene pays on its liabilities: crediting rates on deferred annuities, option costs on indexed annuities, institutional product costs, DAC/DSI/VOBA amortization, and other liability costs. Athene\'s low cost structure is a key competitive advantage.',
                        citations: ['c-cof-def']
                    },
                    {
                        type: 'text',
                        body: '**SRE FY 2025: $3.4B** (record). Net investment spread: $4.4B, less operating expenses of $447M and interest/financing costs of $560M. Target: **10% annual SRE growth** through 2029 (~$3.85B expected in 2026).'
                    }
                ],
                checkpoint: {
                    question: 'What does "net investment spread" measure?',
                    options: [
                        'The difference between management fees and expenses',
                        'The difference between Athene\'s investment returns and its cost of funds',
                        'The markup on annuity products',
                        'The spread between public and private credit yields'
                    ],
                    correctIndex: 1,
                    explanation: 'Net investment spread measures Athene\'s investment performance plus strategic capital management fees less total cost of funds. It is the core driver of SRE.'
                }
            },
            {
                id: 'athene-competitive-position',
                title: 'Athene\'s Right to Win',
                objective: 'Understand Athene\'s competitive advantages in retirement services.',
                estimatedMinutes: 12,
                order: 2,
                keyConcepts: ['Originated assets advantage', 'Stable liabilities', 'Strong capital', 'Low cost structure', '#1 U.S. total annuity sales'],
                citations: ['c-comp-rs', 'c-athene-pres', 'c-athene-def'],
                content: [
                    {
                        type: 'text',
                        body: 'Athene frames its competitive position through five interconnected advantages, each reinforcing the others:'
                    },
                    {
                        type: 'keyConcept',
                        label: 'The Five Pillars of Athene\'s Advantage',
                        body: '1. **Originated Assets** — Access to Apollo\'s origination machine generating IG assets at 200-300bps excess spread\n2. **Stable Liabilities** — Diverse funding: retail annuities ($34B), funding agreements ($35B), reinsurance ($12B)\n3. **Strong Capital** — $35B regulatory capital, A1/A+/A+/A+ financial strength ratings\n4. **Low Cost Structure** — Operating efficiency allows competitive product pricing\n5. **Management** — Integration with Apollo creates alignment no pure-play insurer can match',
                        citations: ['c-comp-rs']
                    },
                    {
                        type: 'text',
                        body: 'Athene is the **#1 U.S. total annuity seller** with 9% market share. In 2025, it generated $83B of inflows and grew NIA to $292B (+18% YoY). Key differentiation: while competitors have reached for spread through riskier assets or offshore structures, Athene has maintained a conservative position with a $24B cash/treasuries/agencies position, prioritizing long-term soundness.'
                    }
                ],
                checkpoint: {
                    question: 'What is Athene\'s ranking in U.S. total annuity sales?',
                    options: ['#3', '#2', '#1', '#5'],
                    correctIndex: 2,
                    explanation: 'Athene is ranked #1 in U.S. total annuity sales per LIMRA, with approximately 9% market share as of mid-2025.'
                }
            },
            {
                id: 'retirement-market',
                title: 'The Retirement Market Opportunity',
                objective: 'Understand the "Silver Tsunami" and new channels for growth.',
                estimatedMinutes: 13,
                order: 3,
                keyConcepts: ['$45T global retirement market', '12K Americans turning 65 daily', 'New channels: RILA, stable value, DC, international'],
                citations: ['c-sre-2026'],
                content: [
                    {
                        type: 'text',
                        body: 'The global retirement market represents a **~$45 trillion** opportunity, driven by demographic forces that Marc Rowan calls "the Silver Tsunami." Over **1 billion people worldwide** will be retirement age by 2030, and 12,000 Americans turn 65 every single day.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Demand Drivers',
                        body: '• U.S. fixed annuity industry sales have grown **5x** from ~$72B (2012) to ~$390B+ (2025)\n• Shift from defined benefit to defined contribution creates individual retirement security gap\n• Low-rate environment legacy means retirees need guaranteed income products\n• Aging demographics accelerating globally (U.S., Europe, Asia)'
                    },
                    {
                        type: 'text',
                        body: '**New growth channels** beyond traditional retail annuities:\n• **Stable Value** — large DC/401(k) opportunity\n• **Registered Index-Linked Annuities (RILA)** — growing product category\n• **Defined Contribution / 401(k)** penetration with AAA and similar products\n• **International expansion** — UK pensions, European insurance (Athora), Asia opportunities\n• **Pension Group Annuities** — de-risking of corporate DB plans\n\nAthene expects ~$85B of inflows in 2026, with $5B+ from markets entered in the last 18 months.'
                    }
                ],
                checkpoint: {
                    question: 'How many Americans turn 65 every day?',
                    options: ['About 5,000', 'About 8,000', 'About 12,000', 'About 20,000'],
                    correctIndex: 2,
                    explanation: 'Approximately 12,000 Americans turn 65 every day, driving robust demand for retirement savings products. This is part of what Apollo calls the "Silver Tsunami."'
                }
            }
        ]
    },
    {
        id: 'segment-pi',
        title: 'Principal Investing',
        subtitle: 'Segment Deep Dive',
        icon: 'Gem',
        description: 'How PII works, what drives realizations, and how carry flows through Apollo\'s earnings.',
        estimatedMinutes: 20,
        order: 4,
        lessons: [
            {
                id: 'pii-deep-dive',
                title: 'PII: How Carry Works at Apollo',
                objective: 'Understand how Principal Investing Income is generated and measured.',
                estimatedMinutes: 20,
                order: 1,
                keyConcepts: ['Realized performance fees', 'Escrow/waterfall mechanics', 'Cycle-average thinking', 'Fund X milestones'],
                citations: ['c-pii-def', 'c-pii-data', 'c-pii-cycle'],
                content: [
                    {
                        type: 'text',
                        body: 'Principal Investing Income (PII) is the third component of Segment Income. Unlike FRE (recurring fees) and SRE (recurring spread), PII is driven by **realized investment performance** — specifically, the carried interest (carry) that Apollo earns when fund investments are sold or monetized.'
                    },
                    {
                        type: 'formula',
                        formula: 'PII = Realized Performance Fees − PI Compensation − Other PI Expenses',
                        description: 'Net carry after compensation and expenses'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Why PII is "Cycle Average"',
                        body: 'Apollo treats PII as a cycle-average metric because realizations are lumpy — they depend on exit timing, market conditions, and fund lifecycle. Q4 2025 PII was $227M (strong) vs. Q3 2025 of $50M (light). FY 2025: $338M total.\n\nKey Q4 2025 drivers: Fund X exceeded its escrow ratio for the first time (triggering carry catch-up), Accord+ completed a portfolio monetization, and credit hedge fund strategies had annual crystallization.',
                        citations: ['c-pii-data', 'c-pii-cycle']
                    },
                    {
                        type: 'text',
                        body: '**Apollo\'s PE track record:**\n• 39% gross / 24% net IRR since inception (1990-2025)\n• Fund X 2023 vintage: 22% net IRR\n• Strong DPI vs. industry DPI that "rounds closer to zero"\n\nPII is important for two reasons: (1) it creates capital for partner compensation and retention, and (2) it demonstrates the quality of Apollo\'s investment engine, which in turn drives future fundraising.'
                    }
                ],
                checkpoint: {
                    question: 'Why does Apollo describe PII as a "cycle average" metric?',
                    options: [
                        'Because it only applies during economic cycles',
                        'Because realizations are lumpy, varying by fund lifecycle and exit timing',
                        'Because it averages public and private market returns',
                        'Because it is calculated as a rolling average'
                    ],
                    correctIndex: 1,
                    explanation: 'PII varies substantially quarter to quarter because it depends on investment realizations — when funds sell positions or achieve monetization milestones. Apollo averages it over cycles to assess the business.'
                }
            }
        ]
    },
    {
        id: 'strategy',
        title: 'Strategy & Narratives',
        subtitle: 'Growth Pillars',
        icon: 'Compass',
        description: 'How leadership frames Apollo\'s strategic direction, growth drivers, and competitive positioning.',
        estimatedMinutes: 30,
        order: 5,
        lessons: [
            {
                id: 'six-markets-deep-dive',
                title: 'The Six Markets Framework',
                objective: 'Understand each of the six buyer pools and their growth dynamics.',
                estimatedMinutes: 15,
                order: 1,
                keyConcepts: ['Institutional alts (original market)', 'Individuals/wealth', 'Insurance', 'TAMs', 'FI/equity replacement', 'DC/401(k)'],
                citations: ['c-six-markets-rowan', 'c-six-markets-pres'],
                content: [
                    {
                        type: 'text',
                        body: 'The "six markets" framework is central to understanding Apollo\'s growth thesis. For 35 years, the alternatives industry served one buyer pool: the institutional alts bucket. Apollo now serves six distinct pools, each requiring different products, structures, expense points, and technology.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'The Six Markets',
                        body: '1. **Institutional Alts Bucket** — The traditional market. Still growing: Apollo had its strongest non-flagship fundraising year ever in 2025.\n2. **Individuals / Global Wealth** — $18B raised in 2025. 9 strategies over $500M. Products: ADS, ABC, AAA, ADCF.\n3. **Insurance** — $15B third-party mandates in 2025. $135B+ total platform across 30 mandates. Growing in Europe & Asia.\n4. **Traditional Asset Managers** — Partnerships like Schroders and State Street (PRIV ETF, approaching $700M).\n5. **FI & Equity Replacement** — $50T+ opportunity. Private IG products with 200bps excess yield.\n6. **DC / 401(k)** — Products in motion with State Street, Empower, OneDigital. AAA live in DC plans.',
                        citations: ['c-six-markets-rowan']
                    }
                ],
                checkpoint: {
                    question: 'According to Marc Rowan, how does each of the new markets compare in size to the original institutional alts market?',
                    options: [
                        'About half the size',
                        'About the same size — roughly as large as the original market',
                        'About twice the size',
                        'Much smaller but higher margin'
                    ],
                    correctIndex: 1,
                    explanation: 'Marc Rowan says each of the six markets "has the ability to be roughly the same size as our original market, which powered the entire industry."'
                }
            },
            {
                id: 'earnings-flywheel',
                title: 'The Earnings Flywheel',
                objective: 'Map origination → inflows → fees → spread earnings → syndication → repeat.',
                estimatedMinutes: 15,
                order: 2,
                keyConcepts: ['Origination drives multiple revenue lines', 'FRE + SRE combined power', 'Capital creation model'],
                citations: ['c-capform-zelter', 'c-origination-record'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo\'s business model creates a self-reinforcing flywheel where origination drives multiple revenue and earnings streams simultaneously. Martin Kelly describes it as "the earnings flywheel benefit of origination" — a single originated dollar creates value across the entire platform.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'How $1 of Origination Creates Multiple $$ of Earnings',
                        body: '1. **Athene retains the asset** → earns net investment spread (SRE)\n2. **Third-party AUM grows** → earns management fees (FRE)\n3. **ACS syndicates/structures** → earns capital solutions fees (FRE)\n4. **Wealth products deploy** → earns fee-related performance fees (FRE)\n5. **Fund investments realize** → earns performance fees (PII)\n\nEach stream has different volatility and timing profiles, creating diversified and durable combined earnings.',
                        citations: ['c-capform-zelter']
                    },
                    {
                        type: 'formula',
                        formula: 'FRE + SRE = "Fee and Spread Related Earnings"',
                        description: 'FY 2025: $5.9B combined (record) — the most durable earnings base'
                    }
                ],
                checkpoint: {
                    question: 'When Apollo originates an asset, how many earnings streams can it potentially create?',
                    options: [
                        'One (management fees only)',
                        'Two (FRE and SRE)',
                        'Three (FRE, SRE, and PII)',
                        'Five or more (spread, management fees, ACS fees, FRPF, and carry)'
                    ],
                    correctIndex: 3,
                    explanation: 'A single originated asset can create spread earnings (SRE), management fees, capital solutions fees, fee-related performance fees, and eventually performance fees (PII) — touching every part of Apollo\'s P&L.'
                }
            },
            {
                id: 'apollo-culture',
                title: 'The Apollo Culture',
                objective: 'Understand the cultural tenets that drive Apollo\'s success, built on a principal mindset.',
                estimatedMinutes: 10,
                order: 3,
                keyConcepts: ['Principal mindset', 'Contrarianism', 'Intellectual curiosity', 'Alignment of interests'],
                citations: ['c-culture-rowan'],
                content: [
                    {
                        type: 'text',
                        body: 'Underpinning strategy and structure is culture. According to Marc Rowan at the 2024 Investor Day, Apollo\'s culture is built entirely around an investing mentality, not an asset-gathering mentality.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Principal vs. Agent',
                        body: '"A principal approaches every asset as if they\'ll own it forever. An agent chases popularity." This core tenet drives the firm\'s contrarian approach and conservative balance sheet positioning. Because Apollo acts as a principal through Athene\'s balance sheet, it is forced to manufacture risk-reward properly rather than just seeking assets that are easy to syndicate.',
                        citations: ['c-culture-rowan']
                    },
                    {
                        type: 'text',
                        body: 'The culture rewards intellectual curiosity, rigorous debate, and a refusal to follow the herd. This is what allowed Apollo to build its massive credit business and merge with an insurance company when the rest of the private equity industry was exclusively focused on software buyouts.'
                    }
                ],
                checkpoint: {
                    question: 'According to Apollo leadership, what is the core difference between a principal and an agent?',
                    options: [
                        'Principals take higher fees than agents',
                        'Principals approach every asset as if they will own it forever, while agents chase popularity',
                        'Principals focus only on equity, agents focus on credit',
                        'Agents are fiduciaries, principals are not'
                    ],
                    correctIndex: 1,
                    explanation: 'Marc Rowan emphasizes that an agent chases what is popular in the market to gather AUM, while a principal underwrites assets as if they will own them down to the downside over the long term.'
                }
            }
        ]
    },
    {
        id: 'competition',
        title: 'Competition & Market',
        subtitle: 'Competitive Landscape',
        icon: 'Swords',
        description: 'Where Apollo competes, key competitive dimensions, and how pressure shows up by segment.',
        estimatedMinutes: 20,
        order: 6,
        lessons: [
            {
                id: 'competitive-landscape',
                title: 'Competitive Landscape Overview',
                objective: 'Understand who Apollo competes with and what differentiates it.',
                estimatedMinutes: 20,
                order: 1,
                keyConcepts: ['Alt managers: BX, KKR, Carlyle, Ares', 'Insurance: MetLife, Prudential, Global Atlantic', 'Dimensions: origination, distribution, performance, fees'],
                citations: ['c-comp-am', 'c-comp-rs'],
                content: [
                    {
                        type: 'text',
                        body: 'Apollo competes across multiple dimensions with different competitor sets depending on the segment and strategy:'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Asset Management Competition',
                        body: '**Competitors**: Blackstone, KKR, Carlyle, Ares, TPG, Blue Owl, Brookfield, traditional managers (BlackRock, PIMCO)\n\n**Key dimensions**:\n• **Origination capability** — Apollo\'s deepest moat, hardest to replicate\n• **Performance track record** — 39% gross / 24% net PE IRR since inception\n• **Product breadth** — yield to equity spectrum, wealth to institutional\n• **Distribution reach** — six markets vs. competitors focused on 1-2\n• **Fee pricing** — competitive pressure on management fee rates\n\nApollo differentiates through: integrated origination-to-investment platform, principal alignment (Athene balance sheet), and willingness to be contrarian.',
                        citations: ['c-comp-am']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Retirement Services Competition',
                        body: '**Competitors**: MetLife, Prudential, Lincoln National, Global Atlantic (KKR), Fortitude Re, MassMutual\n\n**Key dimensions**:\n• **Financial strength ratings** — Athene: A1/A+/A+/A+\n• **Cost structure** — Athene\'s operating efficiency enables competitive pricing\n• **Origination-driven returns** — access to Apollo\'s IG origination machine\n• **Distribution** — #1 U.S. annuity sales, diverse channels\n• **Capital adequacy** — $35B regulatory capital\n\nAthene\'s key advantage: other insurers must buy assets in public markets; Athene sources them through Apollo\'s origination platforms at 200-300bps excess spread.',
                        citations: ['c-comp-rs']
                    }
                ],
                checkpoint: {
                    question: 'What is Apollo\'s deepest competitive moat according to leadership?',
                    options: [
                        'Its brand recognition',
                        'Its origination capability with 16 proprietary platforms',
                        'Its fee structure',
                        'Its geographic reach'
                    ],
                    correctIndex: 1,
                    explanation: 'Apollo\'s origination machine — 16 platforms, 4,000+ originators, $8B+ invested — is described by Jim Zelter as "our Mona Lisa — irreplaceable." It generates assets with consistent excess spread, differentiating Apollo from competitors who must buy in secondary/public markets.'
                }
            }
        ]
    },
    {
        id: 'financial-performance',
        title: 'Financial Storytelling',
        subtitle: 'Performance Analysis',
        icon: 'TrendingUp',
        description: 'Translate earnings statements into metric-segment-driver mapping with citations.',
        estimatedMinutes: 25,
        order: 7,
        lessons: [
            {
                id: 'reading-earnings',
                title: 'How to Read Apollo\'s Earnings',
                objective: 'Practice translating earnings language into the scorecard framework.',
                estimatedMinutes: 25,
                order: 1,
                keyConcepts: ['Scorecard mapping', 'Quote-to-metric translation', 'YoY growth analysis', 'Notable items'],
                citations: ['c-segment-income-data', 'c-ani-data', 'c-fre-record', 'c-sre-record'],
                content: [
                    {
                        type: 'text',
                        body: 'This lesson practices a critical skill: taking a statement from Apollo leadership or an earnings release and mapping it to specific metrics, segments, and drivers. This is the foundation for the Earnings Call Decoder simulation you\'ll encounter in Assessments.'
                    },
                    {
                        type: 'keyConcept',
                        label: 'Example: Decoding a CEO Quote',
                        body: '**Quote (Marc Rowan, Feb 2026)**: "FRE for the year $2.5 billion, up 23% year-over-year. SRE, $3.4 billion, normalized, plus 9% year-over-year."\n\n**Decoded**:\n• **Metric**: FRE → **Segment**: Asset Management → **Driver**: management fee growth + ACS scaling\n• **Metric**: SRE → **Segment**: Retirement Services → **Driver**: NIA growth + alternatives return\n• **Combined**: $5.9B Fee & Spread Related Earnings (record)\n• **Implication**: Dual-engine model delivering on both 20% FRE and 10% SRE targets',
                        citations: ['c-ani-data']
                    },
                    {
                        type: 'keyConcept',
                        label: 'Practice: Notable Items',
                        body: 'Apollo reports earnings both with and without "notable items" — one-time factors that distort the underlying trend. When reading SRE results, always check:\n• Was the alternatives return at the 11% long-term assumption?\n• Were there asset prepayments affecting spread?\n• Were there any one-time expense items?\n\nQ4 2025: Alts return was slightly above 11% target due to favorable late-quarter pricing adjustments.',
                        citations: ['c-sre-spread']
                    }
                ],
                checkpoint: {
                    question: 'When Marc Rowan says "origination activity exceeding $300 billion," which earnings stream(s) does this primarily drive?',
                    options: [
                        'Only PII',
                        'Only FRE through management fees',
                        'Multiple streams: SRE (spread on retained assets), FRE (management fees, ACS fees), and eventually PII',
                        'Only SRE through Athene'
                    ],
                    correctIndex: 2,
                    explanation: 'Origination drives all three earnings streams: SRE when Athene retains the asset, FRE through management fees and ACS syndication fees, and PII when fund investments are eventually realized.'
                }
            }
        ]
    }
];

export function getModuleById(id) {
    return modules.find(m => m.id === id);
}

export function getLessonById(lessonId) {
    for (const mod of modules) {
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (lesson) return { ...lesson, moduleId: mod.id, moduleTitle: mod.title };
    }
    return null;
}

export function getNextLesson(currentLessonId) {
    for (let mi = 0; mi < modules.length; mi++) {
        const mod = modules[mi];
        for (let li = 0; li < mod.lessons.length; li++) {
            if (mod.lessons[li].id === currentLessonId) {
                if (li + 1 < mod.lessons.length) return mod.lessons[li + 1].id;
                if (mi + 1 < modules.length) return modules[mi + 1].lessons[0].id;
                return null;
            }
        }
    }
    return null;
}

// Pre-computed once at module load — static data never changes at runtime
const _allLessons = modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title })));

export function getAllLessons() {
    return _allLessons;
}
