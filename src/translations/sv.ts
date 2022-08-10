import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'sv',
  $name: 'Svenska',
  $dir: 'ltr',

  clearEntry: 'Återställ val',
  close: 'Stäng',
  copy: 'Kopiera',
  currentValue: 'Nuvarande värde',
  hidePassword: 'Dölj lösenord',
  loading: 'Läser in',
  progress: 'Framsteg',
  remove: 'Ta bort',
  resize: 'Ändra storlek',
  scrollToEnd: 'Skrolla till slutet',
  scrollToStart: 'Skrolla till början',
  selectAColorFromTheScreen: 'Välj en färg från skärmen',
  showPassword: 'Visa lösenord',
  toggleColorFormat: 'Växla färgformat'
};

registerTranslation(translation);

export default translation;
