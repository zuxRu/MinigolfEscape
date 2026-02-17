# MinigolfEscape

Interactive scoring system for **The Great Escape Mini-Golf**. Built with React and Vite, designed to run on tablets at each hole as a kiosk-style app.

## Features

- **Player registration** — groups of 1-6 players sign up at hole 1 via wristband scan
- **4 game modes** — Standard, Chaos, Date Night (PG), and Drinking (18+)
- **Per-hole prompts** — challenges, dares, spinner wheels, and discussion questions depending on the selected mode
- **Live scoring** — stroke and penalty entry with running totals and leaderboard
- **Final summary** — rankings, optional group name, and email scorecard delivery at hole 9
- **Admin access** — hidden 6-tap corner for staff operations
- **RFID-ready** — currently simulated with button clicks; designed for wristband integration

## Quick Start

```bash
cd minigolf-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
cd minigolf-app
npm run build
npm run preview
```

## Project Structure

```
minigolf-app/
├── src/
│   ├── components/
│   │   ├── IdleScreen.jsx          # Wristband scan prompt
│   │   ├── RegistrationFlow.jsx    # Player name entry (hole 1)
│   │   ├── GameModeSelector.jsx    # Mode selection (hole 1)
│   │   ├── PromptDisplay.jsx       # Game mode prompts (holes 2-9)
│   │   ├── ScoringScreen.jsx       # Score and penalty entry
│   │   ├── FinalSummary.jsx        # Final rankings (hole 9)
│   │   ├── EmailCollection.jsx     # Email input (hole 9)
│   │   └── ConfirmationScreen.jsx  # Success / auto-return screen
│   ├── App.jsx                     # Main state machine
│   ├── gameModes.js                # Game mode and prompt definitions
│   ├── index.css                   # All styles
│   └── main.jsx                    # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Configuration

Edit `src/App.jsx` to change which hole the tablet represents:

```js
const CONFIG = {
  holeNumber: 1,           // 1-9
  course: 'A',             // Course A or B
  isRegistrationHole: true, // true for hole 1
  isFinalHole: false,      // true for hole 9
};
```

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — dev server and bundler
- **CSS** — custom styles, no external UI library

## License

Proprietary — The Great Escape Mini-Golf
