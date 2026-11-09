# Résultats observés de la démonstration S15

Vendredi 13 novembre 2026 · Atelier LN-IA · Relevé du formateur à projeter hors ligne

## Faire prédire, puis révéler

Ouvrez les deux messages S14 et demandez au groupe de souligner le fait qui reste stable. Masquez ensuite les verdicts de la colonne centrale jusqu’à ce que les candidats aient annoncé ce qu’ils attendent à la frontière.

| Entrée | Verdict effectivement obtenu | Question à poser |
|---|---|---|
| A (149 caractères) et C corrigée (159) | Longueur acceptable pour les deux | Quels passages dans le guide et le journal appuient encore leurs affirmations ? |
| Titre, proposition et action dans le gabarit (127) | Longueur acceptable | Quel champ pourrait changer sans toucher à l’action ? |
| Motif chiffré répété (400) | Longueur acceptable | Pourquoi le seuil exact est-il accepté ? |
| Même motif suivi d’un X (401) | À raccourcir | Qu’est-ce qui a changé entre les deux essais ? |
| Champ vide (0) | À compléter, longueur non évaluée | Quel autre contrôle faut-il effectuer en premier ? |
| Promesse de Samira (28) et correction (76) | Longueur acceptable pour les deux | Quelles informations trouve-t-on réellement dans sa fiche ? |

La mesure porte sur les points de code Unicode Python du texte exact. Espaces, ponctuation et sauts de ligne comptent. Les quatre formats du guide d’été donnent respectivement 100, 193, 197 et 122 caractères. Le visuel textuel comprend deux sauts de ligne. Toutes ces sorties restent des matériaux de démonstration.

## Transcription de l’exécution

```text
1. Retrouver les deux variantes de S14
Produire avec l’IA sous responsabilité humaine — Guide pratique, V2 à relire. Étape 5 du guide et journal de corrections S12.
Public : Formateurs débutants qui relisent un premier support produit avec l’IA.
Faits à conserver : Le dossier conserve les versions V1 et V2 du guide. Le journal explique les corrections et leurs raisons.
Élément variable : La formulation de la proposition
A · Le dossier conserve V1 et V2 du guide. Le journal explique chaque correction et sa raison. Souhaitez-vous voir un extrait du journal de corrections ?
A | 149 caractères | Longueur acceptable
C corrigée · Le dossier conserve les versions V1 et V2 du guide. Le journal explique ce qui a changé et pourquoi. Souhaitez-vous voir un extrait du journal de corrections ?
C corrigée | 159 caractères | Longueur acceptable
Action commune : Souhaitez-vous voir un extrait du journal de corrections ?

2. Assembler un gabarit
Gabarit : {titre} — {proposition} {action}
titre = Révision du guide
proposition = Le journal explique ce qui a changé et pourquoi.
action = Souhaitez-vous voir un extrait du journal de corrections ?
Révision du guide — Le journal explique ce qui a changé et pourquoi. Souhaitez-vous voir un extrait du journal de corrections ?
Gabarit complété | 127 caractères | Longueur acceptable

3. Prédire puis tester la frontière
Seuil d’exercice : 400 caractères.
Si la longueur dépasse le seuil, afficher « À raccourcir ».
Sinon, afficher « Longueur acceptable ».
Test 1 · motif × 40 | 400 caractères | Longueur acceptable
Test 2 · même texte + X | 401 caractères | À raccourcir
Essai de présence | 0 caractère(s) | À compléter | longueur non évaluée

4. Répéter le contrôle sur quatre formats
Guide Situation-Actuelle-IA · Abderrahman El Hisse · Édition maître V1.0 · juillet 2026
Fait commun : Huit chapitres et huit annexes

Court
Guide Situation-Actuelle-IA : huit chapitres et huit annexes. Souhaitez-vous consulter le sommaire ?
Court | 100 caractères | Longueur acceptable
Occurrences exactes de l’action : 1

Communautaire
Vous travaillez avec des collègues sur les usages de l’IA ? Le Guide Situation-Actuelle-IA réunit huit chapitres et huit annexes pour nourrir cet échange. Souhaitez-vous consulter le sommaire ?
Communautaire | 193 caractères | Longueur acceptable
Occurrences exactes de l’action : 1

Professionnel
Dans le Guide Situation-Actuelle-IA, Abderrahman El Hisse présente huit chapitres et huit annexes consacrés à la production et au contrôle des usages de l’IA. Souhaitez-vous consulter le sommaire ?
Professionnel | 197 caractères | Longueur acceptable
Occurrences exactes de l’action : 1

Visuel textuel
Guide Situation-Actuelle-IA — huit chapitres et huit annexes
Comprendre · Contrôler
Souhaitez-vous consulter le sommaire ?
Visuel textuel | 122 caractères | Longueur acceptable
Occurrences exactes de l’action : 1
Le visuel textuel comprend un titre, deux mots-clés et une action.

5. Relire le sens d’une sortie courte
Source fictive : Mini-guide fictif de Samira pour les étudiants. Il contient un planning hebdomadaire et une liste de vérification.
Avant : Ce guide doublera vos notes.
Promesse à examiner | 28 caractères | Longueur acceptable
Correction humaine de démonstration : Le mini-guide propose un planning hebdomadaire et une liste de vérification.
Phrase corrigée | 76 caractères | Longueur acceptable
Motif donné par le formateur : La fiche de Samira décrit ces deux outils. Elle ne documente aucun effet sur les notes.
Pour S16 : conserver un tableau champ / valeur / source ou justification et la règle testée.
```

## Rejouer la démonstration

Placez le script `tester-regles-s15.py` à côté de `cas-regles-s15.json`. Depuis ce dossier, lancez `py -3 tester-regles-s15.py` sous Windows ou `python tester-regles-s15.py`. Si vous lancez la commande depuis un autre dossier, donnez le chemin du script. Le script retrouve la fiche à côté de son propre fichier.

Le notebook `tester-regles-s15.ipynb` intègre les données utilisées et peut s’ouvrir seul. Dans Jupyter ou dans VS Code, sélectionnez un noyau Python 3, redémarrez-le et exécutez les cinq cellules de haut en bas. Pour discuter d’une modification, changez un champ sur une copie, prédisez l’effet, puis relancez la cellule et les étapes dépendantes.

## Adaptation du support d’été

Le script et le notebook de l’exemple d’été lisaient dix champs du Guide Situation-Actuelle-IA et fabriquaient trois brouillons destinés à WhatsApp, Facebook et LinkedIn. Le script proposait un aperçu et un export local protégé contre l’écrasement. Le support pédagogique V5 demandait également d’observer quatre formats, dont un visuel textuel. L’édition d’automne reprend ces quatre formats et confie à l’agent la préparation d’essais reproductibles. Le candidat observe les seuils et prépare l’export de la S16. Le script S15 affiche les résultats dans le terminal.

## Vérification effectuée

Le script a été lancé depuis un autre dossier. Les cinq cellules du notebook ont été exécutées dans l’ordre sous Python standard. Leurs sorties et la transcription du terminal sont identiques. Le fichier est conforme au schéma Jupyter nbformat 4.5. L’interface Jupyter et le noyau IPython n’étaient pas disponibles sur le poste de préparation. Le dernier essai dans l’interface de projection reste à effectuer avant la séance.

La preuve du candidat se classe dans `04-communication/comprendre-regles-automatisation.md`. Le candidat conserve sa propre prédiction et son observation avant de rejoindre S16 le lundi 16 novembre.
