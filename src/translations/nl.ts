import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'nl',
  $name: 'Dutch',
  $dir: 'ltr',

  close: 'Sluiten',
  copy: 'Kopiëren',
  progress: 'Voortgang',
  resize: 'Formaat wijzigen',
  scroll_to_end: 'Scroll naar einde',
  scroll_to_start: 'Scroll naar begin',
  select_a_color_from_the_screen: 'Selecteer een kleur van het scherm',
  toggle_color_format: 'Wissel kleurnotatie'
};

registerTranslation(translation);

export default translation;
