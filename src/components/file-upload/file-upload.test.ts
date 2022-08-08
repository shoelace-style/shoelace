import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SlFileUploadItem from '../file-upload-item/file-upload-item';
import type SlFileUpload from './file-upload';

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

  it('should send a POST request when a url attribute is specified', async () => {
    const testUrl = 'http://testurl';
    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(html` <sl-file-upload url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(testUrl);
    expect(requests[0].method).to.equal('POST');
  });

  it('should not send a request when no url attribute is specified', async () => {
    const loadHandler = sinon.spy();

    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(html` <sl-file-upload> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    el.addEventListener('sl-load', loadHandler);

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(0);
    expect(loadHandler).to.not.be.called;
  });

  it('should emit an sl-load event when the file was successfully transferred', async () => {
    const loadHandler = sinon.spy();

    const testUrl = 'http://testurl';

    const el = await fixture<SlFileUpload>(html` <sl-file-upload url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    el.addEventListener('sl-load', loadHandler);

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;
    requests[0].respond(200, '', '');

    expect(loadHandler).to.be.calledOnce;
  });

  it('should emit an sl-error event when the file was not successfully transferred', async () => {
    const errorHandler = sinon.spy();

    const testUrl = 'http://testurl';

    const el = await fixture<SlFileUpload>(html` <sl-file-upload url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;
    el.addEventListener('sl-error', errorHandler);

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;
    requests[0].respond(500, '', '');

    expect(errorHandler).to.be.calledOnce;
  });

  it('should send a GET request when a url and method attribute is specified', async () => {
    const testUrl = 'http://testurl';
    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(
      html` <sl-file-upload url="${testUrl}" method="GET"> </sl-file-upload> `
    );
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(testUrl);
    expect(requests[0].method).to.equal('GET');
  });

  it('should send a request with credentials when with-credentials is set', async () => {
    const testUrl = 'http://testurl';
    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(
      html` <sl-file-upload url="${testUrl}" with-credentials> </sl-file-upload> `
    );
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(testUrl);
    expect(requests[0].method).to.equal('POST');
    expect(requests[0].withCredentials).to.be.true;
  });

  it('should send a request with custom headers when headers are set', async () => {
    const testUrl = 'http://testurl';
    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(html` <sl-file-upload url="${testUrl}"> </sl-file-upload> `);
    el.headers = { 'some-header': 'some-value' };
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(testUrl);
    expect(requests[0].method).to.equal('POST');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(requests[0].requestHeaders['some-header']).to.eql('some-value');
  });

  it('should send a request as FormData per default', async () => {
    const testUrl = 'http://testurl';
    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(html` <sl-file-upload url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(testUrl);
    expect(requests[0].method).to.equal('POST');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(requests[0].requestHeaders['Content-Type']).to.equal('multipart/form-data;charset=utf-8');
    expect((requests[0].requestBody as unknown as FormData).get(file.name) as File).to.eql(file);
  });

  it('should send a request with a binary body when the binary-body attribute is set', async () => {
    const testUrl = 'http://testurl';
    expect(requests.length).to.equal(0);

    const el = await fixture<SlFileUpload>(
      html` <sl-file-upload url="${testUrl}" binary-body> </sl-file-upload> `
    );
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    const file = new File(['foo'], 'dummy.txt', { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(testUrl);
    expect(requests[0].method).to.equal('POST');
    expect((requests[0].requestBody as unknown as File).name).to.equal('dummy.txt');
    expect(await (requests[0].requestBody as unknown as File).text()).to.equal('foo');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(requests[0].requestHeaders['Content-Type']).to.equal('text/plain;charset=utf-8');
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

  it('should abort the request when a file is removed while loading', async () => {
    const abortHandler = sinon.spy();
    const testUrl = 'http://testurl';
    const el = await fixture<SlFileUpload>(html` <sl-file-upload closable url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);
    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    requests[0].upload.addEventListener('abort', abortHandler);

    await el.updateComplete;

    const firstFileItem = el.shadowRoot!.querySelector<SlFileUploadItem>('sl-file-upload-item');
    await firstFileItem!.updateComplete;
    await firstFileItem!.hide();

    await el.updateComplete;

    expect(abortHandler).to.be.calledOnce;
  });

  it('should set the file to loading until a response is received', async () => {
    const testUrl = 'http://testurl';
    const el = await fixture<SlFileUpload>(html` <sl-file-upload closable url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(el.files.length).to.equal(0);
    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;
    expect(el.files.length).to.equal(1);
    expect(el.files[0].loading).to.be.true;

    requests[0].respond(200, '', '');
    expect(el.files[0].loading).to.be.false;
  });

  it('should increase the progress while the file is transferred', async () => {
    const testUrl = 'http://testurl';
    const el = await fixture<SlFileUpload>(html` <sl-file-upload closable url="${testUrl}"> </sl-file-upload> `);
    const dropzone = el.shadowRoot!.querySelector<HTMLElement>('#dropzone')!;

    expect(requests.length).to.equal(0);

    const file = new File(['foo'], 'dummy.txt');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer }));

    await el.updateComplete;

    expect(requests.length).to.equal(1);
    expect(el.files[0].loading).to.be.true;
    expect(el.files[0].progress).to.equal(0);

    requests[0].upload.dispatchEvent(new ProgressEvent('progress', { lengthComputable: true, total: 10, loaded: 5 }));

    expect(el.files[0].progress).to.equal(50);
    expect(el.files[0].loading).to.be.true;

    requests[0].respond(200, '', '');

    expect(el.files[0].progress).to.equal(100);
    expect(el.files[0].loading).to.be.false;
  });
});
