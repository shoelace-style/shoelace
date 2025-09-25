import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'kk',
  $name: 'Қазақ',
  $dir: 'ltr',

  carousel: 'Карусель',
  clearEntry: 'Жазбаны жою',
  close: 'Жабу',
  copied: 'Көшірілді',
  copy: 'Көшіру',
  currentValue: 'Қазіргі мән',
  error: 'Қате',
  goToSlide: (slide, count) => `${slide}/${count} слайдқа өту`,
  hidePassword: 'Құпиясөзді жасыру',
  loading: 'Жүктелуде',
  nextSlide: 'Келесі слайд',
  numOptionsSelected: num => {
    if (num === 0) return 'Ештеңе таңдалмады';
    if (num < 6 || num === 7) return `${num}-еу таңдалды`;
    if (num === 6) return `${num}-ау таңдалды`;
    return `${num} таңдалды`;
  },
  previousSlide: 'Алдыңғы слайд',
  progress: 'Прогресс',
  remove: 'Жою',
  resize: 'Өлшемін өзгерту',
  scrollToEnd: 'Соңына түсіру',
  scrollToStart: 'Басына көтеру',
  selectAColorFromTheScreen: 'Экраннан түсті таңдаңыз',
  showPassword: 'Құпиясөзді көрсету',
  slideNum: slide => `${slide}-слайд`,
  toggleColorFormat: 'Түс пішімін ауыстыру'
};

registerTranslation(translation);

export default translation;
