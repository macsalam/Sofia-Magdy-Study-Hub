# Sofia Magdy Study Hub: handoff for building a new subject hub

Written 30 October 2026, from the chat that built the Science Hub. Give this file to any new chat that builds another subject hub (Maths, English, Global Perspectives). The Science chat keeps working on the same repository at the same time, so following the rules below keeps the two from breaking each other.

## 1. What exists today

Live site: https://sofia-magdy-study-hub.macsalam.workers.dev/
GitHub repository: macsalam/Sofia-Magdy-Study-Hub (private). Branch main is the live branch.
Hosting: a Cloudflare Worker (not a Pages project) named sofia-magdy-study-hub, created through Cloudflare's current default flow. Cloudflare Workers Builds builds and deploys every push to main automatically, normally within a few minutes.
Database: Cloudflare D1 database sofia-magdy-study-hub (id 0521d624-74eb-41a7-a83b-3e87f9435e9c), bound to the Worker as DB.
Login: Cloudflare Access (team domain seatongue.cloudflareaccess.com) protects the whole site. Allowed people sign in with their email and get a login code.

Important lesson from the first chat: Cloudflare creates Workers projects by default now. Any Cloudflare instruction must be for Workers and checked against current docs at developers.cloudflare.com before it is given to Mac. Do not give Pages instructions.

## 2. Repository layout

public/index.html        Home screen "Sofia Magdy Study Hub" with four cards: Science Hub, Maths Hub, English Hub, Global Perspectives Hub.
public/science/          Science Hub (index.html + app.js). Owned by the Science chat.
public/assets/sync.js    Shared sync script. Shared file, see rule 4.
src/worker.js            Worker entry: /api/state goes to the API, everything else is served from public/. Shared file.
src/state.js             The /api/state API (GET returns all saved keys, PUT saves or deletes keys). Shared file.
wrangler.jsonc           Worker settings: name, assets folder ./public, D1 binding. Shared file.
README.md                Short description.
docs/HANDOFF.md          This file.

## 3. How saving works (read before writing any code)

1. A subject page does not run its app script directly. It loads the shared sync script and names its own app script:
   <script src="/assets/sync.js" data-app="/maths/app.js"></script>
2. sync.js first sends any saves that were made while offline, then downloads every saved key from /api/state into localStorage, then starts the app script. So the app can read its saved state from localStorage at startup, as normal.
3. After that, every localStorage.setItem or removeItem on the page is copied to the server automatically (batched after 0.8 seconds, and sent immediately when the page is hidden). If the server can't be reached, the change is queued in the localStorage key hub-pending and sent later. A small label in the bottom-left corner shows "Saved to Study Hub" or an offline message.
4. The app needs no network code of its own. It just uses localStorage, with every read and write wrapped in try/catch.
5. All subjects share one storage space (one site, one database), so key names must never collide. Science uses these keys, which no other hub may use or change:
   sci9-hub-v1   Science progress (answers, checklists, quiz scores, Study later marks, stickers)
   sci9-prefs    Science font choice
   sci9-notes    Science notes
   hub-pending   Used by sync.js itself; never write it.
6. Maths must use its own prefix, math9-, for example math9-hub-v1, math9-prefs, math9-notes. Key names may only use letters, digits, dot, underscore, colon and hyphen, up to 80 characters. Values are strings (JSON.stringify objects). One save may be up to 4 MB.
7. The API refuses any request that did not pass through Cloudflare Access, so the live API only works for signed-in users. For local testing, run: npx wrangler dev --var ALLOW_WITHOUT_ACCESS:true (local data only; nothing reaches the live database).

## 4. Rules that keep both hubs working

