import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',

  carousel: 'كاروسيل',
  clearEntry: 'حذف الخيارات',
  close: 'اغلاق',
  copied: 'تم النسخ',
  copy: 'نسخ',
  currentValue: 'القيمة الحالية',
  error: 'خطأ',
  goToSlide: (slide, count) => `عرض شريحة رقم ${slide} من ${count}`,
  hidePassword: 'اخفاء كلمة المرور',
  loading: 'جاري التحميل',
  nextSlide: 'الشريحة التالية',
  numOptionsSelected: num => {
    if (num === 0) return 'لم يتم تحديد أي خيارات';
    if (num === 1) return 'تم تحديد خيار واحد';
    if (num === 2) return 'تم تحديد خياران';
    if (num > 2 && num < 11) return `تم تحديد ${num} خيارات`;
    return `تم تحديد ${num} خيار`;
  },
  previousSlide: 'الشريحة السابقة',
  progress: 'مقدار التقدم',
  remove: 'حذف',
  resize: 'تغيير الحجم',
  scrollToEnd: 'الانتقال الى النهاية',
  scrollToStart: 'الانتقال الى البداية',
  selectAColorFromTheScreen: 'اختر لون من الشاشة',
  showPassword: 'عرض كلمة المرور',
  slideNum: slide => `شريحة ${slide}`,
  toggleColorFormat: 'تغيير صيغة عرض  اللون'
};

registerTranslation(translation);

export default translation;
