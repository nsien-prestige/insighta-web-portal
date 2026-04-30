# Insighta Labs+ Web Portal

A simple, functional web portal for the Insighta Labs+ platform. Built with plain HTML, CSS, and JavaScript — no framework required.

## Live URL

https://insightalabs.netlify.app

## Pages

- `/index.html` — Login page (GitHub OAuth)
- `/dashboard.html` — Dashboard with key metrics and recent profiles
- `/profiles.html` — Profiles list with filters, sorting, and pagination
- `/profile.html` — Single profile detail view
- `/search.html` — Natural language search page
- `/account.html` — Current user account details

## Authentication

The web portal uses HTTP-only cookies for token storage. Tokens are never accessible via JavaScript — the browser sends them automatically with every request.

**Login flow:**
1. User clicks "Continue with GitHub"
2. Browser generates `state` and `code_challenge` using the Web Crypto API (PKCE)
3. Redirects to backend `/auth/github` which redirects to GitHub OAuth
4. User authorizes on GitHub
5. GitHub redirects to backend `/auth/github/callback`
6. Backend sets `access_token` and `refresh_token` as HTTP-only cookies
7. Backend redirects to `/dashboard.html`

**Session management:**
- Every page checks `/auth/me` on load to verify the session
- If the access token is expired, the portal automatically calls `/auth/refresh`
- If the refresh token is also expired, the user is redirected to the login page
- Logout clears both cookies on the server and redirects to login

## Project Structure

```
insighta-web/
├── index.html        ← login page
├── dashboard.html    ← dashboard
├── profiles.html     ← profiles list
├── profile.html      ← single profile detail
├── search.html       ← natural language search
├── account.html      ← account page
├── css/
│   └── style.css     ← shared styles for all pages
├── js/
│   ├── api.js        ← fetch wrapper with auto token refresh
│   ├── auth.js       ← checkAuth and logout functions
│   └── app.js        ← shared utilities (formatDate, buildQueryString)
└── _redirects        ← Netlify routing rules
```

## Role Enforcement

The portal enforces roles on the frontend as well as the backend:

- The **Create Profile** button is only shown to users with the `admin` role
- All API requests are validated by the backend regardless of what the frontend shows
- The user's role is fetched from `/auth/me` on every page load

## Setup & Local Development

Since this is a static site, you can run it with any local server.

**Using VS Code Live Server:**
1. Install the Live Server extension
2. Right click `index.html` → Open with Live Server

**Using Node.js:**
```bash
npx serve .
```

**Environment:**
Update the `API_URL` variable in each HTML file to point to your backend:

```js
const API_URL = 'https://insightabackend.hostless.app'
```

## Deployment

The portal is deployed on Netlify. Any push to the `main` branch triggers an automatic redeployment.

The `_redirects` file handles Netlify routing so pages work without the `.html` extension.

## Backend Dependency

The web portal depends entirely on the Insighta Labs+ backend. All data is fetched in real time — there is no local data storage. The backend must be running and accessible for the portal to work.

Backend repository: https://github.com/nsien-prestige/insighta-backend