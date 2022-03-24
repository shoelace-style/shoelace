import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'nl',
  $name: 'Dutch',
  $dir: 'ltr',

  close: 'Sluiten',
  copy: 'Kopiëren',
  currentValue: 'Huidige waarde',
  progress: 'Voortgang',
  remove: 'Verwijderen',
  resize: 'Formaat wijzigen',
  scrollToEnd: 'Scroll naar einde',
  scrollToStart: 'Scroll naar begin',
  selectAColorFromTheScreen: 'Selecteer een kleur van het scherm',
  toggleColorFormat: 'Wissel kleurnotatie'
};

registerTranslation(translation);

export default translation;
