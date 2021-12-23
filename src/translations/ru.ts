import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  close: 'Закрыть',
  copy: 'Скопировать',
  progress: 'Прогресс',
  resize: 'Изменить размер',
  scroll_to_end: 'Пролистать до конца',
  scroll_to_start: 'Пролистать к началу',
  select_a_color_from_the_screen: 'Выберите цвет на экране',
  toggle_color_format: 'Переключить цветовую модель'
};

registerTranslation(translation);

export default translation;
