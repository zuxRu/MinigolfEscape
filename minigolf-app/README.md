# The Great Escape Mini-Golf Scoring System

React-based interactive scoring system for mini-golf with game modes, prompts, and RFID integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📱 Demo Usage

Since RFID integration is not yet implemented, the app uses button clicks to simulate RFID scans.

### Testing Different Hole Configurations

Edit `src/App.jsx` and modify the `CONFIG` object:

```javascript
const CONFIG = {
  holeNumber: 1,           // Change to 1-9 to test different holes
  course: 'A',             // Course A or B
  isRegistrationHole: true, // Set to true for hole 1
  isFinalHole: false,      // Set to true for hole 9
};
```

**Example configurations:**

**Hole 1 (Registration):**
```javascript
{
  holeNumber: 1,
  course: 'A',
  isRegistrationHole: true,
  isFinalHole: false,
}
```

**Hole 5 (Mid-game):**
```javascript
{
  holeNumber: 5,
  course: 'A',
  isRegistrationHole: false,
  isFinalHole: false,
}
```

**Hole 9 (Final with Email):**
```javascript
{
  holeNumber: 9,
  course: 'A',
  isRegistrationHole: false,
  isFinalHole: true,
}
```

## 🎮 User Flows

### Flow 1: Registration (Hole 1)
1. Idle screen → Click "SCAN WRISTBAND"
2. Enter player names (1-6 players)
3. Select game mode
4. Confirmation screen
5. Auto-return to idle

### Flow 2: Playing a Hole (Holes 2-8)
1. Idle screen → Click "SCAN WRISTBAND"
2. View game mode prompt and current standings
3. Complete hole physically
4. Click "ENTER SCORES"
5. Input scores and penalties for each player
6. Click "FINISH HOLE"
7. View updated scorecard
8. Auto-return to idle

### Flow 3: Final Hole (Hole 9)
1. Same as Flow 2 through scoring
2. View final rankings
3. Enter optional group name
4. Enter optional email addresses
5. Send scorecards (simulated)
6. Confirmation screen
7. Auto-return to idle

## 🎯 Game Modes

### Standard Mode ⛳
- Classic mini-golf
- No special rules
- Simple prompts

### Chaos Mode 🌪
- Random challenges via spinner wheel
- Physical challenges (hop on one foot, eyes closed, etc.)
- Bonus/penalty modifiers

### Date Night (PG) 💕
- Discussion questions
- Photo challenges
- Fun dares for couples

### Drinking Mode 🍺
- Drinking game rules (18+ only)
- Never Have I Ever
- Truth or Dare elements

## 📁 Project Structure

```
src/
├── components/
│   ├── IdleScreen.jsx          # Initial scan screen
│   ├── RegistrationFlow.jsx    # Player name entry (Hole 1)
│   ├── GameModeSelector.jsx    # Mode selection (Hole 1)
│   ├── PromptDisplay.jsx       # Game mode prompts
│   ├── ScoringScreen.jsx       # Score entry
│   ├── FinalSummary.jsx        # Final rankings (Hole 9)
│   ├── EmailCollection.jsx     # Email input (Hole 9)
│   └── ConfirmationScreen.jsx  # Success/completion screen
├── App.jsx                      # Main app with state management
├── gameModes.js                 # Game mode definitions
├── index.css                    # All styles
└── main.jsx                     # Entry point
```

## 🎨 Customization

### Adding New Game Modes

Edit `src/gameModes.js`:

```javascript
{
  id: 'new_mode',
  name: 'New Mode Name',
  description: 'Short description',
  icon: '🎯',
  prompts: {
    1: { type: 'challenge', text: 'Your prompt here' },
    // ... add prompts for holes 1-9
  }
}
```

### Prompt Types

- `standard` - Simple text prompt
- `spinner` - Wheel with random options
- `challenge` - Physical challenge with penalty
- `question` - Discussion question
- `dare` - Fun dare/task
- `modifier` - Score multiplier
- `rule` - Game rule for the hole

### Styling

All styles are in `src/index.css`. Key classes:

- `.idle-screen` - Main idle state
- `.mode-card` - Game mode selection cards
- `.prompt-content` - Prompt display area
- `.score-input` - Score entry controls
- `.ranking-item` - Final rankings display

## 🔧 Next Steps for Production

### RFID Integration

Replace the simulated scan buttons with actual RFID reader integration:

1. **Web NFC API** (Chrome/Edge):
```javascript
const reader = new NDEFReader();
await reader.scan();
reader.addEventListener('reading', ({ message }) => {
  // Handle RFID data
});
```

2. **USB Reader** (ACR122U):
- Use backend service (Node.js with PC/SC library)
- Create API endpoints for read/write
- Call from React frontend

3. **Data Structure on RFID**:
```javascript
{
  session_id: "TGE-123",
  players: [...],
  game_mode: "chaos",
  scores: {...},
  penalties: {...},
  holes_completed: [1,2,3]
}
```

### Email Service Integration

Replace console.log in `EmailCollection.jsx` with actual email API:

```javascript
// Using SendGrid
const response = await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({ emails, gameData })
});
```

### Kiosk Mode

For production tablets:

**Android:**
- Use MDM (Intune, Workspace ONE)
- Enable Single App Mode
- Disable home button

**iPad:**
- Enable Guided Access
- Triple-click home to exit (staff only)

**Raspberry Pi:**
- Chromium kiosk mode: `chromium-browser --kiosk --app=http://localhost:3000`

### Admin Panel

The app includes a hidden admin corner (bottom-right, tap 6 times). Implement:

```javascript
// In App.jsx, handleAdminCornerClick function
if (adminTapCount === 5) {
  // Show admin panel
  setScreen('admin');
}
```

Admin features:
- View all active sessions
- Manually edit scores
- Reset RFID bands
- View error logs
- Force system restart

## 📊 Testing Checklist

- [ ] All game modes display correctly
- [ ] Spinner wheel animation works
- [ ] Score validation (min 1 stroke)
- [ ] Penalty buttons work
- [ ] Final rankings calculate correctly
- [ ] Email validation works
- [ ] Auto-countdown timers work
- [ ] Cancel button returns to idle
- [ ] Responsive on tablet sizes
- [ ] Touch-friendly button sizes

## 🐛 Troubleshooting

**Issue: Styles not loading**
- Ensure `index.css` is imported in `main.jsx`
- Check browser console for errors

**Issue: Components not rendering**
- Check that all component files exist in `src/components/`
- Verify imports in `App.jsx`

**Issue: State not persisting**
- Remember: In production, state is stored on RFID band
- In demo, state resets on page refresh (expected behavior)

## 📝 License

Proprietary - The Great Escape Mini-Golf

---

**Need help?** Contact the development team or refer to the deployment guide.
