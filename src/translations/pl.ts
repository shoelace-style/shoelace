import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  carousel: 'Karuzela',
  clearEntry: 'Wyczyść wpis',
  close: 'Zamknij',
  copy: 'Kopiuj',
  currentValue: 'Aktualna wartość',
  goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
  hidePassword: 'Ukryj hasło',
  loading: 'Ładowanie',
  nextSlide: 'Następny slajd',
  numOptionsSelected: num => {
    if (num === 0) return 'Nie wybrano opcji';
    if (num === 1) return 'Wybrano 1 opcję';
    return `Wybrano ${num} opcje`;
  },
  previousSlide: 'Poprzedni slajd',
  progress: 'Postęp',
  remove: 'Usunąć',
  resize: 'Zmień rozmiar',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  selectAColorFromTheScreen: 'Próbkuj z ekranu',
  showPassword: 'Pokaż hasło',
  slideNum: slide => `Slajd ${slide}`,
  toggleColorFormat: 'Przełącz format'
};

registerTranslation(translation);

export default translation;
