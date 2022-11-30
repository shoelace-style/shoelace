import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type SlColorPicker from './color-picker';

describe('<sl-color-picker>', () => {
  it('should emit change and show correct color when the value changes', async () => {
    const el = await fixture<SlColorPicker>(html` <sl-color-picker></sl-color-picker> `);
    const trigger = el.shadowRoot!.querySelector<HTMLElement>('[part~="trigger"]')!;
    const changeHandler = sinon.spy();
    const color = 'rgb(255, 204, 0)';

    el.addEventListener('sl-change', changeHandler);
    el.value = color;

    await waitUntil(() => changeHandler.calledOnce);

    expect(changeHandler).to.have.been.calledOnce;
    expect(trigger.style.color).to.equal(color);
  });

  it('should render in a dropdown', async () => {
    const el = await fixture<SlColorPicker>(html` <sl-color-picker></sl-color-picker> `);
    const dropdown = el.shadowRoot!.querySelector('sl-dropdown');

    expect(dropdown).to.exist;
  });

  it('should not render in a dropdown when inline is enabled', async () => {
    const el = await fixture<SlColorPicker>(html` <sl-color-picker inline></sl-color-picker> `);
    const dropdown = el.shadowRoot!.querySelector('sl-dropdown');

    expect(dropdown).to.not.exist;
  });

  it('should show opacity slider when opacity is enabled', async () => {
    const el = await fixture<SlColorPicker>(html` <sl-color-picker opacity></sl-color-picker> `);
    const opacitySlider = el.shadowRoot!.querySelector('[part*="opacity-slider"]')!;

    expect(opacitySlider).to.exist;
  });

  it('should display a color when an initial value is provided', async () => {
    const el = await fixture<SlColorPicker>(html` <sl-color-picker value="#000"></sl-color-picker> `);
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]');

    expect(trigger?.style.color).to.equal('rgb(0, 0, 0)');
  });

  it('should display a color with opacity when an initial value with opacity is provided', async () => {
    const el = await fixture<SlColorPicker>(html` <sl-color-picker opacity value="#ff000050"></sl-color-picker> `);
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="trigger"]');
    const previewButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="preview"]');
    const previewColor = getComputedStyle(previewButton!).getPropertyValue('--preview-color');

    expect(trigger!.style.color).to.equal('rgba(255, 0, 0, 0.314)');
    expect(previewColor.startsWith('hsla(0deg, 100%, 50%, 0.31')).to.be.true;
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sl-color-picker name="a" value="#FFFFFF"></sl-color-picker>
          <sl-button type="reset">Reset</sl-button>
        </form>
      `);
      const button = form.querySelector('sl-button')!;
      const colorPicker = form.querySelector('sl-color-picker')!;
      colorPicker.value = '#000000';

      await colorPicker.updateComplete;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await colorPicker.updateComplete;

      expect(colorPicker.value).to.equal('#FFFFFF');

      colorPicker.defaultValue = '';

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await colorPicker.updateComplete;

      expect(colorPicker.value).to.equal('');
    });
  });
});
