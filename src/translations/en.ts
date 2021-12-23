import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  close: 'Close',
  copy: 'Copy',
  progress: 'Progress',
  resize: 'Resize',
  scroll_to_end: 'Scroll to end',
  scroll_to_start: 'Scroll to start',
  select_a_color_from_the_screen: 'Select a color from the screen',
  toggle_color_format: 'Toggle color format'
};

registerTranslation(translation);

export default translation;
