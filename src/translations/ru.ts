import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  close: 'Закрыть',
  copy: 'Скопировать',
  currentValue: 'Текущая стоимость',
  progress: 'Прогресс',
  remove: 'Удалять',
  resize: 'Изменить размер',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  toggleColorFormat: 'Переключить цветовую модель'
};

registerTranslation(translation);

export default translation;
