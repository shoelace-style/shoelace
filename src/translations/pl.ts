import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  close: 'Zamknij',
  copy: 'Kopiuj',
  progress: 'Postęp',
  resize: 'Zmień rozmiar',
  scroll_to_end: 'Przewiń do końca',
  scroll_to_start: 'Przewiń do początku',
  select_a_color_from_the_screen: 'Próbkuj z ekranu',
  toggle_color_format: 'Przełącz format'
};

registerTranslation(translation);

export default translation;
