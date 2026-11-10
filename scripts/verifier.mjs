import { apercusPropagation } from '../src/propagation.js'
import assert from 'node:assert/strict'
import {readFile,stat} from 'node:fs/promises'
import {basename} from 'node:path'
import {createHash} from 'node:crypto'
import {Script} from 'node:vm'
import {buildTrace,buildIndex,buildHandoff,readS14,emptyDestinations} from '../src/portfolio.js'
import {SEUIL,countChars,inspectText,boundaryText,assemble} from '../src/regles.js'

const root=new URL('../',import.meta.url)
const bytes=file=>readFile(new URL(file,root))
const read=async file=>(await bytes(file)).toString('utf8')
const data=JSON.parse(await read('src/seance.json')), c=JSON.parse(await read('public/ressources/demo/cas-regles-s15.json'))
const nav=['accueil','presentation','methode','demonstration','atelier','prompts','flashcards','quiz','validation','portfolio','ressources']
assert.deepEqual(data.rubriques.map(item=>item[0]),nav)
assert.deepEqual([data.slides.length,data.questions.length,data.cards.length,data.quiz.length,data.prompts.length],[25,6,12,8,4])
assert(data.quiz.every(([,ops,ans,why])=>ans>=0&&ans<ops.length&&why.length>20))
assert.equal(c.seuil,SEUIL)
assert.deepEqual([c.messageA,c.messageC,c.samira.avant,c.samira.apres].map(countChars),[149,159,28,76])
assert.equal(countChars('🙂é'),2)
for(const [n,response] of [[400,c.ok],[401,c.alerte]]){
 const t=boundaryText(n);assert.equal(t.length,n);assert.equal(inspectText(t).resultat,response)
}
assert.throws(()=>boundaryText(399),RangeError)
assert.equal(inspectText('').resultat,'À compléter');assert.equal(inspectText('   ').present,false)
assert.equal(inspectText(c.samira.avant).resultat,c.ok);assert.equal(inspectText(c.samira.apres).resultat,c.ok)
assert.equal(assemble(c.gabarit,c.gabaritChamps).text.length,127)
for(const tpl of ['{titre}—{action}','{titre} {proposition} {action} {action}','{titre} {autre} {action}','{titre} {proposition} {action}}'])assert(assemble(tpl,c.gabaritChamps).error)
assert(assemble(c.gabarit,{...c.gabaritChamps,action:''}).error)
assert.deepEqual(c.ete.formats.map(f=>inspectText(f.texte).longueur),[100,193,197,122])
for(const f of c.ete.formats){
 assert(f.texte.includes('huit annexes'));assert.equal(f.texte.split(c.ete.action).length,2)
 assert.equal(inspectText(f.texte).longueur,inspectText(f.texte.replace('huit annexes','neuf annexes')).longueur)
}
const prev=await read('public/ressources/sources/message-s14-exemple.md')
const incoming=readS14(prev.replaceAll('\n','\r\n'))
assert.equal(incoming.variante1,c.messageA);assert.equal(incoming.variante2,c.messageC);assert.equal(incoming.s16_public,c.public);assert.equal(incoming.s16_action,c.action);assert(incoming.source.includes('fictif'))
assert(!Object.hasOwn(emptyDestinations(incoming,{variante1:'Déjà présent'}),'variante1'))
assert.deepEqual(readS14('## Autre rubrique\nun texte'),{})
const same=readS14('## A · Courte\nPremier\n## B · Chaleureuse\nAutre\n## Message retenu en entier\nPremier')
assert.deepEqual([same.variante1,same.variante2],['Autre','Premier'])
assert.deepEqual(readS14('## A · Courte\n[À compléter]\n## Message retenu en entier\n[À compléter]'),{})
const f={...incoming,invariant:c.fait1,variable:c.variable,gabarit:c.gabarit,condition:'Si la longueur est supérieure à 400, alors raccourcir.',prev400:c.ok,prev401:c.alerte,obs400:c.ok,obs401:c.alerte,avant:c.samira.avant,apres:c.samira.apres,motif:c.samira.motif,limite:'La longueur ne vérifie pas les faits.',s16_projet:'Atelier | communication',ref_projet:'Source S12\nÉtape 5'}
const tr=buildTrace(f,[true],data),ix=buildIndex(f),note=buildHandoff(f)
for(const t of [c.messageA,c.messageC,c.samira.avant,c.samira.apres,c.preuve,'400 caractères','401 caractères','[x]','Atelier \\| communication','Source S12 / Étape 5'])assert(tr.includes(t),t)
assert(ix.includes('../'+c.trace)&&ix.includes(c.preuve)&&ix.includes(f.limite))
assert.equal(note.essais[0].observation,c.ok);assert.equal(note.essais[1].observation,c.alerte);assert.equal(note.champs.length,6);assert.equal(note.decision_du_pilote,null)
assert.equal(buildHandoff({}).essais[0].observation,null);assert.equal(buildHandoff({}).champs[0].valeur,null)
const posterFiles=['module-04','seance-13','seance-14','seance-15','seance-16'].map(slug=>'ressources/affiches/'+slug+'.png')
const files=[...data.groups.flatMap(([,entries])=>entries.map(([p])=>'ressources/'+p)),...posterFiles]
assert.equal(files.length,35);assert.equal(new Set(files).size,files.length)
const compiled=await read('dist/index.html'),single=await read('OUVRIR-SEANCE-15.html')
for(const html of [compiled,single]){
 assert.deepEqual([...html.matchAll(/<section id="([a-z]+)" class="page/g)].map(m=>m[1]),nav)
 const ids=[...html.matchAll(/\bid="([\w-]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length)
 for(const id of nav)assert(html.includes('href="#'+id+'"'))
 for(const [key] of data.champs)assert(ids.includes('f-'+key),key)
 assert(html.includes('name="description"')&&html.includes('property="og:image"')&&html.includes('name="twitter:card"'))
 const ld=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);assert.equal(ld.timeRequired,'PT90M');assert.equal(ld.inLanguage,'fr')
 assert(c.ete.formats.every(f=>html.includes(f.texte)));assert(html.includes(c.ouverture))
}
for(const m of compiled.matchAll(/\b(?:href|src)="(\.\/[^"#]+)"/g))assert((await stat(new URL('dist/'+m[1],root))).isFile(),m[1])
assert.deepEqual([...new Set([...compiled.matchAll(/href="\.\/(ressources\/[^"]+)"/g)].map(m=>m[1]))].sort(),[...files].sort())
const embedded=new Map()
for(const m of single.matchAll(/href="data:([a-z0-9+./-]+);base64,([A-Za-z0-9+/=]+)" data-resource="([^"]+)" download="([^"]+)"/g)){
 assert.equal(m[4],basename(m[3]));if(!embedded.has(m[3]))embedded.set(m[3],Buffer.from(m[2],'base64'))
}
assert.equal(embedded.size,files.length)
for(const file of files){const b=await bytes('public/'+file);assert(b.equals(embedded.get(file)),file);assert(b.equals(await bytes('dist/'+file)),file)}
assert(!/<script[^>]+src=|type="module"|<link[^>]+rel="stylesheet"|(?:href|src)="\.\/(?:assets|ressources)\//.test(single));new Script([...single.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1])
assert.equal(createHash('sha256').update(await bytes('src/vendor/bootstrap.min.css')).digest('hex'),'d85327d99c7a3ee1f9b5d0500d1370acea3ad2db39c163c2f51f232baedbdede')
console.log('25 diapositives, 11 rubriques, 12 cartes, 8 questions, 4 prompts ; navigation et 35 ressources autonomes vérifiées.')
console.log('Import S14, gabarit, essais 400/401, contre-exemple, quatre formats et trois exports contrôlés.')

const essaisPropagation=['neuf','huit'].map(n=>apercusPropagation(n))
for(const [i,sorties] of essaisPropagation.entries()){
 assert.deepEqual(sorties.map(([format])=>format),['Court','Communautaire','Professionnel'])
 assert.deepEqual(sorties.map(([,t])=>Array.from(t).length), [107,143,152])
 assert(sorties.every(([,t])=>t.includes((i===0?'neuf':'huit')+' annexes')))
}
for(const [i,[,avant]] of essaisPropagation[0].entries())assert.equal(avant.replace('neuf annexes','huit annexes'),essaisPropagation[1][i][1])
console.log('Prolongement contrôlé sur trois brouillons avant et après correction du champ source.')
