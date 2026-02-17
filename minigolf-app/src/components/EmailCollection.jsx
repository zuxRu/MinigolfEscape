import { useState } from 'react';

function EmailCollection({ gameData, onSubmit, onSkip }) {
  const [emails, setEmails] = useState(() => {
    const initial = {};
    gameData.players.forEach(player => {
      initial[player.id] = '';
    });
    return initial;
  });

  const handleEmailChange = (playerId, value) => {
    setEmails(prev => ({
      ...prev,
      [playerId]: value
    }));
  };

  const handleSubmit = () => {
    const validEmails = Object.entries(emails)
      .filter(([_, email]) => email.trim() !== '' && email.includes('@'))
      .map(([playerId, email]) => ({
        playerId: parseInt(playerId),
        email: email.trim()
      }));

    if (validEmails.length === 0) {
      if (window.confirm('No valid emails entered. Skip sending scorecard?')) {
        onSkip();
      }
      return;
    }

    onSubmit(validEmails);
  };

  const handleSkip = () => {
    if (window.confirm('Are you sure you want to skip sending the scorecard?')) {
      onSkip();
    }
  };

  return (
    <div className="screen email-collection">
      <h2>Would you like your scorecard emailed to you?</h2>

      <div className="email-inputs">
        {gameData.players.map(player => (
          <div key={player.id} className="email-input">
            <label>{player.name}'s email:</label>
            <input
              type="email"
              value={emails[player.id]}
              onChange={(e) => handleEmailChange(player.id, e.target.value)}
              placeholder="name@example.com"
            />
          </div>
        ))}
      </div>

      <p className="text-center" style={{ color: '#888', margin: '20px 0' }}>
        We'll send you a detailed scorecard with your final results!
      </p>

      <div className="button-container">
        <button className="btn btn-secondary" onClick={handleSkip}>
          SKIP
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          SEND SCORECARD
        </button>
      </div>
    </div>
  );
}

export default EmailCollection;
