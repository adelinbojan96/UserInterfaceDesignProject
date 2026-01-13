const Overview = () => {
    return (
        <div style={{ maxWidth: '100%' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>System Overview</h1>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.4' }}>
                Welcome to the Assistive System Dashboard. Select a feature from the menu.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))',
                gap: '16px',
                marginTop: '2px'
            }}>
                <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '16px' }}>System Status</h3>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>● Online</span>
                </div>

                <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '16px' }}>Battery</h3>
                    <span style={{ fontWeight: 'bold' }}>98%</span>
                </div>
            </div>
        </div>
    );
};

export default Overview;