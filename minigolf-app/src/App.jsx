import { useState, useEffect } from 'react';
import IdleScreen from './components/IdleScreen';
import RegistrationFlow from './components/RegistrationFlow';
import GameModeSelector from './components/GameModeSelector';
import PromptDisplay from './components/PromptDisplay';
import ScoringScreen from './components/ScoringScreen';
import FinalSummary from './components/FinalSummary';
import EmailCollection from './components/EmailCollection';
import ConfirmationScreen from './components/ConfirmationScreen';

// Configuration - This would normally come from environment variables
const CONFIG = {
  holeNumber: 9, // Change this to test different holes (1-9)
  course: 'A',
  isRegistrationHole: false, // Set to true for hole 1
  isFinalHole: true, // Set to true for hole 9
};

function App() {
  const [screen, setScreen] = useState('idle'); // idle, registration, modeSelection, prompt, scoring, final, email, confirmation
  const [gameData, setGameData] = useState(null);
  const [adminTapCount, setAdminTapCount] = useState(0);
  const [countdown, setCountdown] = useState(null);

  // Simulate RFID scan (in production, this would come from RFID reader)
  const handleRFIDScan = () => {
    if (CONFIG.isRegistrationHole) {
      // If hole 1, start registration
      setScreen('registration');
    } else {
      // If any other hole, read game data and show prompt
      // For demo, we'll create sample data
      const sampleData = {
        session_id: 'DEMO-123',
        timestamp: Date.now(),
        game_mode: 'chaos',
        players: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Charlie' }
        ],
        scores: {
          1: [3, 4, 2, 0, 0, 0, 0, 0, 0],
          2: [4, 5, 3, 0, 0, 0, 0, 0, 0],
          3: [2, 3, 4, 0, 0, 0, 0, 0, 0]
        },
        penalties: {
          1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          2: [0, 1, 0, 0, 0, 0, 0, 0, 0],
          3: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        holes_completed: [1, 2, 3],
        course: 'A'
      };
      setGameData(sampleData);
      setScreen('prompt');
    }
  };

  // Handle registration completion
  const handleRegistrationComplete = (data) => {
    setGameData(data);
    setScreen('modeSelection');
  };

  // Handle game mode selection
  const handleModeSelected = (modeId) => {
    setGameData(prev => ({
      ...prev,
      game_mode: modeId
    }));
    
    // Simulate writing to RFID
    setTimeout(() => {
      setScreen('confirmation');
      startCountdown(5, () => setScreen('idle'));
    }, 1000);
  };

  // Handle viewing scorecard from prompt screen
  const handleStartScoring = () => {
    setScreen('scoring');
  };

  // Handle score submission
  const handleScoresSubmitted = (scores, penalties) => {
    const updatedGameData = {
      ...gameData,
      scores,
      penalties,
      holes_completed: [...gameData.holes_completed, CONFIG.holeNumber]
    };
    
    setGameData(updatedGameData);
    
    // Check if this is the final hole
    if (CONFIG.isFinalHole || updatedGameData.holes_completed.length === 9) {
      setScreen('final');
    } else {
      setScreen('confirmation');
      startCountdown(7, () => setScreen('idle'));
    }
  };

  // Handle final summary completion
  const handleFinalContinue = (groupName) => {
    setGameData(prev => ({
      ...prev,
      group_name: groupName
    }));
    setScreen('email');
  };

  // Handle email submission
  const handleEmailsSubmitted = (emails) => {
    // In production, this would send emails via API
    console.log('Sending emails to:', emails);
    setScreen('confirmation');
    startCountdown(10, () => {
      setScreen('idle');
      setGameData(null);
    });
  };

  // Handle email skip
  const handleEmailSkip = () => {
    setScreen('confirmation');
    startCountdown(5, () => {
      setScreen('idle');
      setGameData(null);
    });
  };

  // Countdown timer for auto-return to idle
  const startCountdown = (seconds, callback) => {
    setCountdown(seconds);
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          callback();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle cancel button
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel and return to start?')) {
      setScreen('idle');
      setGameData(null);
      setCountdown(null);
    }
  };

  // Admin corner tap detection
  const handleAdminCornerClick = () => {
    setAdminTapCount(prev => prev + 1);
    
    // Reset counter after 2 seconds
    setTimeout(() => setAdminTapCount(0), 2000);
    
    // If tapped 6 times, show admin panel
    if (adminTapCount === 5) {
      alert('Admin panel would open here (not implemented in demo)');
      setAdminTapCount(0);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app-header">
        <h1>⛳ THE GREAT ESCAPE</h1>
        <div className="hole-info">
          Course {CONFIG.course} - Hole {CONFIG.holeNumber}
        </div>
      </div>

      {/* Main Content */}
      <div className="app-content">
        {screen === 'idle' && (
          <IdleScreen onScan={handleRFIDScan} />
        )}

        {screen === 'registration' && (
          <RegistrationFlow onComplete={handleRegistrationComplete} />
        )}

        {screen === 'modeSelection' && (
          <GameModeSelector
            onModeSelected={handleModeSelected}
            players={gameData?.players || []}
          />
        )}

        {screen === 'prompt' && (
          <PromptDisplay
            gameData={gameData}
            holeNumber={CONFIG.holeNumber}
            onStartScoring={handleStartScoring}
          />
        )}

        {screen === 'scoring' && (
          <ScoringScreen
            gameData={gameData}
            holeNumber={CONFIG.holeNumber}
            onSubmit={handleScoresSubmitted}
            onCancel={() => setScreen('prompt')}
          />
        )}

        {screen === 'final' && (
          <FinalSummary
            gameData={gameData}
            onContinue={handleFinalContinue}
          />
        )}

        {screen === 'email' && (
          <EmailCollection
            gameData={gameData}
            onSubmit={handleEmailsSubmitted}
            onSkip={handleEmailSkip}
          />
        )}

        {screen === 'confirmation' && (
          <ConfirmationScreen
            gameData={gameData}
            countdown={countdown}
            message={
              screen === 'confirmation' && gameData?.group_name
                ? 'Scorecard sent!'
                : gameData?.game_mode
                ? 'Setup complete! Proceed to the next hole.'
                : 'Scores updated!'
            }
          />
        )}
      </div>

      {/* Cancel Button (shown during active sessions) */}
      {screen !== 'idle' && screen !== 'confirmation' && (
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      )}

      {/* Admin Corner (for staff access - 6 taps) */}
      <div className="admin-corner" onClick={handleAdminCornerClick} />
    </div>
  );
}

export default App;
