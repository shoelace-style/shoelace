import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  carousel: 'Карусель',
  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  copy: 'Скопировать',
  currentValue: 'Текущее значение',
  goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка',
  nextSlide: 'Следующий слайд',
  numOptionsSelected: num => {
    if (num === 0) return 'выбрано 0 вариантов';
    if (num === 1) return 'Выбран 1 вариант';
    return `выбрано ${num} варианта`;
  },
  previousSlide: 'Предыдущий слайд',
  progress: 'Прогресс',
  remove: 'Удалить',
  resize: 'Изменить размер',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  showPassword: 'Показать пароль',
  slideNum: slide => `Слайд ${slide}`,
  toggleColorFormat: 'Переключить цветовую модель'
};

registerTranslation(translation);

export default translation;
