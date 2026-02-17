import { useState } from 'react';
import { GAME_MODES } from '../gameModes';

function GameModeSelector({ onModeSelected, players }) {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeClick = (modeId) => {
    setSelectedMode(modeId);
  };

  const handleConfirm = () => {
    if (!selectedMode) {
      alert('Please select a game mode');
      return;
    }
    onModeSelected(selectedMode);
  };

  return (
    <div className="screen mode-selection">
      <h2>Choose Your Game Mode</h2>
      
      <div className="mode-grid">
        {GAME_MODES.map(mode => (
          <button
            key={mode.id}
            className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
            onClick={() => handleModeClick(mode.id)}
          >
            <div className="mode-icon">{mode.icon}</div>
            <div className="mode-name">{mode.name}</div>
            <div className="mode-description">{mode.description}</div>
          </button>
        ))}
      </div>

      <div className="text-center mb-3">
        <p style={{ fontSize: '1.1em', color: '#666' }}>
          Players: {players.map(p => p.name).join(', ')}
        </p>
      </div>

      <div className="button-container">
        <button 
          className="btn btn-primary" 
          onClick={handleConfirm}
          disabled={!selectedMode}
        >
          CONFIRM MODE
        </button>
      </div>
    </div>
  );
}

export default GameModeSelector;
