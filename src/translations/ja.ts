import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  clearEntry: 'クリアエントリ',
  close: '閉じる',
  copy: 'コピー',
  numOptionsSelected: num => {
    if (num === 0) return 'オプションが選択されていません';
    if (num === 1) return '1 つのオプションが選択されました';
    return `${num} つのオプションが選択されました`;
  },
  currentValue: '現在の価値',
  hidePassword: 'パスワードを隠す',
  loading: '読み込み中',
  progress: '進行',
  remove: '削除',
  resize: 'サイズ変更',
  scrollToEnd: '最後にスクロールする',
  scrollToStart: '最初にスクロールする',
  selectAColorFromTheScreen: '画面から色を選択してください',
  showPassword: 'パスワードを表示',
  toggleColorFormat: '色のフォーマットを切り替える'
};

registerTranslation(translation);

export default translation;
