import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  clearEntry: 'Очистить запись',
  close: 'Закрыть',
  copy: 'Скопировать',
  currentValue: 'Текущая стоимость',
  hidePassword: 'Скрыть пароль',
  progress: 'Прогресс',
  remove: 'Удалять',
  resize: 'Изменить размер',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  showPassword: 'Показать пароль',
  toggleColorFormat: 'Переключить цветовую модель'
};

registerTranslation(translation);

export default translation;
