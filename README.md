# MONITORING

A production-oriented service observability dashboard with server-side scheduled health checks, persistent history, incident management, latency analytics, deployment records, maintenance windows, alerts, and an authenticated operator console.

## Architecture
- Frontend: static GitHub Pages dashboard.
- API: Supabase Edge Function (monitor-api-final).
- Scheduler/worker: Supabase Edge Function (monitor-worker-v5) invoked every minute by pg_cron + pg_net.
- Database: PostgreSQL tables for monitors, checks, incidents, maintenance, deployments, alert channels/rules, delivery history, operator access, and rate limits.
- Authentication: Supabase Auth for operator access.
- Retention: daily cleanup keeps check history for 90 days, alert deliveries for 180 days, and deployments for 365 days.

The dashboard no longer depends on a browser tab being open for health checks.

## Monitoring
Each monitor supports:
- HTTP/HTTPS URL validation
- GET or HEAD
- 30 seconds–24 hours interval
- 1–30 second timeout
- expected HTTP status range
- configurable consecutive failure threshold
- configurable recovery threshold
- enable/disable state
- tags
- server-side latency and response-code history
- regional check metadata

The worker records every result and updates the monitor current state.

### SSRF protection
The worker validates monitor targets before making requests. It blocks localhost/internal hostnames, embedded URL credentials, non-HTTP(S) schemes, non-standard ports, private/loopback/link-local/multicast/reserved IP ranges, and hostnames resolving to blocked private addresses.

## Incidents
Incidents automatically progress through: **open → investigating → resolved**.

The system records first failure, incident start, investigation, recovery, resolution, failure/recovery counts, duration, and failure reason.

An incident opens only after the configured consecutive-failure threshold is reached. Recovery requires the configured consecutive successful checks.

Scheduled maintenance is recorded separately and does not count as an outage.

## Analytics
Supported history windows: 1 hour, 6 hours, 24 hours, 7 days, and 30 days.

The API calculates uptime percentage, p50 latency, p95 latency, p99 latency, response-code breakdown, and outage timeline.

## Alerts
Alert rules support webhook notifications, optional email notifications through a server-side Resend provider, incident-opened triggers, recovery triggers, per-rule consecutive-failure thresholds, monitor-specific or all-monitor rules, and delivery history.

## Operator console
Open operator.html to create/edit/delete monitors, configure intervals and thresholds, manage incidents, schedule/delete maintenance windows, manage alert channels/rules, record deployment events, and sign out.

The operator API requires an authenticated Supabase session. Database service credentials and worker tokens remain server-side.

## Security
- strict API CORS origin
- authentication on operator mutations
- server-side secrets
- rate limiting
- URL/input validation
- security response headers
- SSRF protections
- database RLS
- restricted service-role access
- automated JavaScript syntax checks
- browser smoke tests
- production browser verification
- retention cleanup

Do not put passwords, API keys, cookies, access tokens, or credentials in monitor URLs.

## Privacy
The public dashboard does not include advertising or analytics trackers. Operational data is stored in the monitoring PostgreSQL database. See Privacy.

## Run locally
```bash
python3 -m http.server 8080
```

The static UI can be previewed locally, but the production monitoring API is hosted separately.

## Structure
- index.html — public observability dashboard
- styles.css — responsive UI
- app.js — public dashboard/API integration and analytics rendering
- operator.html / operator.js — authenticated operator console
- service.html / service-detail.js — per-service historical analytics
- privacy.html — privacy and data handling
- manifest.webmanifest / sw.js — PWA shell
- 404.html — not-found page
- .github/workflows/pages.yml — CI, browser QA, deployment, and production verification
- supabase/migrations/ — reproducible database schema

## Deployment
GitHub Pages deploys the static frontend from main. CI performs required-file validation, JavaScript syntax checks, manifest validation, local HTTP checks, headless Chromium smoke tests, GitHub Pages deployment, and production browser verification.

The monitoring backend is deployed separately to Supabase and scheduled independently of GitHub Pages.

## Scope
This project is for technical/system observability only. It does not perform individual profiling, political persuasion, voter targeting, or person-level political monitoring.

Backend scheduler and retention jobs are managed in Supabase and are verified independently from the static Pages deployment.
