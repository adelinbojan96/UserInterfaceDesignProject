const Overview = () => {
    return (
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>System Overview</h1>
            <p style={{ color: '#64748b' }}>
                Welcome to the Assistive System Dashboard. Select a feature from the left sidebar.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>System Status</h3>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Online</span>
                </div>

                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Battery</h3>
                    <span>98%</span>
                </div>
            </div>
        </div>
    );
};

export default Overview;