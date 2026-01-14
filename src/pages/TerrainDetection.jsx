import { useRef, useState } from 'react';
import { Mountain, ArrowRight, Activity } from 'lucide-react';

const cardStyle = {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
};

const TerrainDetection = () => {
    const [status, setStatus] = useState('idle');
    const [reading, setReading] = useState(null);
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

        if (resetBusy) {
            busyRef.current = false;
        }
    };

    const generateInclineReading = () => {
        const angleDeg = Math.round((Math.random() * 36 - 18) * 1) / 1;
        const abs = Math.abs(angleDeg);
        if (abs <= 2) {
            return { angleDeg: 0, label: 'level', voice: 'Surface is level. 0 degrees.' };
        }

        if (angleDeg > 0) {
            return { angleDeg, label: 'uphill', voice: `Incline detected: ${angleDeg} degrees uphill.` };
        }

        return { angleDeg, label: 'downhill', voice: `Incline detected: ${Math.abs(angleDeg)} degrees downhill.` };
    };

    const startDetection = () => {
        clearPending();
        setStatus('ready');
        setReading(null);
        setLog([]);
        logIdRef.current = 0;
        appendLog('voice', 'Terrain detection active.');
    };

    const stopDetection = () => {
        clearPending();
        setStatus('idle');
        setReading(null);
        appendLog('voice', 'Terrain detection stopped.');
    };

    const nextReading = () => {
        if (status !== 'ready') return;
        if (busyRef.current) return;
        busyRef.current = true;
        clearPending({ resetBusy: false });
        setStatus('reading');
        appendLog('system', 'Requesting next incline reading.');

        timeoutRef.current = window.setTimeout(() => {
            const next = generateInclineReading();
            setReading(next);
            appendLog('sensor', `Pitch estimate: ${next.angleDeg}°.`);
            appendLog('voice', next.voice);
            setStatus('ready');
            timeoutRef.current = null;
            busyRef.current = false;
        }, 700);
    };

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
                <Mountain size={40} style={{ color: '#0ea5e9' }} />
                Terrain & Surface Detection
            </h1>

            <div style={{ ...cardStyle, marginTop: '20px', borderLeft: '4px solid #1e213a' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a', margin: '0 0 10px 0' }}>
                    Task Flow
                </h2>
                <ul style={{ color: '#374151', fontSize: '15px', lineHeight: '1.8', margin: 0, paddingLeft: '18px' }}>
                    <li>Activate terrain scan.</li>
                    <li>System estimates ground incline (pitch angle) in degrees.</li>
                    <li>Voice feedback reports the incline angle (uphill/downhill).</li>
                </ul>
            </div>

            <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                <div style={{ ...cardStyle, padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Simulated outdoor walk</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>
                                Live Terrain Scan
                            </div>
                        </div>
                        <div
                            style={{
                                padding: '6px 10px',
                                borderRadius: '999px',
                                border: '1px solid #e2e8f0',
                                background: status === 'reading' ? '#ecfeff' : '#f8fafc',
                                color: '#334155',
                                fontSize: '12px',
                                fontWeight: '700',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Activity size={14} />
                            {status === 'idle' && 'Idle'}
                            {status === 'ready' && 'Active'}
                            {status === 'reading' && 'Reading'}
                        </div>
                    </div>

                    <div style={{ marginTop: '18px' }} aria-live="assertive">
                        <div
                            style={{
                                background: '#0284c7',
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
                                {status === 'idle' && 'Press Start to begin terrain detection.'}
                                {status === 'reading' && '"Estimating incline…"'}
                                {status === 'ready' && !reading && '"Press Next Reading for the next incline angle."'}
                                {status === 'ready' && reading && `"${reading.voice}"`}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                            {status === 'idle' ? (
                                <button
                                    onClick={startDetection}
                                    style={{
                                        flex: 1,
                                        minWidth: '220px',
                                        backgroundColor: '#0284c7',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '14px 16px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Start Detection
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={nextReading}
                                        disabled={status !== 'ready'}
                                        style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            backgroundColor: status === 'ready' ? '#10b981' : '#94a3b8',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '14px 16px',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            cursor: status === 'ready' ? 'pointer' : 'default',
                                            opacity: status === 'ready' ? 1 : 0.75,
                                        }}
                                    >
                                        Next Reading <ArrowRight size={16} style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
                                    </button>

                                    <button
                                        onClick={stopDetection}
                                        style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            backgroundColor: '#f1f5f9',
                                            color: '#334155',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '10px',
                                            padding: '14px 16px',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Stop
                                    </button>
                                </>
                            )}
                        </div>

                        {status !== 'idle' && reading && (
                            <div style={{ ...cardStyle, background: '#f8fafc', marginTop: '16px' }}>
                                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700' }}>Latest reading</div>
                                <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginTop: '4px' }}>
                                    {reading.label === 'level'
                                        ? '0° (Level)'
                                        : `${Math.abs(reading.angleDeg)}° (${reading.label === 'uphill' ? 'Uphill' : 'Downhill'})`}
                                </div>
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
                                    <span style={{ width: '82px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>
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

export default TerrainDetection;
