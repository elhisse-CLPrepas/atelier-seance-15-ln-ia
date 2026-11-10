# Animer la séance 15 du vendredi 13 novembre 2026

Que vérifie une règle ? · Semaine 08 du Challenge 100 Jours Automne 2026 · Module 04  
Prof. Abderrahman El Hisse · Séance d’approfondissement de 90 minutes

## Ouvrir et projeter

1. Extrayez le ZIP. Dans le dossier `atelier-seance-15-ln-ia`, ouvrez `OUVRIR-SEANCE-15.html` dans un navigateur récent. Vous pouvez aussi copier ce fichier seul sur une clé USB. Il contient les 35 ressources à télécharger et le code des activités.
2. Choisissez « Projeter la séance ». Flèches gauche et droite pour naviguer, Échap pour fermer. Les notes s’affichent sur l’écran partagé si vous activez « Notes formateur ». Pour les garder sur un autre écran, utilisez le mode Présentateur du PowerPoint.
3. Pour projeter directement, ouvrez le PowerPoint éditable ou le PDF de 25 pages dans `public/ressources/projection/`. Pour les participants, imprimez la fiche A4 ou distribuez le PDF remplissable de trois pages.

## Préparer les sources et les supports

| À préparer | Emplacement |
|---|---|
| Conducteur formateur de quatre pages, avec calendrier, minutage et relances | `public/ressources/documents/conducteur-formateur-s15.pdf` |
| Fiche candidat, corrigé et leurs versions Word | `public/ressources/documents/` |
| Premier cas, fondé sur S13 et S14 | `public/ressources/sources/message-s14-exemple.md`, guide S12 V2 à relire et journal de corrections dans le même dossier |
| Deuxième cas, sur l’adaptation à quatre formats | `public/ressources/sources/guide-ete-v1.pdf`. Ouvrez le sommaire p. 3 et les annexes pp. 22–24. |
| Contre-exemple fictif de Samira | `public/ressources/sources/fiche-source-samira.md` |
| Script et notebook du formateur, cas et sorties observées | `public/ressources/demo/` |
| Modèles de trace, d’entrée de portfolio, de données S16 et prompts | `public/ressources/atelier/` |

Demandez aux participants d’apporter deux variantes de S14 et le passage source identifié en S13. Le fichier fictif permet de commencer immédiatement si leur dossier manque.

## Conduire la séance

Question d’ouverture. « Deux variantes de S14 respectent le seuil de 400 caractères. Comment savoir si elles restent fidèles à la source ? »

| Minutes | Conduite | Ce que vous recueillez |
|---|---|---|
| 0–15 | Comparez A et C corrigée de S14. Faites souligner un fait conservé et les mots qui le reformulent. | Un invariant, une variable et un repère dans la source. |
| 15–35 | Construisez le gabarit avec le titre, la proposition et l’action. Changez une valeur, puis faites prédire le texte assemblé. | Les trois champs nommés et le changement attendu. |
| 35–50 | Faites annoncer deux sorties. Testez une chaîne de 400 caractères puis la même avec X ajouté. Répétez le contrôle sur plusieurs brouillons. | Les prédictions distinctes des observations à 400 et 401. |
| 50–70 | Montrez les formats court, communautaire, professionnel et visuel textuel du guide d’été. Dans le visuel, repérez le titre, deux mots-clés et une action. | Une règle de format et le fait qui reste fidèle au guide. |
| 70–85 | Lisez « Ce guide doublera vos notes. ». Confrontez la phrase à la fiche de Samira et faites proposer une correction justifiée. | L’avant, l’après, le passage d’appui et la limite de la règle. |
| 85–90 | Faites rouvrir la trace et le tableau « champ, valeur, source ou justification ». Préparez les données de S16. | La règle, ses deux issues, la correction et l’entrée de portfolio. |

Prolongement facultatif de 30 minutes. Demandez au groupe de prédire l’effet de « neuf annexes » au lieu de « huit annexes ». Affichez trois brouillons issus de la même donnée erronée. Faites retrouver l’information dans le guide maître, corriger la donnée puis relancer. Les deux mots ayant chacun quatre lettres, le comptage ne détecte pas l’erreur.

Deux relances à garder sous les yeux. « Où retrouvez-vous ce fait dans le dossier ? » « Quel texte peut satisfaire votre condition tout en nécessitant une correction ? »

## Démonstration à projeter

