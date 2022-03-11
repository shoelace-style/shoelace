import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  close: 'Fechar',
  copy: 'Copiar',
  progress: 'Progresso',
  resize: 'Mudar o tamanho',
  scrollToEnd: 'Rolar até o final',
  scrollToStart: 'Rolar até o começo',
  selectAColorFromTheScreen: 'Selecionar uma cor da tela',
  toggleColorFormat: 'Trocar o formato de cor'
};

registerTranslation(translation);

export default translation;
