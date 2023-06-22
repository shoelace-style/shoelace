import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nl',
  $name: 'Nederlands',
  $dir: 'ltr',

  carousel: 'Carrousel',
  clearEntry: 'Invoer wissen',
  close: 'Sluiten',
  copy: 'Kopiëren',
  currentValue: 'Huidige waarde',
  goToSlide: (slide, count) => `Ga naar slide ${slide} van ${count}`,
  hidePassword: 'Verberg wachtwoord',
  loading: 'Bezig met laden',
  nextSlide: 'Volgende dia',
  numOptionsSelected: num => {
    if (num === 0) return 'Geen optie geselecteerd';
    if (num === 1) return '1 optie geselecteerd';
    return `${num} opties geselecteerd`;
  },
  previousSlide: 'Vorige dia',
  progress: 'Voortgang',
  remove: 'Verwijderen',
  resize: 'Formaat wijzigen',
  scrollToEnd: 'Scroll naar einde',
  scrollToStart: 'Scroll naar begin',
  selectAColorFromTheScreen: 'Selecteer een kleur van het scherm',
  showPassword: 'Laat wachtwoord zien',
  slideNum: slide => `Schuif ${slide}`,
  toggleColorFormat: 'Wissel kleurnotatie'
};

registerTranslation(translation);

export default translation;
