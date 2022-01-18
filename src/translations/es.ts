import { registerTranslation } from '~/utilities/localize';
import type { Translation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  close: 'Cerrar',
  copy: 'Copiar',
  progress: 'Progreso',
  resize: 'Cambiar el tamaño',
  scrollToEnd: 'Desplazarse hasta el final',
  scrollToStart: 'Desplazarse al inicio',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  toggleColorFormat: 'Alternar formato de color'
};

registerTranslation(translation);

export default translation;