- Diapositives 7 à 12. Le groupe formule la condition, examine le plan de tests proposé par l’agent et observe les deux frontières. À 400, « Longueur acceptable ». À 401, « À raccourcir ». Pour le cas du champ vide, on contrôle d’abord la présence.
- Diapositives 13 à 20. Le guide d’été fournit les faits communs aux quatre formats. Le cas fictif de Samira apporte le contre-exemple. La promesse de 28 caractères et la correction de 76 satisfont toutes deux au critère de longueur. Seule la correction s’appuie sur le planning hebdomadaire et la liste de vérification.
- Diapositives 23 à 25. Présentez le tableau de préparation, les critères de la preuve et le passage au notebook du lundi 16 novembre.

En S13, l’agent lecteur propose des faits à vérifier. En S14, il compare des formulations. En S15, le formateur lui confie les cas de test et la recherche d’un contre-exemple. Une prédiction d’agent ne constitue pas une sortie exécutée. Le navigateur exécute en JavaScript ses expériences locales. Le script et les cinq cellules du notebook reproduisent les mesures en Python. La correction éditoriale et la validation pédagogique sont des actes humains.

Dans le dossier `public/ressources/demo/`, Windows peut lancer `py -3 tester-regles-s15.py` avec `cas-regles-s15.json` à côté du script. Le notebook `tester-regles-s15.ipynb` dispose de son propre jeu de données embarqué. Ouvrez-le dans Jupyter ou VS Code avec un noyau Python 3. Au besoin, projetez le relevé des sorties déjà exécutées.

## Remettre la preuve avant S16

Dans l’atelier web, reprenez un fichier S14 en lecture locale ou renseignez les deux variantes à la main. L’import présente les valeurs et préserve toute saisie existante. Il ne remplit ni l’invariant, ni les prédictions, ni la correction à la place du candidat. Saisissez les prédictions avant de lancer les deux essais. Le bouton teste la règle étalon « longueur > 400 ». Comparez-la avec la condition que vous avez rédigée. Changer une prédiction invalide les observations affichées jusqu’à un nouvel essai.

Le candidat exporte `comprendre-regles-automatisation.md`, le range dans `04-communication/` et le rouvre. Il ajoute l’entrée `preuve-15-regles-adaptation-automatisation` à `07-portfolio/preuves-module-04.md`, après les preuves S13 et S14. Le pilote observe le travail avant d’attribuer un statut.

Le lundi 16 novembre, le candidat apporte le tableau de ses six champs (projet, public, besoin, proposition, action et format), la source ou la justification de chaque valeur, et sa condition testée. Le Markdown contient ces éléments. Une copie JSON facultative permet aussi de les classer. Une valeur inconnue reste à confirmer ; dans le JSON, un champ vide vaut null. Le candidat pourra reporter les valeurs vérifiées dans le notebook S16.

Les réponses sont conservées par le navigateur s’il permet le stockage local. L’export et la copie du texte permettent de garder une trace dans le dossier candidat. Sur un poste partagé, n’utilisez l’effacement de S15 qu’après avoir enregistré votre travail.

## Modifier ou héberger

Le projet conserve la structure S13/S14, la palette marine et or LN-IA, le logo fourni, Vite 8.2.1 et Bootstrap 5.3.8 local. Les fichiers à éditer se trouvent dans `src/` et `public/ressources/`. Les métadonnées et l’HTML initial sont préparés par `scripts/preparer.mjs`. Le ZIP fournit le dossier `dist/` compilé et l’édition autonome.

Avec Node.js 24, utilisez dans le dossier du projet :

```sh
npm ci
npm run dev
```

Pour reconstruire et contrôler :

```sh
npm run build
npm run check
npm run preview
```

L’installation du moteur de développement utilise le registre npm. L’animation avec le matériel compilé se fait hors connexion. Le titre, la description, les balises Open Graph, la carte de partage et la donnée structurée LearningResource sont présents. Si vous prévoyez un hébergement, renseignez la véritable URL du dossier dans `ATELIER_PUBLIC_URL` avant compilation pour obtenir la canonique et l’image de partage absolues. Sous PowerShell : `$env:ATELIER_PUBLIC_URL = Read-Host "URL publique du dossier"`, puis `npm run build`. Publiez le contenu de `dist/` dans le répertoire de votre choix lorsqu’une décision de diffusion aura été prise.

L’analyse des archives est dans `docs/ORIGINES-ET-ADAPTATIONS.md` et le bilan de contrôle dans `docs/CONTROLE-S15.md`.
