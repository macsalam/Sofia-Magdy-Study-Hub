// Shared progress store for the Study Hub.
// GET  /api/state  -> { values: { key: value, ... }, updated: { key: ms } }
// PUT  /api/state  -> body { key: value | null, ... }   (null deletes the key)
// Requires a D1 binding named DB. The table is created automatically.

const MAX_BODY = 4 * 1024 * 1024; // 4 MB per save
const KEY_RE = /^[A-Za-z0-9._:-]{1,80}$/;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

async function ensureTable(db) {
  await db
    .prepare('CREATE TABLE IF NOT EXISTS hub_state (k TEXT PRIMARY KEY, v TEXT NOT NULL, updated INTEGER NOT NULL)')
    .run();
}

export async function onRequest({ request, env }) {
  // Cloudflare Access adds this header to every request it lets through.
  // Refusing requests without it keeps the data closed if Access is ever switched off.
  if (env.ALLOW_WITHOUT_ACCESS !== 'true' && !request.headers.get('Cf-Access-Jwt-Assertion')) {
    return json({ error: 'This hub must be protected by Cloudflare Access.' }, 401);
  }
  if (!env.DB) return json({ error: 'The D1 database binding "DB" is missing.' }, 500);
  const db = env.DB;
  await ensureTable(db);

  if (request.method === 'GET') {
    const { results } = await db.prepare('SELECT k, v, updated FROM hub_state').all();
    const values = {}, updated = {};
    for (const r of results) { values[r.k] = r.v; updated[r.k] = r.updated; }
    return json({ values, updated });
  }

  if (request.method === 'PUT') {
    const text = await request.text();
    if (text.length > MAX_BODY) return json({ error: 'Too large' }, 413);
    let body;
    try { body = JSON.parse(text); } catch { return json({ error: 'Bad JSON' }, 400); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Bad body' }, 400);
    const now = Date.now();
    const stmts = [];
    for (const [k, v] of Object.entries(body)) {
      if (!KEY_RE.test(k)) return json({ error: 'Bad key: ' + k }, 400);
      if (v === null) stmts.push(db.prepare('DELETE FROM hub_state WHERE k = ?').bind(k));
      else if (typeof v === 'string')
        stmts.push(
          db.prepare('INSERT INTO hub_state (k, v, updated) VALUES (?, ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, updated = excluded.updated').bind(k, v, now)
        );
      else return json({ error: 'Values must be strings or null' }, 400);
    }
    if (stmts.length) await db.batch(stmts);
    return json({ ok: true, saved: stmts.length, at: now });
  }

  return json({ error: 'Method not allowed' }, 405);
}
