import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
// eslint-disable-next-line no-restricted-imports
import { serialize } from '../../utilities/form';
import type SlTextarea from './textarea';

describe('<sl-textarea>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea label="Name"></sl-textarea> `);
    await expect(el).to.be.accessible();
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea disabled></sl-textarea> `);
    const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('[part="textarea"]')!;

    expect(textarea.disabled).to.be.true;
  });

  it('should focus the textarea when clicking on the label', async () => {
    const el = await fixture<SlTextarea>(html` <sl-textarea label="Name"></sl-textarea> `);
    const label = el.shadowRoot!.querySelector('[part="form-control-label"]')!;
    const submitHandler = sinon.spy();

    el.addEventListener('sl-focus', submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  describe('when using constraint validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<SlTextarea>(html` <sl-textarea></sl-textarea> `);

      expect(el.invalid).to.be.false;
    });

    it('should be invalid when required and empty', async () => {
      const el = await fixture<SlTextarea>(html` <sl-textarea required></sl-textarea> `);

      expect(el.invalid).to.be.true;
    });

    it('should be invalid when required and after removing disabled ', async () => {
      const el = await fixture<SlTextarea>(html` <sl-textarea disabled required></sl-textarea> `);

      el.disabled = false;
      await el.updateComplete;

      expect(el.invalid).to.be.true;
    });

    it('should be invalid when required and disabled is removed', async () => {
      const el = await fixture<SlTextarea>(html` <sl-textarea disabled required></sl-textarea> `);
      el.disabled = false;
      await el.updateComplete;
      expect(el.invalid).to.be.true;
    });
  });

  describe('when serializing', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-textarea name="a" value="1"></sl-textarea></form> `);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('1');
    });

    it('should serialize its name and value with JSON', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-textarea name="a" value="1"></sl-textarea></form> `);
      const json = serialize(form);
      expect(json.a).to.equal('1');
    });
  });
});
