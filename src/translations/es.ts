import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  clearEntry: 'Borrar entrada',
  close: 'Cerrar',
  copy: 'Copiar',
  currentValue: 'Valor actual',
  hidePassword: 'Ocultar contraseña',
  progress: 'Progreso',
  remove: 'Eliminar',
  resize: 'Cambiar el tamaño',
  scrollToEnd: 'Desplazarse hasta el final',
  scrollToStart: 'Desplazarse al inicio',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  showPassword: 'Mostrar contraseña',
  toggleColorFormat: 'Alternar formato de color'
};

registerTranslation(translation);

export default translation;
