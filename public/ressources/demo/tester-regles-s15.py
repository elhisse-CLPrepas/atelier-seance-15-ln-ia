"""Séance 15 LN-IA. Tester une règle de longueur et discuter ses limites.

Usage : python tester-regles-s15.py
La fiche cas-regles-s15.json est lue à côté du script. Les résultats sont
affichés dans le terminal. Le dossier candidat reste sous contrôle du candidat.
"""

import json
from pathlib import Path


def verdict_longueur(texte, cas):
    """Appliquer la condition du seuil à un texte fourni."""
    if len(texte) > cas["seuil"]:
        return cas["alerte"]
    return cas["ok"]


def ligne_mesure(nom, texte, cas):
    """Vérifier la présence avant de rendre un avis sur la longueur."""
    if not texte.strip():
        return f"{nom} | {len(texte)} caractère(s) | À compléter | longueur non évaluée"
    return f"{nom} | {len(texte)} caractères | {verdict_longueur(texte, cas)}"


def comparer_s14(cas):
    print("1. Retrouver les deux variantes de S14")
    print(cas["source"])
    print("Public :", cas["public"])
    print("Faits à conserver :", cas["fait1"], cas["fait2"])
    print("Élément variable :", cas["variable"])
    for nom, texte in [("A", cas["messageA"]), ("C corrigée", cas["messageC"])]:
        print(nom, "·", texte)
        print(ligne_mesure(nom, texte, cas))
    print("Action commune :", cas["action"])


def assembler_gabarit(cas):
    print("\n2. Assembler un gabarit")
    modele = cas["gabarit"]
    champs = cas["gabaritChamps"]
    print("Gabarit :", modele)
    for nom in ("titre", "proposition", "action"):
        print(nom, "=", champs[nom])
    message = modele.format_map(champs)
    print(message)
    print(ligne_mesure("Gabarit complété", message, cas))


def tester_frontiere(cas):
    print("\n3. Prédire puis tester la frontière")
    # Le motif lisible compte dix caractères. Répété quarante fois, il en compte 400.
    texte_400 = cas["etalon"] * 40
    texte_401 = texte_400 + cas["suffixe"]
    if len(texte_400) != 400 or len(texte_401) != 401:
        raise ValueError("Pour cet exercice, gardez un motif de 10 caractères et un suffixe de 1.")
    print("Seuil d’exercice :", cas["seuil"], "caractères.")
    print("Si la longueur dépasse le seuil, afficher «", cas["alerte"], "».")
    print("Sinon, afficher «", cas["ok"], "».")
    print(ligne_mesure("Test 1 · motif × 40", texte_400, cas))
    print(ligne_mesure("Test 2 · même texte + " + cas["suffixe"], texte_401, cas))
    print(ligne_mesure("Essai de présence", "", cas))


def parcourir_formats(cas):
    print("\n4. Répéter le contrôle sur quatre formats")
    guide = cas["ete"]
    print(guide["titre"], "·", guide["auteur"], "·", guide["edition"])
    print("Fait commun :", guide["fait"])
    for variante in guide["formats"]:
        texte = variante["texte"]
        print("\n" + variante["nom"])
        print(texte)
        print(ligne_mesure(variante["nom"], texte, cas))
        print("Occurrences exactes de l’action :", texte.count(guide["action"]))
    print("Le visuel textuel comprend un titre, deux mots-clés et une action.")


def relire_la_promesse(cas):
    print("\n5. Relire le sens d’une sortie courte")
    fiche = cas["samira"]
    print("Source fictive :", fiche["source"])
    print("Avant :", fiche["avant"])
    print(ligne_mesure("Promesse à examiner", fiche["avant"], cas))
    print("Correction humaine de démonstration :", fiche["apres"])
    print(ligne_mesure("Phrase corrigée", fiche["apres"], cas))
    print("Motif donné par le formateur :", fiche["motif"])
    print("Pour S16 : conserver un tableau champ / valeur / source ou justification et la règle testée.")


def main():
    chemin = Path(__file__).with_name("cas-regles-s15.json")
    cas = json.loads(chemin.read_text(encoding="utf-8-sig"))
    comparer_s14(cas)
    assembler_gabarit(cas)
    tester_frontiere(cas)
    parcourir_formats(cas)
    relire_la_promesse(cas)


if __name__ == "__main__":
    main()
