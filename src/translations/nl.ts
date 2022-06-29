import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'nl',
  $name: 'Dutch',
  $dir: 'ltr',

  clearEntry: 'Invoer wissen',
  close: 'Sluiten',
  copy: 'Kopiëren',
  currentValue: 'Huidige waarde',
  hidePassword: 'Verberg wachtwoord',
  progress: 'Voortgang',
  remove: 'Verwijderen',
  resize: 'Formaat wijzigen',
  scrollToEnd: 'Scroll naar einde',
  scrollToStart: 'Scroll naar begin',
  selectAColorFromTheScreen: 'Selecteer een kleur van het scherm',
  showPassword: 'Laat wachtwoord zien',
  toggleColorFormat: 'Wissel kleurnotatie'
};

registerTranslation(translation);

export default translation;
