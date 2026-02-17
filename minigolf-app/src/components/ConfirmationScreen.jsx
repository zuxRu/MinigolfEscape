function ConfirmationScreen({ gameData, countdown, message }) {
  return (
    <div className="screen confirmation-screen">
      <div className="checkmark">✓</div>
      
      <h2>{message || 'Success!'}</h2>

      {gameData?.players && (
        <div className="mt-3">
          <p><strong>Players:</strong> {gameData.players.map(p => p.name).join(', ')}</p>
          {gameData.game_mode && (
            <p><strong>Game Mode:</strong> {gameData.game_mode}</p>
          )}
          {gameData.group_name && (
            <p><strong>Team Name:</strong> {gameData.group_name}</p>
          )}
        </div>
      )}

      {countdown !== null && (
        <div className="countdown">
          Returning to start screen in {countdown} second{countdown !== 1 ? 's' : ''}...
        </div>
      )}

      <p className="mt-4" style={{ fontSize: '1.2em', color: '#666' }}>
        {gameData?.group_name 
          ? 'Thanks for playing at The Great Escape!' 
          : 'Proceed to your first hole!'}
      </p>
    </div>
  );
}

export default ConfirmationScreen;
