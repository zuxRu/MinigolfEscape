import { useState } from 'react';
import { getGameMode, getPromptForHole } from '../gameModes';

function PromptDisplay({ gameData, holeNumber, onStartScoring }) {
  const [spinResult, setSpinResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const gameMode = getGameMode(gameData.game_mode);
  const prompt = getPromptForHole(gameData.game_mode, holeNumber);

  const handleSpin = () => {
    if (prompt.type === 'spinner' && prompt.options) {
      setIsSpinning(true);
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prompt.options.length);
        setSpinResult(prompt.options[randomIndex]);
        setIsSpinning(false);
      }, 2000);
    }
  };

  const calculateCurrentScores = () => {
    return gameData.players.map(player => {
      const playerScores = gameData.scores[player.id] || [];
      const playerPenalties = gameData.penalties[player.id] || [];
      const total = playerScores.reduce((sum, score, idx) => {
        return sum + score + (playerPenalties[idx] || 0);
      }, 0);
      return { ...player, total };
    }).sort((a, b) => a.total - b.total);
  };

  const currentStandings = calculateCurrentScores();

  return (
    <div className="screen prompt-display">
      <div className="prompt-header">
        <h2>HOLE {holeNumber}</h2>
        <div className="game-mode-badge">
          {gameMode.icon} {gameMode.name}
        </div>
      </div>

      <div className="prompt-content">
        <div className="prompt-type">{prompt.type}</div>
        
        {prompt.type === 'spinner' ? (
          <>
            <div className="prompt-text">{prompt.text}</div>
            {!spinResult ? (
              <>
                <div className={`spinner-wheel ${isSpinning ? 'spinning' : ''}`}>
                  {isSpinning ? '🌀' : 'TAP TO SPIN'}
                </div>
                <button 
                  className="spin-button"
                  onClick={handleSpin}
                  disabled={isSpinning}
                >
                  {isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}
                </button>
              </>
            ) : (
              <>
                <div className="prompt-icon">🎯</div>
                <div className="prompt-text" style={{ color: '#667eea' }}>
                  {spinResult}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {prompt.icon && <div className="prompt-icon">{prompt.icon}</div>}
            <div className="prompt-text">{prompt.text}</div>
            {prompt.note && (
              <div style={{ fontSize: '1.1em', color: '#999', marginTop: '10px' }}>
                {prompt.note}
              </div>
            )}
            {prompt.reward && (
              <div style={{ fontSize: '1.1em', color: '#4CAF50', marginTop: '10px' }}>
                ⭐ {prompt.reward}
              </div>
            )}
            {prompt.bonus && (
              <div style={{ fontSize: '1.1em', color: '#FF9800', marginTop: '10px' }}>
                🎁 {prompt.bonus}
              </div>
            )}
            {prompt.penalty && prompt.penalty > 0 && (
              <div style={{ fontSize: '1.1em', color: '#f44336', marginTop: '10px' }}>
                ⚠️ +{prompt.penalty} penalty stroke{prompt.penalty > 1 ? 's' : ''} if failed
              </div>
            )}
          </>
        )}
      </div>

      <div className="scorecard">
        <h3>Current Standings</h3>
        <table className="scorecard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {currentStandings.map((player, idx) => (
              <tr key={player.id}>
                <td className="player-rank">{idx + 1}</td>
                <td>{player.name}</td>
                <td className="total-score">{player.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button className="btn btn-primary" onClick={onStartScoring}>
          ENTER SCORES
        </button>
      </div>

      <p className="text-center" style={{ marginTop: '20px', color: '#888' }}>
        Complete the hole, then scan your wristband again to enter scores
      </p>
    </div>
  );
}

export default PromptDisplay;
