import { inspectText, SEUIL } from './regles.js';

/* Activité facultative de S15. Cette démonstration locale ne modifie pas la fiche candidat. */
export function apercusPropagation(annexes) {
  const titre = 'Guide Situation-Actuelle-IA';
  const fait = 'huit chapitres et ' + annexes + ' annexes';
  const action = 'Souhaitez-vous consulter le sommaire ?';
  return [
    ['Court', titre + ' contient ' + fait + '. ' + action],
    ['Communautaire', 'Vous préparez une lecture en groupe ? ' + titre + ' réunit ' + fait + '. ' + action],
    ['Professionnel', 'Pour préparer votre réunion de formation, le ' + titre + ' présente ' + fait + '. ' + action]
  ];
}
export function initPropagation(container) {
  if (!container) return;
  const champ = container.querySelector('[data-valeur]');
  const decision = container.querySelector('[data-propagation-resultat]');
  const sortie = container.querySelector('tbody');
  const rendu = () => {
    sortie.replaceChildren();
    for (const [format, texte] of apercusPropagation(champ.value)) {
      const ligne = sortie.insertRow();
      [format, texte, inspectText(texte).longueur + ' / ' + SEUIL].forEach(valeur => {
        ligne.insertCell().textContent = valeur;
      });
    }
    decision.textContent = champ.value === 'neuf'
      ? 'Trois textes sous le seuil reprennent « neuf annexes ». Ouvrez le guide aux pages 22 à 24. Quel champ reprendrez-vous avant de relancer ?'
      : 'Les trois sorties reprennent « huit annexes ». Montrez à votre binôme où le document permet de le vérifier. Les compteurs indiquent les mêmes nombres dans les deux essais. Les mots « huit » et « neuf » ont chacun quatre lettres.';
    container.querySelector('[data-propagation-sorties]').hidden = false;
  };
  champ.addEventListener('change', () => {
    container.querySelector('[data-propagation-sorties]').hidden = true;
  });
  container.querySelector('[data-propagation-lancer]').addEventListener('click', rendu);
}

