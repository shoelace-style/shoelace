import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'tr',
  $name: 'Türkçe',
  $dir: 'ltr',

  carousel: 'Atlıkarınca',
  clearEntry: 'Girişi sil',
  close: 'Kapat',
  copy: 'Kopya',
  currentValue: 'Mevcut değer',
  goToSlide: (slide, count) => `${count} slayttan ${slide} slayta gidin`,
  hidePassword: 'Şifreyi sakla',
  loading: 'Yükleme',
  nextSlide: 'Sonraki slayt',
  numOptionsSelected: num => {
    if (num === 0) return 'Hiçbir seçenek seçilmedi';
    if (num === 1) return '1 seçenek seçildi';
    return `${num} seçenek seçildi`;
  },
  previousSlide: 'Bir onceki slayt',
  progress: 'İlerleme',
  remove: 'Kaldır',
  resize: 'Yeniden boyutlandır',
  scrollToEnd: 'Sona kay',
  scrollToStart: 'Başa kay',
  selectAColorFromTheScreen: 'Ekrandan bir renk seçin',
  showPassword: 'Şifreyi göster',
  slideNum: slide => `Slayt ${slide}`,
  toggleColorFormat: 'Renk biçimini değiştir'
};

registerTranslation(translation);

export default translation;
