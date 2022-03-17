import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  close: 'סגור',
  copy: 'העתק',
  currentValue: 'ערך נוכחי',
  progress: 'התקדמות',
  remove: 'לְהַסִיר',
  resize: 'שנה גודל',
  scrollToEnd: 'גלול עד הסוף',
  scrollToStart: 'גלול להתחלה',
  selectAColorFromTheScreen: 'בחור צבע מהמסך',
  toggleColorFormat: 'החלף פורמט צבע'
};

registerTranslation(translation);

export default translation;
