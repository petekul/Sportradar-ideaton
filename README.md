# Sportradar Ideathon

Vite-powered static site for showcasing three ideathon prototypes. Plain HTML/CSS/JS pages, bundled by Vite for fast local dev and a production-ready build.

## Structure

```
sportradar ideathon/
├── index.html              Landing page, links to all three ideas
├── idea1.html               Idea 1 detail page
├── idea2.html               Idea 2 detail page
├── idea3.html               Idea 3 detail page
├── css/
│   └── style.css            Shared styling
├── js/
│   └── script.js             Shared script (nav active-link highlighting)
├── vite.config.js            Multi-page build config
├── package.json
└── .github/workflows/deploy.yml   Auto-deploy to GitHub Pages on push to main
```

## Editing

Each idea page has bracketed placeholders (`[...]`) for title, tagline, problem, solution, key features, tech stack, and status. Replace them with real content. Add screenshots, diagrams, or demo links as needed.

## Running locally

```
npm install
npm run dev
```

Opens a dev server with hot reload. Visit the printed local URL, and navigate to `/idea1.html`, `/idea2.html`, `/idea3.html` directly or via the nav bar.

## Building

```
npm run build
```

Outputs the production-ready site to `dist/`. Preview it locally with:

```
npm run preview
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds with Vite and publishes `dist/` automatically on every push to `main`.

1. Push this folder's contents to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to **GitHub Actions**.
4. Push to `main` — the workflow builds and deploys automatically.
5. GitHub publishes the site at `https://<username>.github.io/<repo-name>/`.

The build uses a relative base path (`base: './'` in `vite.config.js`), so it works regardless of the repo name or sub-path it's served from.
