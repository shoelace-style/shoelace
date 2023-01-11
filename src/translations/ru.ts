import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  copy: 'Скопировать',
  numOptionsSelected: num => {
    if (num === 0) return 'выбрано 0 вариантов';
    if (num === 1) return 'Выбран 1 вариант';
    return `выбрано ${num} варианта`;
  },
  currentValue: 'Текущее значение',
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка',
  progress: 'Прогресс',
  remove: 'Удалить',
  resize: 'Изменить размер',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  showPassword: 'Показать пароль',
  toggleColorFormat: 'Переключить цветовую модель'
};

registerTranslation(translation);

export default translation;
