import { useEffect, useMemo, useRef, useState } from 'react';
import { Route, ArrowRight, AlertTriangle, Navigation, CheckCircle2, Activity } from 'lucide-react';

const cardStyle = {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
};

const PathSmoothing = () => {
    const [status, setStatus] = useState('idle');
    const [stepIndex, setStepIndex] = useState(0);
    const [log, setLog] = useState([]);

    const logIdRef = useRef(0);
    const obstacleBusyRef = useRef(false);

    const [reroutePhase, setReroutePhase] = useState('none');
    const [rotateInstruction, setRotateInstruction] = useState(null);

    const timersRef = useRef({ confirm: null, resume: null });

    const clearRerouteTimers = () => {
        if (timersRef.current.confirm) window.clearTimeout(timersRef.current.confirm);
        if (timersRef.current.resume) window.clearTimeout(timersRef.current.resume);
        timersRef.current.confirm = null;
        timersRef.current.resume = null;
    };

    const route = useMemo(
        () => [
            'Continue straight on the sidewalk.',
            'Approach crosswalk. Keep to the right side.',
            'Crosswalk detected. Continue forward.',
            'Destination ahead. Continue straight.',
        ],
        []
    );

    const appendLog = (type, message) => {
        const id = (logIdRef.current += 1);
        setLog((prev) => [{ id, type, message }, ...prev].slice(0, 6));
    };

    const startNavigation = () => {
        clearRerouteTimers();
        setStatus('navigating');
        setStepIndex(0);
        setLog([]);
        logIdRef.current = 0;
        obstacleBusyRef.current = false;
        setReroutePhase('none');
        setRotateInstruction(null);
        appendLog('voice', 'Navigation started. Following planned route.');
        appendLog('haptic', 'Short confirmation pulse.');
    };

    const triggerObstacle = () => {
        if (status !== 'navigating') return;
        if (obstacleBusyRef.current) return;
        obstacleBusyRef.current = true;

        clearRerouteTimers();

        const angle = 10 + Math.floor(Math.random() * 16);
        const dir = Math.random() < 0.5 ? 'left' : 'right';
        setRotateInstruction({ angle, dir });

        setStatus('rerouting');
        setReroutePhase('rotating');

        appendLog('sensor', 'Front LiDAR: obstacle detected ahead.');
        appendLog('voice', `Obstacle ahead. Rotate ${angle}° ${dir}.`);

        timersRef.current.confirm = window.setTimeout(() => {
            setReroutePhase('confirmed');
            appendLog('haptic', 'Two short confirmation pulses.');
            appendLog('voice', 'Rotation confirmed. Continue straight.');
        }, 2200);

        timersRef.current.resume = window.setTimeout(() => {
            setReroutePhase('none');
            setRotateInstruction(null);
            setStatus('navigating');
            obstacleBusyRef.current = false;
        }, 3200);
    };

    const nextInstruction = () => {
        if (status !== 'navigating') return;
        if (stepIndex >= route.length - 1) {
            setStatus('complete');
            appendLog('voice', 'Destination reached. Navigation complete.');
            appendLog('haptic', 'Two short pulses (completion).');
            return;
        }
        setStepIndex((i) => i + 1);
        appendLog('voice', route[stepIndex + 1]);
    };

    useEffect(() => {
        if (status !== 'navigating') return;
        if (log.length === 0) {
            appendLog('voice', route[0]);
        }
    }, [status]);

    useEffect(() => {
        return () => {
            clearRerouteTimers();
        };
    }, []);

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
                <Route size={40} style={{ color: '#6366f1' }} />
                Path Smoothing & Dynamic Re-Routing
            </h1>

            <div style={{ ...cardStyle, marginTop: '20px', borderLeft: '4px solid #1e213a' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a', margin: '0 0 10px 0' }}>
                    Task Flow
                </h2>
                <ul style={{ color: '#374151', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '18px' }}>
                    <li>
                        System monitors real-time obstacle data from front LiDAR during navigation. 
                    </li>
                    {/* <li>
                        Finds the shortest route between obstacles.
                    </li> */}
                    <li>
                        If the current path becomes blocked, a new path is calculated automatically.
                    </li>
                    <li>
                        Voice guidance and haptic cues smoothly redirect the user without manual input.
                    </li>
                </ul>
            </div>

            <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                <div style={{ ...cardStyle, padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Scenario: obstacle course</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>
                                Navigation Session
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 10px',
                                borderRadius: '999px',
                                border: '1px solid #e2e8f0',
                                background: status === 'rerouting' ? '#fffbeb' : '#f8fafc',
                                color: '#334155',
                                fontSize: '12px',
                                fontWeight: '700',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <Activity size={14} />
                            {status === 'idle' && 'Idle'}
                            {status === 'navigating' && 'Navigating'}
                            {status === 'rerouting' && 'Re-routing'}
                            {status === 'complete' && 'Complete'}
                        </div>
                    </div>

                    <div style={{ marginTop: '18px' }} aria-live="assertive">
                        <div
                            style={{
                                background: '#6366f1',
                                borderRadius: '10px',
                                padding: '18px',
                                border: '1px solid rgba(255,255,255,0.22)',
                                color: 'white',
                                minHeight: '92px',
                            }}
                        >
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px' }}>
                                Voice guidance
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: '700' }}>
                                {status === 'idle' && 'Press Start to begin navigation.'}
                                {status === 'navigating' && `"${route[stepIndex]}"`}
                                {status === 'rerouting' && (
                                    reroutePhase === 'confirmed'
                                        ? '"Rotation confirmed. Continue straight."'
                                        : rotateInstruction
                                            ? `"Obstacle ahead. Rotate ${rotateInstruction.angle}° ${rotateInstruction.dir}."`
                                            : '"Obstacle ahead. Rotate."'
                                )}
                                {status === 'complete' && '"Navigation complete."'}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                            {status === 'idle' || status === 'complete' ? (
                                <button
                                    onClick={startNavigation}
                                    style={{
                                        flex: 1,
                                        minWidth: '220px',
                                        backgroundColor: '#6366f1',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Start Navigation
                                </button>
                            ) : (
                                <button
                                    onClick={nextInstruction}
                                    disabled={status !== 'navigating'}
                                    style={{
                                        flex: 1,
                                        minWidth: '220px',
                                        backgroundColor: status === 'navigating' ? '#10b981' : '#94a3b8',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: status === 'navigating' ? 'pointer' : 'default',
                                        opacity: status === 'navigating' ? 1 : 0.75,
                                    }}
                                >
                                    Next Instruction <ArrowRight size={16} style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
                                </button>
                            )}

                            {status === 'navigating' && (
                                <button
                                    onClick={triggerObstacle}
                                    style={{
                                        flex: 1,
                                        minWidth: '220px',
                                        backgroundColor: '#fff7ed',
                                        color: '#c2410c',
                                        border: '1px solid #fdba74',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                    Simulate Obstacle
                                </button>
                            )}
                        </div>

                        {status === 'complete' && (
                            <div
                                style={{
                                    marginTop: '14px',
                                    background: '#dcfce7',
                                    border: '1px solid #86efac',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    color: '#166534',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <CheckCircle2 size={18} />
                                Success outcome: collision avoided, route maintained without manual re-route.
                            </div>
                        )}
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
                                    <span style={{ width: '76px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>
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

export default PathSmoothing;
