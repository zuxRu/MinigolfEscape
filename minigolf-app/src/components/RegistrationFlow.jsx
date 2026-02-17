import { useState } from 'react';

function RegistrationFlow({ onComplete }) {
  const [players, setPlayers] = useState(['', '', '', '', '', '']);

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleSubmit = () => {
    const activePlayers = players
      .map((name, idx) => ({ id: idx + 1, name: name.trim() }))
      .filter(p => p.name !== '');

    if (activePlayers.length === 0) {
      alert('Please enter at least one player name');
      return;
    }

    // Create initial game data structure
    const gameData = {
      session_id: `TGE-${Date.now()}`,
      timestamp: Date.now(),
      game_mode: null, // Will be set in mode selection
      players: activePlayers,
      scores: {},
      penalties: {},
      holes_completed: [],
      course: 'A'
    };

    // Initialize score arrays for each player
    activePlayers.forEach(player => {
      gameData.scores[player.id] = Array(9).fill(0);
      gameData.penalties[player.id] = Array(9).fill(0);
    });

    onComplete(gameData);
  };

  const activePlayerCount = players.filter(p => p.trim() !== '').length;

  return (
    <div className="screen registration-screen">
      <h2>Enter Player Names (1-6 players)</h2>
      
      <div className="player-inputs">
        {players.map((name, idx) => (
          <div key={idx} className="player-input">
            <label>Player {idx + 1}:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handlePlayerChange(idx, e.target.value)}
              placeholder="Enter name"
              maxLength={20}
            />
          </div>
        ))}
      </div>

      <div className="text-center" style={{ marginTop: '20px', color: '#666' }}>
        {activePlayerCount} player{activePlayerCount !== 1 ? 's' : ''} added
      </div>

      <div className="button-container">
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={activePlayerCount === 0}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}

export default RegistrationFlow;
