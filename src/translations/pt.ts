import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  carousel: 'Carrossel',
  clearEntry: 'Limpar entrada',
  close: 'Fechar',
  copy: 'Copiar',
  currentValue: 'Valor atual',
  goToSlide: (slide, count) => `Vá para o slide ${slide} de ${count}`,
  hidePassword: 'Esconder a senha',
  loading: 'Carregando',
  nextSlide: 'Próximo slide',
  numOptionsSelected: num => {
    if (num === 0) return 'Nenhuma opção selecionada';
    if (num === 1) return '1 opção selecionada';
    return `${num} opções selecionadas`;
  },
  previousSlide: 'Slide anterior',
  progress: 'Progresso',
  remove: 'Remover',
  resize: 'Mudar o tamanho',
  scrollToEnd: 'Rolar até o final',
  scrollToStart: 'Rolar até o início',
  selectAColorFromTheScreen: 'Selecionar uma cor da tela',
  showPassword: 'Mostrar senha',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Trocar o formato de cor'
};

registerTranslation(translation);

export default translation;
