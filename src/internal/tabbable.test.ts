import { elementUpdated, expect, fixture, aTimeout } from '@open-wc/testing';

import "../../dist/shoelace.js"
import { html } from 'lit';
import type { SlDrawer } from '../../dist/shoelace.js';
import { sendKeys } from '@web/test-runner-commands';

function getActiveElements (el: null | Element = document.activeElement) {
  const elements: Element[] = []

  function walk (el: null | Element) {
    if (el == null) {
      return
    }

    elements.push(el)

    if ("shadowRoot" in el && el.shadowRoot && el.shadowRoot.mode !== "closed") {
      walk(el.shadowRoot.activeElement)
    }
  }

  walk(el)

  return elements
}

function getDeepestActiveElement (el: null | Element = document.activeElement) {
  const activeElements = getActiveElements(el)

  return activeElements[activeElements.length - 1]
}

async function holdShiftKey (callback: () => Promise<void>) {
  await sendKeys({ down: "Shift" })
  await callback()
  await sendKeys({ up: "Shift" })
}

window.customElements.define("tab-test-1", class extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: "open" })
    this.shadowRoot!.innerHTML = `
      <sl-drawer>
        <slot name="label" slot="label"></slot>

        <slot></slot>

        <slot name="footer" slot="footer"></slot>
      </sl-drawer>
    `
  }
})


it("Should allow tabbing to slotted elements", async () => {
  const el = await fixture(html`
    <tab-test-1>
      <div slot="label">
        <sl-button id="focus-1">Focus 1</sl-button>
      </div>

      <div>
        <!-- Focus 2 lives as the close-button from <sl-drawer> -->
        <sl-button id="focus-3">Focus 3</sl-button>
        <button id="focus-4">Focus 4</sl-button>
        <input id="focus-5" value="Focus 5">
      </div>

      <div slot="footer">
        <div id="focus-6" tabindex="0">Focus 6</div>
        <button tabindex="-1">No Focus</button>
      </div>
    </tab-test-1>
  `)

  const drawer = el.shadowRoot!.querySelector("sl-drawer") as unknown as SlDrawer

  await drawer.show()

  await elementUpdated(drawer)

  const focusZero = drawer.shadowRoot!.querySelector("[role='dialog']")
  const focusOne = el.querySelector("#focus-1")
  const focusTwo = drawer.shadowRoot!.querySelector("[part~='close-button']")
  const focusThree = el.querySelector("#focus-3")
  const focusFour = el.querySelector("#focus-4")
  const focusFive = el.querySelector("#focus-5")
  const focusSix = el.querySelector("#focus-6")

  // When we open drawer, we should be focused on the panel to start.
  expect(getDeepestActiveElement()).to.equal(focusZero)

  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusOne)

  // When we hit the <Tab> key we should go to the "close button" on the drawer
  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusTwo)

  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusThree)

  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusFour)

  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusFive)

  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusSix)

  // Now we should loop back to #panel
  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusZero)

  // Now we should loop back to #panel
  await sendKeys({ press: "Tab" })
  expect(getActiveElements()).to.include(focusOne)

  // Let's reset and try from starting point 0 and go backwards.
  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusZero)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusSix)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusFive)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusFour)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusThree)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusTwo)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusOne)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusZero)

  await holdShiftKey(async () => await sendKeys({ press: "Tab" }))
  expect(getActiveElements()).to.include(focusSix)
})
