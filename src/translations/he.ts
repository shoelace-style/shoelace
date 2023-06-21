import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  carousel: 'קרוסלה',
  clearEntry: 'נקה קלט',
  close: 'סגור',
  copy: 'העתק',
  currentValue: 'ערך נוכחי',
  goToSlide: (slide, count) => `עבור לשקופית ${slide} של ${count}`,
  hidePassword: 'הסתר סיסמא',
  loading: 'טוען',
  nextSlide: 'Next slide',
  numOptionsSelected: num => {
    if (num === 0) return 'לא נבחרו אפשרויות';
    if (num === 1) return 'נבחרה אפשרות אחת';
    return `נבחרו ${num} אפשרויות`;
  },
  previousSlide: 'Previous slide',
  progress: 'התקדמות',
  remove: 'לְהַסִיר',
  resize: 'שנה גודל',
  scrollToEnd: 'גלול עד הסוף',
  scrollToStart: 'גלול להתחלה',
  selectAColorFromTheScreen: 'בחור צבע מהמסך',
  showPassword: 'הראה סיסמה',
  slideNum: slide => `שקופית ${slide}`,
  toggleColorFormat: 'החלף פורמט צבע'
};

registerTranslation(translation);

export default translation;
