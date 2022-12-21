import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fa',
  $name: 'فارسی',
  $dir: 'rtl',

  clearEntry: 'پاک کردن ورودی',
  close: 'بستن',
  copy: 'رونوشت',
  currentValue: 'مقدار فعلی',
  hidePassword: 'پنهان کردن رمز',
  loading: 'بارگذاری',
  progress: 'پیشرفت',
  remove: 'حذف',
  resize: 'تغییر اندازه',
  scrollToEnd: 'پیمایش به انتها',
  scrollToStart: 'پیمایش به ابتدا',
  selectAColorFromTheScreen: 'انتخاب یک رنگ از صفحه نمایش',
  showPassword: 'نمایش رمز',
  toggleColorFormat: 'تغییر قالب رنگ'
};

registerTranslation(translation);

export default translation;