1. The Maths chat only creates and edits files inside public/maths/. The Science chat only edits public/science/.
2. On the home screen (public/index.html), the Maths chat changes only the Maths card: turn the disabled card <div class="hub mat" aria-disabled="true"> into a link <a class="hub mat" href="/maths/">, replace "Coming soon" with a one-line description and an "Open →" line (copy the Science card's markup), and leave the other cards alone.
3. Shared files (public/assets/sync.js, src/worker.js, src/state.js, wrangler.jsonc) are not changed unless there's no other way. If a change is needed, it must keep working for Science unchanged, it must be tested with the Science page too, and Mac must be told it was a shared change.
4. Both chats push to the same main branch, and every push goes live. Before committing, always run git pull --rebase origin main, then commit, then push. Never force-push. Never rewrite or delete the other subject's files.
5. Before pushing, check the JavaScript (for example node --check on the app script) and load the page with the local Worker. Confirm there are no console errors, that progress survives a reload, and that the page doesn't scroll sideways at phone width (about 400 px) or desktop width.
6. Commit messages end with the attribution lines that the session's system message provides.

## 5. Look and feel, so the hubs feel like one site

1. Night-sky galaxy theme. The base color is #262143. These are the Science tokens on :root (copy them into the Maths page):
   --night #262143, --paper #1D1937, --surface #2F2852, --surface2 #3A3266, --ink #F2EFFF, --muted #B6ADDA, --line #4B4279.
   The home screen gives Maths the accent colors #FFD36E and #C9672E. Use them as Maths' main accents so the card and the hub match.
2. Fonts: Bricolage Grotesque for headings, Atkinson Hyperlegible for body text, JetBrains Mono for numbers, loaded from Google Fonts.
3. Full browser width, a sticky header and a twinkling starfield background (respect prefers-reduced-motion).
4. The header starts with a home button back to "/", like the Science page: a small house icon with the class homebtn and aria-label "Back to Sofia Magdy Study Hub".
5. The Science Hub's structure was what Mac asked for, and Maths can follow it:
   a chapter rail with left and right arrow pockets instead of a scrollbar;
   for each chapter, topics with a hook question, short steps, and a quick check after every step that unlocks the next one;
   visuals and animations;
   the book's own questions with reveal answers, the end-of-chapter Check your progress with marks, and a mixed quiz;
   a Reset button;
   five extra font choices;
   a floating notes window with minimize and Word export;
   a "Study later" mark on each step, with a list page after the chapter titles;
   a sticker board that awards a different galaxy sticker for each completed step, grouped by chapter.
   The notes export uses a normal browser download on the live site.
6. Mac plans one single-player game per chapter, built only from that chapter's content.

## 6. Content rules (Mac's requirements)

1. Content comes only from Sofia's own book for that subject, never from the general curriculum or other websites. Explanations are reworded, and diagrams are redrawn rather than copied. Ask Mac which book and edition the Maths Hub is for, unless he says so in the chat.
2. Mac bought the digital books on Cambridge GO. Reading them needs his signed-in session in the built-in browser pane of the Claude desktop app. He signs in himself, and again whenever the session times out. Never use unofficial copies of the book (for example AnyFlip or Issuu uploads).
3. Never invent answers. When the book doesn't print an answer, say so, and label any worked reasoning as reasoning from the book. When a question depends on a diagram in the book, tell Sofia which page to look at.
4. Past papers: Cambridge only publishes one set of Checkpoint specimen papers on its website. Other past papers are on the Cambridge Lower Secondary support sites, which are for schools, so they come through Sofia's school. Don't use unofficial past-paper download sites.
5. Keep per-chapter source notes in the claude.ai Project "Science G9 Dashboard" (or a Maths project if Mac makes one), for example claude/maths-chapter-1-source-notes.md.

## 7. How Mac wants replies

Plain prose. No bold, asterisks, hash symbols or bullet points in chat replies. One consolidated answer, not side-by-side options. American English. Only confirmed, sourced facts with no guesses, and check anything time-sensitive (like Cloudflare's dashboard) before stating it.

## 8. First steps for the new chat

1. Attach the GitHub repository macsalam/Sofia-Magdy-Study-Hub with push access, and clone it.
2. Read this file, public/index.html, public/assets/sync.js and the top of public/science/index.html to see the patterns.
3. Ask Mac which Maths book and edition, then open it with him on Cambridge GO.
4. Build public/maths/ chapter by chapter, test it locally, enable the Maths card, pull with rebase, push, and ask Mac to check the live site.
