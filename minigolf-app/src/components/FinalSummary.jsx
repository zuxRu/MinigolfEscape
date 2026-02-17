import { useState } from 'react';
import { getGameMode } from '../gameModes';

function FinalSummary({ gameData, onContinue }) {
  const [groupName, setGroupName] = useState('');

  const gameMode = getGameMode(gameData.game_mode);

  const calculateFinalScores = () => {
    return gameData.players.map(player => {
      const scores = gameData.scores[player.id] || [];
      const penalties = gameData.penalties[player.id] || [];
      
      const total = scores.reduce((sum, score, idx) => {
        return sum + score + (penalties[idx] || 0);
      }, 0);
      
      return { ...player, total, scores, penalties };
    }).sort((a, b) => a.total - b.total);
  };

  const finalRankings = calculateFinalScores();

  const handleContinue = () => {
    onContinue(groupName.trim() || 'Unnamed Group');
  };

  return (
    <div className="screen final-summary">
      <h1>🎉 GAME COMPLETE! 🎉</h1>

      <div className="final-rankings">
        {finalRankings.map((player, idx) => {
          let rankClass = '';
          let medal = '';
          
          if (idx === 0) {
            rankClass = 'first';
            medal = '🥇';
          } else if (idx === 1) {
            rankClass = 'second';
            medal = '🥈';
          } else if (idx === 2) {
            rankClass = 'third';
            medal = '🥉';
          }

          return (
            <div key={player.id} className={`ranking-item ${rankClass}`}>
              <span className="medal">{medal}</span>
              <span style={{ flex: 1 }}>{player.name}</span>
              <span style={{ fontWeight: 'bold' }}>{player.total} strokes</span>
            </div>
          );
        })}
      </div>

      <div className="text-center mb-3">
        <p style={{ fontSize: '1.2em', color: '#666' }}>
          Game Mode: {gameMode.icon} {gameMode.name}
        </p>
        <p style={{ fontSize: '1.1em', color: '#888' }}>
          Course: {gameData.course}
        </p>
      </div>

      <div className="group-name-input">
        <h3>Give your team a name!</h3>
        <p style={{ color: '#888', marginBottom: '15px' }}>(Optional)</p>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="e.g., The Chaos Crew"
          maxLength={50}
        />
      </div>

      <div className="button-container">
        <button className="btn btn-primary" onClick={handleContinue}>
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default FinalSummary;
