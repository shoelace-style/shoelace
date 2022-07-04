import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  browseFiles: 'Dateien durchsuchen',
  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  dragDrop: 'Dateien hier ablegen um diese hochzuladen',
  fileSizeExceeded: 'Dateiegröße überschritten',
  fileTypeNotAccepted: 'Dateityp nicht erlaubt',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  maxFiles: 'Maximale Anzahl an Dateien erreicht',
  noMultipleFiles: 'Mehrere Dateien sind nicht erlaubt',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Wähle eine Farbe vom Bildschirm',
  serverError: 'Es ist ein Server-Fehler beim Übertragen der Datei aufgetreten',
  showPassword: 'Passwort anzeigen',
  toggleColorFormat: 'Farbformat umschalten',
  transferAbort: 'Die Übertragung wurde vom Benutzer abgebrochen',
  transferError: 'Es ist ein Fehler beim Übertragen der Datei aufgetreten'
};

registerTranslation(translation);

export default translation;
