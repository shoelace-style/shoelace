import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  carousel: 'Vrtiljak',
  clearEntry: 'Počisti vnos',
  close: 'Zapri',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrednost',
  error: 'Napaka',
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  hidePassword: 'Skrij geslo',
  loading: 'Nalaganje',
  nextSlide: 'Naslednji diapozitiv',
  numOptionsSelected: num => {
    if (num === 0) return 'Nobena možnost ni izbrana';
    if (num === 1) return '1 možnost izbrana';
    if (num === 2) return '2 možnosti izbrani';
    if (num === 3 || num === 4) return `${num} možnosti izbrane`;
    return `${num} možnosti izbranih`;
  },
  previousSlide: 'Prejšnji diapozitiv',
  progress: 'Napredek',
  remove: 'Odstrani',
  resize: 'Spremeni velikost',
  scrollToEnd: 'Pomakni se na konec',
  scrollToStart: 'Pomakni se na začetek',
  selectAColorFromTheScreen: 'Izberite barvo z zaslona',
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  toggleColorFormat: 'Preklopi format barve'
};

registerTranslation(translation);

export default translation;
