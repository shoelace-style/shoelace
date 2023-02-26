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
  goToSlide: (slide, count) => `轉到第 ${slide} 張幻燈片，共 ${count} 張`,
  hidePassword: '隱藏密碼',
  loading: '載入中',
  nextSlide: '下一張幻燈片',
  numOptionsSelected: num => {
    if (num === 0) return '未選擇任何項目';
    if (num === 1) return '已選擇 1 個項目';
    return `${num} 選擇項目`;
  },
  previousSlide: '上一張幻燈片',
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
