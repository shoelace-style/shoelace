import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { serialize } from '../../utilities/form';
import type SlRange from './range';

describe('<sl-range>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SlRange>(html` <sl-range label="Name"></sl-range> `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<SlRange>(html` <sl-range></sl-range> `);

    expect(el.name).to.equal('');
    expect(el.value).to.equal(0);
    expect(el.title).to.equal('');
    expect(el.label).to.equal('');
    expect(el.helpText).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.invalid).to.be.false;
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.step).to.equal(1);
    expect(el.tooltip).to.equal('top');
    expect(el.defaultValue).to.equal(0);
  });

  it('should have title if title attribute is set', async () => {
    const el = await fixture<SlRange>(html` <sl-range title="Test"></sl-range> `);
    const input = el.shadowRoot!.querySelector('input')!;

    expect(input.title).to.equal('Test');
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SlRange>(html` <sl-range disabled></sl-range> `);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="input"]')!;

    expect(input.disabled).to.be.true;
  });

  describe('step', () => {
    it('should increment by step if stepUp() is called', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      el.stepUp();
      await el.updateComplete;
      expect(el.value).to.equal(4);
    });

    it('should decrement by step if stepDown() is called', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      el.stepDown();
      await el.updateComplete;
      expect(el.value).to.equal(0);
    });

    it('should fire sl-change if stepUp() is called', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      const changeHandler = sinon.spy();
      el.addEventListener('sl-change', changeHandler);
      el.stepUp();
      await waitUntil(() => changeHandler.calledOnce);
      expect(changeHandler).to.have.been.calledOnce;
    });

    it('should fire sl-change if stepDown() is called', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      const changeHandler = sinon.spy();
      el.addEventListener('sl-change', changeHandler);
      el.stepUp();
      await waitUntil(() => changeHandler.calledOnce);
      expect(changeHandler).to.have.been.calledOnce;
    });
  });

  describe('when serializing', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-range name="a" value="1"></sl-range></form> `);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('1');
    });

    it('should serialize its name and value with JSON', async () => {
      const form = await fixture<HTMLFormElement>(html` <form><sl-range name="a" value="1"></sl-range></form> `);
      const json = serialize(form);
      expect(json.a).to.equal('1');
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-range name="a" value="99"></sl-range>
          <sl-button type="reset">Reset</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const input = form.querySelector('sl-range')!;
      input.value = 80;

      await input.updateComplete;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await input.updateComplete;

      expect(input.value).to.equal(99);

      input.defaultValue = 0;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await input.updateComplete;

      expect(input.value).to.equal(0);
    });
  });
});
