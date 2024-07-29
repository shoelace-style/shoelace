import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'cs',
  $name: 'Čeština',
  $dir: 'ltr',

  carousel: 'Karusel',
  clearEntry: 'Smazat položku',
  close: 'Zavřít',
  copied: 'Zkopírováno',
  copy: 'Kopírovat',
  currentValue: 'Současná hodnota',
  error: 'Chyba',
  goToSlide: (slide, count) => `Přejít na slide ${slide} z ${count}`,
  hidePassword: 'Skrýt heslo',
  loading: 'Nahrává se',
  nextSlide: 'Další slide',
  numOptionsSelected: num => {
    if (num === 0) return 'Nejsou vybrány žádné možnosti';
    if (num === 1) return 'Je vybrána jedna možnost';
    return `Počet vybraných možností: ${num}`;
  },
  previousSlide: 'Předchozí slide',
  progress: 'Průběh',
  remove: 'Odstranit',
  resize: 'Změnit velikost',
  scrollToEnd: 'Scrollovat na konec',
  scrollToStart: 'Scrollovat na začátek',
  selectAColorFromTheScreen: 'Vybrat barvu z obrazovky',
  showPassword: 'Zobrazit heslo',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Přepnout formát barvy'
};

registerTranslation(translation);

export default translation;
