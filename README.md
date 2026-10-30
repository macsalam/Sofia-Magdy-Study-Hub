# Sofia Magdy Study Hub

A private study site for Sofia, hosted on Cloudflare Workers.

- `public/index.html` is the home screen with the four subject hubs.
- `public/science/` is Sofia Magdy's Science Hub (Cambridge Lower Secondary Science, Learner's Book 9).
- `public/assets/sync.js` keeps each page's saved progress in the shared database.
- `src/worker.js` and `src/state.js` are the Cloudflare Worker that serves the site and reads and writes the shared database (Cloudflare D1 `sofia-magdy-study-hub`, binding `DB`).
- `wrangler.jsonc` holds the Worker settings. Every push to `main` is built and deployed by Cloudflare Workers Builds.

The site is protected by Cloudflare Access, and the API refuses requests that did not pass through Access.
