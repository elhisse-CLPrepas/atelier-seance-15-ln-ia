import {readFile,writeFile} from 'node:fs/promises'
import {basename,extname} from 'node:path'
const root=new URL('../',import.meta.url)
const readText=name=>readFile(new URL(name,root),'utf8')
let html=await readText('dist/index.html')
const script=html.match(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*><\/script>/)
const style=html.match(/<link\b[^>]*\bhref="([^"]+\.css)"[^>]*>/)
if(!script||!style)throw new Error('La compilation Vite doit précéder la génération autonome.')
const js=(await readText('dist/'+script[1])).replace(/<\/script/gi,'<\\/script')
const css=(await readText('dist/'+style[1])).replace(/\/\*# sourceMappingURL=[\s\S]*?\*\//g,'')
html=html.replace(script[0],'').replace(style[0],()=>'<style>'+css+'</style>')
const mime={'.pdf':'application/pdf','.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','.png':'image/png','.webp':'image/webp','.md':'text/markdown','.json':'application/json','.ipynb':'application/x-ipynb+json','.py':'text/x-python'}
const assets=new Map()
async function dataURI(file){
 if(!assets.has(file)){
  const content=await readFile(new URL('public/'+file,root))
  assets.set(file,'data:'+mime[extname(file)]+';base64,'+content.toString('base64'))
 }
 return assets.get(file)
}
const links=[...html.matchAll(/<a\b[^>]*\bhref="\.\/(ressources\/[^"]+)"[^>]*>/g)]
for(const [,file] of links){await dataURI(file)}
html=html.replace(/<a\b[^>]*\bhref="\.\/(ressources\/[^"]+)"[^>]*>/g,(tag,file)=>{
 const without=tag.replace(/\sdownload(?:="[^"]*")?(?=[\s>])/,'')
 return without.replace('href="./'+file+'"','href="'+assets.get(file)+'" data-resource="'+file+'" download="'+basename(file)+'"')
})
for(const file of ['assets/logo-web.webp','assets/favicon.png','ressources/atelier/affiche-s15.png']){
 html=html.replaceAll('="./'+file+'"','="'+await dataURI(file)+'"')
}
html=html.replace('</body>',()=>'<script>'+js+'</script></body>')
await writeFile(new URL('OUVRIR-SEANCE-15.html',root),html)
console.log('Édition autonome créée avec '+new Set(links.map(x=>x[1])).size+' ressources intégrées.')
