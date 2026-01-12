import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "./MainLayout.jsx";
import Overview from "./pages/Overview.jsx";
import ObstacleDetection from "./pages/ObstacleDetection.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/overview" replace />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="obstacle-detection" element={<ObstacleDetection />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;