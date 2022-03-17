import type { Translation } from '~/utilities/localize';
import { registerTranslation } from '~/utilities/localize';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  close: '閉じる',
  copy: 'コピー',
  currentValue: '現在の価値',
  progress: '進行',
  remove: '削除',
  resize: 'サイズ変更',
  scrollToEnd: '最後にスクロールする',
  scrollToStart: '最初にスクロールする',
  selectAColorFromTheScreen: '画面から色を選択してください',
  toggleColorFormat: '色のフォーマットを切り替える'
};

registerTranslation(translation);

export default translation;
