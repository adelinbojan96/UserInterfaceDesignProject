import { useState } from 'react';
import {Hand, Loader2, CheckCircle2, ShieldPlus} from 'lucide-react';
const GestureCommands = () => {

    const [simulationStatus, setSimulationStatus] = useState('idle');
    const [message, setMessage] = useState('Click buttons above to simulate gestures');

    const handleSimulation = (gestureName) => {
        setSimulationStatus('loading');
        setMessage(`Simulating ${gestureName}...`);

        setTimeout(() => {
            setSimulationStatus('success');
            setMessage(`${gestureName} Detected Successfully!`);

            setTimeout(() => {
                setSimulationStatus('idle');
                setMessage('Click buttons above to simulate gestures');
            }, 2000);
        }, 2000);
    };

    return(
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <Hand size={40} style={{ marginRight: '10px', color: 'orange' }} />
                Gesture and Tap commands
            </h1>
                <div style = {{
                    marginTop: '30px',
                    padding: '20px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontFamily: "Arial",
                }}>
                    <h style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                        Task Flow:</h>
                    <ul style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6', listStyle: 'none' }}>
                        <p><strong>1. </strong> Perform gesture on wearable device.</p>
                        <p><strong>2. </strong> Receive haptic confirmation feedback.</p>
                        <p><strong>3. </strong> Audio confirmation of action triggered.</p>
                    </ul>
                </div>
            <div style = {{marginTop: '20px'}}>

                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '20px',
                    backgroundColor: 'white',
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>

                        <h style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: ' 40px', color: '#1f2937' }}>
                            Double-Tap
                        </h>
                    </div>

                    <p style={{ color: '#F65F17', fontSize: '14px', fontWeight: '600', margin: '5px 0 0 42px' }}>
                        Activate Command Mode
                    </p>

                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 20px 42px' }}>
                        Quick access to voice commands
                    </p>
                    <button
                        onClick={() => handleSimulation('Double-Tap')}
                        disabled={simulationStatus === 'loading'}
                        style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#FFF7ED',
                        color: '#c2410c',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}>
                        Try Gesture
                    </button>
                </div>

                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    marginTop: '15px',
                    padding: '20px',
                    backgroundColor: 'white',
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>

                        <h style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: ' 40px', color: '#1f2937' }}>
                            Triple-Tap
                        </h>
                    </div>

                    <p style={{ color: '#F65F17', fontSize: '14px', fontWeight: '600', margin: '5px 0 0 42px' }}>
                        Enable Voice Interaction
                    </p>

                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 20px 42px' }}>
                        Start voice assistant
                    </p>
                    <button
                        onClick={() => handleSimulation('Triple-Tap')}
                        disabled={simulationStatus === 'loading'}
                        style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#FFF7ED',
                        color: '#c2410c',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}>
                        Try Gesture
                    </button>
                </div>
                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    marginTop: '15px',
                    padding: '20px',
                    backgroundColor: 'white',
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>

                        <h style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: ' 40px', color: '#1f2937' }}>
                            Long Press
                        </h>
                    </div>

                    <p style={{ color: '#F65F17', fontSize: '14px', fontWeight: '600', margin: '5px 0 0 42px' }}>
                        Trigger SOS Alert
                    </p>

                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 20px 42px' }}>
                        Emergency assistance (3 seconds)
                    </p>
                    <button
                        onClick={() => handleSimulation('Long Press')}
                        disabled={simulationStatus === 'loading'}
                        style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#FFF7ED',
                        color: '#c2410c',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}>
                        Try Gesture
                    </button>
                </div>
                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    marginTop: '15px',
                    padding: '20px',
                    backgroundColor: 'white',
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>

                        <h style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: ' 40px', color: '#1f2937' }}>
                            Swipe Up
                        </h>
                    </div>

                    <p style={{ color: '#F65F17', fontSize: '14px', fontWeight: '600', margin: '5px 0 0 42px' }}>
                        Increase Volume
                    </p>

                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 20px 42px' }}>
                        Raise audio feedback level
                    </p>
                    <button
                        onClick={() => handleSimulation('Swipe Up')}
                        disabled={simulationStatus === 'loading'}
                        style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#FFF7ED',
                        color: '#c2410c',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}>
                        Try Gesture
                    </button>
                </div>

                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    marginTop: '15px',
                    padding: '20px',
                    backgroundColor: 'white',
                }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>

                        <h style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: ' 40px', color: '#1f2937' }}>
                            Swipe Down
                        </h>
                    </div>

                    <p style={{ color: '#F65F17', fontSize: '14px', fontWeight: '600', margin: '5px 0 0 42px' }}>
                        Decrease Volume
                    </p>

                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 20px 42px' }}>
                        Decrease audio feedback level
                    </p>
                    <button
                        onClick={() => handleSimulation('Swipe Down')}
                        disabled={simulationStatus === 'loading'}
                        style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#FFF7ED',
                        color: '#c2410c',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}>
                        Try Gesture
                    </button>
                </div>
            </div>

            <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontFamily: "Arial"
            }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Supported Gestures:</h2>
                <ul style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6' }}>
                    <li><strong>Double Tap: </strong> Activate Command Mode.</li>
                    <li><strong>Triple Tap: </strong> Enable Voice Interaction.</li>
                    <li><strong>Long Press: </strong> Trigger SOS Alert.</li>
                    <li><strong>Swipe Up: </strong> Increase Volume.</li>
                    <li><strong>Swipe Down: </strong> Decrease Volume.</li>
                </ul>
            </div>

            <div style={{
                marginTop: '20px',
                padding: '24px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontFamily: "Inter, sans-serif"
            }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
                    Haptic Patterns
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ color: '#475569', fontWeight: '500' }}>Command Mode</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: '8px', height: '24px', backgroundColor: '#f97316', borderRadius: '4px' }}></div>
                            <div style={{ width: '8px', height: '24px', backgroundColor: '#f97316', borderRadius: '4px' }}></div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ color: '#475569', fontWeight: '500' }}>Voice Mode</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: '8px', height: '24px', backgroundColor: '#f97316', borderRadius: '4px' }}></div>
                            <div style={{ width: '8px', height: '24px', backgroundColor: '#f97316', borderRadius: '4px' }}></div>
                            <div style={{ width: '8px', height: '24px', backgroundColor: '#f97316', borderRadius: '4px' }}></div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ color: '#475569', fontWeight: '500' }}>Emergency Alert</span>
                        <div style={{ width: '10px', height: '24px', backgroundColor: '#ef4444', borderRadius: '4px' }}></div>
                    </div>

                </div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', backgroundColor: 'white' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#1e293b' }}>
                    Interactive Practice Area
                </h3>

                <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #cbd5e1'
                }}>
                    {simulationStatus === 'idle' && (
                        <div style={{ width: '64px', height: '64px', backgroundColor: '#ffedd5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <Hand size={32} color="#ea580c" />
                        </div>
                    )}

                    {simulationStatus === 'loading' && (
                        <div style={{ marginBottom: '16px' }}>
                            <Loader2 size={48} color="#ea580c" style={{ animation: 'spin 1s linear infinite' }} />
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    {simulationStatus === 'success' && (
                        <div style={{ width: '64px', height: '64px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <CheckCircle2 size={32} color="#16a34a" />
                        </div>
                    )}
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                        {message}
                    </p>

                </div>
            </div>
        </div>
    );
}
export default GestureCommands;