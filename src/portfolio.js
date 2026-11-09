const value=v=>typeof v==='string'?v.trim():''
const str=(fields,key)=>value(fields[key])||'[À compléter]'
const cell=s=>s.replaceAll('\\','\\\\').replaceAll('|','\\|').replace(/\r?\n/g,' / ')
export const nextKeys=['projet','public','besoin','proposition','action','format']
function clean(v){
 const s=value(v)
 return !s || /^\[?à compl[ée]ter\]?\.?$/i.test(s)?'':s.slice(0,3000)
}
export function readS14(markdown){
 const blocks=new Map()
 for(const part of String(markdown).replaceAll('\r','').split(/^##[ \t]+/m).slice(1)){
  const pos=part.indexOf('\n')
  if(pos>0)blocks.set(part.slice(0,pos).trim(),value(part.slice(pos+1)))
 }
 const base=blocks.get('Point de départ S13')||''
 const pairs=new Map()
 for(const group of base.split(/\n\s*\n/g)){
  const m=group.trim().match(/^([^\n]+?)\s*:\s*\n([\s\S]+)$/)
  if(m)pairs.set(m[1].trim(),clean(m[2]))
 }
 const raw=[...blocks].filter(([heading])=>/^[ABC]\s*[·–—]/.test(heading)).map(([,v])=>clean(v)).filter(Boolean)
 const final=clean(blocks.get('Message retenu en entier'))
 const first=raw.find(v=>v!==final)||raw[0]||''
 const second=final&&final!==first?final:raw.find(v=>v!==first)||''
 const data={source:pairs.get('Source et repère'),s16_public:pairs.get('Public'),s16_action:pairs.get('Action unique'),variante1:first,variante2:second}
 return Object.fromEntries(Object.entries(data).filter(([,v])=>Boolean(v)))
}
export function emptyDestinations(input,fields){
 return Object.fromEntries(Object.entries(input).filter(([key])=>!value(fields[key])))
}
export function buildHandoff(fields){
 return {schema:'ln-ia-preparation-s16/v1',seance:'S15 · 13 novembre 2026',statut:'BROUILLON — À RELIRE',champs:nextKeys.map(champ=>({champ,valeur:value(fields['s16_'+champ])||null,source_ou_justification:value(fields['ref_'+champ])||null})),regle_decrite_par_le_candidat:value(fields.condition)||null,regle_etalon:{precondition:'texte renseigné',test:'longueur > 400',si_vrai:'À raccourcir',sinon:'Longueur acceptable'},moteur_observe:fields.obs400&&fields.obs401?'JavaScript local du navigateur':null,essais:[400,401].map(n=>({longueur:n,prediction:value(fields['prev'+n])||null,observation:value(fields['obs'+n])||null})),limite:value(fields.limite)||null,decision_du_pilote:null}
}
export function buildTrace(fields,checks,content){
 const out=['# Comprendre les règles d’automatisation','','S15 · vendredi 13 novembre 2026','Preuve : preuve-15-regles-adaptation-automatisation','Statut : BROUILLON — À RELIRE']
 for(const [key,label] of [['source','Source et repère'],['variante1','Variante S14 n° 1'],['variante2','Variante S14 n° 2'],['invariant','Fait invariant et appui'],['variable','Variable et valeurs observées'],['gabarit','Mon gabarit'],['condition','Condition'],['repetition','Répétition']])out.push('','## '+label,str(fields,key))
 out.push('','## Tests aux bornes','','Règle étalon du carnet : pour un texte renseigné, longueur > 400 donne « À raccourcir ». À 400 ou moins, la longueur est acceptable.','', '| Entrée | Ma prédiction | Observation après exécution |','|---|---|---|')
 for(const n of [400,401])out.push('| '+n+' caractères | '+cell(str(fields,'prev'+n))+' | '+cell(str(fields,'obs'+n))+' |')
 out.push('',fields.obs400&&fields.obs401?'Essais enregistrés après exécution locale dans le navigateur (JavaScript).':'Essais du carnet en attente.')
 for(const [key,label] of [['conclusiontests','Interprétation des résultats'],['avant','Contre-exemple avant correction'],['apres','Correction humaine'],['motif','Passage source et raison'],['limite','Limite du contrôle automatique']])out.push('','## '+label,str(fields,key))
 out.push('','## Tableau à reprendre en S16','','| Champ | Valeur | Source ou justification |','|---|---|---|')
 for(const k of nextKeys)out.push('| '+k+' | '+cell(str(fields,'s16_'+k))+' | '+cell(str(fields,'ref_'+k))+' |')
 out.push('','## Autoévaluation',...content.criteres.map((s,i)=>'- ['+(checks[i]?'x':' ')+'] '+s),'','Observation et décision du pilote : en attente.','')
 return out.join('\n')
}
export function buildIndex(fields){
 return ['# Entrée à ajouter au portfolio du Module 04','','Vendredi 13 novembre 2026 · S15','Preuve : preuve-15-regles-adaptation-automatisation','Trace : ../04-communication/comprendre-regles-automatisation.md','Source : '+str(fields,'source'),'Invariant : '+str(fields,'invariant'),'Variable : '+str(fields,'variable'),'Condition décrite : '+str(fields,'condition'),'Les observations suivantes portent sur la règle étalon (longueur > 400).','Observation à 400 : '+str(fields,'obs400'),'Observation à 401 : '+str(fields,'obs401'),'Correction justifiée : '+str(fields,'motif'),'Limite expliquée : '+str(fields,'limite'),'Observation effective du pilote : [à renseigner]','Date et décision du pilote : [en attente]',''].join('\n')
}
