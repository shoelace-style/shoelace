import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../dist/shoelace.js';
import type SlColorPicker from './color-picker';

describe('<sl-color-picker>', () => {
  it('should emit change and show correct color when the value changes', async () => {
    const el = (await fixture(html` <sl-color-picker></sl-color-picker> `)) as SlColorPicker;
    const trigger = el.shadowRoot.querySelector('[part="trigger"]') as HTMLElement;
    const changeHandler = sinon.spy();
    const color = 'rgb(255, 204, 0)';

    el.addEventListener('sl-change', changeHandler);
    el.value = color;

    await waitUntil(() => changeHandler.calledOnce);

    expect(changeHandler).to.have.been.calledOnce;
    expect(trigger.style.color).to.equal(color);
  });

  it('should render in a dropdown', async () => {
    const el = (await fixture(html` <sl-color-picker></sl-color-picker> `)) as SlColorPicker;
    const dropdown = el.shadowRoot.querySelector('sl-dropdown');

    expect(dropdown).to.exist;
  });

  it('should not render in a dropdown when inline is enabled', async () => {
    const el = (await fixture(html` <sl-color-picker inline></sl-color-picker> `)) as SlColorPicker;
    const dropdown = el.shadowRoot.querySelector('sl-dropdown');

    expect(dropdown).to.not.exist;
  });

  it('should show opacity slider when opacity is enabled', async () => {
    const el = (await fixture(html` <sl-color-picker opacity></sl-color-picker> `)) as SlColorPicker;
    const opacitySlider = el.shadowRoot.querySelector('[part*="opacity-slider"]') as HTMLElement;

    expect(opacitySlider).to.exist;
  });
});
