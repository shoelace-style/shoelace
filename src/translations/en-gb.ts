import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'en-GB',
  $name: 'English (United Kingdom)',
  $dir: 'ltr',

  clearEntry: 'Clear entry',
  close: 'Close',
  copy: 'Copy',
  numOptionsSelected: (num: number) => {
    if (num === 0) return 'No options selected';
    if (num === 1) return '1 option selected';
    return `${num} options selected`;
  },
  currentValue: 'Current value',
  hidePassword: 'Hide password',
  loading: 'Loading',
  progress: 'Progress',
  remove: 'Remove',
  resize: 'Resize',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a colour from the screen',
  showPassword: 'Show password',
  toggleColorFormat: 'Toggle colour format'
};

registerTranslation(translation);

export default translation;
