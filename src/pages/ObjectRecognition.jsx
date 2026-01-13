import {useState} from 'react';
import { EyeIcon, CheckCircle2, AlertTriangle, Camera, Loader2, Volume2, RefreshCw } from 'lucide-react';

const ObjectRecognition = () => {
    const [recognitionMode, setRecognitionMode] = useState('objects');
    const [scanStatus, setScanStatus] = useState('idle');

    const handleScan = () => {
        setScanStatus('scanning');

        setTimeout(() => {
            setScanStatus('complete');
        }, 3000);
    };

    const resetScan = () => {
        setScanStatus('idle');
    };
    return(
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <EyeIcon size={40} style={{ marginRight: '10px', color: 'blue' }} />
                Object and Face Recognition
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
                    <p><strong>1. </strong> Activate recognition mode (object or face).</p>
                    <p><strong>2. </strong> System captures & analyzes camera feed.</p>
                    <p><strong>3. </strong> Verbal description of detected items.</p>
                </ul>
            </div>

            <div style={{
                marginTop: '30px',
                padding: '24px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontFamily: "Inter, sans-serif"
            }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b', marginTop: 0 }}>
                    Recognition Mode
                </h3>

                <div style={{
                    display: 'flex',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '8px',
                    padding: '4px',
                }}>
                    <button
                        onClick={() => setRecognitionMode('objects')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: recognitionMode === 'objects' ? '#6366f1' : 'transparent', /* Purple when active */
                            color: recognitionMode === 'objects' ? 'white' : '#64748b',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: recognitionMode === 'objects' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >
                        Objects
                    </button>

                    <button
                        onClick={() => setRecognitionMode('faces')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            borderRadius: '6px',
                            backgroundColor: recognitionMode === 'faces' ? '#6366f1' : 'transparent',
                            color: recognitionMode === 'faces' ? 'white' : '#64748b',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: recognitionMode === 'faces' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >
                        Faces
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                {scanStatus !== 'complete' ? (
                    <div style={{
                        padding: '30px',
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                        fontFamily: "Inter, sans-serif"
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: '#e0e7ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px auto',
                            color: '#6366f1'
                        }}>
                            {scanStatus === 'scanning' ? (
                                <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <Camera size={32} />
                            )}
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </div>

                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1e293b' }}>
                            {scanStatus === 'scanning' ? 'Scanning Environment...' : 'Ready to Scan'}
                        </h2>
                        <p style={{ color: '#64748b', margin: '0 0 24px 0', fontSize: '14px' }}>
                            {scanStatus === 'scanning' ? 'Analyzing visual data...' : 'Point camera at objects'}
                        </p>

                        <div style={{
                            backgroundColor: '#0f172a',
                            height: '200px',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid #334155',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#334155' }}></div>
                            <div style={{ position: 'absolute', height: '100%', width: '1px', backgroundColor: '#334155' }}></div>

                            <Camera size={48} color="#475569" />

                            {scanStatus === 'scanning' && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    animation: 'pulse 1.5s infinite'
                                }}></div>
                            )}
                            <style>{`@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }`}</style>
                        </div>

                        <button
                            onClick={handleScan}
                            disabled={scanStatus === 'scanning'}
                            style={{
                                width: '100%',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '14px',
                                fontSize: '16px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                cursor: scanStatus === 'scanning' ? 'not-allowed' : 'pointer',
                                opacity: scanStatus === 'scanning' ? 0.7 : 1,
                                marginBottom: '20px',
                                boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
                            }}
                        >
                            {scanStatus === 'scanning' ? 'Processing...' : 'Start Recognition'}
                        </button>

                        <div style={{
                            backgroundColor: '#eff6ff',
                            border: '1px solid #dbeafe',
                            borderRadius: '8px',
                            padding: '12px',
                            color: '#1e40af',
                            fontSize: '14px'
                        }}>
                            <strong>Voice Command:</strong> "What do you see?" or "Who is this?"
                        </div>
                    </div>
                ) : (

                    <div style={{ fontFamily: "Inter, sans-serif" }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                                Detected {recognitionMode === 'objects' ? 'Objects' : 'Faces'}
                            </h3>
                            <button
                                onClick={resetScan}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    border: 'none', background: 'transparent', color: '#6366f1',
                                    cursor: 'pointer', fontWeight: '600'
                                }}
                            >
                                <RefreshCw size={16} /> Rescan
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>
                                        {recognitionMode === 'objects' ? 'Coffee mug' : 'Unknown Person'}
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>94%</span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>
                                    {recognitionMode === 'objects' ? 'White ceramic mug on table' : 'Male, approx 30 years old'}
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '94%', height: '100%', backgroundColor: '#6366f1', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>
                                        {recognitionMode === 'objects' ? 'Laptop' : 'Smiling Face'}
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>98%</span>
                                </div>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>
                                    {recognitionMode === 'objects' ? 'Silver laptop computer, open' : 'Expression indicates happiness'}
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '98%', height: '100%', backgroundColor: '#6366f1', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                        </div>

                        <div style={{
                            marginTop: '30px',
                            background: '#eff6ff',
                            border: '1px solid #dbeafe',
                            borderLeft: '4px solid #3b82f6',
                            borderRadius: '8px',
                            padding: '20px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#1e40af', fontWeight: 'bold' }}>
                                <Volume2 size={20} />
                                Voice Feedback
                            </div>
                            <p style={{ margin: 0, color: '#334155', fontStyle: 'italic', lineHeight: '1.5' }}>
                                "I can see a coffee mug with 94% confidence and a laptop computer."
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ObjectRecognition;