# Basketball Time Machine — Historical GM Simulator

**Release: Alpha 0.2 · November 2026 · Private single-player browser game**

## What's new in v0.2

- **Start screen:** New-game setup no longer silently starts as the Philadelphia 76ers. Pick any available 1979–80 franchise, create a GM name/title, choose rebuilding/retooling/win-now philosophy, decide coaching authority, and set assistant GM first-round-pick and scouting preferences. Existing saves can be continued or imported.
- **Draft assets:** All franchises have transferable first- and second-round picks up to four years ahead. Each pick tracks original franchise and current owner. Trading a pick changes the actual NBA Draft selection owner. Current draft picks can change hands during draft night if not already used.
- **Multi-asset trade builder:** Send/receive multiple players and owned draft picks (up to four assets per side). Opponent teams assess the offered package before accepting. Manual offers can include first-round picks even if you've instructed the assistant GM not to recommend trading them.
- **Find Deal:** Select a player on another team to request a suggested trade package based on that team's strategy, your untouchables, and first-round-pick protection guardrail. The assistant can conclude there's no deal. Protected franchise players can be declared untouchable.
- **Three franchise directions:** Rebuild, retool, or win now. AI franchise goals update as roster quality and results change. Rebuilders value youth and picks; contenders prioritize established contributors. Teams occasionally make independent player-plus-pick deals based on these priorities.
- **Front-office visibility:** See competing franchises' organizational directions in the League section. Team strategy changes and transactions appear in the Chronicle.
- **Prior Alpha 0.1 save compatibility:** Import JSON save files; version 1 saves are migrated to version 2. To keep a save across devices/browser storage, export/import the JSON file.

## How to play

**Simple:** Open `basketball-time-machine-v0.2.html` in a supported desktop browser. It is a standalone HTML file with embedded source and assets. No sign-in or external service required. For iPhone, a hosted static site provides a much better experience than previewing HTML in Files.

**Editable project:** Serve the directory containing `index.html`, `data.js`, `engine.js`, `app.js`, and `style.css` using a static file server. Example: `python -m http.server 8000`. Then open the local address displayed in a browser.

The game automatically attempts to save each universe in browser local storage. If unavailable, use **Settings > Download this universe** for portable saves. Changes to filename or browser storage may affect local saves.

## Already supported

- 1979–80: 22 NBA franchises; season length 82 games, abbreviated historical roster core, coach-controlled rotation and game plan, provisional replacement depth where roster data is absent.
- Score and player-production simulation; standings, season news, injuries, playoff bracket and Finals.
- GM conversations with coaches, optional GM lineup override, hiring coaches, retirements, rare player-coach proposals and comeback conversations.
- Offseason progression, partial 1980–85 historical-name drafts, contract expiry and free agency.
- Multi-universe save management, season histories and adjustable scouting uncertainty.

## Important limitations

Alpha 0.2 is a functional prototype, **not a historically calibrated NBA simulator yet**. The entire 1966–present start-year range is a future goal. At present, only 1979–80 is a selectable starting era. Complete 1979–80 rosters, later full historical draft classes, exact contracts and salary matching, sophisticated pick protection and Stepien-rule restrictions, authentic CBA timing and era-specific playoff formats, deep two-way trade negotiation, AI owner/coach relationships, and possession-level statistical accuracy are not yet complete. Trade values use a homegrown heuristic and may still occasionally feel unrealistic; we will refine them against historical contracts and franchise needs. The storyline system is also in an early state.

No third-party sports game code or artwork is used. Historic NBA names are curated as seed data; estimates are labeled where appropriate.

## Tests

From project folder:

```bash
node tests/smoke.test.js
node tests/trades.test.js
```

The first test runs 60 whole seasons, playoffs and offseasons, checking scoring reconciliation, repeatability, and 82-game schedules. The second checks draft pick ownership from trades through the draft, Find Deal, untouchable stars, organizational priorities, and migration of old saves. Mobile and desktop browser checks were performed using headless Chromium.

## Main files

- `data.js` — curated historical seed data (not complete).
- `engine.js` — simulation, picks, trading, front offices, offseason.
- `app.js` — setup wizard, trade builder, screens, event handlers, saves.
- `style.css` — responsive visual design.
- `index.html` — multi-file app shell.
- `tests/` — engine tests.

Next priority: historical roster/database import and calibration, accurate era-based trade and salary rules, deeper coaching front offices and scouting intelligence.
