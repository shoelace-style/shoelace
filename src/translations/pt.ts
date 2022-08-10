import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  browseFiles: '',
  clearEntry: 'Limpar entrada',
  close: 'Fechar',
  copy: 'Copiar',
  currentValue: 'Valor atual',
  dragDrop: '',
  fileSizeExceeded: '',
  fileTypeNotAccepted: '',
  hidePassword: 'Esconder a senha',
  loading: 'Carregando',
  maxFiles: '',
  noMultipleFiles: '',
  progress: 'Progresso',
  remove: 'Remover',
  resize: 'Mudar o tamanho',
  scrollToEnd: 'Rolar até o final',
  scrollToStart: 'Rolar até o começo',
  selectAColorFromTheScreen: 'Selecionar uma cor da tela',
  showPassword: 'Mostrar senhaShow password',
  toggleColorFormat: 'Trocar o formato de cor'
};

registerTranslation(translation);

export default translation;
