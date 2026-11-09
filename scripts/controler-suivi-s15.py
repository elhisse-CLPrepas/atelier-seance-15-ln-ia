from pathlib import Path
import re,json,ast,hashlib
b=Path('mon-dossier-challenge-module04')
s=Path('../atelier-seance-14-ln-ia/mon-dossier-challenge-module04')
def digest(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()
links=0
for f in [b/'SUIVI-S15.html',b/'index.html']:
    for ref in re.findall(r'(?:href|src)="([^"]+)"',f.read_text(encoding='utf-8-sig')):
        if ref.startswith(('http:','https:','data:','#')):
            continue
        assert (f.parent/ref.split('#')[0]).is_file(),ref
        links+=1
unchanged=['03-sources/fiche-source-projet.md','04-communication/message-court-projet.md','04-communication/comprendre-processus-communication.md','04-communication/variantes-communication-projet.md','OUVRIR-MODULE-04.html','OUVRIR-MODULE-04.pdf']
for f in unchanged:
    if f.endswith('.pdf'):
        assert digest(b/f)==digest(s/f),f
    else:
        assert (b/f).read_text(encoding='utf-8-sig')==(s/f).read_text(encoding='utf-8-sig'),f
assert digest(b/'OUVRIR-SEANCE-15.html')==digest(Path('OUVRIR-SEANCE-15.html'))
resources=[f for f in Path('public/ressources').rglob('*') if f.is_file()]
assert len(resources)==24
for f in resources:
    assert digest(f)==digest(b/'06-ressources/seance-15/ressources'/f.relative_to('public/ressources')),str(f)
nb=json.loads((b/'05-automatisation/communication-assistee.ipynb').read_text(encoding='utf-8'))
cells=[c for c in nb['cells'] if c['cell_type']=='code']
for c in cells:
    ast.parse(''.join(c['source']))
assert digest(b/'05-automatisation/communication-assistee.ipynb')==digest(Path('../atelier-seance-16-ln-ia/public/ressources/demo/communication-assistee.ipynb'))
print(f'OK : {links} liens locaux, {len(unchanged)} fichiers historiques inchanges, 24 ressources identiques, atelier autonome identique, {len(cells)} cellules Python syntaxiquement valides.')
