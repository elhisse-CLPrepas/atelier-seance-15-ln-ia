# Journal de corrections S12 — V1 → V2 du guide pratique

**Statut :** écarts de contenu rédigés pour une démonstration fictive ; **aucune relecture d'un responsable humain habilité n'est attestée**.  
**Fichiers à comparer :** `guide-pratique-v1.md` et `guide-pratique-v2-a-relire.md`.

| Type | Avant : V1 | Après : V2 | Raison et contrôle à réaliser |
|---|---|---|---|
| Fond — vérification | « Vérifier les informations importantes » (sans critère de décision) | Rechercher une source autorisée ou marquer « À VÉRIFIER », avec responsable ; bloquer la diffusion si point essentiel invérifiable | Ne pas transformer un fait incertain en certitude ; revue métier à effectuer |
| Fond — autorisation | « Présenter la copie à une personne habilitée si le contexte demande une autorisation » | Distinguer explicitement revue du texte et décision de diffusion, inscrire date et responsable uniquement si revue effective | Éviter toute validation implicite ; décision réelle absente |
| Forme — accessibilité | « Simplifier les termes inaccessibles » (générique) | Exemple concret : remplacer « épistémologie du modèle » par « ce que l'IA sait ou ne sait pas vérifier » | Expliciter l'adaptation à un lecteur débutant |
| Traçabilité | « Trois corrections sont identifiables dans une liste avant/après » | Exiger comparaison conservée, type de correction, motif, limites restantes | Rendre l'écart inspectable et réutilisable |
| Sécurité | « Données sensibles absentes » | Vérifier origine/droits des données et empêcher la diffusion si élément non autorisé | Ne pas confondre confidentialité et seule absence de mot de passe |

## Démonstration à effectuer dans VS Code

1. Ouvrir les deux documents dans VS Code.
2. Clic droit sur V1 → **Select for Compare**, puis sur V2 → **Compare with Selected** (ou utiliser le script `scripts/comparer-versions.py`).
3. Lire l'écart et identifier **au moins une modification de fond**.
4. Le script vérifie les différences de contenu ; il ne peut pas prouver une relecture humaine ni la vérité des faits.

## Décision à consigner après une revue réelle

- **Relecteur habilité :** non renseigné (non réalisé dans la démonstration).
- **Date réelle de décision :** non renseignée.
- **Statut :** V2 — À RELIRE / À VALIDER.
- **Diffusion :** non autorisée par défaut.
