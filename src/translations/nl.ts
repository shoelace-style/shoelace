import { registerTranslation } from '~/utilities/localize';
import type { Translation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'nl',
  $name: 'Dutch',
  $dir: 'ltr',

  close: 'Sluiten',
  copy: 'Kopiëren',
  progress: 'Voortgang',
  resize: 'Formaat wijzigen',
  scrollToEnd: 'Scroll naar einde',
  scrollToStart: 'Scroll naar begin',
  selectAColorFromTheScreen: 'Selecteer een kleur van het scherm',
  toggleColorFormat: 'Wissel kleurnotatie'
};

registerTranslation(translation);

export default translation;
