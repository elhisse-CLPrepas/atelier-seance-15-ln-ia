import {nextKeys} from '../src/portfolio.js'
import {countChars} from '../src/regles.js'
export const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const para=value=>'<p>'+escape(value)+'</p>'
export const stepLabels=['Reprendre S14','Assembler','Tester la limite','Adapter','Corriger']
export function buildDemo(c){
 const cells=(a,b)=>'<div class="demopair"><div>'+a+'</div><div>'+b+'</div></div>'
 const panels=[
  ['Souligner ce qui reste vrai','Projet d’automne · guide S12 et journal V1/V2',para('Lisez ces deux textes. Demandez au groupe de nommer un fait commun, puis une formulation qui change.')+cells('<strong>A · '+countChars(c.messageA)+' CARACTÈRES</strong>'+escape(c.messageA),'<strong>C CORRIGÉE · '+countChars(c.messageC)+' CARACTÈRES</strong>'+escape(c.messageC))],
  ['Donner une place au titre, à la proposition et à l’action','Valeurs S12/S14 · gabarit reproductible',para('Le public et la source sont déjà fixés. Affichez les champs, faites prédire le texte obtenu puis ouvrez la réponse.')+'<code class="gabarit-dark">'+escape(c.gabarit)+'</code><dl class="variable-list">'+Object.entries(c.gabaritChamps).map(([k,v])=>'<div><dt>'+escape(k)+'</dt><dd>'+escape(v)+'</dd></div>').join('')+'</dl><details class="revealfinal"><summary>Afficher le brouillon assemblé</summary>'+para(c.gabaritChamps.titre+' — '+c.gabaritChamps.proposition+' '+c.gabaritChamps.action)+'</details>'],
  ['Prédire les deux issues de la condition','Seuil pédagogique de 400 · deux chaînes de test',para('Le premier étalon répète « 0123456789 » quarante fois. Le second ajoute la lettre X. Demandez au groupe d’annoncer les deux résultats avant de les révéler.')+'<pre class="code-demo">if len(texte) &gt; 400:\n    print("À raccourcir")\nelse:\n    print("Longueur acceptable")</pre><details class="revealfinal"><summary>Révéler les résultats attendus</summary>'+cells('<strong>400 CARACTÈRES</strong>Longueur acceptable.','<strong>401 CARACTÈRES</strong>À raccourcir.')+'</details>'],
  ['Appliquer les règles de format au guide d’été','Source professionnelle · Guide Situation-Actuelle-IA, édition maître V1.0',para('Ce second guide comprend huit chapitres et huit annexes. Ouvrez chaque brouillon adapté à partir du même fait. Dans le visuel textuel, repérez le titre, les deux mots-clés et l’action.')+'<div class="formats-demo">'+c.ete.formats.map(f=>'<details><summary>'+escape(f.nom)+' <small>'+countChars(f.texte)+' caractères</small></summary><p data-format-text="'+f.id+'">'+escape(f.texte)+'</p></details>').join('')+'</div><button class="pbtn mt-3" type="button" id="repeat-error" aria-pressed="false">Simuler une erreur dans la donnée source</button><p id="repeat-note" class="src-ref mt-2" aria-live="polite">Les quatre brouillons reprennent la donnée du guide. Ouvrez son sommaire pour la vérifier.</p>'],
  ['Corriger une promesse qui passe le test','Cas fictif de Samira · mini-guide de révisions',para(c.samira.source)+cells('<strong>AVANT · '+countChars(c.samira.avant)+' CARACTÈRES</strong>'+escape(c.samira.avant),'<strong>QUESTION À LA SALLE</strong>Quelle phrase de la fiche permettrait de promettre ce résultat ?')+'<details class="revealfinal"><summary>Montrer la correction expliquée</summary>'+para(c.samira.apres)+para(c.samira.motif)+'<p class="src-ref">Texte corrigé : '+countChars(c.samira.apres)+' caractères. Les deux textes satisfont la règle de longueur.</p></details>']
 ]
 return panels.map(([t,ref,body],i)=>'<article data-panel="'+i+'"><small class="src-ref">ÉTAPE 0'+(i+1)+' / 05</small><h3>'+escape(t)+'</h3>'+body+'<p class="src-ref mt-3 mb-0">'+escape(ref)+'</p></article>').join('')
}
export function buildFields(data){
 const m=new Map(data.champs.map(([id,label,hint])=>[id,{label,hint}]))
 function field(id,{rows=1,wide=false,prefix=''}={}){
  const {label,hint}=m.get(id)
  const attrs=' id="f-'+id+'" name="'+id+'"'
  let el
  if(id==='prev400'||id==='prev401'){
   el='<select'+attrs+' class="form-select"><option value="">Annoncer un résultat</option><option>Longueur acceptable</option><option>À raccourcir</option><option>À compléter</option></select>'
  }else if(id==='obs400'||id==='obs401'){
   el='<input type="text"'+attrs+' class="form-control observation" readonly placeholder="Exécutez les essais pour le renseigner.">'
  }else if(rows>1){
   el='<textarea'+attrs+' class="form-control" rows="'+rows+'" maxlength="3000" placeholder="'+escape(hint)+'"></textarea>'
  }else{
   el='<input type="text"'+attrs+' class="form-control" maxlength="3000" placeholder="'+escape(hint)+'">'
  }
  return '<div class="formfield '+(wide?'span-all':'')+'"><label for="f-'+id+'">'+(prefix?'<span class="visually-hidden">'+prefix+' · </span>':'')+escape(label)+'</label>'+el+'</div>'
 }
 function part(n,title,desc,html){return '<fieldset class="workgroup"><legend><span>'+n+'</span> '+title+'</legend><p class="part-desc">'+desc+'</p><div class="input-grid">'+html+'</div></fieldset>'}
 const start=field('source',{wide:true})+field('variante1',{rows:3})+field('variante2',{rows:3})+field('invariant',{rows:2})+field('variable',{rows:2})
 const rule=field('gabarit',{wide:true})+field('condition',{rows:2})+field('repetition',{rows:2})
 const tests=field('prev400')+field('prev401')+'<div class="span-all"><button type="button" id="run-boundaries" class="btn cta navy">Exécuter les deux essais</button><p id="boundary-feedback" role="status" class="part-desc mt-2"></p></div>'+field('obs400')+field('obs401')+field('conclusiontests',{wide:true,rows:2})
 const fix=field('avant',{rows:2})+field('apres',{rows:2})+field('motif',{rows:2})+field('limite',{rows:2})
 const prep=nextKeys.map(key=>'<div class="prep-row span-all"><div class="input-grid">'+field('s16_'+key)+field('ref_'+key,{prefix:key})+'</div></div>').join('')
 return part('01','Reprendre la matière de S13 et S14','Gardez deux messages et le passage source qui vous permet de les comparer.',start)+part('02','Écrire ma règle','Nommez les places du gabarit et les deux résultats possibles de la condition.',rule)+part('03','Prédire puis observer','Étalon 1 : dix chiffres répétés quarante fois. Étalon 2 : la même chaîne suivie de X. Le bouton exécute la condition de séance « longueur > 400 ». Comparez-la à la règle que vous avez formulée. Modifier une prédiction efface les observations précédentes.',tests)+part('04','Expliquer le contre-exemple','Désignez une affirmation courte que la source ne soutient pas. Écrivez une correction et citez son appui.',fix)+part('05','Préparer mon tableau pour S16','Renseignez les valeurs et leurs références. Vous pouvez marquer une information « à confirmer ». La trace exportée réunit les trois colonnes champ, valeur et source ou justification.',prep)
}
