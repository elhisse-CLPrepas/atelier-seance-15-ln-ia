# Analyse du dossier — 4 novembre 2026

## Conclusion

Le dossier est un pack pédagogique S15 avec ses sources, supports et éditions distribuées. Aucun échec n'a été observé dans les contrôles exécutés. Il peut passer à une répétition pratique sur le poste du formateur avant validation de son utilisation.

## Éléments vérifiés pendant cet examen

- Lecture du guide de démarrage, du contrôle historique, des scripts de préparation et de vérification, des règles JavaScript, du script Python et du modèle de préparation S16.
- Exécution de `npm.cmd run check` : réussie. Le script vérifie notamment les seuils, les données, les exports construits, la structure HTML et la correspondance des 24 ressources distribuées.
- Exécution de `py -3 public/ressources/demo/tester-regles-s15.py` : réussie. Mesures observées : 149 et 159 pour S14 ; 127 pour le gabarit ; seuils 400/401 ; quatre formats à 100, 193, 197 et 122 ; contre-exemple à 28 et correction à 76.
- Recalcul des 80 empreintes SHA-256 du manifeste existant : aucune différence et aucun fichier manquant.
- Inventaire : absence de README initial et de dépôt Git détectable à la racine ; présence des sources, de `dist/`, de l'édition autonome et des ressources.

## Points à traiter

| Priorité | Constat | Action proposée |
|---|---|---|
| 1 | Téléchargements et projection non testés sur le poste réel pendant cet examen | Répéter hors connexion, exporter et rouvrir la trace, contrôler une ressource téléchargée |
| 1 | Le dossier prépare S16 mais ne contient pas son support complet identifié | Récupérer ou préparer le notebook S16 à partir des six champs justifiés |
| 2 | `npm.ps1` est bloqué sous PowerShell | Utiliser `npm.cmd`, sans changer la politique de sécurité du poste |
| 2 | Reconstruction non exécutée pendant cet examen | Après modification des sources, installer les dépendances, compiler et relancer les contrôles |
| 3 | Aucun historique Git local détecté | Envisager le versionnement avant les prochaines modifications de l'application |
| 3 | Copies de supports présentes à plusieurs endroits | Modifier les ressources sources puis synchroniser les éditions lors de la prochaine distribution |

## Portée et limites

Le contrôle automatisé ne remplace pas une vérification visuelle et fonctionnelle dans le navigateur. Aucun nouvel examen visuel des PDF, documents Word ou diapositives n'a été effectué. Le noyau Jupyter n'a pas été lancé. Aucun audit des dépendances réseau, aucune publication et aucune reconstruction n'ont été réalisés.

Les affirmations du contrôle historique `CONTROLE-S15.md` restent distinctes des constats de ce rapport. Sa date d'édition correspond à la séance du 13 novembre ; le présent examen a été réalisé le 4 novembre 2026.

Les fichiers pédagogiques existants et le manifeste ont été conservés. Les seuls ajouts de cet examen sont `README.md` et ce rapport ; ils ne figurent pas dans le manifeste d'origine.

## Critère de passage à la suite

Après une répétition réussie, animer S15 puis recueillir la trace, les essais et la correction justifiée. Préparer ensuite S16, prévu le lundi 16 novembre 2026 : six valeurs avec leurs sources, une règle testée et une limite explicitement confiée à la relecture humaine.
