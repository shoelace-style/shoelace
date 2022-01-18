import { registerTranslation } from '~/utilities/localize';
import type { Translation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  close: 'Close',
  copy: 'Copy',
  progress: 'Progress',
  resize: 'Resize',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a color from the screen',
  toggleColorFormat: 'Toggle color format'
};

registerTranslation(translation);

export default translation;
