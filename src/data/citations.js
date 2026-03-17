// Apollo Academy – Citation Anchors
// Each citation links to a specific document, page, and excerpt

export const citations = {
    // === Segment Income ===
    'c-segment-income-def': {
        id: 'c-segment-income-def',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 4,
        lineRange: '678-688',
        excerpt: 'Segment Income: $1,534M (4Q\'24), $1,573M (3Q\'25), $1,782M (4Q\'25), $5,558M (FY\'24), $6,227M (FY\'25). Segment Income is the sum of Fee Related Earnings, Spread Related Earnings, and Principal Investing Income.'
    },
    'c-segment-income-data': {
        id: 'c-segment-income-data',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 1,
        lineRange: '99-100',
        excerpt: 'Apollo\'s primary non-GAAP earnings metric, Adjusted Net Income, which represents the sum of FRE, SRE, and PII, less HoldCo interest and other financing costs and taxes, totaled $1.5 billion and $5.2 billion.'
    },

    // === FRE ===
    'c-fre-def': {
        id: 'c-fre-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 6,
        lineRange: '568-596',
        excerpt: 'Fee Related Earnings, or FRE: Component of Segment Income that is used to assess the performance of the Asset Management segment. FRE is the sum of (i) management fees, (ii) capital solutions and other related fees, (iii) fee-related performance fees from indefinite term vehicles, that are measured and received on a recurring basis and not dependent on realization events, and (iv) other income, net, less (a) fee-related compensation, excluding equity-based compensation, (b) non-compensation expenses, (c) placement fees, and (d) non-controlling interests.'
    },
    'c-fre-record': {
        id: 'c-fre-record',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 3,
        lineRange: '465-466',
        excerpt: 'Record quarterly and annual FRE of $690 million and $2.5 billion, respectively, driven by strong FRE growth of 23% in 2025.'
    },
    'c-fre-margin': {
        id: 'c-fre-margin',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 8,
        lineRange: '425-430',
        excerpt: 'For the full year, our FRE margin was approximately 57%, stable year-over-year and consistent with our previously communicated target. Excluding the impact of Bridge, our full year FRE margin grew by about 50 basis points, inclusive of the cost of significant investments in our platform.'
    },
    'c-fre-2026': {
        id: 'c-fre-2026',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 10,
        lineRange: '473-477',
        excerpt: 'We expect FRE to grow by 20%-plus with 75% of the revenue contribution coming from well-established core businesses such as asset-backed finance, direct lending, multi-credit and hybrid, as well as the annualization of growth already in the ground. The remaining 25% of top line growth we expect to come from newer initiatives.'
    },

    // === SRE ===
    'c-sre-def': {
        id: 'c-sre-def',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 4,
        lineRange: '606-641',
        excerpt: 'Spread Related Earnings: Net investment spread ($1,142M Q4\'25) less Other operating expenses ($119M) less Interest and other financing costs ($158M) = $865M Q4\'25. SRE is derived from Athene\'s ability to earn spread between investment returns and liability costs.'
    },
    'c-sre-record': {
        id: 'c-sre-record',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 3,
        lineRange: '469-470',
        excerpt: 'Robust quarterly and record annual SRE of $865 million and $3.4 billion, respectively, supported by strong organic growth and increased alternative investment income.'
    },
    'c-sre-2026': {
        id: 'c-sre-2026',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 4,
        lineRange: '190-192',
        excerpt: 'The SRE growth remains durable. We expect 10% SRE growth in 2026, and we reaffirm the 10% growth on average through 2029, assuming we do what we\'re supposed to do in the alternatives.'
    },
    'c-sre-spread': {
        id: 'c-sre-spread',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 9,
        lineRange: '434-436',
        excerpt: 'The blended net spread ex notables was 120 basis points in the fourth quarter versus 121 basis points in the prior quarter, primarily reflecting asset prepayments and mostly offset by new business growth and higher return on the alts portfolio.'
    },

    // === PII ===
    'c-pii-def': {
        id: 'c-pii-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 9,
        lineRange: '791-793',
        excerpt: 'Principal Investing Income, or PII: The interests granted to Apollo by a fund managed by Apollo that entitle Apollo to receive allocations, distributions or fees which are based on the performance of such fund or its underlying investments.'
    },
    'c-pii-data': {
        id: 'c-pii-data',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 4,
        lineRange: '666-677',
        excerpt: 'Principal Investing Income: $139M (4Q\'24), $50M (3Q\'25), $227M (4Q\'25), $271M (FY\'24), $338M (FY\'25).'
    },
    'c-pii-cycle': {
        id: 'c-pii-cycle',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 28,
        lineRange: '742-745',
        excerpt: 'We have three earning streams: fee related earnings growing at 20% from our asset management business, spread related earnings to grow at 10% from our Retirement Services business, and then principal investing income which is net carry — we think about that more as a cycle average business.'
    },

    // === ANI ===
    'c-ani-def': {
        id: 'c-ani-def',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 4,
        lineRange: '690-737',
        excerpt: 'Adjusted Net Income: Segment Income ($1,782M Q4\'25) less HoldCo interest and other financing costs ($40M) less Taxes and related payables ($202M) = $1,540M. ANI per share: $2.47 (Q4\'25), $8.38 (FY\'25).'
    },
    'c-ani-data': {
        id: 'c-ani-data',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 3,
        lineRange: '128-130',
        excerpt: 'For the full year, we generated record combined fee related earnings and spread related earnings of $5.9 billion, which drove adjusted net income of $5.2 billion, up 14% year-over-year, or $8.38 per share.'
    },
    'c-ani-target': {
        id: 'c-ani-target',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 28,
        lineRange: '782-784',
        excerpt: 'You get to our primary earnings metric which is $15 per share by 2029. Assume no other changes to the construction — no changes in the tax rate or the cost structure relative to the pace that we\'re on today.'
    },

    // === AUM ===
    'c-aum-def': {
        id: 'c-aum-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 5,
        lineRange: '438-463',
        excerpt: 'Assets Under Management, or AUM: The assets of the funds, partnerships and accounts to which Apollo provides investment management, advisory, or certain other investment-related services, including capital that such funds, partnerships and accounts have the right to call from investors pursuant to capital commitments.'
    },
    'c-aum-data': {
        id: 'c-aum-data',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 1,
        lineRange: '151-156',
        excerpt: 'Total Assets Under Management ("AUM"): $938B. Fee-Generating AUM ("FGAUM"): $709B. As of December 31, 2025.'
    },
    'c-fgaum-def': {
        id: 'c-fgaum-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 6,
        lineRange: '583-590',
        excerpt: 'Fee-Generating AUM consists of assets of the funds, partnerships and accounts to which we provide investment management, advisory, or certain other investment-related services and on which we earn management fees, monitoring fees or other investment-related fees.'
    },

    // === Origination ===
    'c-origination-def': {
        id: 'c-origination-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 9,
        lineRange: '768-773',
        excerpt: 'Origination: Represents capital that has been invested in new equity, debt or debt-like investments by Apollo\'s equity and credit strategies where Apollo or one of Apollo\'s origination platforms has sourced, negotiated, or significantly affected the commercial terms of the investment.'
    },
    'c-origination-record': {
        id: 'c-origination-record',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 3,
        lineRange: '485-487',
        excerpt: 'Origination: Record quarterly origination activity of $97 billion in the fourth quarter and $309 billion in 2025 driven by significant contributions from core credit and origination platforms.'
    },
    'c-origination-target': {
        id: 'c-origination-target',
        source: 'investor-pres-feb2026',
        document: 'Investor Presentation – February 2026',
        date: '2026-02-01',
        page: 20,
        lineRange: '718-724',
        excerpt: 'Three Strategic Growth Pillars: Origination — $275B+ annual target by 2029. Global Wealth — $150B+ cumulative organic capital raise target (2025-2029). Capital Solutions — ~$1B annual fee related revenue target by 2029.'
    },
    'c-origination-spread': {
        id: 'c-origination-spread',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 3,
        lineRange: '139-141',
        excerpt: 'More importantly, robust, consistent spread, 350 basis points over treasuries with an average rating of BBB. Capital formation, record inflows, $228 billion, both Athene and Asset Management, ACS third straight record year.'
    },

    // === Inflows ===
    'c-inflows-def': {
        id: 'c-inflows-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 8,
        lineRange: '671-672',
        excerpt: 'Inflows: (i) At the individual strategy level, subscriptions, commitments, and other increases in available capital, net of inter-strategy transfers, and (ii) on an aggregate basis, the sum of inflows across the credit and equity investing strategies.'
    },
    'c-inflows-data': {
        id: 'c-inflows-data',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 1,
        lineRange: '158-173',
        excerpt: 'Inflows: $42B (Q4\'25), $228B (FY\'25). Origination: $97B (Q4\'25), $309B (FY\'25). Gross Capital Deployment: $113B (Q4\'25), $386B (FY\'25).'
    },

    // === NIA & Spread ===
    'c-nia-def': {
        id: 'c-nia-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 8,
        lineRange: '689-697',
        excerpt: 'Net invested assets represent the investments that directly back Athene\'s net reserve liabilities as well as surplus assets. Net invested assets include total investments at cost or amortized cost (excluding derivatives), cash and cash equivalents, investments in related parties, accrued investment income, and various adjustments.'
    },
    'c-nia-data': {
        id: 'c-nia-data',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 8,
        lineRange: '431-432',
        excerpt: 'Athene\'s net invested assets grew by 18% year-over-year to $292 billion.'
    },
    'c-nis-def': {
        id: 'c-nis-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 8,
        lineRange: '701-702',
        excerpt: 'Net investment spread measures Athene\'s investment performance plus its strategic capital management fees less its total cost of funds, presented on an annualized basis for interim periods.'
    },
    'c-nis-data': {
        id: 'c-nis-data',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 9,
        lineRange: '434-438',
        excerpt: 'The blended net spread ex notables was 120 basis points in the fourth quarter versus 121 basis points in the prior quarter. When considering our 11% return expectation on the alternatives portfolio, the net spread would have been 4 basis points higher.'
    },
    'c-cof-def': {
        id: 'c-cof-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 6,
        lineRange: '537-543',
        excerpt: 'Cost of funds includes liability costs related to cost of crediting on deferred annuities, including option costs on indexed annuities, and institutional costs related to institutional products, as well as other liability costs including DAC, DSI and VOBA amortization, certain market risk benefit costs, and premiums.'
    },

    // === Strategic ===
    'c-six-markets-rowan': {
        id: 'c-six-markets-rowan',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 4,
        lineRange: '159-167',
        excerpt: 'We are going from serving one market, institutional alts portfolios, to serving six markets. We now serve individuals, we serve insurance, we serve the debt and equity buckets of our institutional clients, we serve traditional asset managers, and we hope to serve more robustly the 401(k) market. Each of these markets has the ability to be roughly the same size as our original market, which powered the entire industry.'
    },
    'c-six-markets-pres': {
        id: 'c-six-markets-pres',
        source: 'investor-pres-feb2026',
        document: 'Investor Presentation – February 2026',
        date: '2026-02-01',
        page: 11,
        lineRange: '428-460',
        excerpt: 'Capital Formation Around These Opportunities Spans Six Expansive Buyer Pools: 1) Institutional Investors (Alts Bucket) — singular bucket the last 35 years, 2) Individuals, 3) Insurance, 4) Traditional Asset Managers, 5) Institutional Investors (Fixed Income & Equity Replacement), 6) Defined Contribution / 401(k).'
    },
    'c-replacement-thesis': {
        id: 'c-replacement-thesis',
        source: 'investor-pres-feb2026',
        document: 'Investor Presentation – February 2026',
        date: '2026-02-01',
        page: 15,
        lineRange: '578-595',
        excerpt: 'A Fundamental Rethink of Public & Private is Necessary. Alternatives → Next Target: Fixed Income Replacement → Future Target: Equity Replacement. We Believe Replacement Will Generate Alpha across both fixed income and equities.'
    },
    'c-replacement-fi': {
        id: 'c-replacement-fi',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 15,
        lineRange: '366-376',
        excerpt: 'In our IG business you can buy our total return investment grade fund — it\'s effectively 100% originated assets by us. You have to go from daily to monthly liquidity but you pick up close to 200 basis points of yield. We\'re going to create replacement product after replacement product.'
    },
    'c-replacement-equity': {
        id: 'c-replacement-equity',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 22,
        lineRange: '669-670',
        excerpt: 'This is a product that we\'ve developed that\'s got a fantastic track record investing in lower risk less volatile equities. It\'s produced S&P plus rates of return over the last decade with a fraction of the volatility — one down quarter in the last decade.'
    },
    'c-moat-zelter': {
        id: 'c-moat-zelter',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 6,
        lineRange: '176-178',
        excerpt: 'If there\'s one slide to remember of the presentation today it\'s this slide — we believe this is our Mona Lisa. It\'s irreplaceable. Others will try to create it, they\'ll try to hire small teams but we have set the stage for the evolution of our industry.'
    },
    'c-moat-platforms': {
        id: 'c-moat-platforms',
        source: 'investor-pres-feb2026',
        document: 'Investor Presentation – February 2026',
        date: '2026-02-01',
        page: 21,
        lineRange: '740-768',
        excerpt: 'Differentiated, Diversified Origination Platform Ecosystem: 16 Origination Platforms Today across Core Credit, High Grade Capital Solutions, and Equity. Target 100 to 200 basis points of outperformance relative to equivalent rated public corporates.'
    },
    'c-capform-zelter': {
        id: 'c-capform-zelter',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 6,
        lineRange: '267-278',
        excerpt: 'What differentiates Apollo is that we built a system designed to absorb that complexity and convert it into consistent, high-quality outcomes for our clients. Origination today is no longer a standalone function — it\'s bespoke investing. The flywheel that powers our business is origination, product and investment teams working in sync. Capital formation is not something that happens at the end of the process — it shapes what we originate upstream.'
    },
    'c-principal-rowan': {
        id: 'c-principal-rowan',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 4,
        lineRange: '214-225',
        excerpt: 'A principal\'s mindset approaches every asset and every asset class as if they\'re going to own it for the long term because they do. An agent\'s mindset responds to the hot dot in the marketplace and asks more fundamentally, can the asset be sold, is the asset popular? I believe a principal mindset will serve us very well. In our PE business, our software exposure rounds to zero.'
    },

    // === Products ===
    'c-ads-rowan': {
        id: 'c-ads-rowan',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 5,
        lineRange: '227-229',
        excerpt: 'Take our largest private markets direct lending vehicle ADS, now more than $25 billion. For the quarter and for the year, approximately 8% return, lowest leverage, top of the capital structure, large company, no PIK. I assure you ADS is on offense.'
    },
    'c-ads-zelter': {
        id: 'c-ads-zelter',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 12,
        lineRange: '626-636',
        excerpt: 'We have been consistent for the last 24 months about the philosophy in terms of portfolio construction with regards to ADS: 100% senior secured, first lien, no PIK, no ARR. Net new assets were up every quarter last year, over $5 billion of net inflows. When you look at our software PIK exposure, negligible. Software ARR exposure, negligible.'
    },
    'c-aaa-rowan': {
        id: 'c-aaa-rowan',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 5,
        lineRange: '230-233',
        excerpt: 'In hybrid, our largest vehicle there is AAA, which now exceeds some $25 billion. AAA, 12% inception to date return, very low volatility, 43 of 44 positive quarters, including 23 consecutive positive quarters. This is the perfect strategy for institutions thinking about total portfolio approach.'
    },
    'c-aaa-sambur': {
        id: 'c-aaa-sambur',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 22,
        lineRange: '660-665',
        excerpt: 'AAA is already now the second largest fund at our firm and we think very soon it\'ll be the largest. The reason is very simple — we\'re offering something unique, something special that the market needs. It\'s got a fantastic track record investing in lower risk less volatile equities with S&P-plus rates of return and a fraction of the volatility.'
    },

    // === Athene ===
    'c-athene-def': {
        id: 'c-athene-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 5,
        lineRange: '464-468',
        excerpt: 'Athene Holding Ltd. (together with its subsidiaries, "Athene"), a leading financial services company specializing in retirement services that issues, reinsures and acquires retirement savings products designed for the increasing number of individuals and institutions seeking to fund retirement needs.'
    },
    'c-athene-pres': {
        id: 'c-athene-pres',
        source: 'investor-pres-feb2026',
        document: 'Investor Presentation – February 2026',
        date: '2026-02-01',
        page: 3,
        lineRange: '56-88',
        excerpt: 'Retirement Services: A2/A/A Rated by Moody\'s, S&P, Fitch. A1/A+/A+/A+ Financial Strength Ratings by Moody\'s, S&P, Fitch, A.M. Best. Wide range of retirement savings products. Athene operates as a separate credit group with its own capital structure. #1 US Total Annuity Sales.'
    },

    // === Revenue Components ===
    'c-mgmt-fees-data': {
        id: 'c-mgmt-fees-data',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 4,
        lineRange: '534-545',
        excerpt: 'Management fees: $742M (4Q\'24), $863M (3Q\'25), $942M (4Q\'25), $2,776M (FY\'24), $3,391M (FY\'25). Capital solutions fees and other, net: $160M (4Q\'24), $212M (3Q\'25), $226M (4Q\'25), $668M (FY\'24), $808M (FY\'25).'
    },
    'c-acs-def': {
        id: 'c-acs-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 6,
        lineRange: '521-526',
        excerpt: 'Capital solutions fees and other, net: Primarily includes transaction fees earned by Apollo Capital Solutions ("ACS") related to underwriting, structuring, arrangement and placement of debt and equity securities, and syndication for funds managed by Apollo, portfolio companies, and third parties.'
    },
    'c-acs-data': {
        id: 'c-acs-data',
        source: 'earnings-call-4q25',
        document: 'Q4 2025 Earnings Call Transcript',
        date: '2026-02-09',
        page: 8,
        lineRange: '414-417',
        excerpt: 'Capital solutions fees of $226 million reached a new high in the fourth quarter and drove the full-year result to exceed $800 million. The underlying activity is increasingly diversified, with more than 125 transactions in Q4 and approximately 430 transactions during the full year.'
    },
    'c-acs-target': {
        id: 'c-acs-target',
        source: 'investor-day-transcript',
        document: 'Investor Day 2024 Transcript',
        date: '2024-10-01',
        page: 10,
        lineRange: '268-270',
        excerpt: 'At our last investor day we set an ambitious 5-year goal to reach $500 million in revenue. Just three years later we\'ve already achieved that. Now we\'re raising the bar — our new 5-year goal is a billion dollars in Revenue.'
    },
    'c-perf-fees-def': {
        id: 'c-perf-fees-def',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 9,
        lineRange: '780-781',
        excerpt: 'Performance allocations: The interests granted to Apollo by a fund managed by Apollo that entitle Apollo to receive allocations, distributions or fees which are based on the performance of such fund or its underlying investments.'
    },

    // === Wealth ===
    'c-wealth-target': {
        id: 'c-wealth-target',
        source: 'investor-pres-feb2026',
        document: 'Investor Presentation – February 2026',
        date: '2026-02-01',
        page: 20,
        lineRange: '720-728',
        excerpt: 'Global Wealth: $150B+ cumulative organic capital raise target (2025-2029).'
    },
    'c-wealth-data': {
        id: 'c-wealth-data',
        source: 'earnings-release-4q25',
        document: 'AGM Earnings Release 4Q\'2025',
        date: '2026-02-09',
        page: 3,
        lineRange: '490-491',
        excerpt: 'Global Wealth: Strong quarterly inflows of $4 billion and record annual inflows of $18 billion in 2025 driven by sustained momentum in signature semi-liquid products and growing demand towards fixed income replacement-focused products.'
    },

    // === Competition ===
    'c-comp-am': {
        id: 'c-comp-am',
        source: '10k-2025',
        document: '2025 Annual Report (10-K)',
        date: '2026-02-24',
        page: 20,
        lineRange: null,
        excerpt: 'Apollo\'s Asset Management segment operates in highly competitive industries, competing with other alternative asset managers, traditional asset management firms, commercial banks, investment banks, and other financial institutions for investment opportunities, investors, and talent.'
    },
    'c-comp-rs': {
        id: 'c-comp-rs',
        source: 'retirement-update-2025',
        document: 'Retirement Services Business Update 2025',
        date: '2025-11-24',
        page: 7,
        lineRange: '206-222',
        excerpt: 'Our Right to Win in Retirement Services: What is needed to succeed? Originated Assets + Stable Liabilities + Strong Capital + Low Cost Structure + Management. We are a tough competitor.'
    }
};

export function getCitation(id) {
    return citations[id];
}

export function getCitationsBySource(sourceId) {
    return Object.values(citations).filter(c => c.source === sourceId);
}
