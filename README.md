# MONITORING

A privacy-conscious, client-side service observability dashboard for availability, latency, incidents, and operational events.

## What it does

- Monitors configurable **HTTPS endpoints directly from the browser**.
- Measures request latency and HTTP success/failure.
- Tracks a session availability ratio, latency history, and open incidents.
- Stores configuration and results in browser `localStorage`.
- Includes demo services, filtering, endpoint add/remove, automatic 60-second checks, incident creation/resolution, a 404 page, PWA support, and an offline app shell.

### Important limitation

Because this project is hosted as a static GitHub Pages site, checks run in the visitor's browser rather than on a server. A target must allow browser cross-origin requests (CORS) for live checks to work. This is **not a server-side uptime monitor** and it must not be used to monitor private endpoints or to store credentials.

## Privacy and security

No analytics or advertising scripts are included. Endpoint configuration, health results, and session history remain in browser `localStorage`. Do not enter passwords, API keys, cookies, tokens, or other secrets into the dashboard.

The site includes a restrictive Content Security Policy meta tag and HTTPS-only custom endpoints. GitHub Pages controls actual HTTP response headers, so server-side security headers cannot be configured from this repository alone.

See [Privacy](privacy.html).

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

## Structure

- `index.html` — dashboard and endpoint controls
- `styles.css` — responsive UI
- `app.js` — monitoring engine, incidents, persistence, and chart
- `service.html` — shareable service-detail view
- `404.html` — not-found page
- `manifest.webmanifest` / `sw.js` — PWA/offline shell
- `privacy.html` — privacy and data-handling information
- `robots.txt` / `sitemap.xml` — crawler metadata
- `.github/workflows/pages.yml` — GitHub Pages deployment and smoke test

## Deployment

The Pages workflow runs on pushes to `main`, validates the static site locally with a smoke test, then deploys the artifact to GitHub Pages.

## Scope

This project is for technical/system observability. It does not perform individual profiling, political persuasion, voter targeting, or person-level political monitoring.
