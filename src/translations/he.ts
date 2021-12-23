import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  close: 'סגור',
  copy: 'העתק',
  progress: 'התקדמות',
  resize: 'שנה גודל',
  scroll_to_end: 'גלול עד הסוף',
  scroll_to_start: 'גלול להתחלה',
  select_a_color_from_the_screen: 'בחור צבע מהמסך',
  toggle_color_format: 'החלף פורמט צבע'
};

registerTranslation(translation);

export default translation;
