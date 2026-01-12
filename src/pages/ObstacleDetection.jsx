const ObstacleDetection = () => {
    return (
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Obstacle Detection</h1>
            <p style={{ color: '#64748b' }}>
                Real-time spatial awareness using LiDAR & ultrasonic sensors.
            </p>

            <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                Status: <strong>Active</strong>
            </div>
        </div>
    );
};

export default ObstacleDetection;