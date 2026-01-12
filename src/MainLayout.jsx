import { Outlet, Link, useLocation } from 'react-router-dom';

const MainLayout = () => {

    const location = useLocation();

    const linkStyle = {
        textDecoration: 'none',
        display: 'block',
        padding: '10px 12px',
        borderRadius: '8px',
        marginBottom: '5px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#64748b'
    };

    const activeLinkStyle = {
        ...linkStyle,
        backgroundColor: '#1e213a',
        color: 'white'
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <aside style={{
                width: '260px',
                backgroundColor: 'white',
                borderRight: '1px solid #e2e8f0',
                position: 'fixed',
                height: '100vh',
                top: 0,
                left: 0,
                padding: '24px',
                boxSizing: 'border-box'
            }}>
                maybe place a logo here
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>

                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#0f172a' }}>Assistive System</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Low-Fi Prototype</div>
                    </div>
                </div>

                <nav>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
                        Features
                    </div>

                    <Link
                        to="/overview"
                        style={location.pathname === '/overview' ? activeLinkStyle : linkStyle}
                    >
                        Overview
                    </Link>

                    <Link
                        to="/obstacle-detection"
                        style={location.pathname === '/obstacle-detection' ? activeLinkStyle : linkStyle}
                    >
                        Obstacle Detection
                    </Link>
                </nav>
            </aside>

            <main style={{
                flex: 1,
                marginLeft: '260px',
                padding: '40px',
                backgroundColor: '#F0F5F9'
            }}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;