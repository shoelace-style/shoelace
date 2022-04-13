import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  clearEntry: `Effacer l'entrée`,
  close: 'Fermer',
  copy: 'Copier',
  currentValue: 'Valeur actuelle',
  hidePassword: 'Masquer le mot de passe',
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
