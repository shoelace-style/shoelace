import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  close: 'Fermer',
  copy: 'Copier',
  progress: 'Progrès',
  resize: 'Redimensionner',
  scroll_to_end: `Faire défiler jusqu'à la fin`,
  scroll_to_start: `Faire défiler jusqu'au début`,
  select_a_color_from_the_screen: `Sélectionnez une couleur à l'écran`,
  toggle_color_format: 'Changer le format de couleur'
};

registerTranslation(translation);

export default translation;
