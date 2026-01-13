import React, { useState, useEffect } from 'react';

const IndoorMapping = () => {
    const [status, setStatus] = useState('idle'); // idle, scanning, complete
    const [progress, setProgress] = useState(0);

    const startScan = () => {
        setStatus('scanning');
        setProgress(0);
        console.log("Haptic: Two short pulses. Voice: Room scan initiated. Please rotate slowly 360 degrees.");
    };

    useEffect(() => {
        let interval;
        if (status === 'scanning') {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus('complete');
                        console.log("Voice: Scan complete. Room layout: Door at 12 o'clock, Table at 3 o'clock.");
                        return 100;
                    }
                    return prev + 2; 
                });
            }, 100); 
        }
        return () => clearInterval(interval);
    }, [status]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* 1. Accessibility Instructions */}
            <div style={{ marginBottom: '30px', padding: '20px', background: '#fff', borderRadius: '12px', borderLeft: '4px solid #1e213a', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a', margin: '0 0 10px 0' }}>Module Instructions</h2>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    Use this to map unfamiliar rooms. Press <strong>START</strong> and rotate your body slowly in a full circle. 
                    The LiDAR sensors will "feel" the walls and furniture to build a mental map.
                </p>
            </div>

            {/* 2. Main Action & Animation Area */}
            <div style={{ background: 'white', padding: '40px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', marginBottom: '20px' }}>
                
                {status === 'idle' && (
                    <>
                        <button onClick={startScan} style={{ width: '180px', height: '180px', borderRadius: '50%', backgroundColor: '#1e213a', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(30, 33, 58, 0.2)' }}>
                            START SCAN
                        </button>
                        <p style={{ marginTop: '20px', color: '#64748b', fontWeight: 'bold' }}>SYSTEM READY</p>
                    </>
                )}

                {status === 'scanning' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* --- CSS RADAR SCANNER --- */}
                        <div style={{ position: 'relative', width: '150px', height: '150px', borderRadius: '50%', border: '2px solid #1e213a', overflow: 'hidden', background: '#f8fafc', marginBottom: '20px' }}>
                            <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'conic-gradient(from 0deg, transparent, rgba(30, 33, 58, 0.4))', animation: 'spin 2s linear infinite', top: 0, left: 0 }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', background: '#1e213a', borderRadius: '50%' }} />
                        </div>
                        
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a' }}>Scanning... {progress}%</div>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Rotate slowly 360°</p>
                    </div>
                )}

                {status === 'complete' && (
                    <div>
                        <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '20px' }}>✓ SCAN COMPLETE</div>
                        
                        {/* --- ROOM SKETCH --- */}
                        <div style={{ width: '250px', height: '200px', margin: '0 auto', border: '2px solid #cbd5e1', borderRadius: '8px', position: 'relative', background: '#f1f5f9' }}>
                            {/* Door */}
                            <div style={{ position: 'absolute', top: '-2px', left: '40%', width: '40px', height: '4px', background: '#fff', border: '2px solid #1e213a', borderRadius: '2px' }}></div>
                            <span style={{ position: 'absolute', top: '-20px', left: '42%', fontSize: '10px', color: '#64748b' }}>DOOR</span>

                            {/* Table */}
                            <div style={{ position: 'absolute', top: '30%', right: '20px', width: '60px', height: '40px', background: '#fff', border: '1px solid #1e213a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>TABLE</div>

                            {/* Chair */}
                            <div style={{ position: 'absolute', bottom: '20px', left: '30%', width: '25px', height: '25px', background: '#fff', border: '1px solid #1e213a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>CHAIR</div>

                            {/* User Position */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ef4444', fontSize: '20px' }}>👤</div>
                        </div>

                        <button onClick={() => setStatus('idle')} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', border: '1px solid #1e213a', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>NEW SCAN</button>
                    </div>
                )}
            </div>

            {/* 3. Verbal Summary Results */}
            {status === 'complete' && (
                <div aria-live="polite" style={{ display: 'grid', gap: '10px' }}>
                    <h3 style={{ fontSize: '14px', color: '#1e213a', fontWeight: 'bold' }}>Verbal Summary:</h3>
                    {[
                        "Standard rectangular room.",
                        "Main exit 3 meters ahead.",
                        "Obstacle: Large table to your right.",
                        "Obstacle: Rotating chair 2 meters behind."
                    ].map((text, i) => (
                        <div key={i} style={{ padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px' }}>🔊</span> {text}
                        </div>
                    ))}
                </div>
            )}

            {/* Animation CSS */}
            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default IndoorMapping;