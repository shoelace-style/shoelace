import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  close: 'Cerrar',
  copy: 'Copiar',
  progress: 'Progreso',
  resize: 'Cambiar el tamaño',
  scroll_to_end: 'Desplazarse hasta el final',
  scroll_to_start: 'Desplazarse al inicio',
  select_a_color_from_the_screen: 'Seleccione un color de la pantalla',
  toggle_color_format: 'Alternar formato de color'
};

registerTranslation(translation);

export default translation;
