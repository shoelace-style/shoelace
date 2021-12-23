import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  close: 'Fechar',
  copy: 'Copiar',
  progress: 'Progresso',
  resize: 'Mudar o tamanho',
  scroll_to_end: 'Rolar até o final',
  scroll_to_start: 'Rolar até o começo',
  select_a_color_from_the_screen: 'Selecionar uma cor da tela',
  toggle_color_format: 'Trocar o formato de cor'
};

registerTranslation(translation);

export default translation;
