# MONITORING

A lightweight, privacy-conscious service observability dashboard.

## Scope

This project focuses on technical/system monitoring: service availability, response times, deployments, and operational events. It does not perform individual profiling, political persuasion, voter targeting, or person-level political monitoring.

## Run locally

Open `index.html` directly or run:

```bash
python3 -m http.server 8080
```

## Structure

- `index.html` — dashboard shell
- `styles.css` — responsive UI
- `app.js` — demo data and chart
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Roadmap

- Real health-check APIs
- Configurable endpoints
- Incident history and maintenance windows
- Authenticated operator controls
- Explicitly configured alerting
