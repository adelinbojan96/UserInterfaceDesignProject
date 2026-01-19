import { Battery, Wifi, Activity, MapPin, Volume2, BellOff, Sun, Clock } from 'lucide-react';

const Overview = () => {
    const recentLogs = [
        { time: '10:42 AM', type: 'Obstacle', message: 'Chair detected 1m ahead' },
        { time: '10:38 AM', type: 'Face', message: 'Mihai Petrescu recognized' },
        { time: '10:30 AM', type: 'System', message: 'GPS Signal acquired' },
        { time: '10:15 AM', type: 'Battery', message: 'Battery level at 98%' },
    ];

    return (
        <div style={{ maxWidth: '100%', fontFamily: "Inter, sans-serif" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#1e293b' }}>System Overview</h1>
                </div>
                <div style={{ background: '#dcfce7', color: '#16a34a', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#16a34a', borderRadius: '50%' }}></div>
                    System Online
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '24px'
            }}>
                <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Battery size={20} color="#6366f1" />
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>98%</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Battery Level</span>
                    <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                        <div style={{ width: '98%', height: '100%', background: '#6366f1', borderRadius: '2px' }}></div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Wifi size={20} color="#10b981" />
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>Strong</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Network Signal</span>
                    <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                        <div style={{ width: '85%', height: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MapPin size={20} color="#f59e0b" />
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>Active</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>GPS Tracking</span>
                </div>

                <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Activity size={20} color="#ef4444" />
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>Normal</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>System Load</span>
                </div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>Quick Settings</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '5px' }}>
                <button style={{ flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Volume2 size={20} color="#475569" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Voice On</span>
                </button>
                <button style={{ flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <BellOff size={20} color="#475569" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Silent</span>
                </button>
                <button style={{ flex: 1, padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Sun size={20} color="#475569" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Light</span>
                </button>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>Recent Activity</h3>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 16px' }}>
                {recentLogs.map((log, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '16px 0',
                        borderBottom: index !== recentLogs.length - 1 ? '1px solid #f1f5f9' : 'none'
                    }}>
                        <div style={{ marginTop: '2px' }}>
                            <Clock size={16} color="#94a3b8" />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                                {log.type}: {log.message}
                            </div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                {log.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Overview;