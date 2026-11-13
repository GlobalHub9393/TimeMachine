# Basketball Time Machine — GM Simulator

**Version:** 0.1-alpha • First private playable build • November 2026

Basketball Time Machine is an original, offline-friendly browser-based NBA alternate-history **general manager simulator**. You are the GM; your coach runs the lineup and tactical plan unless you change the override setting.

## Start playing

**Fastest route:** Open the single-file **`basketball-time-machine.html`** in a desktop web browser such as Chrome, Edge, or Firefox. It contains the complete alpha. No sign-in, service, API key, or installation required.

The `index.html` + `data.js` + `engine.js` + `app.js` + `style.css` structure is the **editable project**. Run it with any basic static file server (for example, `python -m http.server 8000` from this folder) and open `http://localhost:8000` in your own browser.

**Mobile note:** iPhone Files/Quick Look often previews downloaded HTML instead of running it as a normal website. To play comfortably on an iPhone, host the editable project on a private-access-protected static website. Do not put a personal save file in a publicly accessible folder. No deployment has been performed.

## What works today

- Start an independent alternate NBA universe in **1979–80**, choosing among all 22 NBA franchises.
- A curated (but **not complete or fully validated**) historical player core, with clearly labeled provisional depth players.
- Simulated 82-game regular seasons and final scores, standings and per-player points/rebounds/assists.
- Adjustable GM preferences, coach conversations, coach-led tactics, a coaching candidate market, and a GM lineup override.
- Simplified, AI-evaluated player-for-player trades, signing/releasing unsigned players, and assistant GM guardrails.
- Simplified 16-team best-of-seven playoffs, with simulated conference winners and an NBA champion.
- Multi-stage offseason, player aging, historical-name draft prospects for **1980 through 1985** (partial classes), fictional filler prospects, contracts, free agency and Dallas expansion in 1980.
- Injuries influenced by a player's durability and workload, retirement events, comeback discussions, and rare player-coach proposals.
- Chronicle, league leaders, alternate universe history, separate save slots, autosave, and JSON export/import.
- Seeded deterministic simulation: the same starting seed and decisions result in the same simulation.

## Important realism limitations

This is **an early functional alpha**, not a finished NBA 2K MyNBA Eras equivalent. Historical names, teams, year labels, and major league milestones are a starting point only. **Player ratings, coach attributes, development, contract figures, injuries, and generated game statistics are original estimates and have not yet been validated against complete NBA season records.** Provisional player entries and future fictional draftees are explicitly labeled in the game.

The following remain to be developed: complete and audited historical rosters and every annual draft class through the current season; precise franchise/coach moves; accurate period-by-period CBA, salary caps, transactions and drafts; historically correct playoff formats; draft pick trading, protections, and multi-asset deals; advanced owner demands; AI franchise plans; veteran agency, morale and meaningful contract negotiations; a complete statistical box-score engine; storylines with deeper causal memory; a personal GM career mode; and substantial statistical calibration.

**The game does not use or distribute NBA 2K, Basketball GM, or other copyrighted game code or visual assets.** It is an independently written simulator, not a fork of an existing game.

## Controls

- **GM Desk:** advance one schedule date, about a week (four dates), or run to the playoffs. If auto-stop is enabled, injuries and trade deadline alerts interrupt longer simulations.
- **Roster:** see player ratings, season production, health, and the coach's planned rotation. Enabling the GM lineup override permits changing rotation priority.
- **Coach & Strategy:** review the coach's effective philosophy, select preferred tactics, discuss them with the coach, and hire from the candidate market.
- **League:** live standings and scoring leaders.
- **Transactions:** propose one-for-one trades, sign unsigned players, and release players.
- **Offseason:** progress through draft, contracts, free agency, and camp; you can make your own draft picks or delegate them.
- **Chronicle:** review stories derived from simulated events.
- **Settings:** scouting uncertainty, stop points, coaching override, assistant GM guardrails, save export/import.

## Saving

The game stores each universe using your browser's **localStorage**. If you clear browser storage or change device, those saves may be lost. Use **Settings → Download this universe** for a JSON backup. You can restore it using **Import a save**.

## Source references and data plans

The 1980 original draft names and order were checked against `kshvmdn/nbadrafts` ([1980 dataset](https://github.com/kshvmdn/nbadrafts/blob/master/datasets/1980_nbadraft.csv)). It is a candidate for historical draft ingestion, subject to full coverage and data-rights review. Further player-season and franchise provenance should be built from independent historical statistics sources, cross-checked before marking ratings as calibrated. No third-party roster database was imported into this first alpha.

## Testing

Run `node tests/smoke.test.js`. The suite exercises 60 complete 1979–80 regular seasons, verifies player-point-to-team-score reconciliation, checks 82-game schedules for every club after 1980 Dallas expansion, traverses playoffs/offseason/drafting, and verifies repeatability with a fixed seed. The result is a **functional consistency test, not scientific realism validation**.

## Editing and architecture

- `data.js`: curated early source data and draft names.
- `engine.js`: original simulation model and event decisions, separate from UI.
- `app.js`: navigation, interactions, local saves, rendering, and editing controls.
- `style.css`: responsive sports management visual system.
- `index.html`: application shell.
- `tests/smoke.test.js`: automated engine smoke tests.

Next recommended development milestone: build an auditable season data pipeline and score distribution simulator with shot/possession constraints, then add full historical 1979–80 teams, legal/CBA rules, draft trades and scouting information boundaries.
