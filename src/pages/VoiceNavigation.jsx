import React, { useState } from 'react';

const VoiceNavigation = () => {
    // Navigation States: idle, listening, navigating, error
    const [navStatus, setNavStatus] = useState('idle');
    const [stepIndex, setStepIndex] = useState(0);
    const [gpsSignal] = useState(90); // Simulated signal strength

    // Real-life test data: Route to the university cafeteria
    const routeInstructions = [
        "Head north for 50 meters toward the main library.",
        "Turn left in 20 meters at the fountain.",
        "Crosswalk detected. Continue straight for 30 meters.",
        "Destination reached. The University Cafeteria is on your right."
    ];

    const startVoiceCommand = () => {
        setNavStatus('listening');
        // Simulate speech recognition delay
        setTimeout(() => {
            if (gpsSignal < 20) {
                setNavStatus('error'); // Error Situation: Weak GPS 
            } else {
                setNavStatus('navigating');
                setStepIndex(0);
            }
        }, 2000);
    };

    const nextStep = () => {
        if (stepIndex < routeInstructions.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setNavStatus('idle'); // Route completed
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 1. Usage Scenario */}
            <div style={{ marginBottom: '30px', padding: '20px', background: '#fff', borderRadius: '12px', borderLeft: '4px solid #1e213a' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e213a', margin: '0 0 10px 0' }}>Usage Scenario: Campus Navigation</h2>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                    <strong>Context:</strong> Maria needs to reach the university cafeteria for a meeting. <br />
                    <strong>Challenge:</strong> Navigating a busy outdoor campus area where ambient noise might mask audio cues. <br />
                    <strong>Solution:</strong> Hands-free voice commands paired with haptic directional cues from the smart belt.
                </p>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Voice Navigation</h1>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>
                Step-by-step outdoor guidance via GPS and compass modules.
            </p>

            {/* 2. Main Control Area */}
            <div style={{ background: 'white', padding: '40px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', marginBottom: '20px' }}>
                {navStatus === 'idle' && (
                    <button 
                        onClick={startVoiceCommand}
                        style={{
                            padding: '18px 45px', fontSize: '18px', fontWeight: 'bold',
                            backgroundColor: '#1e213a', color: 'white', border: 'none', borderRadius: '10px',
                            cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        Start Voice Command
                    </button>
                )}

                {navStatus === 'listening' && (
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', animation: 'pulse 1.5s infinite' }}>
                        🎙️ Listening...
                    </div>
                )}

                {navStatus === 'navigating' && (
                    <div aria-live="assertive">
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>Destination: University Cafeteria</div>
                        <div style={{ 
                            padding: '25px', background: '#f8fafc', borderRadius: '12px', 
                            border: '2px solid #1e213a', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' 
                        }}>
                            "{routeInstructions[stepIndex]}"
                        </div>
                        <button 
                            onClick={nextStep}
                            style={{
                                padding: '12px 30px', backgroundColor: '#10b981', color: 'white',
                                border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                            }}
                        >
                            Next Direction
                        </button>
                    </div>
                )}
            </div>

            {/* 3. Error State Case  */}
            {navStatus === 'error' && (
                <div style={{ padding: '15px', background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '8px', color: '#b91c1c', fontSize: '14px' }}>
                    <strong>Navigation Error:</strong> Weak GPS signal detected. Attempting Wi-Fi triangulation fallback.
                </div>
            )}

            {/* 4. Accessibility Guide for Presentation */}
            <div style={{ marginTop: '20px', fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                * In actual use, users trigger the next instruction by walking or using a triple-tap gesture.
            </div>
        </div>
    );
};

export default VoiceNavigation;