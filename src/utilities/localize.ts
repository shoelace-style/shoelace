import '../translations/en.js';
import { LocalizeController as DefaultLocalizationController } from '@shoelace-style/localize'; // Register English as the default/fallback language
import type { Translation as DefaultTranslation } from '@shoelace-style/localize';

// Extend the controller and apply our own translation interface for better typings
export class LocalizeController extends DefaultLocalizationController<Translation> {}

// Export functions from the localize lib so we have one central place to import them from
export { registerTranslation } from '@shoelace-style/localize';

export interface Translation extends DefaultTranslation {
  $code: string; // e.g. en, en-GB
  $name: string; // e.g. English, Español
  $dir: 'ltr' | 'rtl';

  carousel: string;
  clearEntry: string;
  close: string;
  copy: string;
  currentValue: string;
  goToSlide: (slide: number, count: number) => string;
  hidePassword: string;
  loading: string;
  nextSlide: string;
  numOptionsSelected: (num: number) => string;
  previousSlide: string;
  progress: string;
  remove: string;
  resize: string;
  scrollToEnd: string;
  scrollToStart: string;
  selectAColorFromTheScreen: string;
  showPassword: string;
  slideNum: (slide: number) => string;
  toggleColorFormat: string;
}
