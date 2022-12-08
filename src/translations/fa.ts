import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fa',
  $name: 'فارسی',
  $dir: 'rtl',

  clearEntry: 'پاک کردن ورودی',
  close: 'بستن',
  copy: 'کپی',
  currentValue: 'مقدار فعلی',
  hidePassword: 'پنهان کردن رمز',
  loading: 'بارگذاری',
  progress: 'پیشرفت',
  remove: 'حذف',
  resize: 'تغییر اندازه',
  scrollToEnd: 'اسکرول به انتها',
  scrollToStart: 'اسکرول به ابتدا',
  selectAColorFromTheScreen: 'انتخاب یک رنگ از صفحه نمایش',
  showPassword: 'نمایش دادن رمز',
  toggleColorFormat: 'تغییر فرمت رنگ'
};

registerTranslation(translation);

export default translation;
