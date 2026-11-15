# Observability

Clipper AI reports errors and product analytics to **PostHog** and ships logs to
**Axiom**. Both are optional: with no tokens configured nothing is sent, which
is the default for self-hosted installs.

| Surface | PostHog | Logs |
|---------|---------|------|
| Backend API, ARQ worker | exceptions (`posthog` Python SDK) | JSON on stdout → Vector → Axiom |
| Web (Next.js) | analytics, session replay, exceptions | container stdout → Vector → Axiom |
| Desktop (Electron) | analytics, session replay, exceptions | — |
| iOS | analytics, crashes | — |

Production uses the PostHog project **Clipper AI** (EU cloud, project id
`314504`) and the Axiom dataset **`clipper-ai-prod`** (org `clipper-ai-tjzv`).

## Following an error from PostHog to the logs

Every API request carries a trace id. Clients send `x-trace-id`; the backend
generates one otherwise, echoes it in the response header and in error bodies,
and stamps it on every log line. Worker jobs use `task-<task_id>` and
`social-<post_id>`.

Exceptions in PostHog carry the same `trace_id` property and, when a user was
authenticated, the Better Auth user id as the distinct id. To see what the
backend did around an error, query Axiom with the trace id:

```kusto
['clipper-ai-prod']
| where trace_id == "task-6f1c..."
| sort by _time asc
```

All logs for one user: `| where user_id == "<user id>"`. Errors only:
`| where level == "ERROR"`. Each line has a `service` field (`backend`,
`worker`, `frontend`, `mcp`, `nginx`, ...).

## Backend and worker

`src/observability.py` configures logging. Every record logged with a
traceback (`logger.exception(...)` or `exc_info=True`) is also sent to PostHog
error tracking, as are uncaught exceptions. Records without a traceback only
go to the logs.

| Variable | Purpose |
|----------|---------|
| `POSTHOG_PROJECT_TOKEN` | Project token (`phc_...`). Empty disables PostHog. |
| `POSTHOG_HOST` | Ingest host, default `https://eu.i.posthog.com`. |
| `SUPOCLIP_SERVICE` | `backend`, `worker`, or `cron-worker`; set by docker-compose. |

A video-queue job that waits longer than `QUEUE_DELAY_ALERT_SECONDS` (default
10 minutes) before a worker starts it sends one PostHog exception,
`$exception_fingerprint` `queue_delay_exceeded`, with `queue_depth` and
`wait_seconds`. The worker sends at most one of these per
`QUEUE_DELAY_ALERT_INTERVAL_SECONDS` (default 15 minutes), which is what the
critical-alert webhook should match. The distinct id is `clipper-ai-worker`.
The event has no account id. A job that waited only because that account was
already rendering does not use this clock: it is queued again with a new
enqueue time.

## Shipping logs to Axiom

The `vector` service in `docker-compose.yml` (config in
`observability/vector.yaml`) reads the logs of every `clipper-ai-*` container
through the Docker socket, parses the backend's JSON lines into fields, drops
health-check noise and sends everything to Axiom. It only starts with the
`axiom` profile:

```bash
# in the production .env
COMPOSE_PROFILES=axiom
AXIOM_TOKEN=xaat-...        # ingest-only token for the dataset
AXIOM_DATASET=clipper-ai-prod

docker compose up -d vector
```

### nginx

On the production host nginx runs outside Docker and serves several sites into
one shared `access.log`. The Clipper AI vhosts (`www` and `api`, port 443) also
write their own files, which Vector picks up. They show what the backend never
sees: 413s for oversized uploads, 502s while a container restarts, 504s on slow
uploads, and frontend page/asset requests. Upload body size and the
response-header timeout for `/api/upload` and `POST /upload` are also set in
that host config; the values that keep a multi-gigabyte upload from ending in
504 are in `docs/media-storage.md`.

`/etc/nginx/conf.d/clipper-ai-log.conf`:

```nginx
# $uri, not $request_uri: query strings can carry tokens.
log_format clipper-ai_json escape=json
  '{"time":"$time_iso8601","host":"$host","method":"$request_method","path":"$uri",'
  '"status":$status,"bytes":$body_bytes_sent,"request_length":$request_length,'
  '"request_time":$request_time,"upstream_status":"$upstream_status",'
  '"upstream_time":"$upstream_response_time","remote_addr":"$remote_addr",'
  '"referer":"$http_referer","user_agent":"$http_user_agent",'
  '"trace_id":"$upstream_http_x_trace_id"}';
```

In the `www.clipper-ai.com` and `api.clipper-ai.com` 443 server blocks of
`sites-available/clipper-ai` (the shared logs are listed again because a
server-level `access_log` replaces the inherited one):

```nginx
access_log /var/log/nginx/access.log;
access_log /var/log/nginx/clipper-ai.access.log clipper-ai_json;
error_log /var/log/nginx/error.log;
error_log /var/log/nginx/clipper-ai.error.log warn;
```

Apply with `sudo nginx -t && sudo systemctl reload nginx`. The existing
logrotate rule for `/var/log/nginx/*.log` covers the new files.
