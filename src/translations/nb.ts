import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from "../utilities/localize.js";

const translation: Translation = {
  $code: 'nb',
  $name: 'Norwegian Bokmål',
  $dir: 'ltr',

  carousel: 'Karusell',
  clearEntry: 'Tøm felt',
  close: 'Lukk',
  copied: 'Kopiert',
  copy: 'Kopier',
  currentValue: 'Nåværende verdi',
  error: 'Feil',
  goToSlide: (slide, count) => `Gå til visning ${slide} av ${count}`,
  hidePassword: 'Skjul passord',
  loading: 'Laster',
  nextSlide: 'Neste visning',
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen alternativer valgt';
    if (num === 1) return 'Ett alternativ valgt';
    return `${num} alternativer valgt`;
  },
  previousSlide: 'Forrige visning',
  progress: 'Fremdrift',
  remove: 'Fjern',
  resize: 'Endre størrelse',
  scrollToEnd: 'Rull til slutten',
  scrollToStart: 'Rull til starten',
  selectAColorFromTheScreen: 'Velg en farge fra skjermen',
  showPassword: 'Vis passord',
  slideNum: slide => `Visning ${slide}`,
  toggleColorFormat: 'Bytt fargeformat'
};

registerTranslation(translation);

export default translation;
