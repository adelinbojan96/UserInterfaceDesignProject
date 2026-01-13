import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "./MainLayout.jsx";
import Overview from "./pages/Overview.jsx";
import ObstacleDetection from "./pages/ObstacleDetection.jsx";
import GestureCommands from "./pages/GestureCommands.jsx";
import EmergencyAlert from "./pages/EmergencyAlert.jsx";
import ObjectRecognition from "./pages/ObjectRecognition.jsx";
import VoiceNavigation from "./pages/VoiceNavigation.jsx";
import IndoorMapping from "./pages/IndoorMapping.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/overview" replace />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="obstacle-detection" element={<ObstacleDetection />} />
                    <Route path="gesture-commands" element={<GestureCommands />} />
                    <Route path="indoor-mapping" element={<div>Indoor Mapping Page</div>} />
                    <Route path="emergency-alert" element={<EmergencyAlert/>} />
                    <Route path="object-recognition" element={<ObjectRecognition />} />
                    <Route path="path-smoothing" element={<div>Path Smoothing Page</div>} />
                    <Route path="voice-navigation" element={<VoiceNavigation />} />
                    <Route path="indoor-mapping" element={<IndoorMapping />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;