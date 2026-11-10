import { initPropagation } from './propagation.js'
import './vendor/bootstrap.min.css'
import './style.css'
import content from './seance.json'
import {buildTrace,buildIndex,buildHandoff,readS14,emptyDestinations} from './portfolio.js'
import {inspectText,boundaryText,assemble} from './regles.js'

const $=selector=>document.querySelector(selector)
const $$=selector=>Array.from(document.querySelectorAll(selector))
const pad=n=>String(n).padStart(2,'0')
const storageKey='lnia.s15.automne2026.v1'
let saved={}
try {saved=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}} catch {}
const state={fields:{},criteria:Array(content.criteres.length).fill(false),quiz:Array(content.quiz.length).fill(null)}
for(const [id] of content.champs){if(typeof saved.fields?.[id]==='string')state.fields[id]=saved.fields[id].slice(0,3000)}
state.criteria=state.criteria.map((_,i)=>saved.criteria?.[i]===true)
state.quiz=state.quiz.map((_,i)=>Number.isInteger(saved.quiz?.[i])&&saved.quiz[i]>=0&&saved.quiz[i]<content.quiz[i][1].length?saved.quiz[i]:null)
let toastTimer
function tell(message){$('#toast').textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{$('#toast').textContent=''},2600)}
function persist(){
 try{localStorage.setItem(storageKey,JSON.stringify(state));$('#save-state').textContent='Brouillon conservé dans ce navigateur. Téléchargez la trace pour la garder dans votre dossier.'}
 catch{$('#save-state').textContent='Cette fenêtre ne peut pas mémoriser les réponses. Téléchargez la trace avant de la fermer.'}
}
function route(initial=false){
 const key=location.hash.slice(1)
 const page=content.rubriques.find(s=>s[0]===key)??content.rubriques[0]
 $$('.page').forEach(sec=>{sec.classList.toggle('is-active',sec.id===page[0])})
 $$('[data-nav]').forEach(a=>{if(a.dataset.nav===page[0])a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})
 $('#crumb-page').textContent=page[1];$('#menu-toggle').setAttribute('aria-expanded','false')
 if(page[0]==='portfolio')refreshProof()
 if(!initial){window.scrollTo({top:0,behavior:'instant'});$('#contenu').focus({preventScroll:true})}
}
$('#menu-toggle').addEventListener('click',e=>e.currentTarget.setAttribute('aria-expanded',String(e.currentTarget.getAttribute('aria-expanded')!=='true')))
window.addEventListener('hashchange',()=>route())
$$('[data-nav]').forEach(item=>item.addEventListener('click',()=>$('#menu-toggle').setAttribute('aria-expanded','false')))

