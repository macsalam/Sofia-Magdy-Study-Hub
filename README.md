# Sofia Magdy Study Hub

A private study site for Sofia, hosted on Cloudflare Pages.

- `public/index.html` is the home screen with the four subject hubs.
- `public/science/` is Sofia Magdy's Science Hub (Cambridge Lower Secondary Science, Learner's Book 9).
- `public/assets/sync.js` keeps each page's saved progress in the shared database.
- `functions/api/state.js` is the server function that reads and writes that database (Cloudflare D1, binding name `DB`).

## One-time Cloudflare setup

1. Storage & Databases > D1 SQL Database > Create: name it `study-hub`. The table is created automatically on first use.
2. Workers & Pages > Create > Pages > Connect to Git: pick this repository.
   Production branch `main`, framework preset `None`, build command empty, build output directory `public`.
3. In the new Pages project: Settings > Bindings > Add > D1 database. Variable name `DB`, database `study-hub`. Then redeploy.
4. Protect the site with Cloudflare Access (Settings > General > Enable access policy, then follow
   https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain
   so the main `*.pages.dev` address is covered too). Allow only the family email addresses.

The API refuses requests that did not pass through Cloudflare Access.
