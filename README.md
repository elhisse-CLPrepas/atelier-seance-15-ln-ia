# Atelier LN-IA — Séance 15 : Que vérifie une règle ?

Atelier du Challenge 100 Jours Automne 2026, module 04, sous le pilotage du Prof. Abderrahman El Hisse. Séance prévue le **vendredi 13 novembre 2026**, pour 90 minutes, avec un prolongement facultatif de 30 minutes.

L'objectif est de distinguer ce qu'une règle peut vérifier automatiquement (présence, longueur, format) de ce qui demande une relecture humaine (fidélité à une source, justification d'une promesse). S15 prolonge les sources de S13 et les variantes de S14, puis prépare les données du notebook de S16.

## Commencer immédiatement

1. Ouvrir [OUVRIR-SEANCE-15.html](OUVRIR-SEANCE-15.html) dans un navigateur récent. Cette édition autonome contient le code des activités et les 24 ressources téléchargeables ; elle peut être utilisée hors connexion sans installer Node.js.
2. Lire [COMMENCER-ICI.md](COMMENCER-ICI.md) pour le conducteur détaillé, les consignes et le minutage.
3. Choisir « Projeter la séance », puis parcourir les 25 diapositives. Les flèches permettent de naviguer et Échap ferme la projection.
4. Utiliser le carnet candidat pour prédire les résultats, exécuter les essais et exporter la preuve.

Les réponses sont conservées dans le stockage local du navigateur lorsque celui-ci l'autorise. **Exporter et rouvrir sa trace avant de fermer la séance ou d'effacer les réponses.**

## Organisation du dossier

| Élément | Rôle |
|---|---|
| `OUVRIR-SEANCE-15.html` | Édition autonome à ouvrir directement, ressources embarquées |
| `COMMENCER-ICI.md` | Guide d'animation et consignes de remise |
| `src/` | Sources de l'application : interface, règles, propagation, portfolio et contenu dans `seance.json` |
| `public/ressources/atelier/` | Modèles de trace, portfolio, prompts et préparation S16 |
| `public/ressources/demo/` | Cas JSON, script Python, notebook et relevé des sorties |
| `public/ressources/documents/` | Conducteur, fiche candidat et corrigé en Word/PDF |
| `public/ressources/projection/` | Diaporama PowerPoint éditable et PDF |
| `public/ressources/sources/` | Sources pédagogiques et exemples |
| `dist/` | Version compilée destinée à un serveur web |
| `scripts/` | Préparation HTML, rendu, génération autonome et vérifications |
| `docs/` | Contrôle initial, origines, empreintes et bilan du présent examen |
| `licenses/` | Licence et provenance de Bootstrap |

Les PDF, le PowerPoint et le notebook à la racine sont des copies de commodité. Pour modifier le matériel, travailler dans `src/` et `public/ressources/`, puis reconstruire les éditions distribuées. `index.html` est généré par le script de préparation.

## Bilan du contrôle du 4 novembre 2026

**Les contrôles exécutés sont conformes. La validation pratique sur le poste de séance reste à réaliser.**

| Contrôle effectué | Résultat |
|---|---|
| Intégrité du manifeste `docs/EMPREINTES-SHA256.txt` | 80 fichiers vérifiés, tous conformes |
| `npm.cmd run check` | Réussi : syntaxe de `main.js` et assertions du vérificateur |
| Structure pédagogique et application | 25 diapositives, 11 rubriques, 8 cartes, 6 questions de méthode, 6 questions de quiz et 4 prompts contrôlés |
| Ressources distribuées | 24 ressources présentes ; copies `public/`, `dist/` et embarquées comparées par le vérificateur |
| Logique métier | Import S14, gabarit, seuils 400/401, champ vide, contre-exemple, formats, propagation et construction des exports contrôlés |
| Démonstration Python | Exécution réussie avec Python 3.14.5 ; résultats attendus aux seuils et sur les exemples |
| Environnement | Node.js 24.12.0 présent ; `npm.ps1` bloqué par la politique PowerShell, `npm.cmd` utilisable |
| Versionnement | Aucun dépôt Git détecté dans ce dossier |

La reconstruction Vite, l'interface navigateur, les téléchargements effectifs, l'exécution dans Jupyter et le rendu visuel des PDF/Word/PowerPoint n'ont pas été revérifiés lors de cet examen. Les vérifications historiques sont décrites séparément dans [CONTROLE-S15.md](docs/CONTROLE-S15.md).

Le manifeste existant couvre les 80 fichiers qu'il référence. Ce README et le nouveau bilan ne sont pas inclus dans ce manifeste d'origine.

Voir le [bilan de l'analyse](docs/ANALYSE-DOSSIER-2026-11-04.md) pour les limites et priorités.

## Développer et contrôler

Le projet utilise Vite, JavaScript et Bootstrap local. Pour reproduire l'environnement recommandé par le guide, utiliser Node.js 24 et npm. Python 3 est nécessaire uniquement pour la démonstration Python ou le notebook.

Dans PowerShell, depuis le dossier de l'atelier :

```powershell
npm.cmd ci
npm.cmd run dev
```

L'installation des dépendances nécessite l'accès au registre npm. Le serveur de développement est configuré sur le port 5173 et écoute sur toutes les interfaces réseau.

```powershell
# Vérifier les sources et les éditions distribuées existantes
npm.cmd run check

# Reconstruire dist/ et OUVRIR-SEANCE-15.html, puis les vérifier
npm.cmd run build
npm.cmd run check

# Consulter la version compilée via un serveur local
npm.cmd run preview

# Exécuter la démonstration avec les accents en UTF-8
py -3 -X utf8 public/ressources/demo/tester-regles-s15.py
```

La commande `check` ne reconstruit pas le projet. Après toute modification, exécuter `build` avant `check`. La compilation régénère `index.html`, `dist/` et l'édition autonome ; les empreintes des fichiers modifiés devront ensuite être actualisées pour une nouvelle distribution.

Pour un hébergement, définir l'URL finale avant la compilation :

```powershell
$env:ATELIER_PUBLIC_URL = Read-Host "URL publique du dossier"
npm.cmd run build
npm.cmd run check
```

Publier ensuite le contenu de `dist/` lorsque la diffusion est décidée.

## L'étape suivante

### Priorité immédiate : répéter la séance sur le poste réel

1. Ouvrir l'édition autonome hors connexion et vérifier la navigation et la projection.
2. Télécharger puis rouvrir une ressource et la trace Markdown exportée.
3. Saisir les prédictions, vérifier les essais à 400 et 401 caractères, puis justifier la correction du contre-exemple.
4. Tester le notebook avec le noyau Python du poste si son utilisation est prévue.

Cette répétition complète les contrôles automatisés et permet de décider si le matériel est prêt pour l'animation.

### Suite pédagogique : S16, lundi 16 novembre 2026

Avant S16 :

1. Exporter `comprendre-regles-automatisation.md`, le ranger dans `04-communication/` du dossier candidat et le rouvrir.
2. Ajouter l'entrée `preuve-15-regles-adaptation-automatisation` dans `07-portfolio/preuves-module-04.md` du dossier candidat.
3. Compléter les six champs **projet, public, besoin, proposition, action et format**, avec une source ou une justification pour chaque valeur. Utiliser [preparation-s16.md](public/ressources/atelier/preparation-s16.md).
4. Apporter au notebook S16 la règle, les résultats réellement observés et la limite à vérifier humainement. Les inconnues restent « à confirmer » ; le pilote attribue le statut après observation.

Le notebook livré ici est une démonstration **S15**. Le support complet de S16 n'a pas été identifié dans ce dossier ; sa préparation ou sa récupération constitue le prochain chantier pédagogique après la répétition.

## GitHub et publication en ligne

- Dépôt : https://github.com/elhisse-CLPrepas/atelier-seance-15-ln-ia
- Site : https://elhisse-clprepas.github.io/atelier-seance-15-ln-ia/

Le workflow `.github/workflows/pages.yml` compile et vérifie le projet, puis publie
`dist/` sur GitHub Pages à chaque envoi sur `main`. La source Pages doit être
**GitHub Actions**. Les dépendances, fichiers temporaires et `dist/` sont ignorés.
Les supports pédagogiques et l’édition autonome restent versionnés.

Pour les prochaines modifications, depuis PowerShell :

```powershell
npm.cmd run build
npm.cmd run check
git status
git add .
git diff --cached --stat
git commit -m "docs: actualiser les supports de la séance 15"
git push origin main
```

Le bilan du 4 novembre ci-dessus décrit l’état historique avant initialisation Git.
Le 9 novembre 2026, la compilation locale et les vérifications automatisées ont réussi.

Le dossier candidat mon-dossier-challenge-module04 possède son propre dépôt Git : il est exclu du dépôt S15 pour préserver son historique indépendant.
