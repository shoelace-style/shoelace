import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'zh-tw',
  $name: '正體中文',
  $dir: 'ltr',

  clearEntry: '清空',
  close: '關閉',
  copy: '複製',
  currentValue: '當前值',
  hidePassword: '隱藏密碼',
  loading: '載入中',
  progress: '進度',
  remove: '移除',
  resize: '調整大小',
  scrollToEnd: '捲至頁尾',
  scrollToStart: '捲至頁首',
  selectAColorFromTheScreen: '從螢幕中選擇一種顏色',
  showPassword: '顯示密碼',
  toggleColorFormat: '切換顏色格式'
};

registerTranslation(translation);

export default translation;
