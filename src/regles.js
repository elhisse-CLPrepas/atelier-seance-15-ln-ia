export const SEUIL=400
export const countChars=value=>Array.from(String(value??'')).length
export function inspectText(value){
 const text=String(value??'')
 const longueur=countChars(text)
 const present=text.trim().length>0
 return {longueur,present,resultat:!present?'À compléter':longueur>SEUIL?'À raccourcir':'Longueur acceptable'}
}
export function boundaryText(length){
 if(length!==400 && length!==401)throw new RangeError('Les deux étalons font 400 et 401 caractères.')
 return '0123456789'.repeat(40)+(length===401?'X':'')
}
export function assemble(template,values){
 const input=String(template||'')
 const required=['titre','proposition','action']
 const keys=Array.from(input.matchAll(/\{([^{}]+)\}/g),m=>m[1])
 const rest=input.replace(/\{[^{}]+\}/g,'')
 if(/[{}]/.test(rest)||keys.some(k=>!required.includes(k)))return {error:'Utilisez uniquement {titre}, {proposition} et {action}, avec des accolades complètes.'}
 const missing=required.filter(k=>keys.filter(x=>x===k).length!==1)
 if(missing.length)return {error:'Placez chaque champ une seule fois. À revoir : '+missing.join(', ')+'.'}
 const blanks=required.filter(k=>!String(values[k]??'').trim())
 if(blanks.length)return {error:'Renseignez les valeurs manquantes : '+blanks.join(', ')+'.'}
 return {text:input.replace(/\{([^{}]+)\}/g,(_,k)=>String(values[k]).trim())}
}
