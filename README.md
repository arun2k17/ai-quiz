# Math Quiz App for Kids 🧮

A fun, interactive math quiz web application designed for kids to practice addition with 2-3 digit numbers. Built with React, TypeScript, Vite, and Fluent UI.

## Features

- ✨ 10 random addition problems per quiz
- ⏱️ 3-minute timer per question (configurable)
- ✅ Immediate feedback on answers
- 📊 Comprehensive results screen with score and review
- 🔁 Option to retry wrong questions or start fresh
- 🎨 Kid-friendly UI with colorful gradients
- 🧪 Full E2E test coverage with Playwright

## Live Demo

Visit the live app: `https://arun2k17.github.io/ai-quiz/`

## GitHub Pages Deployment

This app is configured to deploy to GitHub Pages from the `/docs` folder.

### Setup Instructions

1. **Push your changes** (including the `/docs` folder):

   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**:

   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose branch: `main` and folder: `/docs`
   - Click **Save**

3. **Wait a few minutes** for GitHub to build and deploy

4. **Access your app** at: `https://arun2k17.github.io/ai-quiz/`

### Rebuild for Deployment

Whenever you make changes and want to redeploy:

```bash
npm run build
git add docs/
git commit -m "Update deployment"
git push
```

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

Output goes to the `/docs` folder (configured for GitHub Pages)

### Run Tests

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

## Configuration

### Timer Duration

To change the timer duration per question, edit `src/App.tsx`:

```tsx
<QuizScreen
  // ... other props
  timerDuration={180} // Change this value (in seconds)
/>
```

### Number of Questions

To change the quiz length, edit `src/utils/quiz.ts`:

```tsx
export function generateQuizQuestions(): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < 10; i++) {
    // Change 10 to your desired number
    // ...
  }
}
```

## Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.tsx    # Initial screen with "Start Quiz" button
│   ├── QuizScreen.tsx       # Main quiz interface with questions
│   ├── ResultsScreen.tsx    # Score and review screen
│   └── Timer.tsx            # Countdown timer component
├── types/
│   └── quiz.ts              # TypeScript interfaces
├── utils/
│   └── quiz.ts              # Quiz logic and question generation
├── App.tsx                  # Main app component
└── main.tsx                 # App entry point

e2e/
└── quiz.spec.ts             # End-to-end tests
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Fluent UI** - Microsoft's UI component library
- **Playwright** - E2E testing

---

Built with ❤️ for kids learning math!

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
