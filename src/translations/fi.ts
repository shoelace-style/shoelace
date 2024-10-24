import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  carousel: 'Karuselli',
  clearEntry: 'Poista merkintä',
  close: 'Sulje',
  copied: 'Kopioitu',
  copy: 'Kopioi',
  currentValue: 'Nykyinen arvo',
  error: 'Virhe',
  goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
  hidePassword: 'Piilota salasana',
  loading: 'Ladataan',
  nextSlide: 'Seuraava dia',
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittuja vaihtoehtoja';
    if (num === 1) return 'Yksi vaihtoehto valittu';
    return `${num} vaihtoehtoa valittu`;
  },
  previousSlide: 'Edellinen dia',
  progress: 'Edistyminen',
  remove: 'Poista',
  resize: 'Muuta kokoa',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  selectAColorFromTheScreen: 'Valitse väri näytöltä',
  showPassword: 'Näytä salasana',
  slideNum: slide => `Dia ${slide}`,
  toggleColorFormat: 'Vaihda väriformaattia'
};

registerTranslation(translation);

export default translation;
