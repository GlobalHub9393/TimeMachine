const assert=require('node:assert/strict');global.window=global;require('../data.js');require('../engine.js');const E=global.BTM;
function world(){let w=E.create('PHI',849219);w.settings.autoStop=false;return w}
{
 const w=world(); const b=w.players.find(p=>p.name==='Larry Bird');const result=E.findDeal(w,b.id);
 assert.equal(result.status,'untouchable');assert.ok(result.message.includes('Larry Bird'));
 assert.equal(E.orgStrategy(w,'PHI'),'retool');
 assert.equal(w.picks.filter(p=>p.year===1980).length,44);
}
{
 const w=world(),us=w.picks.find(p=>p.id==='pick-1980-1-PHI'),them=w.picks.find(p=>p.id==='pick-1980-2-BOS');
 const r=E.tradePackage(w,'BOS',[{kind:'pick',id:us.id}],[{kind:'pick',id:them.id}]);
 assert.equal(r.ok,true,r.message);assert.equal(us.owner,'BOS');assert.equal(them.owner,'PHI');
 E.advance(w,1000);E.playoffs(w);E.offSeasonNext(w);
 assert.equal(w.phase,'offseason');assert.equal(w.offseasonStep,1);
 const assets=E.currentDraftAssets(w);const first=assets.find(x=>x.originalTeam==='PHI'&&x.round===1),second=assets.find(x=>x.originalTeam==='BOS'&&x.round===2);
 assert.equal(first.owner,'BOS');assert.equal(second.owner,'PHI');
 // Move the draft clock to the transferred BOS second-rounder; our GM must select here.
 const to=assets.findIndex(x=>x.id===second.id);while(w.draftPos<to)E.draftPick(w,'auto');
 assert.equal(E.draftOrder(w)[w.draftPos],'PHI');
 let pick=E.draftPick(w,w.draft[0].id);assert.equal(pick.owner,'PHI');assert.equal(pick.asset,second.id);
 assert.equal(second.used,true);
}
{
 const w=world(),p=w.players.find(x=>x.name==='Nate Archibald');const deal=E.findDeal(w,p.id);
 assert.equal(deal.status,'offer',deal.message);
 assert.equal(E.evaluatePackage(w,deal.team,deal.give,deal.receive).ok,true);
 const done=E.tradePackage(w,deal.team,deal.give,deal.receive);assert.equal(done.ok,true);
 assert.equal(p.team,'PHI');
 const after=E.findDeal(w,p.id);assert.equal(after.status,'unavailable');
}
{
 const w=world(),old=structuredClone(w);old.version=1;delete old.picks;delete old.gm.name;delete old.gm.title;
 let migrated=E.validateSave(old);assert.equal(migrated.version,2);assert.equal(migrated.picks.length,22*2*5);assert.ok(migrated.gm.title);
}
{
 const w=world(),target=w.picks.find(x=>x.owner==='BOS'&&x.round===1);
 const a=E.assetWorth(w,{kind:'pick',id:target.id},'BOS');
 w.teams.find(t=>t.id==='BOS').strategy='rebuild';const b=E.assetWorth(w,{kind:'pick',id:target.id},'BOS');
 w.teams.find(t=>t.id==='BOS').strategy='winNow';const c=E.assetWorth(w,{kind:'pick',id:target.id},'BOS');
 assert.ok(b>a && a>c,'Rebuilders should value future picks most');
}
console.log('PASS — real pick ownership and drafting, protected stars, Find Deal, old-save migration, trade philosophy valuations.');
