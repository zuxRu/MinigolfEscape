import { useState } from 'react';

function IdleScreen({ onScan }) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scan delay
    setTimeout(() => {
      setIsScanning(false);
      onScan();
    }, 800);
  };

  return (
    <div className="screen idle-screen">
      <h1>⛳ START YOUR GAME HERE</h1>
      <p>Scan your wristband below</p>
      
      <div className="rfid-icon">
        📱
      </div>

      <button 
        className="scan-button" 
        onClick={handleScan}
        disabled={isScanning}
      >
        {isScanning ? 'SCANNING...' : 'SCAN WRISTBAND'}
      </button>

      <p style={{ marginTop: '40px', fontSize: '1.1em', color: '#888' }}>
        (Click button to simulate RFID scan)
      </p>
    </div>
  );
}

export default IdleScreen;
