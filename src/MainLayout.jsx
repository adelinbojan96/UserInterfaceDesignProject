import { Outlet, Link, useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    const isMobile = window.innerWidth < 768;

    return (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
            <nav style={{
                width: isMobile ? '100%' : '260px',
                height: isMobile ? 'auto' : '100vh',
                position: isMobile ? 'relative' : 'fixed',
                backgroundColor: 'white',
                borderRight: isMobile ? 'none' : '1px solid #e2e8f0',
                borderBottom: isMobile ? '1px solid #e2e8f0' : 'none',
                padding: '10px',
                zIndex: 100
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: isMobile ? '15px' : '30px' }}>Assistive System</div>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '10px', overflowX: 'auto' }}>
                    <Link to="/overview" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/overview' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/overview' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}>Overview</Link>

                    <Link to="/obstacle-detection" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/obstacle-detection' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/obstacle-detection' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}>Obstacles</Link>
                </div>
            </nav>

            <main style={{
                flex: 1,
                marginLeft: isMobile ? '0' : '260px',
                padding: isMobile ? '20px' : '40px',
                marginTop: isMobile ? '10px' : '0'
            }}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;