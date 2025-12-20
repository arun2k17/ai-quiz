# 🧮 AI Math Quiz - Kids Addition Learning App

A fun, interactive single-page web app for kids (age 8+) to practice addition with 2-3 digit numbers. Built with React, TypeScript, Vite, and Fluent UI.

## Features

✨ **Core Features:**

- 10 addition problems per quiz (2-3 digit numbers)
- 2-minute timer per question (auto-advances on time up)
- Big, kid-friendly interface with Fluent UI components
- Immediate feedback (correct/wrong) with correct answer display
- Results screen with score breakdown
- Ability to retry wrong questions
- Restart for new quiz

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Bundler:** Vite
- **UI Framework:** Fluent UI React
- **State Management:** React Hooks (useState)
- **Styling:** Fluent UI's `mergeStyles` + CSS

## Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.tsx      # Start quiz screen
│   ├── QuizScreen.tsx         # Question + timer + input
│   ├── ResultsScreen.tsx      # Score & review
│   └── Timer.tsx              # Countdown timer
├── types/
│   └── quiz.ts                # TypeScript interfaces
├── utils/
│   └── quiz.ts                # Quiz logic (generate, score, validate)
├── App.tsx                    # Main app component (state & routing)
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Welcome Screen:** User clicks "Start Quiz"
2. **Quiz Screen:**
   - Shows one addition problem at a time
   - 2-minute countdown timer per question
   - User enters answer and submits (or uses Enter key)
   - Feedback shown (✅ Correct / ❌ Wrong)
   - Auto-advances after feedback
3. **Results Screen:**
   - Shows score (e.g., 8/10)
   - Shows all questions with answers
   - Highlights incorrect answers
   - Option to "Retry Wrong Questions" or "Start New Quiz"

## Quiz Logic

- **Question Generation:** Random 2-3 digit numbers (10-999) for both operands
- **Validation:** Simple addition check
- **Timer:** 120 seconds per question, auto-submits when time's up
- **Scoring:** Calculated at the end (no persistence, session-only)

## Future Enhancements (Phase 2+)

- [ ] LocalStorage for quiz history
- [ ] Difficulty levels (easy/medium/hard)
- [ ] Sound effects
- [ ] Achievements/badges
- [ ] Subtraction, multiplication, division
- [ ] Difficulty progression

## License

MIT
