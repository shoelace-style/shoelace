import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  close: 'Zamknij',
  copy: 'Kopiuj',
  progress: 'Postęp',
  resize: 'Zmień rozmiar',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  selectAColorFromTheScreen: 'Próbkuj z ekranu',
  toggleColorFormat: 'Przełącz format'
};

registerTranslation(translation);

export default translation;
