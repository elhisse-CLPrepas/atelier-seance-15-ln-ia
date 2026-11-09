# Contrôle local et bilan à mi-parcours — 9 novembre 2026

## Avis

Le pack S15 satisfait aux contrôles automatisés exécutés aujourd'hui. Il est prêt pour une répétition sur le poste d'animation ; sa validation pratique reste à établir. Aucun défaut bloquant n'a été détecté dans le périmètre testé.

Le jalon de 50 % du challenge est indiqué par le pilote. Ce dossier de séance ne suffit pas à établir un taux de réalisation global ni un taux de maîtrise des participants. Les traces et décisions présentes dans les modèles ne constituent pas des preuves individuelles acquises.

## Résultats reproduits

| Contrôle | Résultat du 9 novembre |
|---|---|
| Manifeste SHA-256 | 80 fichiers contrôlés, aucun absent, aucune différence |
| `npm.cmd run check` | Réussi : syntaxe du point d'entrée et assertions du vérificateur |
| Structure distribuée | 25 diapositives, 11 rubriques, 8 cartes, 6 questions de méthode, 6 questions de quiz et 4 prompts contrôlés par le vérificateur |
| Ressources | 24 ressources ; correspondance entre les originaux, `dist/` et l'édition autonome vérifiée |
| Logique JavaScript | Import S14, gabarit, champs vides, seuils 400/401, formats, propagation et construction des exports contrôlés |
| Démonstration Python | Exécution réussie avec `py -3 -X utf8 public/ressources/demo/tester-regles-s15.py` ; seuils et mesures attendus retrouvés |
| Outils locaux | Node.js 24.12.0 et npm 11.6.2 accessibles |
| Historique local | La commande Git ne détecte aucun dépôt depuis ce dossier |

Le manifeste couvre les fichiers qu'il référence, pas tous les ajouts ultérieurs. Il n'authentifie pas à lui seul leur origine. Le README, le bilan du 4 novembre et ce nouveau bilan sont hors du manifeste d'origine.

## Lecture pédagogique

La progression est explicite : S13 fournit les sources, S14 les variantes, S15 les règles et leurs limites, puis S16 les données justifiées pour le notebook. Le cas de Samira illustre une limite utile : une promesse non justifiée de 28 caractères passe le même contrôle de longueur qu'une correction sourcée de 76 caractères.

Le conducteur prévoit six séquences totalisant 90 minutes et un prolongement facultatif de 30 minutes. Les modèles demandent une prédiction, une observation exécutée, une correction justifiée et une limite confiée à la relecture humaine. Cette structure permet de recueillir des preuves observables.

Les fichiers de portfolio et de préparation S16 contiennent encore des champs « À compléter » et une décision du pilote en attente : c'est cohérent pour des modèles distribués. Ils ne permettent pas de conclure que les participants ont réalisé ces tâches. Le support complet S16 n'a pas été identifié dans l'inventaire ; le notebook fourni est celui de S15.

## Priorités pour la seconde moitié

1. **Avant S15, vendredi 13 novembre :** ouvrir l'édition autonome hors connexion sur le poste réel, parcourir la projection, saisir les prédictions, exécuter les essais, exporter et rouvrir la trace ainsi qu'une ressource téléchargée. Observer aussi la conservation des réponses après réouverture dans le navigateur utilisé.
2. **À la fin de S15 :** recueillir une trace par participant avec source, invariant, variable, règle, observations à 400 et 401, correction et limite. Le pilote attribue le statut après observation effective.
3. **Avant S16, lundi 16 novembre :** récupérer ou préparer le support S16 et vérifier les six champs projet, public, besoin, proposition, action et format avec leur source ou justification. Conserver les inconnues « à confirmer ».
4. **Avant la prochaine modification technique :** mettre en place un historique de versions et une copie de sauvegarde identifiée. Modifier les sources, reconstruire les éditions puis relancer les contrôles et renouveler le manifeste pour une nouvelle distribution.

Pour rendre le bilan global du challenge vérifiable, réunir les preuves des autres séances et un suivi par participant indiquant la preuve attendue, son emplacement, la date d'observation, le statut attribué et la prochaine correction. Aucun pourcentage de réussite ne doit être déduit du seul nombre de supports disponibles.

## Limites de cet examen

Pas de reconstruction Vite ni d'installation de dépendances ; les éditions existantes ont été contrôlées. Pas de test interactif dans un navigateur, de lancement de Jupyter, de nouveau rendu visuel des PDF/Word/PowerPoint ni d'audit de vulnérabilités des dépendances. Les contrôles historiques sont décrits dans `CONTROLE-S15.md` et ne sont pas présentés comme réexécutés aujourd'hui.

Seul ce rapport a été ajouté. Les sources pédagogiques, les éditions distribuées et le manifeste existant ont été conservés.
