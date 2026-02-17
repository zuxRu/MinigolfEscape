import { useState } from 'react';

function ScoringScreen({ gameData, holeNumber, onSubmit, onCancel }) {
  const [scores, setScores] = useState(() => {
    const initial = {};
    gameData.players.forEach(player => {
      initial[player.id] = gameData.scores[player.id][holeNumber - 1] || 0;
    });
    return initial;
  });

  const [penalties, setPenalties] = useState(() => {
    const initial = {};
    gameData.players.forEach(player => {
      initial[player.id] = gameData.penalties[player.id][holeNumber - 1] || 0;
    });
    return initial;
  });

  const handleScoreChange = (playerId, delta) => {
    setScores(prev => ({
      ...prev,
      [playerId]: Math.max(0, Math.min(20, prev[playerId] + delta))
    }));
  };

  const handlePenaltyChange = (playerId, delta) => {
    setPenalties(prev => ({
      ...prev,
      [playerId]: Math.max(0, Math.min(10, prev[playerId] + delta))
    }));
  };

  const handleSubmit = () => {
    // Validate all players have scores >= 1
    const allValid = gameData.players.every(player => scores[player.id] >= 1);
    
    if (!allValid) {
      alert('All players must have at least 1 stroke');
      return;
    }

    // Update scores in game data structure
    const updatedScores = { ...gameData.scores };
    const updatedPenalties = { ...gameData.penalties };
    
    gameData.players.forEach(player => {
      updatedScores[player.id][holeNumber - 1] = scores[player.id];
      updatedPenalties[player.id][holeNumber - 1] = penalties[player.id];
    });

    onSubmit(updatedScores, updatedPenalties);
  };

  const allScoresValid = gameData.players.every(player => scores[player.id] >= 1);

  return (
    <div className="screen scoring-screen">
      <h2>ENTER SCORES - HOLE {holeNumber}</h2>

      <div className="score-inputs">
        {gameData.players.map(player => (
          <div key={player.id} className="score-input">
            <div className="player-name">{player.name}</div>
            
            <div className="score-controls">
              <button
                className="score-btn"
                onClick={() => handleScoreChange(player.id, -1)}
                disabled={scores[player.id] === 0}
              >
                −
              </button>
              
              <div className="score-value">{scores[player.id]}</div>
              
              <button
                className="score-btn"
                onClick={() => handleScoreChange(player.id, 1)}
                disabled={scores[player.id] >= 20}
              >
                +
              </button>
            </div>

            <div className="penalty-section">
              <span className="penalty-label">Penalty:</span>
              <button
                className="penalty-btn"
                onClick={() => handlePenaltyChange(player.id, -1)}
                disabled={penalties[player.id] === 0}
              >
                −
              </button>
              
              <div className="penalty-value">{penalties[player.id]}</div>
              
              <button
                className="penalty-btn"
                onClick={() => handlePenaltyChange(player.id, 1)}
                disabled={penalties[player.id] >= 10}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {!allScoresValid && (
        <div className="validation-message">
          ⚠️ All players must have at least 1 stroke
        </div>
      )}

      <div className="button-container">
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={!allScoresValid}
        >
          FINISH HOLE
        </button>
      </div>
    </div>
  );
}

export default ScoringScreen;
