import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  close: 'Fermer',
  copy: 'Copier',
  currentValue: 'Valeur actuelle',
  progress: 'Progrès',
  remove: 'Retirer',
  resize: 'Redimensionner',
  scrollToEnd: `Faire défiler jusqu'à la fin`,
  scrollToStart: `Faire défiler jusqu'au début`,
  selectAColorFromTheScreen: `Sélectionnez une couleur à l'écran`,
  toggleColorFormat: 'Changer le format de couleur'
};

registerTranslation(translation);

export default translation;
