import { Outlet, Link, useLocation } from 'react-router-dom';

import {
    Menu,
    LucideHand,
    EyeIcon,
    ShieldPlus,
    TriangleAlert,
    Mic,
    Map,
    Route,
    Mountain,
    Sun
} from 'lucide-react';

const MainLayout = () => {
    const location = useLocation();
    const isMobile = window.innerWidth < 768;

    const linkStyle = (path) => ({
        padding: '10px',
        textDecoration: 'none',
        color: location.pathname === path ? 'white' : '#64748b',
        backgroundColor: location.pathname === path ? '#1e213a' : 'transparent',
        borderRadius: '8px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.2s'
    });

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
                zIndex: 100,
                overflowY: 'auto'
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: isMobile ? '15px' : '30px', paddingLeft: '15px'}}>
                    Assistive System
                </div>

                <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '8px', overflowX: isMobile ? 'auto' : 'visible' }}>

                    <Link to="/overview" style={linkStyle('/overview')}>
                        <Menu size={18} />
                        Overview
                    </Link>

                    <div style={{ paddingTop: isMobile ? '0px' : '30px', borderBottom: isMobile ? 'none' : '1px solid #f1f5f9', marginBottom: isMobile ? '0' : '10px' }} />
                    {(!isMobile) && <div style={{ fontSize: '12px', color: '#94a3b8', paddingLeft: '10px', marginBottom: '5px', textTransform: 'uppercase', fontWeight: 'bold' }}>Features</div>}


                    <Link to="/obstacle-detection" style={linkStyle('/obstacle-detection')}>
                        <TriangleAlert size={18} />
                        Obstacle Detection
                    </Link>

                    <Link to="/voice-navigation" style={linkStyle('/voice-navigation')}>
                        <Mic size={18} />
                        Voice Navigation
                    </Link>

                    <Link to="/indoor-mapping" style={linkStyle('/indoor-mapping')}>
                        <Map size={18} />
                        Indoor Mapping
                    </Link>

                    <Link to="/gesture-commands" style={linkStyle('/gesture-commands')}>
                        <LucideHand size={18} />
                        Gestures
                    </Link>

                    <Link to="/emergency-alert" style={linkStyle('/emergency-alert')}>
                        <ShieldPlus size={18} />
                        Emergency Alerts
                    </Link>

                    <Link to="/object-recognition" style={linkStyle('/object-recognition')}>
                        <EyeIcon size={18} />
                        Object Recognition
                    </Link>

                    <Link to="/path-smoothing" style={linkStyle('/path-smoothing')}>
                        <Route size={18} />
                        Path Smoothing
                    </Link>

                    <Link to="/terrain-detection" style={linkStyle('/terrain-detection')}>
                        <Mountain size={18} />
                        Terrain Detection
                    </Link>

                    <Link to="/environmental-awareness" style={linkStyle('/environmental-awareness')}>
                        <Sun size={18} />
                        Env. Awareness
                    </Link>
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