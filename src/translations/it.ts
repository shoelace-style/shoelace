import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'it',
  $name: 'Italian',
  $dir: 'ltr',

  carousel: 'Carosello',
  clearEntry: 'Cancella inserimento',
  close: 'Chiudi',
  copied: 'Copiato',
  copy: 'Copia',
  currentValue: 'Valore attuale',
  error: 'Errore',
  goToSlide: (slide, count) => `Vai alla diapositiva ${slide} di ${count}`,
  hidePassword: 'Nascondi password',
  loading: 'In caricamento',
  nextSlide: 'Prossima diapositiva',
  numOptionsSelected: num => {
    if (num === 0) return 'Nessuna opzione selezionata';
    if (num === 1) return '1 opzione selezionata';
    return `${num} opzioni selezionate`;
  },
  previousSlide: 'Diapositiva precedente',
  progress: 'Avanzamento',
  remove: 'Rimuovi',
  resize: 'Ridimensiona',
  scrollToEnd: 'Scorri alla fine',
  scrollToStart: "Scorri all'inizio",
  selectAColorFromTheScreen: 'Seleziona un colore dalla schermo',
  showPassword: 'Mostra password',
  slideNum: slide => `Diapositiva ${slide}`,
  toggleColorFormat: 'Cambia formato colore'
};

registerTranslation(translation);

export default translation;
