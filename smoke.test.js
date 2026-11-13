/* Run from project root: node tests/smoke.test.js */
const assert = require('node:assert/strict');
global.window=global;
require('../data.js');
require('../engine.js');
const E=global.BTM;
function one(seed){
 const w=E.create('PHI',seed);w.settings.autoStop=false;
 assert.equal(w.teams.length,22);
 assert.equal(w.schedule.length,82);
 assert.equal(w.schedule.flat().length,902);
 E.advance(w,1000);
 assert.equal(w.phase,'playoffs');
 assert.equal(w.round,82);
 assert.equal(w.teams.reduce((s,t)=>s+t.wins,0),902);
 assert.equal(w.teams.reduce((s,t)=>s+t.losses,0),902);
 for(const t of w.teams)assert.equal(t.wins+t.losses,82);
 // Every game contributes exactly its score to the regular-season player point totals.
 const teamScore=w.games.reduce((s,g)=>s+g.hs+g.as,0);
 const playerScore=w.players.reduce((s,p)=>s+p.pts,0);
 assert.equal(playerScore,teamScore);
 const final=E.playoffs(w);assert.ok(final.winner);assert.equal(w.phase,'offseason');
 assert.equal(w.history.length,1);
 const regularGames=w.games.length;
 assert.equal(regularGames,902);
 E.offSeasonNext(w);assert.equal(w.offseasonStep,1);assert.equal(w.teams.length,23);
 assert.ok(w.draft.some(p=>p.name==='Kevin McHale'));
 E.autoUntilUser(w);
 if(w.offseasonStep===1&&E.draftOrder(w)[w.draftPos]===w.userTeam){const chosen=w.draft[0];const result=E.draftPick(w,chosen.id);assert.equal(result.player.name,chosen.name);assert.equal(result.owner,w.userTeam);}
 E.autoFinishDraft(w);assert.equal(w.offseasonStep,2);
 for(let i=0;i<3;i++)E.offSeasonNext(w);
 assert.equal(w.offseasonStep,0);assert.equal(w.phase,'regular');assert.equal(w.year,1980);
 assert.equal(w.teams.length,23);
 for(let t of w.teams){let count=w.schedule.flat().filter(game=>game.includes(t.id)).length;assert.equal(count,82,'Expected 82 games for '+t.id);}
 return {seed,avgScore:teamScore/(902*2),champion:final.winner,playerCount:w.players.length};
}
const results=[];
for(let seed=1;seed<=60;seed++)results.push(one(seed));
let avg=results.reduce((s,x)=>s+x.avgScore,0)/results.length;
assert.ok(avg>98&&avg<117,'Era scoring out of plausible range: '+avg);
assert.ok(new Set(results.map(r=>r.champion)).size>=3,'League outcomes are overly deterministic');
const a=one(12345),b=one(12345);assert.deepEqual(a,b,'Identical seeds should reproduce identical results');
console.log('PASS —',results.length,'complete seasons + playoff/offseason cycles, league 82-game schedules, score reconciliation, winner variability, same-seed repeatability.');
console.log('Mean team points',avg.toFixed(2),'Distinct champions',new Set(results.map(r=>r.champion)).size);
