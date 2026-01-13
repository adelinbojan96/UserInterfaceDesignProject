import {useState} from 'react';
import {ShieldPlus, Phone,Shield, Loader2, CheckCircle2, AlertTriangle} from 'lucide-react';

const ObjectRecognition = () => {
    return(
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <ShieldPlus size={40} style={{ marginRight: '10px', color: '#ef4444' }} />
                Gesture and Tap commands
            </h1>
        </div>
    );
}