import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  close: '閉じる',
  copy: 'コピー',
  progress: '進行',
  resize: 'サイズ変更',
  scroll_to_end: '最後にスクロールする',
  scroll_to_start: '最初にスクロールする',
  select_a_color_from_the_screen: '画面から色を選択してください',
  toggle_color_format: '色のフォーマットを切り替える'
};

registerTranslation(translation);

export default translation;
