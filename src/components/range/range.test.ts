import { clickOnElement } from '../../internal/test';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { serialize } from '../../utilities/form';
import sinon from 'sinon';
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
    expect(el.checkValidity()).to.be.true;
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

  describe('when the value changes', () => {
    it('should emit sl-change and sl-input when the value changes from clicking the slider', async () => {
      const el = await fixture<SlRange>(html` <sl-range value="0"></sl-range> `);
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('sl-change', changeHandler);
      el.addEventListener('sl-input', inputHandler);
      await clickOnElement(el, 'right');
      await el.updateComplete;

      expect(el.value).to.equal(100);
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit sl-change and sl-input and decrease the value when pressing left arrow', async () => {
      const el = await fixture<SlRange>(html` <sl-range value="50"></sl-range> `);
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('sl-change', changeHandler);
      el.addEventListener('sl-input', inputHandler);
      el.focus();
      await sendKeys({ press: 'ArrowLeft' });
      await el.updateComplete;

      expect(el.value).to.equal(49);
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit sl-change and sl-input and decrease the value when pressing right arrow', async () => {
      const el = await fixture<SlRange>(html` <sl-range value="50"></sl-range> `);
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('sl-change', changeHandler);
      el.addEventListener('sl-input', inputHandler);
      el.focus();
      await sendKeys({ press: 'ArrowRight' });
      await el.updateComplete;

      expect(el.value).to.equal(51);
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should not emit sl-change or sl-input when changing the value programmatically', async () => {
      const el = await fixture<SlRange>(html` <sl-range value="0"></sl-range> `);

      el.addEventListener('sl-change', () => expect.fail('sl-change should not be emitted'));
      el.addEventListener('sl-input', () => expect.fail('sl-input should not be emitted'));
      el.value = 50;

      await el.updateComplete;
    });

    it('should not emit sl-change or sl-input when stepUp() is called programmatically', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      el.addEventListener('sl-change', () => expect.fail('sl-change should not be emitted'));
      el.addEventListener('sl-input', () => expect.fail('sl-input should not be emitted'));
      el.stepUp();
      await el.updateComplete;
    });

    it('should not emit sl-change or sl-input when stepDown() is called programmatically', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      el.addEventListener('sl-change', () => expect.fail('sl-change should not be emitted'));
      el.addEventListener('sl-input', () => expect.fail('sl-input should not be emitted'));
      el.stepDown();
      await el.updateComplete;
    });
  });

  describe('step', () => {
    it('should increment by step when stepUp() is called', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      el.stepUp();
      await el.updateComplete;
      expect(el.value).to.equal(4);
    });

    it('should decrement by step when stepDown() is called', async () => {
      const el = await fixture<SlRange>(html` <sl-range step="2" value="2"></sl-range> `);

      el.stepDown();
      await el.updateComplete;
      expect(el.value).to.equal(0);
    });
  });

  describe('when submitting a form', () => {
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

    it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
      const range = await fixture<HTMLFormElement>(html` <sl-range></sl-range> `);

      range.setCustomValidity('Invalid selection');
      await range.updateComplete;

      expect(range.checkValidity()).to.be.false;
      expect(range.hasAttribute('data-invalid')).to.be.true;
      expect(range.hasAttribute('data-valid')).to.be.false;
      expect(range.hasAttribute('data-user-invalid')).to.be.false;
      expect(range.hasAttribute('data-user-valid')).to.be.false;

      await clickOnElement(range);
      await range.updateComplete;

      expect(range.hasAttribute('data-user-invalid')).to.be.true;
      expect(range.hasAttribute('data-user-valid')).to.be.false;
    });

    it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f">
            <sl-button type="submit">Submit</sl-button>
          </form>
          <sl-range form="f" name="a" value="50"></sl-range>
        </div>
      `);
      const form = el.querySelector('form')!;
      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('50');
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
