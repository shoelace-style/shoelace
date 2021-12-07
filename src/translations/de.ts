
import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  close: 'Schliessen',
  copy: 'Kopieren',
  progress: 'Fortschritt',
  scroll_to_end: 'Zum Ende scrollen',
  scroll_to_start: 'Zum Anfang scrollen',
  select_a_color_from_the_screen: 'Wähle eine Farbe am Bildschirm',
  toggle_color_format: 'Farbformat wechseln'
};

registerTranslation(translation);

export default translation;
