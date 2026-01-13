import React, { useState, useEffect } from 'react';

const ObstacleDetection = () => {
    // State Management
    const [status, setStatus] = useState('idle'); // 'idle', 'active', 'error'
    const [detections, setDetections] = useState([]);
    const [proximity, setProximity] = useState(0);
    const [battery] = useState(98); // you can set it differently to see what happens when you're low on power

    // Real-world Test Data
    const sensorLibrary = [
        { name: "Trash Bin", zone: "Right", type: "Static" },
        { name: "Cleaning Cart", zone: "Center", type: "Hazard" },
        { name: "Pedestrian", zone: "Left", type: "Moving" },
        { name: "Door Frame", zone: "Center", type: "Structural" },
        { name: "Electric Scooter", zone: "Left", type: "Hazard" }
    ];

    const toggleSystem = () => {
        if (status === 'active' || status === 'error') {
            setStatus('idle');
            setDetections([]);
            setProximity(0);
            console.log("Voice: System returned to standby.");
        } else {
            // Check battery before activating
            if (battery >= 15) {
                setStatus('active');
                console.log("Haptic: Short confirmation pulse. Voice: Obstacle detection active.");
            } else {
                setStatus('error');
                console.log("Haptic: Long error vibration. Voice: System Error. Battery too low.");
            }
        }
    };

    useEffect(() => {
        let timer;
        if (status === 'active') {
            timer = setInterval(() => {
                const data = sensorLibrary[Math.floor(Math.random() * sensorLibrary.length)];
                setProximity(data.zone === 'Center' ? 85 : 30);
                const newLog = {
                    id: Date.now(),
                    msg: `${data.name} detected on the ${data.zone}.`,
                    isCritical: data.zone === 'Center'
                };
                setDetections(prev => [newLog, ...prev].slice(0, 3));
            }, 3000);
        }
        return () => clearInterval(timer);
    }, [status]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 1. Module Instructions */}
            <div style={{ 
                marginBottom: '30px', 
                padding: '20px', 
                background: '#fff', 
                borderRadius: '12px', 
                borderLeft: '4px solid #1e213a',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a', margin: '0 0 10px 0' }}>
                    Module Instructions
                </h2>
                <ul style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
                    <li><strong>Toggle:</strong> Use the large central button or a <strong>double-tap</strong> gesture on the smart belt to start/stop scanning.</li>
                    <li><strong>Feedback:</strong> The system provides <strong>spatial audio</strong> (voice) and <strong>haptic pulses</strong> (vibration).</li>
                    <li><strong>Safety:</strong> If the battery is below 15%, the system will enter an Error Mode for safety.</li>
                </ul>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Obstacle Detection</h1>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>
                Real-time spatial awareness using LiDAR and ultrasonic sensor fusion.
            </p>

            {/* 2. Main Action Card */}
            <div style={{ 
                background: 'white', padding: '40px 20px', borderRadius: '12px', 
                border: '1px solid #e2e8f0', textAlign: 'center', marginBottom: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
                <button 
                    onClick={toggleSystem}
                    style={{
                        width: '180px', height: '180px', borderRadius: '50%',
                        backgroundColor: status === 'active' ? '#ef4444' : (status === 'error' ? '#94a3b8' : '#1e213a'),
                        color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                        fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(30, 33, 58, 0.2)',
                        transition: 'all 0.2s'
                    }}
                >
                    {status === 'active' ? 'STOP' : (status === 'error' ? 'RESET' : 'START')}
                </button>
                
                <div style={{ marginTop: '25px', fontSize: '16px', fontWeight: 'bold' }}>
                    Status: 
                    <span style={{ color: status === 'active' ? '#10b981' : (status === 'error' ? '#ef4444' : '#64748b'), marginLeft: '8px' }}>
                        {status === 'idle' && "○ STANDBY"}
                        {status === 'active' && "● SCANNING ACTIVE"}
                        {status === 'error' && "⚠️ SYSTEM ERROR"}
                    </span>
                </div>
            </div>

            {/* --- 3. ERROR MESSAGE UI (Visible when battery is too low) --- */}
            {status === 'error' && (
                <div style={{ 
                    padding: '20px', 
                    background: '#fef2f2', 
                    border: '1px solid #ef4444', 
                    borderRadius: '12px', 
                    color: '#b91c1c', 
                    textAlign: 'center',
                    animation: 'shake 0.5s' 
                }}>
                    <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>🛑</span>
                    <h3 style={{ fontSize: '16px', margin: '0 0 5px 0' }}>Critical Failure: Low Power</h3>
                    <p style={{ fontSize: '14px', margin: 0 }}>
                        Battery level is <strong>{battery}%</strong>. <br />
                        LiDAR sensors require at least 15% to operate safely. <br />
                        Please connect to a charger.
                    </p>
                </div>
            )}

            {/* 4. Live Feedback (Visible during success) */}
            {status === 'active' && (
                <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#1e213a' }}>Proximity Intensity:</h3>
                        <div style={{ height: '12px', width: '100%', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ 
                                height: '100%', width: `${proximity}%`, 
                                background: proximity > 70 ? '#ef4444' : '#10b981',
                                transition: 'width 0.5s ease-in-out'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '10px' }}>
                        <h3 style={{ fontSize: '14px', color: '#1e213a', fontWeight: 'bold' }}>Live Environment Map:</h3>
                        {detections.map(d => (
                            <div key={d.id} style={{ 
                                padding: '12px', background: d.isCritical ? '#fffbeb' : 'white',
                                borderRadius: '8px', border: d.isCritical ? '1px solid #f59e0b' : '1px solid #e2e8f0',
                                fontSize: '14px', display: 'flex', alignItems: 'center'
                            }}>
                                <span style={{ marginRight: '10px', fontSize: '18px' }}>{d.isCritical ? '⚠️' : 'ℹ️'}</span>
                                <span style={{ color: '#1e213a', fontWeight: d.isCritical ? 'bold' : '400' }}>{d.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ObstacleDetection;