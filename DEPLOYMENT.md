# GitHub Pages Deployment Guide

## ✅ What's Already Done

Your Math Quiz app is now configured for GitHub Pages deployment:

1. ✅ Vite config updated to build to `/docs` folder
2. ✅ Base path set to `/ai-quiz/` for GitHub Pages
3. ✅ Build output generated in `/docs` folder
4. ✅ .gitignore configured to allow `/docs` folder to be committed
5. ✅ README updated with deployment instructions

## 🚀 Deploy to GitHub Pages

### Step 1: Commit and Push

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: `https://github.com/arun2k17/ai-quiz`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
5. Click **Save**

### Step 3: Wait for Deployment

- GitHub will take 1-3 minutes to build and deploy
- You'll see a green checkmark when ready
- Your app will be live at: `https://arun2k17.github.io/ai-quiz/`

## 🔄 Update the Deployed App

Whenever you make changes:

```bash
# Make your code changes
npm run build          # Rebuild to /docs folder
git add .
git commit -m "Update app"
git push origin main
```

GitHub will automatically redeploy within 1-3 minutes.

## 🧪 Testing Locally

**Important**: Tests require a running dev server.

In one terminal:
```bash
npm run dev
```

In another terminal:
```bash
npm test
```

Or test the production build:
```bash
npm run preview    # Serves the /docs folder locally
npm test          # Run tests (in another terminal)
```

## 📋 Checklist

- [ ] Push code to GitHub
- [ ] Enable GitHub Pages in Settings → Pages
- [ ] Wait for deployment (check Actions tab)
- [ ] Visit `https://arun2k17.github.io/ai-quiz/`
- [ ] Share with the kids! 🎉

## 🐛 Troubleshooting

**Problem**: App shows blank page or 404 errors

**Solution**: Make sure the `base` in `vite.config.ts` matches your repo name:
```ts
base: '/ai-quiz/',  // Must match your GitHub repo name
```

**Problem**: CSS/JS files not loading

**Solution**: Rebuild and recommit the `/docs` folder:
```bash
npm run build
git add docs/
git commit -m "Rebuild docs"
git push
```

## 🎨 Current Configuration

- **Timer**: 3 minutes (180 seconds) per question
- **Questions**: 10 random addition problems (2-3 digits)
- **Age Group**: 8 years old
- **Features**: Timer, immediate feedback, score review, retry wrong answers

Enjoy the app! 🧮✨
