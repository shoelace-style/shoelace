import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'hu',
  $name: 'Magyar',
  $dir: 'ltr',

  clearEntry: 'Bejegyzés törlése',
  close: 'Bezárás',
  copy: 'Másolás',
  currentValue: 'Aktuális érték',
  hidePassword: 'Jelszó elrejtése',
  loading: 'Betöltés',
  progress: 'Folyamat',
  remove: 'Eltávolítás',
  resize: 'Átméretezés',
  scrollToEnd: 'Görgessen a végére',
  scrollToStart: 'Görgessen az elejére',
  selectAColorFromTheScreen: 'Szín választása a képernyőről',
  showPassword: 'Jelszó megjelenítése',
  toggleColorFormat: 'Színformátum változtatása'
};

registerTranslation(translation);

export default translation;
