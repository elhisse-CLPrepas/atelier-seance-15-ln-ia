# Confier à un agent la conception des tests S15

Vendredi 13 novembre 2026 · Module 04 · Mission du formateur sur données fictives

## 1. Donner un mandat de conception

Ouvrez une copie de la fiche fictive `cas-regles-s15.json`. Pour vérifier les faits d’automne, gardez à portée la V2 du guide « Produire avec l’IA sous responsabilité humaine » et le journal V1/V2. Indiquez à l’agent les fichiers qu’il peut lire et les gestes autorisés. Projetez ce mandat.

> Vous êtes chargé de proposer des tests. Travaillez en lecture seule sur la fiche fictive fournie. La règle signale « À raccourcir » si la longueur dépasse 400 caractères. Pour deux messages non vides de 400 et 401 caractères, donnez une entrée reproductible, une prévision et sa justification. Ajoutez un essai de présence sur un champ vide. Distinguez les prévisions de toute exécution observée. Identifiez une affirmation courte que le contrôle pourrait laisser passer et citez le passage source que le groupe devra examiner. Présentez un seul tableau, puis rendez la main au formateur. Ne modifiez aucun fichier et ne diffusez aucun message.

Si l’agent n’est pas connecté, distribuez le tableau suivant colonne par colonne. Les candidats proposent leurs prévisions avant de voir celles de l’exemple.

| Entrée proposée | Prévision du concepteur | Mesure ou observation à recueillir |
|---|---|---|
| « 0123456789 » répété 40 fois | 400 caractères, longueur acceptable | Exécuter la condition puis noter la comparaison effectuée à 400. |
| Même texte suivi d’un X | 401 caractères, à raccourcir | Montrer quel seul caractère supplémentaire modifie le verdict. |
| Champ vide | À compléter | Vérifier la présence avant d’émettre un avis de longueur. |
| « Ce guide doublera vos notes. » | Texte court qui passe la longueur | Comparer la promesse à la fiche de Samira. La fiche décrit un planning et une liste de vérification. |

Cette proposition de tests a été rédigée pour l’atelier. Les observations du terminal et du notebook se trouvent dans `sorties-observees-s15.md`.

## 2. Utiliser l’agent comme contradicteur

> Relisez le résultat technique et la source fictive. Choisissez une affirmation qui respecte la limite de longueur mais qui n’est pas appuyée par la source. Renvoyez quatre éléments : la phrase examinée, le passage réellement retrouvé ou « appui absent », la limite du test et la question que le pilote doit trancher. Ne déclarez aucune validation. Arrêtez-vous à ce relevé.

La phrase « Ce guide doublera vos notes. » mesure 28 caractères. L’agent peut signaler l’absence d’appui pour la promesse. Le formateur rouvre la fiche, puis le candidat propose ses mots et explique la correction. La formulation corrigée fournie mesure 76 caractères et renvoie aux deux outils réellement décrits.

## 3. Faire avancer le Module 04

| Séance | Mission possible de l’agent | Décision qui reste au candidat ou au pilote |
|---|---|---|
| S13 | Repérer deux faits dans des sources fictives autorisées. | Le candidat choisit le passage et l’action proposée au lecteur. |
| S14 | Comparer trois brouillons et signaler les écarts. | Le candidat choisit le canal et justifie sa réécriture. |
| S15 | Concevoir les essais, puis chercher un contre-exemple. | Le groupe observe les résultats en Python et décide quelle affirmation doit être corrigée. |
| S16 | Examiner l’export local d’une démonstration fictive à partir de la règle préparée. | Le candidat corrige et rouvre son fichier. Le pilote statue après observation. |

En sortie de S15, recueillez une règle testée, deux verdicts et la limite expliquée. Dans le tableau pour S16, demandez au candidat d’indiquer pour chaque champ sa valeur et sa source ou sa justification.