const dlg=$('#projection');let slide=0,notes=false
function drawSlide(){
 const [title,lead,items,note]=content.slides[slide]
 $('#slide-no').textContent='DIAPOSITIVE '+pad(slide+1)+' / '+pad(content.slides.length)
 $('#slide-title').textContent=title;$('#slide-lead').textContent=lead
 $('#slide-items').replaceChildren(...items.map(t=>{const el=document.createElement('li');el.textContent=t;return el}))
 $('#slide-notes').textContent='Pour le formateur · '+note;$('#slide-notes').hidden=!notes
 $('#slide-note-toggle').setAttribute('aria-pressed',String(notes))
 $('#slide-back').disabled=slide===0;$('#slide-forward').disabled=slide===content.slides.length-1
}
function shiftSlide(i){slide=Math.max(0,Math.min(i,content.slides.length-1));drawSlide()}
$$('[data-slide]').forEach(b=>b.addEventListener('click',()=>{notes=false;shiftSlide(Number(b.dataset.slide));dlg.showModal();$('#project-close').focus()}))
$('#slide-forward').onclick=()=>shiftSlide(slide+1);$('#slide-back').onclick=()=>shiftSlide(slide-1)
$('#slide-note-toggle').onclick=()=>{notes=!notes;drawSlide()}
$('#project-close').onclick=()=>dlg.close()
$('#project-full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(dlg.requestFullscreen)await dlg.requestFullscreen();else tell('Utilisez le mode plein écran de votre navigateur.')}catch{tell('Le mode projection reste disponible dans cette fenêtre.')}}
dlg.addEventListener('close',()=>{if(document.fullscreenElement===dlg)document.exitFullscreen().catch(()=>{});notes=false})
document.addEventListener('fullscreenchange',()=>$('#project-full').textContent=document.fullscreenElement?'Quitter le plein écran':'Plein écran')
document.addEventListener('keydown',e=>{if(!dlg.open)return;const map={ArrowRight:slide+1,ArrowLeft:slide-1,Home:0,End:content.slides.length-1};if(Object.hasOwn(map,e.key)){e.preventDefault();shiftSlide(map[e.key])}})

const cas=JSON.parse($('#donnees-cas').textContent)
const panels=$$('[data-panel]')
let step=0
function showDemo(n){
 step=Math.min(Math.max(0,n),panels.length-1)
 panels.forEach((el,i)=>el.classList.toggle('active',i===step))
 $$('[data-demo]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.demo)===step)))
 $('#demo-prev').disabled=step===0
 $('#demo-next').disabled=step===panels.length-1
}
$$('[data-demo]').forEach(b=>b.onclick=()=>showDemo(Number(b.dataset.demo)))
$('#demo-prev').onclick=()=>showDemo(step-1)
$('#demo-next').onclick=()=>showDemo(step+1)

const labData={A:cas.messageA,C:cas.messageC,400:boundaryText(400),401:boundaryText(401),faux:cas.samira.avant,corrige:cas.samira.apres,vide:''}
function resetLab(){ $('#lab-result').textContent='En attente de votre prédiction et du test.' }
function selectExample(){
 $('#lab-text').value=labData[$('#lab-case').value]
 $('#lab-pred').value='';resetLab()
}
$('#lab-case').onchange=selectExample
$('#lab-text').oninput=resetLab
$('#lab-pred').onchange=resetLab
$('#lab-run').onclick=()=>{
 const prediction=$('#lab-pred').value
 if(!prediction){$('#lab-result').textContent='Annoncez votre prédiction avant d’exécuter le test.';$('#lab-pred').focus();return}
 const observation=inspectText($('#lab-text').value)
 const accord=prediction===observation.resultat?'Votre prédiction correspond à la sortie.':'Revenez à la condition pour expliquer l’écart avec votre prédiction.'
 $('#lab-result').textContent=observation.longueur+' caractère(s) · '+observation.resultat+'. '+accord+(observation.present?' La fidélité reste à examiner.':' Le contenu doit être renseigné.')
}
const modelKeys=['titre','proposition','action']
function drawModel(){
 const values=Object.fromEntries(modelKeys.map(k=>[k,$('#model-'+k).value]))
 const result=assemble($('#model-layout').value,values)
 const out=$('#model-output')
 out.classList.toggle('invalid',Boolean(result.error))
 out.textContent=result.error||result.text
}
$('#model-run').onclick=drawModel
for(const field of ['layout',...modelKeys])$('#model-'+field).oninput=()=>{$('#model-output').textContent='Valeurs modifiées. Assemblez le brouillon pour observer le changement.'}
let hasError=false
$('#repeat-error').onclick=()=>{
 hasError=!hasError
 for(const f of cas.ete.formats){
  const node=$('[data-format-text="'+f.id+'"]')
  node.textContent=hasError?f.texte.replace('huit annexes','neuf annexes'):f.texte
  node.closest('details').open=true
 }
 $('#repeat-error').setAttribute('aria-pressed',String(hasError))
 $('#repeat-error').textContent=hasError?'Restaurer la donnée du guide':'Simuler une erreur dans la donnée source'
 $('#repeat-note').textContent=hasError?'SIMULATION · « neuf annexes » remplace « huit annexes » dans les quatre sorties. Les longueurs restent identiques. Le sommaire et les annexes du guide permettent de corriger la donnée avant de relancer.':'Les quatre brouillons reprennent la donnée du guide. Ouvrez son sommaire pour la vérifier.'
}

let importData={}, importTicket=0
function clearImport(){
 importTicket++
 importData={}
 $('#s14-file').value=''
 $('#import-status').textContent=''
 $('#import-preview').hidden=true
 $('#apply-import').hidden=true
}
$('#s14-file').onchange=async e=>{
 const ticket=++importTicket
 const file=e.target.files[0]
 importData={}
 $('#import-preview').hidden=true
 $('#apply-import').hidden=true
 if(!file){$('#import-status').textContent='Aucun fichier sélectionné.';return}
 if(file.size>256000){$('#import-status').textContent='Choisissez la fiche Markdown de S14 (moins de 250 Ko).';return}
 try{
  const data=readS14(await file.text())
  if(ticket!==importTicket)return
  const candidates=emptyDestinations(data,state.fields)
  if(!Object.keys(data).length){$('#import-status').textContent='Aucune rubrique exploitable de S14. Saisissez vos données dans le carnet ou essayez la trace fictive.';return}
  if(!Object.keys(candidates).length){$('#import-status').textContent='Les champs reconnus sont déjà renseignés. Votre saisie est conservée.';return}
  importData=candidates
  const labels=new Map(content.champs.map(([key,label])=>[key,label]))
  $('#import-preview').textContent=Object.entries(candidates).map(([key,value])=>labels.get(key)+' : '+value).join('\n\n')
  $('#import-preview').hidden=false;$('#apply-import').hidden=false
  $('#import-status').textContent=Object.keys(candidates).length+' champ(s) disponible(s) dans '+file.name+'. Vérifiez l’aperçu.'
 }catch{if(ticket===importTicket)$('#import-status').textContent='Cette fiche ne peut pas être lue. Utilisez les champs manuels.'}
}
$('#apply-import').onclick=()=>{
 const available=emptyDestinations(importData,state.fields)
 for(const [id,value] of Object.entries(available)){state.fields[id]=value;$('#f-'+id).value=value}
 const total=Object.keys(available).length
 clearImport();persist();refreshProof()
 $('#import-status').textContent=total+' champ(s) repris. Gardez vos prédictions pour les saisir avant les deux essais.'
}
let flash=0,flipped=false
function showCard(){
 const [q,a]=content.cards[flash];$('#flash-count').textContent='CARTE '+pad(flash+1)+' / '+pad(content.cards.length)
 $('#flash-q').textContent=q;$('#flash-a').textContent=a;$('#flash-a').hidden=!flipped
 $('#flip').textContent=flipped?'Masquer la réponse':'Révéler la réponse';$('#flip').setAttribute('aria-expanded',String(flipped))
 $('#flash-prev').disabled=flash===0;$('#flash-next').disabled=flash===content.cards.length-1
}
$('#flip').onclick=()=>{flipped=!flipped;showCard()};$('#flash-next').onclick=()=>{flash++;flipped=false;showCard()};$('#flash-prev').onclick=()=>{flash--;flipped=false;showCard()}

$$('[data-copy]').forEach(b=>b.onclick=async()=>{
 const text=content.prompts[Number(b.dataset.copy)][2];let success=false
 try{await navigator.clipboard.writeText(text);success=true}catch{}
 if(!success){const sel=window.getSelection(),range=document.createRange();range.selectNodeContents($('#prompt-'+b.dataset.copy));sel.removeAllRanges();sel.addRange(range);try{success=document.execCommand('copy')}catch{}if(success)sel.removeAllRanges()}
 tell(success?'Prompt copié.':'Texte sélectionné. Utilisez Ctrl+C ou Copier.')
})

function cleanQuizFeedback(){
 $$('.qfeedback').forEach(e=>e.hidden=true);$('#quiz-result').textContent='Huit situations de contrôle. Chaque réponse reçoit une explication.'
}
$('#quiz-form').addEventListener('change',e=>{if(e.target.name?.startsWith('q')){state.quiz[Number(e.target.name.slice(1))]=Number(e.target.value);cleanQuizFeedback();persist()}})
state.quiz.forEach((v,i)=>{if(v!==null)$('#quiz-form input[name="q'+i+'"][value="'+v+'"]').checked=true})
$('#quiz-form').onsubmit=e=>{
 e.preventDefault();let good=0,answered=0
 content.quiz.forEach(([,choices,correct,why],i)=>{
  const resp=state.quiz[i],fb=$('#feedback-'+i);fb.hidden=false;fb.className='qfeedback'
  if(resp===null){fb.textContent='Sans réponse · choisissez une option pour cette situation.';return}
  answered++;if(resp===correct){good++;fb.classList.add('good');fb.textContent='Réponse juste. '+why}
  else{fb.classList.add('retry');fb.textContent='À reprendre. Réponse attendue : '+choices[correct]+'. '+why}
 })
 $('#quiz-result').textContent=good+' / '+content.quiz.length+' réponses justes · '+answered+' situations traitées. Le résultat est formatif. La décision du pilote se fonde sur la trace expliquée.'
}
$('#quiz-reset').onclick=()=>{$('#quiz-form').reset();state.quiz.fill(null);$$('#quiz-form input').forEach(el=>el.checked=false);cleanQuizFeedback();persist()}

function checkLabels(){const n=state.criteria.filter(Boolean).length;$('#check-count').textContent=n+' / '+content.criteres.length+' points déclarés par le candidat. Décision du pilote en attente.'}
$$('[data-criterion]').forEach((el,i)=>{el.checked=state.criteria[i];el.onchange=()=>{state.criteria[i]=el.checked;persist();checkLabels();refreshProof()}})
function setObserved(key,value){
 state.fields[key]=value
 $('#f-'+key).value=value
}
function clearObservations(){
 setObserved('obs400','');setObserved('obs401','')
 $('#boundary-feedback').textContent=''
}
for(const [id] of content.champs){
 const el=$('#f-'+id)
 el.value=state.fields[id]??''
 if(el.readOnly)continue
 el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{
  state.fields[id]=el.value
  if(id==='prev400'||id==='prev401')clearObservations()
  persist();refreshProof()
 })
}
$('#run-boundaries').onclick=()=>{
 if(!state.fields.prev400||!state.fields.prev401){
  $('#boundary-feedback').textContent='Inscrivez les deux prédictions avant de lancer les essais.'
  return
 }
 let matches=0
 for(const n of [400,401]){
  const result=inspectText(boundaryText(n))
  setObserved('obs'+n,result.resultat)
  if(result.resultat===state.fields['prev'+n])matches++
 }
 $('#boundary-feedback').textContent='Essais exécutés dans ce navigateur. '+matches+' prédiction(s) sur 2 correspondent aux sorties. Expliquez votre interprétation.'
 persist();refreshProof()
}
$('#worksheet').onsubmit=e=>e.preventDefault()
$('#ask-erase').onclick=()=>{$('#erase-confirm').hidden=false;$('#erase-no').focus()}
$('#erase-no').onclick=()=>{$('#erase-confirm').hidden=true;$('#ask-erase').focus()}
$('#erase-yes').onclick=()=>{
 state.fields={};state.criteria.fill(false);state.quiz.fill(null)
 for(const [id] of content.champs)$('#f-'+id).value=''
 $$('[data-criterion], #quiz-form input').forEach(input=>input.checked=false)
 try{localStorage.removeItem(storageKey)}catch{}
 clearImport();clearObservations();cleanQuizFeedback();checkLabels();refreshProof();$('#erase-confirm').hidden=true
 $('#save-state').textContent='Les saisies de cette séance ont été effacées dans ce navigateur.'
 $('#ask-erase').focus();tell('Fiche S15 remise à zéro.')
}
const getTrace=()=>buildTrace(state.fields,state.criteria,content)
const getIndex=()=>buildIndex(state.fields)
const downloadURLs={trace:null,index:null,handoff:null}
function refreshProof(){
 const trace=getTrace(), index=getIndex(), handoff=JSON.stringify(buildHandoff(state.fields),null,2)+'\n'
 $('#proof-preview').textContent=trace
 for(const [type,body] of Object.entries({trace,index,handoff})){
  const previous=downloadURLs[type]
  downloadURLs[type]=URL.createObjectURL(new Blob([body],{type:type==='handoff'?'application/json;charset=utf-8':'text/markdown;charset=utf-8'}))
  $$('[data-export="'+type+'"]').forEach(link=>link.href=downloadURLs[type])
  if(previous)setTimeout(()=>URL.revokeObjectURL(previous),1000)
 }
}
$('#copy-proof').onclick=async()=>{
 try {await navigator.clipboard.writeText(getTrace());tell('Trace S15 copiée.')}
 catch {const s=window.getSelection(),r=document.createRange();r.selectNodeContents($('#proof-preview'));s.removeAllRanges();s.addRange(r);tell('Trace sélectionnée. Utilisez Ctrl+C ou Copier.')}
}
route(true);showDemo(0);showCard();checkLabels();refreshProof();selectExample();drawModel()

initPropagation(document.querySelector('#prolongement-source'))
