import { readFile, writeFile } from 'node:fs/promises'
const d = JSON.parse(await readFile(new URL('../src/seance.json', import.meta.url), 'utf8'))
import {escape,buildDemo,buildFields,stepLabels} from './rendu.mjs'
const cas = JSON.parse(await readFile(new URL('../public/ressources/demo/cas-regles-s15.json',import.meta.url),'utf8'))
const digits = n => String(n).padStart(2,'0')
const headings = {
 presentation:['Projection collective','Le diaporama de S15','25 diapositives, leurs notes et deux parties pour conduire la séance du vendredi 13 novembre.'],
 methode:['Comprendre · première partie','Du fait stable à la règle','Ouvrez les six notions puis composez un message avec un gabarit. Changez une valeur et observez ce qui doit rester fidèle à la source.'],
 demonstration:['Cas de S14, guide d’été et Samira','Mettre la règle à l’épreuve','Cinq séquences à projeter. Demandez une prédiction au groupe avant de révéler la mesure ou la correction.'],
 atelier:['Approfondir · carnet candidat','Mon carnet d’essais','Reprenez deux formulations, écrivez la règle, prédisez ses sorties et gardez la preuve de ce que vous avez réellement observé.'],
 prompts:['Quatre missions à copier','Confier un plan de tests à un agent','Précisez les fichiers fictifs autorisés, la mission et le point d’arrêt. Distinguez le résultat prévu de celui qui a été exécuté.'],
 flashcards:['Mémorisation active','Douze cartes pour expliquer la règle','Répondez avec vos mots avant de retourner la carte. Appuyez chaque réponse sur un exemple de la séance.'],
 quiz:['Évaluation formative','Huit décisions de contrôle','Choisissez une réponse par situation. Le corrigé indique ce qu’il faut revoir avant la manipulation guidée de S16.'],
 validation:['Revue avant S16','Montrer les résultats et leur limite','La preuve porte sur votre règle, ses deux essais et la correction dont vous pouvez retrouver la source.'],
 portfolio:['Preuve du vendredi 13 novembre','Classer la trace et préparer S16','Conservez les résultats réellement observés, la correction humaine et les données du prochain notebook.'],
 ressources:['Matériel du formateur et des candidats','Les ressources de la séance','Téléchargez le conducteur, le support à projeter, les documents remplissables, le guide d’été et les fichiers de démonstration.']
}
const icons = {
 home:'M3 10 12 3l9 7v10h-6v-7H9v7H3z',play:'M7 4l13 8-13 8z',compass:'M19 5l-4 10-10 4 4-10z',layers:'M2 8l10-5 10 5-10 5zM3 12l9 5 9-5M3 16l9 5 9-5',edit:'M4 19l4-1L20 6l-3-3L5 15zM13 6l4 4',braces:'M9 3H7v6l-3 3 3 3v6h2M15 3h2v6l3 3-3 3v6h-2',cards:'M7 5h13v14H7zM4 8H2v13h13v-1',help:'M8 8a4 4 0 0 1 8 0c0 3-4 3-4 7m0 4h.01',check:'M3 12l6 6L21 5',folder:'M2 6h7l2 3h11v11H2z',book:'M3 5h6l3 2 3-2h6v14h-6l-3 2-3-2H3zM12 7v14'
}
const svg = k=>'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="'+icons[k]+'"/></svg>'
const groups=d.groups
const values={}
values.nav=d.rubriques.map(([id,t,icon],n)=>'<a href="#'+id+'" data-nav="'+id+'">'+svg(icon)+'<span>'+t+'</span><small>'+digits(n+1)+'</small></a>').join('')
const posterPath=slug=>'./ressources/affiches/'+slug+'.png'
const poster=(slug,title)=>'<figure class="poster"><a href="'+posterPath(slug)+'" target="_blank" rel="noopener" aria-label="Agrandir : '+escape(title)+'"><img src="'+posterPath(slug)+'" alt="'+escape(title)+'" loading="lazy" decoding="async" width="1055" height="1491"></a><figcaption>'+escape(title)+' · <a href="'+posterPath(slug)+'" download>Télécharger le PNG</a></figcaption></figure>'
values.moduleposter='<div class="poster-feature">'+poster('module-04','Module 04 → Communication assistée et automatisation progressive')+'<div><p class="eyebrow">LE PARCOURS DU MODULE 04</p><h3>De la source au message corrigé</h3><p>S13 : partir du guide. S14 : comparer trois variantes. S15 : tester une règle et vérifier sa limite. S16 : reprendre les données dans le notebook.</p><a class="inklink" href="#ressources">Retrouver les cinq affiches →</a></div></div>'
values.atelierposter='<details class="poster-details"><summary>Le repère visuel de S15 · vérifier une règle</summary>'+poster('seance-15','Séance 15 → Que vérifie une règle ?')+'</details>'
values.suiteposter='<div class="poster-feature">'+poster('seance-16','Séance 16 → Du notebook au message corrigé')+'<div><p class="eyebrow">POURSUIVRE EN S16</p><h3>Du notebook au message corrigé</h3><p>Gardez votre règle testée, les deux résultats, la limite expliquée et la correction sourcée. Reprenez le tableau de données préparé dans votre trace pour continuer le travail.</p><a class="inklink" href="#atelier">Compléter les données de S16 ·</a></div></div>'
values.affiches='<div class="subheading"><h3>Les affiches du module 04</h3><p>Ouvrez une affiche pour la lire en grand ou téléchargez son original pour la projection.</p></div><div class="poster-gallery">'+[["module-04","Module 04 · Communication assistée · Automne 2026"],["seance-13","Séance 13 · du guide au message"],["seance-14","Séance 14 · un message, trois variantes"],["seance-15","Séance 15 · vérifier une règle"],["seance-16","Séance 16 · Du notebook au message corrigé"]].map(([slug,title])=>poster(slug,title)).join('')+'</div>'
values.calendar=d.cal.map(([n,date,v,copy],i)=>'<article class="session '+(i===2?'current':'')+'"><a class="session-poster" href="'+posterPath('seance-'+n)+'" target="_blank" rel="noopener" aria-label="Agrandir l’affiche de la séance '+n+'"><img src="'+posterPath('seance-'+n)+'" alt="Affiche de la séance '+n+' : '+escape(v)+'" loading="lazy" decoding="async" width="1055" height="1491"></a><small>S'+n+' / '+date+'</small><h3>'+v+'</h3><p>'+copy+'</p></article>').join('')
values.slideindex=d.slides.map(([t],i)=>'<button class="s-index" data-slide="'+i+'"><span>'+digits(i+1)+'</span><b>'+escape(t)+'</b><i aria-hidden="true">↗</i></button>').join('')
values.questions=d.questions.map(([a,b,c],i)=>'<details class="qcard"><summary><small>'+a+'</small><b>'+escape(b)+'</b><i aria-hidden="true">+</i></summary><p>'+escape(c)+'</p></details>').join('')
values.roles=d.roles.map(([a,b])=>'<div><b>'+a+'</b><p>'+escape(b)+'</p></div>').join('')
values.demobuttons=stepLabels.map((a,i)=>'<button type="button" data-demo="'+i+'"><small>'+digits(i+1)+'</small> '+a+'</button>').join('')
values.demopanels=buildDemo(cas)
values.modelinputs=Object.entries(cas.gabaritChamps).map(([key,val])=>'<div class="formfield '+(key==='action'?'span-all':'')+'"><label for="model-'+key+'">Valeur de '+key+'</label><input class="form-control" id="model-'+key+'" maxlength="1000" value="'+escape(val)+'"></div>').join('')
values.atelierfields=buildFields(d)
values.ouverture=escape(cas.ouverture)
values.casjson=JSON.stringify(cas).replaceAll('<','\\u003c')
values.prompts=d.prompts.map(([a,b,c],i)=>'<article class="promptcard"><small>'+a+'</small><h3>'+b+'</h3><p id="prompt-'+i+'">'+escape(c)+'</p><button class="mini" data-copy="'+i+'">Copier le prompt ⧉</button></article>').join('')
values.quiz=d.quiz.map(([q,options],i)=>'<fieldset class="quizq"><legend><span>'+digits(i+1)+'</span> '+escape(q)+'</legend>'+options.map((s,k)=>'<label><input class="form-check-input" type="radio" value="'+k+'" name="q'+i+'"> <span>'+escape(s)+'</span></label>').join('')+'<p class="qfeedback" id="feedback-'+i+'" hidden></p></fieldset>').join('')
values.criteria=d.criteres.map((c,i)=>'<label class="criterion"><input class="form-check-input" type="checkbox" data-criterion="'+i+'"> <span>'+escape(c)+'</span></label>').join('')
values.resources=groups.map(([title,entries])=>'<div class="resource-group"><h3>'+title+'</h3><div class="downloads">'+entries.map(([p,t,fmt])=>'<a href="./ressources/'+p+'" download><span class="format">'+fmt+'</span><span>'+escape(t)+'</span><b aria-hidden="true">↓</b></a>').join('')+'</div></div>').join('')
for(const [id,[k,title,intro]] of Object.entries(headings))values['head:'+id]='<div class="section-head"><p class="eyebrow"><i></i> '+escape(k.toUpperCase())+'</p><h2 id="titre-'+id+'">'+escape(title)+'</h2><p>'+escape(intro)+'</p></div>'
let baseURL
if (process.env.ATELIER_PUBLIC_URL) {
  baseURL=new URL(process.env.ATELIER_PUBLIC_URL)
  if(!['http:','https:'].includes(baseURL.protocol)) throw new Error('ATELIER_PUBLIC_URL doit être une URL HTTP(S) publique')
  if(!baseURL.pathname.endsWith('/')) baseURL.pathname+='/'
}
values.ogimage=baseURL?escape(new URL('ressources/atelier/affiche-s15.png',baseURL).href):'./ressources/atelier/affiche-s15.png'
values.canonical=baseURL?'<link rel="canonical" href="'+escape(baseURL.href)+'"><meta property="og:url" content="'+escape(baseURL.href)+'">':''
values.jsonld=JSON.stringify({'@context':'https://schema.org','@type':'LearningResource',name:'Que vérifie une règle ? — séance 15',inLanguage:'fr',educationalLevel:'Initiation',teaches:'Tester une condition aux bornes et vérifier la fidélité d’un message à sa source',learningResourceType:'Atelier de formation',timeRequired:'PT90M',author:{'@type':'Person',name:'Abderrahman El Hisse'},isPartOf:{'@type':'Course',name:'Challenge 100 Jours — Apprendre à produire avec l’IA'},...(baseURL?{url:baseURL.href}:{})}).replaceAll('<','\\u003c')
const tmpl=await readFile(new URL('../src/atelier.html',import.meta.url),'utf8')
const page=tmpl.replace(/\{\{([a-z:]+)\}\}/g,(_,k)=>{if(!(k in values))throw new Error('Clé inconnue '+k);return values[k]})
await writeFile(new URL('../index.html',import.meta.url),page)
