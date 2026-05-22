import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'is',
  $name: 'Íslenska',
  $dir: 'ltr',

  carousel: 'Myndasýning',
  clearEntry: 'Hreinsa',
  close: 'Loka',
  copied: 'Afritað',
  copy: 'Afrita',
  currentValue: 'Núverandi gildi',
  error: 'Villa',
  goToSlide: (slide, count) => `Fara á glæru ${slide} af ${count}`,
  hidePassword: 'Fela lykilorð',
  loading: 'Hleð',
  nextSlide: 'Næsta glæra',
  numOptionsSelected: num => {
    if (num === 0) return 'Ekkert valið';
    if (num === 1) return '1 valmöguleiki valinn';
    return `${num} valmöguleikar valdir`;
  },
  previousSlide: 'Fyrri glæra',
  progress: 'Framvinda',
  remove: 'Eyða',
  resize: 'Breyta stærð',
  scrollToEnd: 'Skruna í enda',
  scrollToStart: 'Skruna í byrjun',
  selectAColorFromTheScreen: 'Veldu lit fyrir skjáinn',
  showPassword: 'Sýna lykilorð',
  slideNum: slide => `Glæra ${slide}`,
  toggleColorFormat: 'Skipta um litasnið'
};

registerTranslation(translation);

export default translation;
