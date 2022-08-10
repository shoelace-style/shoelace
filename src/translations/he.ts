import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  browseFiles: '',
  clearEntry: 'נקה קלט',
  close: 'סגור',
  copy: 'העתק',
  currentValue: 'ערך נוכחי',
  dragDrop: '',
  fileSizeExceeded: '',
  fileTypeNotAccepted: '',
  hidePassword: 'הסתר סיסמא',
  loading: 'טוען',
  maxFiles: '',
  noMultipleFiles: '',
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
