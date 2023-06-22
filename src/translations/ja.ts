import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  carousel: 'カルーセル',
  clearEntry: 'クリアエントリ',
  close: '閉じる',
  copy: 'コピー',
  currentValue: '現在の価値',
  goToSlide: (slide, count) => `${count} 枚中 ${slide} 枚のスライドに移動`,
  hidePassword: 'パスワードを隠す',
  loading: '読み込み中',
  nextSlide: '次のスライド',
  numOptionsSelected: num => {
    if (num === 0) return 'オプションが選択されていません';
    if (num === 1) return '1 つのオプションが選択されました';
    return `${num} つのオプションが選択されました`;
  },
  previousSlide: '前のスライド',
  progress: '進行',
  remove: '削除',
  resize: 'サイズ変更',
  scrollToEnd: '最後にスクロールする',
  scrollToStart: '最初にスクロールする',
  selectAColorFromTheScreen: '画面から色を選択してください',
  showPassword: 'パスワードを表示',
  slideNum: slide => `スライド ${slide}`,
  toggleColorFormat: '色のフォーマットを切り替える'
};

registerTranslation(translation);

export default translation;
