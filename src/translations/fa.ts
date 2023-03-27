import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'fa',
  $name: 'فارسی',
  $dir: 'rtl',

  carousel: 'چرخ فلک',
  clearEntry: 'پاک کردن ورودی',
  close: 'بستن',
  copy: 'رونوشت',
  currentValue: 'مقدار فعلی',
  goToSlide: (slide, count) => `رفتن به اسلاید ${slide} از ${count}`,
  hidePassword: 'پنهان کردن رمز',
  loading: 'بارگذاری',
  nextSlide: 'اسلاید بعدی',
  numOptionsSelected: num => {
    if (num === 0) return 'هیچ گزینه ای انتخاب نشده است';
    if (num === 1) return '1 گزینه انتخاب شده است';
    return `${num} گزینه انتخاب شده است`;
  },
  previousSlide: 'اسلاید قبلی',
  progress: 'پیشرفت',
  remove: 'حذف',
  resize: 'تغییر اندازه',
  scrollToEnd: 'پیمایش به انتها',
  scrollToStart: 'پیمایش به ابتدا',
  selectAColorFromTheScreen: 'انتخاب یک رنگ از صفحه نمایش',
  showPassword: 'نمایش رمز',
  slide_num: slide => `اسلاید ${slide}`,
  toggleColorFormat: 'تغییر قالب رنگ'
};

registerTranslation(translation);

export default translation;
