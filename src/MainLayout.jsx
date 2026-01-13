import { Outlet, Link, useLocation } from 'react-router-dom';
import menuIcon from './assets/menu_icon.png';

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
                <div style={{ fontWeight: 'bold', marginBottom: isMobile ? '15px' : '30px', paddingLeft: '15px'}}>Assistive System</div>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '10px', overflowX: 'auto' }}>
                    <Link to="/overview" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/overview' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/overview' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '16px',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <img src={menuIcon} alt="" style={{ width: '26px', height: '26px' }} />
                        Overview</Link>

                    <div style={{ paddingTop: isMobile ? '0px' : '50px'}} />
                    <Link to="/obstacle-detection" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/obstacle-detection' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/obstacle-detection' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}>Obstacle Detection</Link>

                    <Link to="/voice-navigation" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/voice-navigation' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/voice-navigation' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}>Voice Navigation</Link>

                    <Link to="/indoor-mapping" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/indoor-mapping' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/indoor-mapping' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}>Indoor Mapping</Link>

                    <Link to = "/gesture-commands" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/gesture-commands' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/gesture-commands' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}>Gestures</Link>

                    <Link to = "/emergency-alert" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/emergency-alert' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/emergency-alert' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}
                    >Emergency Alerts</Link>

                    <Link to = "/object-recognition" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/object-recognition' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/object-recognition' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}
                    >Object Recognition</Link>

                    <Link to = "/path-smoothing" style={
                        {
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/path-smoothing' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/path-smoothing' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}
                    >Path Smoothing</Link>

                    <Link to = "/terrain-detection" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/terrain-detection' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/terrain-detection' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}
                    >Terrain Detection</Link>

                    <Link to = "/enironmental-awareness" style={{
                        padding: '10px',
                        textDecoration: 'none',
                        color: location.pathname === '/environmental-awareness' ? 'white' : '#64748b',
                        backgroundColor: location.pathname === '/environmental-awareness' ? '#1e213a' : 'transparent',
                        borderRadius: '8px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap'
                    }}
                    >Environmental Awareness</Link>
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