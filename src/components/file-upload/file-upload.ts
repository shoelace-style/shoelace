import { html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../components/icon-button/icon-button';
import '../../components/icon/icon';
import '../../components/progress-bar/progress-bar';
import { emit } from '../../internal/event';
import { LocalizeController } from '../../utilities/localize';
import styles from './file-upload.styles';
import { hasValidFileSize, hasValidFileType } from './library';
import type { FileInfo } from './library';
import { FormSubmitController } from '../../internal/form';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-progress-bar
 * @dependency sl-icon
 * @dependency sl-icon-button
 *
 * @slot label - The dropzone's label. Alternatively, you can use the image slot and label prop.
 * @slot image - The dropzone's image.
 * @slot button - The dropzone's button.
 *
 * @event sl-drop - Emitted when dragged files have been dropped on the dropzone area.
 * @event sl-select - Emitted when files have been selected via the file dialog.
 * @event {{ fileList: FileList }} sl-change - Emitted when files have been uploaded via the dropzone or file dialog.
 * @event {{ response: unknown }} sl-load - Emitted when a file transfer was finished
 * @event {{ event: ProgressEvent }} sl-error - Emitted when a file transfer threw an error
 * @event {{ event: ProgressEvent }} sl-abort - Emitted when a file transfer was aborted by the user
 * @event {{ file: FileInfo }} sl-remove - Emitted when a file was removed
 *
 * @csspart base - The component's internal wrapper.
 * @csspart label - The dropzone container.
 * @csspart image - The dropzone image.
 * @csspart button - The dropzone button.
 *
 * @cssproperty --border-radius - The border radius of the dropzone borders.
 * @cssproperty --border-width - The width of the dropzone borders.
 * @cssproperty --border-style - The style of the dropzone borders.
 *
 */

@customElement('sl-file-upload')
export default class SlFileUpload extends LitElement {
  static styles = styles;

  protected readonly formSubmitController = new FormSubmitController(this, {
    value: (control: SlFileUpload) => {
      if (control.files.length === 1) {
        return control.files[0].file;
      } else if (control.files.length > 1) {
        return control.files.map(fileInfo => fileInfo.file);
      }
      return new File([''], '', { type: 'application/octet-stream' });
    }
  });

  private readonly localize = new LocalizeController(this);

  /** Internal property to show a warning in the dropzone */
  @state() warning?: string;

  /** Indicates whether a file is currently dragged over the dropzone */
  @state() isDragover: boolean = false;

  @query('#file-input') fileInput: HTMLInputElement;

  @property() files: FileInfo[] = [];

  /** The input's name attribute. */
  @property() name: string;

  public get value(): string | File {
    if (this.files.length > 0) {
      return 'C:\\fakepath\\' + this.files[0].file.name;
    }
    return '';
  }

  public set value(file: string | File) {
    if (file instanceof File) {
      this.files = [{ file }];
      return;
    }
    this.files = [];
  }

  /** Disables the dropzone. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** If true, hides button to open the native file selection dialog */
  @property({ type: Boolean, reflect: true, attribute: 'no-button' }) noButton = false;

  /** If true, shows only a button as a file input */
  @property({ type: Boolean, reflect: true, attribute: 'button-only' }) buttonOnly = false;

  /** If true, no file list will be shown */
  @property({ type: Boolean, reflect: true, attribute: 'no-file-list' }) noFileList = false;

  /** An optional overwrite for the upload label */
  @property() label?: string;

  /** An optional overwrite for the preview button label */
  @property({ attribute: 'button-label' }) buttonLabel?: string;

  /** The locale to render the component in. */
  @property() lang: string;

  /** A string that defines the file types the file dropzone should accept. Defaults to '*' */
  @property({ type: String, reflect: true }) accept = '*';

  /** An optional maximum size of a file that will be considered valid. */
  @property({ attribute: 'max-file-size' }) maxFileSize?: number;

  /** The maximum amount of files that are allowed. */
  @property({ attribute: 'max-files' }) maxFiles: number;

  /** Indicates if multiple files can be uploaded */
  @property({ type: Boolean, reflect: true }) multiple = false;

  addFile(file: File) {
    if (this.maxFiles && this.files.length >= this.maxFiles) {
      this.warning = this.localize.term('maxFiles') as string;
      return;
    }

    const fileInfo: FileInfo = {
      file
    };

    if (!hasValidFileType(file, this.accept)) {
      fileInfo.accepted = false;
      fileInfo.warning = this.localize.term('fileTypeNotAccepted') as string;
    } else if (!hasValidFileSize(file, this.maxFileSize)) {
      fileInfo.accepted = false;
      fileInfo.warning = this.localize.term('fileSizeExceeded') as string;
    } else {
      fileInfo.accepted = true;
    }

    emit(this, 'sl-change', { detail: fileInfo });

    this.files = this.multiple ? [...this.files, fileInfo] : [fileInfo];
  }

  handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) {
      return;
    }

    this.warning = undefined;
    if (!this.multiple && fileList.length > 1) {
      this.warning = this.localize.term('noMultipleFiles') as string;
      return;
    }

    Object.values(fileList).forEach(file => this.addFile(file));
  }

  onDragLeave(): void {
    this.isDragover = false;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();

    if (!event.dataTransfer) {
      // Abort if no files are dragged
      return;
    }

    this.isDragover = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragover = false;

    const files = event.dataTransfer?.files;
    if (!files || this.disabled) {
      // Abort if no files were transferred, the entire element or drag and drop is disabled
      return;
    }

    this.handleFiles(files);
  }

  handleBrowseFileClick() {
    this.fileInput.click();
  }

  handleFileInputChange() {
    emit(this, 'sl-select');
    this.handleFiles(this.fileInput.files);
  }

  handleFileRemove(index: number) {
    const fileInfo = this.files[index];
    emit(this, 'sl-remove', { detail: { fileInfo } });
    this.files = this.files.filter((_, fileIndex) => fileIndex !== index);
  }

  get dragDroplabel(): string {
    if (this.warning) {
      return this.warning;
    }
    return this.label ? this.label : (this.localize.term('dragDrop') as string);
  }

  render() {
    const browseFilesButton = html`
      <div @click="${this.handleBrowseFileClick}">
        <slot name="button">
          <sl-button part="button" variant=${this.warning ? 'warning' : 'default'} ?disabled=${this.disabled}>
            ${this.buttonLabel ?? this.localize.term('browseFiles')}
          </sl-button>
        </slot>
      </div>
    `;

    return html`
      <div
        part="base"
        class=${classMap({
          'file-upload': true,
          'file-upload--disabled': this.disabled,
          'file-upload--warning': !!this.warning,
          'file-upload--dragged': this.isDragover
        })}
      >
        <input
          type="file"
          id="file-input"
          style="display: none"
          accept=${this.accept}
          ?multiple=${this.multiple}
          @change="${this.handleFileInputChange}"
        />
        ${this.buttonOnly
          ? browseFilesButton
          : html`
              <div id="dropzone" @drop="${this.onDrop}" @dragover="${this.onDragOver}" @dragleave="${this.onDragLeave}">
                <slot name="label">
                  <div part="label" class="file-upload__label">
                    <div class="file-upload__label__container">
                      <slot name="image">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          part="image"
                          viewBox="0 0 16 11"
                          fill="currentColor"
                          class="file-upload__label__container__image"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.6459 3.14604C7.69234 3.09948 7.74752 3.06253 7.80827 3.03733C7.86901 3.01212 7.93413 2.99915 7.9999 2.99915C8.06567 2.99915 8.13079 3.01212 8.19153 3.03733C8.25228 3.06253 8.30745 3.09948 8.3539 3.14604L10.3539 5.14604C10.4004 5.19253 10.4373 5.24772 10.4624 5.30846C10.4876 5.36919 10.5005 5.4343 10.5005 5.50004C10.5005 5.56578 10.4876 5.63088 10.4624 5.69162C10.4373 5.75236 10.4004 5.80755 10.3539 5.85404C10.3074 5.90053 10.2522 5.9374 10.1915 5.96256C10.1307 5.98772 10.0656 6.00067 9.9999 6.00067C9.93416 6.00067 9.86906 5.98772 9.80832 5.96256C9.74758 5.9374 9.69239 5.90053 9.6459 5.85404L8.4999 4.70704V8.50004C8.4999 8.63265 8.44722 8.75982 8.35345 8.85359C8.25968 8.94736 8.13251 9.00004 7.9999 9.00004C7.86729 9.00004 7.74011 8.94736 7.64635 8.85359C7.55258 8.75982 7.4999 8.63265 7.4999 8.50004V4.70704L6.3539 5.85404C6.26001 5.94793 6.13268 6.00067 5.9999 6.00067C5.86712 6.00067 5.73979 5.94793 5.6459 5.85404C5.55201 5.76015 5.49927 5.63281 5.49927 5.50004C5.49927 5.36726 5.55201 5.23993 5.6459 5.14604L7.6459 3.14604Z"
                          />
                          <path
                            d="M4.406 1.342C5.40548 0.480135 6.68024 0.00413852 8 0C10.69 0 12.923 2 13.166 4.579C14.758 4.804 16 6.137 16 7.773C16 9.569 14.502 11 12.687 11H3.781C1.708 11 0 9.366 0 7.318C0 5.555 1.266 4.095 2.942 3.725C3.085 2.862 3.64 2.002 4.406 1.342ZM5.059 2.099C4.302 2.752 3.906 3.539 3.906 4.155V4.603L3.461 4.652C2.064 4.805 1 5.952 1 7.318C1 8.785 2.23 10 3.781 10H12.687C13.98 10 15 8.988 15 7.773C15 6.557 13.98 5.545 12.687 5.545H12.187V5.045C12.188 2.825 10.328 1 8 1C6.91988 1.00431 5.87684 1.39343 5.059 2.099Z"
                          />
                        </svg>
                      </slot>
                      <div>${this.dragDroplabel}</div>
                      ${!this.noButton ? browseFilesButton : ''}
                    </div>
                  </div>
                </slot>
              </div>
            `}
        ${!this.noFileList
          ? html`
              <div class="file-upload__file-items" id="file-items">
                ${this.files.map(
                  (fileInfo, index) => html`
                    <sl-file-upload-item
                      size=${fileInfo.accepted ? fileInfo.file.size : nothing}
                      ?warning=${!fileInfo.accepted}
                      ?closable=${fileInfo.accepted}
                      ?loading=${fileInfo.loading}
                      progress=${fileInfo.progress}
                      @sl-hide=${(event: CustomEvent) => {
                        event.stopPropagation();
                        this.handleFileRemove(index);
                      }}
                    >
                      ${fileInfo.accepted ? fileInfo.file.name : fileInfo.warning}
                      <sl-icon
                        name=${fileInfo.warning ? 'exclamation-triangle' : 'file-earmark'}
                        slot="image"
                        library="system"
                      ></sl-icon>
                    </sl-file-upload-item>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-file-upload': SlFileUpload;
  }
}
