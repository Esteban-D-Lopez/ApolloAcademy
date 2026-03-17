import { CitationList } from '../components/Citations'

export default function FinancialPerformance() {
    return (
        <div className="page-container">
            <div className="page-header animate-in">
                <div className="page-eyebrow">Financial Performance</div>
                <h1 className="page-title">The Apollo Scorecard</h1>
                <p className="page-subtitle">
                    Q4 and full-year 2025 financial results mapped to Apollo&apos;s non-GAAP framework.
                </p>
            </div>

            {/* Segment Income Waterfall */}
            <div className="card card-gold animate-in animate-in-delay-1" style={{ marginBottom: 'var(--space-8)' }}>
                <h2 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>
                    FY 2025 Segment Income Build
                    <CitationList citationIds={['c-segment-income-def']} />
                </h2>
                <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end' }}>
                    {[
                        { label: 'FRE', value: '$2.5B', height: 40, color: 'var(--color-segment-am)' },
                        { label: '+', value: '', height: 0, color: 'transparent' },
                        { label: 'SRE', value: '$3.4B', height: 55, color: 'var(--color-segment-rs)' },
                        { label: '+', value: '', height: 0, color: 'transparent' },
                        { label: 'PII', value: '$338M', height: 6, color: 'var(--color-segment-pi)' },
                        { label: '=', value: '', height: 0, color: 'transparent' },
                        { label: 'Segment Income', value: '$6.2B', height: 100, color: 'var(--color-gold)' }
                    ].map((item, i) => (
                        <div key={i} style={{ textAlign: 'center', flex: item.height > 0 ? 1 : 'none' }}>
                            {item.height > 0 ? (
                                <>
                                    <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800, color: item.color }}>
                                        {item.value}
                                    </div>
                                    <div style={{
                                        height: `${item.height * 1.5}px`, background: item.color, borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                        margin: 'var(--space-2) auto 0', width: '80%', opacity: 0.8, minWidth: 60,
                                        transition: 'height 0.5s ease'
                                    }} />
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                                        {item.label}
                                    </div>
                                </>
                            ) : (
                                <div style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-muted)', padding: '0 var(--space-2)' }}>
                                    {item.label}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Metrics Table */}
            <div className="card animate-in animate-in-delay-2" style={{ marginBottom: 'var(--space-8)' }}>
                <h2 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>
                    Key Financial Metrics
                    <CitationList citationIds={['c-ani-data', 'c-fre-record', 'c-sre-record']} />
                </h2>
                <div style={{ overflowX: 'auto' }}>
                    <table className="metric-table">
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Q4 2024</th>
                                <th>Q3 2025</th>
                                <th>Q4 2025</th>
                                <th>FY 2024</th>
                                <th>FY 2025</th>
                                <th>YoY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['FRE', '$535M', '$619M', '$690M', '$2,056M', '$2,524M', '+23%'],
                                ['SRE', '$860M', '$904M', '$865M', '$3,231M', '$3,365M', '+4%'],
                                ['PII', '$139M', '$50M', '$227M', '$271M', '$338M', '+25%'],
                                ['Segment Income', '$1,534M', '$1,573M', '$1,782M', '$5,558M', '$6,227M', '+12%'],
                                ['ANI', '$1,296M', '$1,331M', '$1,540M', '$4,690M', '$5,221M', '+11%'],
                                ['ANI / Share', '$2.06', '$2.13', '$2.47', '$7.53', '$8.38', '+11%'],
                                ['AUM', '$751B', '$896B', '$938B', '$751B', '$938B', '+25%'],
                                ['Origination', '$60B', '$92B', '$97B', '$192B', '$309B', '+61%'],
                                ['Inflows', '$43B', '$67B', '$42B', '$155B', '$228B', '+47%'],
                                ['Mgmt Fees', '$742M', '$863M', '$942M', '$2,776M', '$3,391M', '+22%'],
                                ['Cap Solutions', '$160M', '$212M', '$226M', '$668M', '$808M', '+21%']
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td className="metric-name">{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>{row[2]}</td>
                                    <td className="metric-value">{row[3]}</td>
                                    <td>{row[4]}</td>
                                    <td className="metric-value">{row[5]}</td>
                                    <td style={{ color: row[6].startsWith('+') ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 600 }}>
                                        {row[6]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Growth Targets */}
            <div className="card animate-in animate-in-delay-3">
                <h2 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>
                    Five-Year Targets (2024 Investor Day)
                    <CitationList citationIds={['c-ani-target']} />
                </h2>
                <div className="grid-3">
                    {[
                        { metric: 'FRE', target: '~$5B', cagr: '20%', current: '$2.5B', color: 'var(--color-segment-am)' },
                        { metric: 'SRE', target: '~$5B', cagr: '10%', current: '$3.4B', color: 'var(--color-segment-rs)' },
                        { metric: 'ANI/Share', target: '$15', cagr: '~15%', current: '$8.38', color: 'var(--color-gold)' }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)',
                            padding: 'var(--space-6)', textAlign: 'center'
                        }}>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                                {item.metric}
                            </div>
                            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: item.color }}>
                                {item.target}
                            </div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                                by 2029 ({item.cagr} CAGR)
                            </div>
                            <div style={{
                                marginTop: 'var(--space-3)', padding: 'var(--space-1) var(--space-3)',
                                background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)',
                                fontSize: 'var(--font-size-xs)', display: 'inline-block'
                            }}>
                                Current: {item.current}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
