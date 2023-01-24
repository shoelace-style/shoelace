import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  clearEntry: 'נקה קלט',
  close: 'סגור',
  copy: 'העתק',
  numOptionsSelected: num => {
    if (num === 0) return 'לא נבחרו אפשרויות';
    if (num === 1) return 'נבחרה אפשרות אחת';
    return `נבחרו ${num} אפשרויות`;
  },
  currentValue: 'ערך נוכחי',
  hidePassword: 'הסתר סיסמא',
  loading: 'טוען',
  progress: 'התקדמות',
  remove: 'לְהַסִיר',
  resize: 'שנה גודל',
  scrollToEnd: 'גלול עד הסוף',
  scrollToStart: 'גלול להתחלה',
  selectAColorFromTheScreen: 'בחור צבע מהמסך',
  showPassword: 'הראה סיסמה',
  toggleColorFormat: 'החלף פורמט צבע'
};

registerTranslation(translation);

export default translation;
