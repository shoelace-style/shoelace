import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hu',
  $name: 'Magyar',
  $dir: 'ltr',

  carousel: 'Körhinta',
  clearEntry: 'Bejegyzés törlése',
  close: 'Bezárás',
  copy: 'Másolás',
  currentValue: 'Aktuális érték',
  goToSlide: (slide, count) => `Ugrás a ${count}/${slide}. diára`,
  hidePassword: 'Jelszó elrejtése',
  loading: 'Betöltés',
  nextSlide: 'Következő dia',
  numOptionsSelected: num => {
    if (num === 0) return 'Nincsenek kiválasztva opciók';
    if (num === 1) return '1 lehetőség kiválasztva';
    return `${num} lehetőség kiválasztva`;
  },
  previousSlide: 'Előző dia',
  progress: 'Folyamat',
  remove: 'Eltávolítás',
  resize: 'Átméretezés',
  scrollToEnd: 'Görgessen a végére',
  scrollToStart: 'Görgessen az elejére',
  selectAColorFromTheScreen: 'Szín választása a képernyőről',
  showPassword: 'Jelszó megjelenítése',
  slideNum: slide => `${slide}. dia`,
  toggleColorFormat: 'Színformátum változtatása'
};

registerTranslation(translation);

export default translation;
