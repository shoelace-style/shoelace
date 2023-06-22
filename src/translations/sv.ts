import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sv',
  $name: 'Svenska',
  $dir: 'ltr',

  carousel: 'Karusell',
  clearEntry: 'Återställ val',
  close: 'Stäng',
  copy: 'Kopiera',
  currentValue: 'Nuvarande värde',
  goToSlide: (slide, count) => `Gå till bild ${slide} av ${count}`,
  hidePassword: 'Dölj lösenord',
  loading: 'Läser in',
  nextSlide: 'Nästa bild',
  numOptionsSelected: num => {
    if (num === 0) return 'Inga alternativ har valts';
    if (num === 1) return '1 alternativ valt';
    return `${num} alternativ valda`;
  },
  previousSlide: 'Föregående bild',
  progress: 'Framsteg',
  remove: 'Ta bort',
  resize: 'Ändra storlek',
  scrollToEnd: 'Skrolla till slutet',
  scrollToStart: 'Skrolla till början',
  selectAColorFromTheScreen: 'Välj en färg från skärmen',
  showPassword: 'Visa lösenord',
  slideNum: slide => `Bild ${slide}`,
  toggleColorFormat: 'Växla färgformat'
};

registerTranslation(translation);

export default translation;
