import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  clearEntry: 'Clear entry',
  close: 'Close',
  copy: 'Copy',
  currentValue: 'Current value',
  goToCarouselNextSlide: 'Go to next slide in carousel',
  goToCarouselPreviousSlide: 'Go to previous slide in carousel',
  goToCarouselSlide: (slide, count) => `Go to slide ${slide} of ${count} in carousel`,
  hidePassword: 'Hide password',
  loading: 'Loading',
  numOptionsSelected: num => {
    if (num === 0) return 'No options selected';
    if (num === 1) return '1 option selected';
    return `${num} options selected`;
  },
  progress: 'Progress',
  remove: 'Remove',
  resize: 'Resize',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a color from the screen',
  showPassword: 'Show password',
  toggleColorFormat: 'Toggle color format'
};

registerTranslation(translation);

export default translation;
