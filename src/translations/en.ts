import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  browseFiles: 'Browse files',
  clearEntry: 'Clear entry',
  close: 'Close',
  copy: 'Copy',
  currentValue: 'Current value',
  dragDrop: 'Drag and drop to upload',
  fileTypeNotAccepted: 'Filetype is not accepted',
  fileSizeExceeded: 'File size exceeds limit',
  hidePassword: 'Hide password',
  loading: 'Loading',
  maxFiles: 'Maximum number of files reached',
  noMultipleFiles: 'Multiple files are not allowed',
  progress: 'Progress',
  remove: 'Remove',
  resize: 'Resize',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a color from the screen',
  serverError: 'A server error occurred while transferring the file',
  showPassword: 'Show password',
  toggleColorFormat: 'Toggle color format',
  transferAbort: 'The transfer has been canceled by the user',
  transferError: 'An error occurred while transferring the file'
};

registerTranslation(translation);

export default translation;
