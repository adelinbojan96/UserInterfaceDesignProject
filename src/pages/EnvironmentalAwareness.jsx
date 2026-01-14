import { useRef, useState } from 'react';
import { Compass, Home, Trees, Activity, ArrowRight } from 'lucide-react';

const cardStyle = {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
};

const EnvironmentalAwareness = () => {
    const [status, setStatus] = useState('idle');
    const [environment, setEnvironment] = useState(null);
    const [log, setLog] = useState([]);

    const timeoutRef = useRef(null);
    const busyRef = useRef(false);
    const logIdRef = useRef(0);

    const appendLog = (type, message) => {
        const id = (logIdRef.current += 1);
        setLog((prev) => [{ id, type, message }, ...prev]);
    };

    const clearPending = ({ resetBusy } = { resetBusy: true }) => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (resetBusy) busyRef.current = false;
    };

    const getVariablesForEnvironment = (env) => {
        if (env === 'indoor') {
            return { lidarScanRange: 'reduced', priority: 'haptics' };
        }
        return { lidarScanRange: 'extended', priority: 'verbal cues' };
    };

    const startAwareness = () => {
        clearPending();
        setStatus('active');
        setEnvironment(null);
        setLog([]);
        logIdRef.current = 0;
        appendLog('system', 'Environmental awareness active.');
    };

    const stopAwareness = () => {
        clearPending();
        setStatus('idle');
        setEnvironment(null);
        appendLog('system', 'Environmental awareness stopped.');
    };

    const detectEnvironment = () => {
        if (status !== 'active') return;
        if (busyRef.current) return;

        busyRef.current = true;
        clearPending({ resetBusy: false });

        setStatus('detecting');
        appendLog('system', 'Detecting indoor/outdoor context…');

        timeoutRef.current = window.setTimeout(() => {
            const next = Math.random() < 0.5 ? 'indoor' : 'outdoor';
            setEnvironment(next);
            const vars = getVariablesForEnvironment(next);
            appendLog('sensor', `Context classified as ${next}.`);
            appendLog('system', `LiDAR scan range: ${vars.lidarScanRange}. Priority: ${vars.priority}.`);
            setStatus('active');
            timeoutRef.current = null;
            busyRef.current = false;
        }, 600);
    };

    const envLabel = environment ? (environment === 'indoor' ? 'Indoor' : 'Outdoor') : 'Unknown';
    const EnvIcon = environment === 'indoor' ? Home : environment === 'outdoor' ? Trees : Compass;
    const vars = environment ? getVariablesForEnvironment(environment) : { lidarScanRange: '—', priority: '—' };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Compass size={40} style={{ color: '#16a34a' }} />
                Environmental Awareness & Mode Switching
            </h1>

            <div style={{ ...cardStyle, marginTop: '20px', borderLeft: '4px solid #1e213a' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a', margin: '0 0 10px 0' }}>
                    Task Flow
                </h2>
                <ul style={{ color: '#374151', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '18px' }}>
                    <li>Press the button to detect whether you are indoors or outdoors.</li>
                    <li>System updates two settings based on the environment.</li>
                    <li>Settings shown: LiDAR scan range (reduced/extended) and feedback priority (verbal cues/haptics).</li>
                </ul>
            </div>

            <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                <div style={{ ...cardStyle, padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Scenario: walking between environments</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>Context Session</div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 10px',
                                borderRadius: '999px',
                                border: '1px solid #e2e8f0',
                                background: status === 'detecting' ? '#ecfeff' : '#f8fafc',
                                color: '#334155',
                                fontSize: '12px',
                                fontWeight: '700',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <Activity size={14} />
                            {status === 'idle' && 'Idle'}
                            {status === 'active' && 'Active'}
                            {status === 'detecting' && 'Detecting'}
                        </div>
                    </div>

                    <div style={{ marginTop: '18px' }} aria-live="assertive">
                        <div
                            style={{
                                background: '#16a34a',
                                borderRadius: '10px',
                                padding: '18px',
                                border: '1px solid rgba(255,255,255,0.22)',
                                color: 'white',
                                minHeight: '92px',
                            }}
                        >
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px' }}>
                                Active variables
                            </div>
                            <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                                    <span style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <EnvIcon size={16} /> Environment
                                    </span>
                                    <span style={{ fontWeight: '900' }}>{envLabel}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                    <span style={{ fontWeight: '800' }}>LiDAR scan range</span>
                                    <span style={{ fontWeight: '900', textTransform: 'capitalize' }}>{vars.lidarScanRange}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                    <span style={{ fontWeight: '800' }}>Priority</span>
                                    <span style={{ fontWeight: '900', textTransform: 'capitalize' }}>{vars.priority}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                            {status === 'idle' ? (
                                <button
                                    onClick={startAwareness}
                                    style={{
                                        flex: 1,
                                        minWidth: '220px',
                                        backgroundColor: '#16a34a',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Start Awareness
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={detectEnvironment}
                                        disabled={status !== 'active'}
                                        style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            backgroundColor: status === 'active' ? '#10b981' : '#94a3b8',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '14px 16px',
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            cursor: status === 'active' ? 'pointer' : 'default',
                                            opacity: status === 'active' ? 1 : 0.75,
                                        }}
                                    >
                                        Detect Indoor/Outdoor <ArrowRight size={16} style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
                                    </button>

                                    <button
                                        onClick={stopAwareness}
                                        style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            backgroundColor: '#f1f5f9',
                                            color: '#334155',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '10px',
                                            padding: '14px 16px',
                                            fontSize: '14px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Stop
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div style={cardStyle}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#1e293b' }}>
                        System Log
                    </h3>
                    {log.length === 0 ? (
                        <div style={{ color: '#64748b', fontSize: '14px' }}>No events yet.</div>
                    ) : (
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {log.map((e) => (
                                <div
                                    key={e.id}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        background: 'white',
                                        fontSize: '14px',
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <span style={{ width: '74px', fontSize: '12px', color: '#64748b', fontWeight: '800' }}>
                                        {e.type.toUpperCase()}
                                    </span>
                                    <span style={{ color: '#1e293b' }}>{e.message}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnvironmentalAwareness;
