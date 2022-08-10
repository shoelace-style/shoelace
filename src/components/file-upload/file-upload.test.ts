import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import type SlFileUploadItem from '../file-upload-item/file-upload-item';
import type SlFileUpload from './file-upload';
import { serialize } from '../../utilities/form';

describe('<sl-file-upload>', () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = innerXhr => requests.push(innerXhr);
  });

  afterEach(sinon.verifyAndRestore);

  it('should render', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const base = el.shadowRoot!.querySelector<HTMLElement>('[part="base"]')!;

    expect(base.hidden).to.be.false;
  });

  it('should emit an sl-select event when a file was selected in the file dialog', async () => {
    const selectHandler = sinon.spy();
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);

    el.addEventListener('sl-select', selectHandler);
    el.fileInput.dispatchEvent(new Event('change'));

    await el.updateComplete;

    expect(selectHandler).to.have.been.calledOnce;
  });

  it('should emit an sl-change event when a file was added', async () => {
    const changeHandler = sinon.spy();
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    el.addEventListener('sl-change', changeHandler);
    const file = new File([''], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(changeHandler).to.have.been.calledOnce;
  });

  it('should not emit an sl-change event when the disabled attribute is true', async () => {
    const changeHandler = sinon.spy();
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    el.disabled = true;

    el.addEventListener('sl-change', changeHandler);
    const file = new File([''], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(changeHandler).to.not.have.been.called;
  });

  it('should render a file item when a file was added', async () => {
    const changeHandler = sinon.spy();
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    const fileItems = el.shadowRoot!.querySelector<HTMLElement>('#file-items')!;

    expect(fileItems.children.length).to.equal(0);

    el.addEventListener('sl-change', changeHandler);
    const file = new File([''], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(fileItems.children.length).to.equal(1);
  });

  it('should not render a file item when the no-file-list attribute is set', async () => {
    const changeHandler = sinon.spy();
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    const fileItems = el.shadowRoot!.querySelector<HTMLElement>('#file-items')!;
    el.noFileList = true;

    expect(fileItems.children.length).to.equal(0);

    el.addEventListener('sl-change', changeHandler);
    const file = new File([''], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(fileItems.children.length).to.equal(0);
  });

  it('should set a warning when multiple files are dropped', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    const fileItems = el.shadowRoot!.querySelector<HTMLElement>('#file-items')!;

    expect(el.warning).to.be.undefined;

    const file = new File([''], 'dummy.txt');
    const file2 = new File([''], 'dummy2.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dataTransfer.items.add(file2);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(el.warning).to.be.not.empty;
    expect(fileItems.children.length).to.equal(0);
  });

  it('should accept the file if the file size is below the specified max-file-size', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload max-file-size="12"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);

    const file = new File(['lorem_ipsum'], 'dummy.txt'); // this file has 11 bits
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(el.files.length).to.equal(1);
    expect(el.files[0].accepted).to.be.true;
    expect(el.files[0].warning).to.be.undefined;
  });

  it('should not accept the file if the file size exceeds the specified max-file-size', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload max-file-size="10"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);

    const file = new File(['lorem_ipsum'], 'dummy.txt'); // this file has 11 bits
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(el.files.length).to.equal(1);
    expect(el.files[0].accepted).to.be.false;
    expect(el.files[0].warning).to.be.not.empty;
  });

  it('should accept the file if the file type is valid', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload accept="image/*"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);

    const file = new File([''], 'dummy.png', { type: 'image/png' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(el.files[0].accepted).to.be.true;
    expect(el.files[0].warning).to.be.undefined;
  });

  it('should not accept the file if the file type is not valid', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload accept="image/*"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);

    const file = new File([''], 'dummy.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(el.files[0].accepted).to.be.false;
    expect(el.files[0].warning).to.be.not.empty;
  });

  it('should not set a warning when the max number of files is not yet reached', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload multiple max-files="2"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);

    const file = new File([''], 'dummy.txt');
    const file2 = new File([''], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dataTransfer.items.add(file2);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(el.warning).to.be.undefined;
    expect(el.files.length).to.equal(2);

    const file3 = new File([''], 'dummy.txt');
    const dataTransfer2 = new DataTransfer();
    dataTransfer2.items.add(file3);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer: dataTransfer2 }));

    await el.updateComplete;

    expect(el.warning).to.not.be.empty;
    expect(el.files.length).to.equal(2);
  });

  describe('when serializing', () => {
    it('should serialize its name and an empty File with FormData per default', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-file-upload name="a"></sl-file-upload></form> `);
      const formData = new FormData(form);

      expect(formData.get('a') instanceof File).to.be.true;
    });

    it('should serialize its name and file with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-file-upload name="a"></sl-file-upload></form> `);
      const el = form.querySelector<SlFileUpload>('sl-file-upload')!;
      const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

      const file = new File([''], 'dummy.png', { type: 'image/png' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

      await el.updateComplete;

      const formData = new FormData(form);
      expect(formData.get('a')).to.deep.equal(file);
    });

    it('should serialize its name and file with JSON', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-file-upload name="a"></sl-file-upload></form> `);
      const el = form.querySelector<SlFileUpload>('sl-file-upload')!;
      const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

      const file = new File([''], 'dummy.png', { type: 'image/png' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

      await el.updateComplete;

      const json = serialize(form);
      expect(json.a).to.deep.equal(file);
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-file-upload name="a"></sl-file-upload>
          <sl-button type="reset">Reset</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const el = form.querySelector<SlFileUpload>('sl-file-upload')!;
      const file = new File([''], 'dummy.txt');
      expect(el.files.length).to.equal(0);
      el.files = [{ file }];

      await el.updateComplete;
      expect(el.files.length).to.equal(1);

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await el.updateComplete;

      expect(el.files.length).to.equal(0);
    });
  });

  it('should emit sl-remove when a file is removed', async () => {
    const removeHandler = sinon.spy();
    const el = await fixture<SlFileUpload>(html` <sl-file-upload closable> </sl-file-upload> `);
    el.addEventListener('sl-remove', removeHandler);

    const file = new File([''], 'dummy.txt');
    el.files = [{ file }];

    await el.updateComplete;

    const firstFileItem = el.shadowRoot!.querySelector<SlFileUploadItem>('sl-file-upload-item');
    await firstFileItem!.updateComplete;
    await firstFileItem!.hide();

    expect(removeHandler).to.be.calledOnce;
  });

  it('should remove the file object when the file item was closed', async () => {
    const el = await fixture<SlFileUpload>(html` <sl-file-upload closable> </sl-file-upload> `);

    expect(el.files.length).to.equal(0);
    const file = new File([''], 'dummy.txt');
    el.files = [{ file }];

    await el.updateComplete;
    expect(el.files.length).to.equal(1);

    const firstFileItem = el.shadowRoot!.querySelector<SlFileUploadItem>('sl-file-upload-item');
    await firstFileItem!.updateComplete;
    await firstFileItem!.hide();

    await el.updateComplete;

    expect(el.files.length).to.equal(0);
  });
});
