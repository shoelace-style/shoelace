import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  clearEntry: `Effacer l'entrée`,
  close: 'Fermer',
  copy: 'Copier',
  numOptionsSelected: num => {
    if (num === 0) return 'Aucune option sélectionnée';
    if (num === 1) return '1 option sélectionnée';
    return `${num} options sélectionnées`;
  },
  currentValue: 'Valeur actuelle',
  hidePassword: 'Masquer le mot de passe',
  loading: 'Chargement',
  progress: 'Progrès',
  remove: 'Retirer',
  resize: 'Redimensionner',
  scrollToEnd: `Faire défiler jusqu'à la fin`,
  scrollToStart: `Faire défiler jusqu'au début`,
  selectAColorFromTheScreen: `Sélectionnez une couleur à l'écran`,
  showPassword: 'Montrer le mot de passe',
  toggleColorFormat: 'Changer le format de couleur'
};

registerTranslation(translation);

export default translation;
