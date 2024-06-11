import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'id',
  $name: 'Bahasa Indonesia',
  $dir: 'ltr',

  carousel: 'Karousel',
  clearEntry: 'Hapus entri',
  close: 'Tutup',
  copied: 'Disalin',
  copy: 'Salin',
  currentValue: 'Nilai saat ini',
  error: 'Kesalahan',
  goToSlide: (slide, count) => `Pergi ke slide ${slide} dari ${count}`,
  hidePassword: 'Sembunyikan sandi',
  loading: 'Memuat',
  nextSlide: 'Slide berikutnya',
  numOptionsSelected: num => {
    if (num === 0) return 'Tidak ada opsi yang dipilih';
    if (num === 1) return '1 opsi yang dipilih';
    return `${num} opsi yang dipilih`;
  },
  previousSlide: 'Slide sebelumnya',
  progress: 'Kemajuan',
  remove: 'Hapus',
  resize: 'Ubah ukuran',
  scrollToEnd: 'Gulir ke akhir',
  scrollToStart: 'Gulir ke awal',
  selectAColorFromTheScreen: 'Pilih warna dari layar',
  showPassword: 'Tampilkan sandi',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Beralih format warna'
};

registerTranslation(translation);

export default translation;
