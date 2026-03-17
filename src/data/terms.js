// Apollo Academy – Terms & Knowledge Base
// All definitions grounded in Sources/ with citation references

export const terms = [
    // === Core Metrics ===
    {
        id: 'segment-income',
        name: 'Segment Income',
        type: 'metric',
        category: 'Core Metrics',
        definition: 'Segment Income is the sum of Fee Related Earnings (FRE), Spread Related Earnings (SRE), and Principal Investing Income (PII). It represents Apollo\'s primary measure of total segment-level profitability before HoldCo costs and taxes.',
        formula: 'Segment Income = FRE + SRE + PII',
        highlights: ['FY 2025: $6.2B', 'Q4 2025: $1.8B'],
        citations: ['c-segment-income-def', 'c-segment-income-data'],
        relatedTerms: ['fre', 'sre', 'pii', 'ani'],
        usedInModules: ['foundations', 'financial-performance']
    },
    {
        id: 'fre',
        name: 'Fee Related Earnings (FRE)',
        type: 'metric',
        category: 'Core Metrics',
        definition: 'FRE is a component of Segment Income used to assess the performance of the Asset Management segment. FRE equals (i) management fees, plus (ii) capital solutions and other related fees, plus (iii) fee-related performance fees from indefinite term vehicles measured and received on a recurring basis, plus (iv) other income, net, less (a) fee-related compensation (excluding equity-based compensation), (b) non-compensation expenses, (c) placement fees, and (d) non-controlling interests in management companies.',
        formula: 'FRE = Management Fees + Capital Solutions Fees + Fee-Related Performance Fees + Other Income − Fee-Related Compensation − Non-Comp Expenses',
        highlights: ['FY 2025: $2.5B (record)', '23% YoY growth', 'FRE margin: ~57%', '2026E: 20%+ growth'],
        citations: ['c-fre-def', 'c-fre-record', 'c-fre-margin', 'c-fre-2026'],
        relatedTerms: ['segment-income', 'management-fees', 'capital-solutions-fees', 'fre-margin'],
        usedInModules: ['foundations', 'segment-am', 'financial-performance']
    },
    {
        id: 'sre',
        name: 'Spread Related Earnings (SRE)',
        type: 'metric',
        category: 'Core Metrics',
        definition: 'SRE represents Athene\'s (Retirement Services) contribution to Segment Income. It is derived from the net investment spread — the difference between what Athene earns on its invested assets and what it pays on its liabilities (cost of funds) — less other operating expenses and interest/financing costs. SRE reflects Athene\'s ability to generate excess return on the assets backing policyholder obligations.',
        formula: 'SRE = Net Investment Spread − Other Operating Expenses − Interest & Financing Costs',
        highlights: ['FY 2025: $3.4B (record)', 'Q4 2025: $865M', '2026E: 10% growth (~$3.85B)', 'Net spread ex notables: 120 bps'],
        citations: ['c-sre-def', 'c-sre-record', 'c-sre-2026', 'c-sre-spread'],
        relatedTerms: ['segment-income', 'net-investment-spread', 'cost-of-funds', 'net-invested-assets'],
        usedInModules: ['foundations', 'segment-rs', 'financial-performance']
    },
    {
        id: 'pii',
        name: 'Principal Investing Income (PII)',
        type: 'metric',
        category: 'Core Metrics',
        definition: 'PII represents net realized performance fees (carry) earned by Apollo from the funds it manages. Unlike FRE (which is recurring fee-based) and SRE (which is spread-based), PII is driven by investment realizations and fund performance milestones. Apollo considers PII a "cycle average" business — it varies by quarter but is important for capital creation and partner compensation.',
        formula: 'PII = Realized Performance Fees − Principal Investing Compensation − Other Operating Expenses',
        highlights: ['FY 2025: $338M', 'Q4 2025: $227M', 'Cycle-average metric', 'Fund X exceeded escrow ratio in Q4'],
        citations: ['c-pii-def', 'c-pii-data', 'c-pii-cycle'],
        relatedTerms: ['segment-income', 'fre', 'sre', 'performance-fees'],
        usedInModules: ['foundations', 'segment-pi', 'financial-performance']
    },
    {
        id: 'ani',
        name: 'Adjusted Net Income (ANI)',
        type: 'metric',
        category: 'Core Metrics',
        definition: 'ANI is Apollo\'s primary non-GAAP earnings metric. It equals Segment Income (FRE + SRE + PII) less HoldCo interest and other financing costs, and less taxes and related payables. ANI represents the earnings attributable to Apollo after all segment and corporate costs.',
        formula: 'ANI = Segment Income − HoldCo Interest & Financing Costs − Taxes',
        highlights: ['FY 2025: $5.2B ($8.38/share)', 'Q4 2025: $1.5B ($2.47/share)', '2029 target: $15/share', '17% CAGR since Athene merger (2022)'],
        citations: ['c-ani-def', 'c-ani-data', 'c-ani-target'],
        relatedTerms: ['segment-income', 'fre', 'sre', 'pii'],
        usedInModules: ['foundations', 'financial-performance']
    },

    // === Operating Metrics ===
    {
        id: 'aum',
        name: 'Assets Under Management (AUM)',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'AUM represents the total assets of funds, partnerships and accounts to which Apollo provides investment management, advisory, or certain other investment-related services. It includes NAV plus leverage/commitments for credit funds, fair value plus commitments for equity funds, gross asset value for reinsurance, and fair value of other managed assets. AUM includes assets for which Apollo charges nominal or zero fees and assets without investment discretion.',
        highlights: ['December 31, 2025: $938B', '25% YoY increase', '#1 Alternative Credit Business'],
        citations: ['c-aum-def', 'c-aum-data'],
        relatedTerms: ['fgaum', 'inflows', 'origination'],
        usedInModules: ['foundations', 'segment-am']
    },
    {
        id: 'fgaum',
        name: 'Fee-Generating AUM (FGAUM)',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'FGAUM consists of assets on which Apollo earns management fees, monitoring fees or other investment-related fees. Management fees are based on various measures including NAV, gross assets, adjusted par asset value, capital commitments, or invested capital, as defined in applicable management agreements.',
        highlights: ['December 31, 2025: $709B'],
        citations: ['c-fgaum-def'],
        relatedTerms: ['aum', 'management-fees'],
        usedInModules: ['segment-am']
    },
    {
        id: 'origination',
        name: 'Origination',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'Origination represents capital invested in new equity, debt, or debt-like investments where Apollo or one of its 16 origination platforms has sourced, negotiated, or significantly affected the commercial terms. It includes new capital pools from debt issuances (CLOs) and net purchases of private, illiquid assets. Origination is Apollo\'s "North Star" — the lifeblood of the business, generating recurring supply of assets with excess risk-adjusted return.',
        highlights: ['FY 2025: $309B (record)', 'Q4 2025: $97B', '16 origination platforms', 'Target: $275B+ annually by 2029', 'Avg spread: ~350bps over Treasuries at BBB'],
        citations: ['c-origination-def', 'c-origination-record', 'c-origination-target', 'c-origination-spread'],
        relatedTerms: ['aum', 'capital-solutions-fees', 'net-investment-spread'],
        usedInModules: ['foundations', 'segment-am', 'strategy']
    },
    {
        id: 'inflows',
        name: 'Inflows',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'Inflows represent subscriptions, commitments, and other increases in available capital at the individual strategy level, net of inter-strategy transfers. On an aggregate basis, inflows equal the sum across credit and equity investing strategies.',
        highlights: ['FY 2025: $228B (record)', 'AM organic: $100B', 'AM inorganic: $45B', 'Athene: $83B', 'Global Wealth: $18B'],
        citations: ['c-inflows-def', 'c-inflows-data'],
        relatedTerms: ['aum', 'capital-formation'],
        usedInModules: ['foundations', 'segment-am', 'segment-rs']
    },
    {
        id: 'net-invested-assets',
        name: 'Net Invested Assets (NIA)',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'Athene\'s investments that directly back net reserve liabilities as well as surplus assets. Includes total investments (at cost/amortized cost, excluding derivatives), cash, related party investments, accrued investment income, and various adjustments. NIA excludes derivative collateral and non-controlling interests but includes ACRA economic ownership.',
        highlights: ['September 2025: $292B', '18% YoY growth'],
        citations: ['c-nia-def', 'c-nia-data'],
        relatedTerms: ['sre', 'net-investment-spread', 'cost-of-funds'],
        usedInModules: ['segment-rs']
    },
    {
        id: 'net-investment-spread',
        name: 'Net Investment Spread',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'Net investment spread measures Athene\'s investment performance plus strategic capital management fees less total cost of funds. It is the core driver of SRE — the wider the spread Athene can earn between asset returns and liability costs, the more spread related earnings are generated.',
        highlights: ['Q4 2025: 120 bps (ex notables)', 'At 11% alts return assumption: 4 bps higher'],
        citations: ['c-nis-def', 'c-nis-data'],
        relatedTerms: ['sre', 'net-invested-assets', 'cost-of-funds'],
        usedInModules: ['segment-rs', 'financial-performance']
    },
    {
        id: 'cost-of-funds',
        name: 'Cost of Funds',
        type: 'metric',
        category: 'Operating Metrics',
        definition: 'Cost of funds includes liability costs on deferred annuities (crediting costs and option costs on indexed annuities), institutional product costs, and other liability costs (DAC/DSI/VOBA amortization, market risk benefit costs, premiums, product charges). It measures what Athene pays on its liabilities.',
        citations: ['c-cof-def'],
        relatedTerms: ['sre', 'net-investment-spread'],
        usedInModules: ['segment-rs']
    },

    // === Revenue Components ===
    {
        id: 'management-fees',
        name: 'Management Fees',
        type: 'metric',
        category: 'Revenue Components',
        definition: 'Fees earned for investment management and advisory services, based on AUM measures including NAV, gross assets, capital commitments, or invested capital. Management fees are the largest component of FRE revenue.',
        highlights: ['FY 2025: $3.4B', '22% YoY growth', 'Q4 2025: $942M'],
        citations: ['c-mgmt-fees-data'],
        relatedTerms: ['fre', 'fgaum'],
        usedInModules: ['segment-am', 'financial-performance']
    },
    {
        id: 'capital-solutions-fees',
        name: 'Capital Solutions Fees (ACS)',
        type: 'metric',
        category: 'Revenue Components',
        definition: 'Fees earned by Apollo Capital Solutions (ACS) for underwriting, structuring, arrangement, placement of debt/equity securities, and syndication. ACS is described as the "connective tissue" of the firm, embedded across deal teams and origination platforms.',
        highlights: ['FY 2025: $808M (record)', 'Q4 2025: $226M', '~430 transactions in FY 2025', '2029 target: ~$1B annual revenue'],
        citations: ['c-acs-def', 'c-acs-data', 'c-acs-target'],
        relatedTerms: ['fre', 'origination'],
        usedInModules: ['segment-am', 'strategy']
    },
    {
        id: 'performance-fees',
        name: 'Performance Fees / Carry',
        type: 'metric',
        category: 'Revenue Components',
        definition: 'Allocations, distributions or fees based on fund performance that entitle Apollo to a share of investment gains. Includes fee-related performance fees (recurring, from indefinite-term vehicles) contributing to FRE, and realized performance fees contributing to PII.',
        citations: ['c-perf-fees-def'],
        relatedTerms: ['pii', 'fre'],
        usedInModules: ['segment-am', 'segment-pi']
    },
    {
        id: 'fre-margin',
        name: 'FRE Margin',
        type: 'metric',
        category: 'Revenue Components',
        definition: 'The ratio of Fee Related Earnings to total FRE-eligible revenues. It measures the profitability and operating leverage of the Asset Management segment.',
        highlights: ['FY 2025: ~57%', 'Stable YoY', 'Ex-Bridge: +50bps YoY improvement'],
        citations: ['c-fre-margin'],
        relatedTerms: ['fre'],
        usedInModules: ['segment-am', 'financial-performance']
    },

    // === Strategic Concepts ===
    {
        id: 'six-markets',
        name: 'Six Markets',
        type: 'concept',
        category: 'Strategy & Narratives',
        definition: 'Apollo\'s framework for the six distinct buyer pools it now serves for capital formation: (1) Institutional Investors (Alts Bucket) — the traditional market; (2) Individuals / Global Wealth; (3) Insurance (third-party); (4) Traditional Asset Managers; (5) Institutional Investors (Fixed Income & Equity Replacement); (6) Defined Contribution / 401(k). Each market is projected to be roughly the size of the original institutional alts market.',
        citations: ['c-six-markets-rowan', 'c-six-markets-pres'],
        relatedTerms: ['capital-formation', 'replacement', 'global-wealth'],
        usedInModules: ['foundations', 'strategy']
    },
    {
        id: 'replacement',
        name: 'Replacement (Fixed Income & Equity)',
        type: 'concept',
        category: 'Strategy & Narratives',
        definition: 'Apollo\'s thesis that private assets will progressively "replace" traditional public fixed income and then public equity allocations. Fixed income replacement provides ~200bps excess yield by moving from daily to monthly liquidity. Equity replacement uses products like AAA to provide S&P-plus returns with lower volatility. The total addressable market for replacement is ~$50T.',
        citations: ['c-replacement-thesis', 'c-replacement-fi', 'c-replacement-equity'],
        relatedTerms: ['six-markets', 'aaa-fund'],
        usedInModules: ['foundations', 'strategy']
    },
    {
        id: 'origination-moat',
        name: 'Origination Moat',
        type: 'concept',
        category: 'Strategy & Narratives',
        definition: 'Apollo\'s competitive advantage built through 16 origination platforms, 4,000+ originators, and $8B+ invested in platform acquisitions over a decade. Jim Zelter describes this as "the Mona Lisa — irreplaceable." The origination machine generates recurring supply of assets with excess spread (100–200bps over equivalent rated public corporates), creating a flywheel where origination drives inflows, fees, spread earnings, and syndication revenue.',
        citations: ['c-moat-zelter', 'c-moat-platforms'],
        relatedTerms: ['origination', 'capital-solutions-fees'],
        usedInModules: ['foundations', 'strategy', 'segment-am']
    },
    {
        id: 'capital-formation',
        name: 'Capital Formation Machine',
        type: 'concept',
        category: 'Strategy & Narratives',
        definition: 'Apollo\'s system for raising and deploying capital across all six markets. Capital formation is not just downstream from origination — it shapes what gets originated upstream. The connection between origination and capital formation allows Apollo to deliver the right cost of capital to the right opportunity at scale.',
        citations: ['c-capform-zelter'],
        relatedTerms: ['six-markets', 'inflows', 'origination'],
        usedInModules: ['foundations', 'strategy']
    },
    {
        id: 'principal-mindset',
        name: 'Principal Mindset',
        type: 'concept',
        category: 'Strategy & Narratives',
        definition: 'A recurring theme from Marc Rowan contrasting a "principal\'s mindset" vs. an "agent\'s mindset." A principal approaches every asset as if they\'ll own it long-term (because they do, via Athene). An agent responds to market popularity and asks "can this be sold?" Apollo\'s principal mindset drives conservative positioning (e.g., near-zero software PE exposure, $24B defensive cash position at Athene).',
        citations: ['c-principal-rowan'],
        relatedTerms: ['origination-moat'],
        usedInModules: ['foundations', 'strategy']
    },
    {
        id: 'global-wealth',
        name: 'Global Wealth',
        type: 'concept',
        category: 'Strategy & Narratives',
        definition: 'One of Apollo\'s three strategic growth pillars. Target: $150B+ cumulative organic capital raise from 2025–2029. FY 2025: $18B raised (record), up ~50% YoY, with 9 strategies exceeding $500M annually. Products span QP (AAA), mass affluent (ADS, ABC, ADCF), and non-US offerings.',
        highlights: ['FY 2025: $18B raised', '9 strategies >$500M/year', 'Target: $150B+ cumulative (2025-2029)'],
        citations: ['c-wealth-target', 'c-wealth-data'],
        relatedTerms: ['six-markets', 'replacement'],
        usedInModules: ['strategy']
    },

    // === Products & Vehicles ===
    {
        id: 'ads',
        name: 'Apollo Debt Solutions (ADS)',
        type: 'product',
        category: 'Products & Vehicles',
        definition: 'Apollo\'s flagship non-traded BDC (Business Development Company) focused on large-cap direct lending. ADS is 100% senior secured, first lien, no PIK, no ARR — positioned as the most conservative in the industry. Over $25B in AUM with ~8% annual return and $5B+ net inflows in 2025.',
        citations: ['c-ads-rowan', 'c-ads-zelter'],
        relatedTerms: ['fre', 'global-wealth'],
        usedInModules: ['segment-am', 'strategy']
    },
    {
        id: 'aaa-fund',
        name: 'Apollo Aligned Alternatives (AAA)',
        type: 'product',
        category: 'Products & Vehicles',
        definition: 'Apollo\'s alternatives balance sheet fund that gives investors access to the same investments Apollo makes for itself. AAA invests in lower-risk, less volatile equities. Track record: 12% inception-to-date return, 43 of 44 positive quarters including 23 consecutive. Now exceeds $25B in AUM. Key vehicle for hybrid/equity replacement thesis and DC/401(k) penetration.',
        citations: ['c-aaa-rowan', 'c-aaa-sambur'],
        relatedTerms: ['replacement', 'global-wealth'],
        usedInModules: ['segment-am', 'strategy']
    },
    {
        id: 'athene',
        name: 'Athene',
        type: 'entity',
        category: 'Segments',
        definition: 'Athene Holding Ltd. is Apollo\'s retirement services subsidiary, specializing in issuing, reinsuring, and acquiring retirement savings products. Athene is the #1 US total annuity seller, rated A1/A+/A+ by Moody\'s/S&P/Fitch/A.M.Best, with $292B net invested assets. Merged with Apollo on January 1, 2022. Athene operates as a separate credit group with its own capital structure.',
        citations: ['c-athene-def', 'c-athene-pres'],
        relatedTerms: ['sre', 'net-invested-assets', 'cost-of-funds'],
        usedInModules: ['foundations', 'segment-rs']
    },

    // === Competition ===
    {
        id: 'competition-am',
        name: 'Competition – Asset Management',
        type: 'concept',
        category: 'Competition',
        definition: 'Apollo competes with other alternative asset managers (Blackstone, KKR, Carlyle, Ares, TPG, Blue Owl) and traditional asset managers across credit, equity, and hybrid strategies. Key competitive dimensions: origination capability, fundraising/distribution reach, investment performance, fee pricing, and product breadth. Apollo differentiates through its integrated origination platform and principal mindset.',
        citations: ['c-comp-am'],
        relatedTerms: ['origination-moat', 'fre'],
        usedInModules: ['competition']
    },
    {
        id: 'competition-rs',
        name: 'Competition – Retirement Services',
        type: 'concept',
        category: 'Competition',
        definition: 'Athene competes with traditional life insurers (MetLife, Prudential, Lincoln), other insurance-linked alternative platforms (Fortitude Re, Global Atlantic/KKR), and newer entrants. Key competitive dimensions: financial strength ratings, cost structure, origination-driven investment returns, distribution capabilities, and product innovation. Athene\'s advantages include Apollo\'s origination machine, low cost structure, and diverse capital sources.',
        citations: ['c-comp-rs'],
        relatedTerms: ['athene', 'sre'],
        usedInModules: ['competition']
    }
];

export function getTermById(id) {
    return terms.find(t => t.id === id);
}

export function getTermsByCategory(category) {
    return terms.filter(t => t.category === category);
}

export function searchTerms(query) {
    const q = query.toLowerCase();
    return terms.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        (t.formula && t.formula.toLowerCase().includes(q))
    );
}

export const categories = [
    'Core Metrics',
    'Operating Metrics',
    'Revenue Components',
    'Strategy & Narratives',
    'Products & Vehicles',
    'Segments',
    'Competition'
];
