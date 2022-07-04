import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  browseFiles: '',
  clearEntry: `Effacer l'entrée`,
  close: 'Fermer',
  copy: 'Copier',
  currentValue: 'Valeur actuelle',
  dragDrop: '',
  fileSizeExceeded: '',
  fileTypeNotAccepted: '',
  hidePassword: 'Masquer le mot de passe',
  loading: 'Chargement',
  maxFiles: '',
  noMultipleFiles: '',
  progress: 'Progrès',
  remove: 'Retirer',
  resize: 'Redimensionner',
  scrollToEnd: `Faire défiler jusqu'à la fin`,
  scrollToStart: `Faire défiler jusqu'au début`,
  selectAColorFromTheScreen: `Sélectionnez une couleur à l'écran`,
  serverError: '',
  showPassword: 'Montrer le mot de passe',
  toggleColorFormat: 'Changer le format de couleur',
  transferAbort: '',
  transferError: ''
};

registerTranslation(translation);

export default translation;
