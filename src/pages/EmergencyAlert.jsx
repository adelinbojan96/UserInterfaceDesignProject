import {useState} from 'react';
import {ShieldPlus, Phone,Shield, Loader2, CheckCircle2, AlertTriangle} from 'lucide-react';

const EmergencyAlerts = () => {
    const [sosStatus, setSosStatus] = useState('idle');

    const handleSOS = () => {
        setSosStatus('loading');
        setTimeout(() => {
            setSosStatus('success');
            setTimeout(() => setSosStatus('idle'), 3000);
        }, 2000);
    };

    return(
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <ShieldPlus size={40} style={{ marginRight: '10px', color: '#ef4444' }} />
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
                    <p><strong>1. </strong> Long press device (3 seconds) to trigger alert.</p>
                    <p><strong>2. </strong> GPS coordinates sent to emergency contacts.</p>
                    <p><strong>3. </strong> System confirms alert via voice feedback.</p>
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
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b', marginTop: 0 }}>
                    Emergency Contacts
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Phone size={18} color="#64748b" />
                            <div>
                                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '15px' }}>Mihai Petrescu</div>
                                <div style={{ color: '#64748b', fontSize: '13px' }}>+40 745 659 231</div>
                            </div>
                        </div>
                        <span style={{
                            backgroundColor: '#dcfce7',
                            color: '#16a34a',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>Primary</span>
                    </div>

                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Phone size={18} color="#64748b" />
                            <div>
                                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '15px' }}>Ioan Popescu</div>
                                <div style={{ color: '#64748b', fontSize: '13px' }}>+40 765 453 294</div>
                            </div>
                        </div>
                        <span style={{
                            backgroundColor: '#e0e7ff',
                            color: '#4338ca',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>Secondary</span>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '30px',
                padding: '40px 24px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontFamily: "Inter, sans-serif",
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: sosStatus === 'success' ? '#dcfce7' : '#fee2e2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    transition: 'background-color 0.3s'
                }}>
                    {sosStatus === 'success' ? (
                        <CheckCircle2 size={32} color="#16a34a" />
                    ) : (
                        <Shield size={32} color="#ef4444" />
                    )}
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1e293b' }}>
                    {sosStatus === 'success' ? 'Emergency Alert Sent!' : 'Emergency System Ready'}
                </h2>
                <p style={{ color: '#64748b', margin: '0 0 24px 0', fontSize: '14px' }}>
                    {sosStatus === 'success' ? 'Help is on the way.' : 'Press to trigger alert'}
                </p>

                <button
                    onClick={handleSOS}
                    disabled={sosStatus !== 'idle'}
                    style={{
                        width: '100%',
                        backgroundColor: sosStatus === 'success' ? '#16a34a' : (sosStatus === 'loading' ? '#991b1b' : '#ef4444'),
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        cursor: sosStatus === 'idle' ? 'pointer' : 'default',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        marginBottom: '20px',
                        transition: 'all 0.3s'
                    }}
                >
                    {sosStatus === 'loading' ? (
                        <>
                            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                            Sending Alert...
                        </>
                    ) : sosStatus === 'success' ? (
                        <>
                            <CheckCircle2 size={20} />
                            SOS Signal Sent
                        </>
                    ) : (
                        <>
                            <AlertTriangle size={20} />
                            Trigger SOS
                        </>
                    )}
                </button>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

                <div style={{
                    backgroundColor: '#fefce8',
                    border: '1px solid #fef9c3',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#854d0e',
                    fontSize: '14px'
                }}>
                    <strong>Gesture:</strong> Hold device button for 3 seconds
                </div>
            </div>

            <div style={{
                padding: '24px',
                background: 'white',
                marginTop: '30px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontFamily: "Inter, sans-serif"
            }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b', marginTop: 0 }}>
                    System Status
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
                        <span>GPS Connection</span>
                        <span style={{ color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div> Active
                        </span>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
                        <span>Network Status</span>
                        <span style={{ color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div> Online
                        </span>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
                        <span>Battery Level</span>
                        <span style={{ color: '#1e293b', fontWeight: '600' }}>87%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EmergencyAlerts;