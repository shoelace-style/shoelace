import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  browseFiles: '',
  clearEntry: 'Wyczyść wpis',
  close: 'Zamknij',
  copy: 'Kopiuj',
  currentValue: 'Aktualna wartość',
  dragDrop: '',
  fileSizeExceeded: '',
  fileTypeNotAccepted: '',
  hidePassword: 'Ukryj hasło',
  loading: 'Ładowanie',
  maxFiles: '',
  noMultipleFiles: '',
  progress: 'Postęp',
  remove: 'Usunąć',
  resize: 'Zmień rozmiar',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  selectAColorFromTheScreen: 'Próbkuj z ekranu',
  showPassword: 'Pokaż hasło',
  toggleColorFormat: 'Przełącz format'
};

registerTranslation(translation);

export default translation;
