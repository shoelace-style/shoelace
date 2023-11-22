import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-cn',
  $name: '简体中文',
  $dir: 'ltr',

  carousel: '跑马灯',
  clearEntry: '清空',
  close: '关闭',
  copied: '已复制',
  copy: '复制',
  currentValue: '当前值',
  error: '错误',
  goToSlide: (slide, count) => `转到第 ${slide} 张幻灯片，共 ${count} 张`,
  hidePassword: '隐藏密码',
  loading: '加载中',
  nextSlide: '下一张幻灯片',
  numOptionsSelected: num => {
    if (num === 0) return '未选择任何项目';
    if (num === 1) return '已选择 1 个项目';
    return `${num} 选择项目`;
  },
  previousSlide: '上一张幻灯片',
  progress: '进度',
  remove: '删除',
  resize: '调整大小',
  scrollToEnd: '滚动至页尾',
  scrollToStart: '滚动至页首',
  selectAColorFromTheScreen: '从屏幕中选择一种颜色',
  showPassword: '显示密码',
  slideNum: slide => `幻灯片 ${slide}`,
  toggleColorFormat: '切换颜色模式'
};

registerTranslation(translation);

export default translation;
