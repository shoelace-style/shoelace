// TODO: Write logic around custom element definitions, no defs, conflicting defs, same defs, etc.
import { expect, fixture } from '@open-wc/testing';
import { readFile } from '@web/test-runner-commands';

import SlButton from "../../dist/components/button/button.component.js"

// @ts-expect-error Isn't written in TS.
import { getAllComponents } from "../../scripts/shared.js"
import Sinon from 'sinon';

const getMetadata = () => readFile({ path: '../../dist/custom-elements.json' }) as unknown as Promise<string>

// This is a hacky way to give us unique strings without generating a UUID or something.
let counter = 1

// These tests all run in the same tab so they pollute the custom element registry.
// Some tests use this stub to be able to just test registration.
function stubCustomElements () {
  const map = new Map<string, CustomElementConstructor>()
  Sinon.stub(window.customElements, "get").callsFake((str) => {
    return map.get(str)
  })

  // const originalDefine = Sinon.stub(window.customElements, "define")
  //   .callThrough()

  const stub = Sinon.stub(window.customElements, "define").callsFake((str: string, ctor: CustomElementConstructor) => {
    stub.withArgs(str + "-" + counter, class extends ctor {}).callThrough()
    counter++
    map.set(str, ctor)
  })
}

it("Should provide a console warning if attempting to register the same tag twice", async () => {
  class MyButton extends SlButton {
    static version = "0.4.5"
  }

  const stub = Sinon.stub(console, "warn")

  expect(Boolean(window.customElements.get("sl-button"))).to.be.false
  SlButton.define("sl-button")
  expect(Boolean(window.customElements.get("sl-button"))).to.be.true
  MyButton.define("sl-button")

  expect(stub).calledOnce

  const warning = stub.getCall(0).args.join("")

  expect(warning).to.match(new RegExp(`Attempted to register <sl-button> v${MyButton.version}, but <sl-button> v${SlButton.version} has already been registered`), "i")
})

it("Should not provide a console warning if versions match", () => {
  class MyButton extends SlButton {}

  const stub = Sinon.stub(console, "warn")

  expect(Boolean(window.customElements.get("sl-button"))).to.be.false
  SlButton.define("sl-button")
  expect(Boolean(window.customElements.get("sl-button"))).to.be.true
  MyButton.define("sl-button")

  expect(stub).not.called
})

it("Should register scopedElements when the element is constructed the first time", async () => {
  expect(Boolean(window.customElements.get("sl-icon"))).to.be.false

  SlButton.define("sl-button")

  expect(Boolean(window.customElements.get("sl-icon"))).to.be.true
})

// This looks funky here. This grabs all of our components and tests for side effects.
// We "abuse" mocha and dynamically define tests.
before(async () => {
  const metadata = JSON.parse((await getMetadata())) as Record<string, unknown>

  const tagNames: Array<string> = []

  const relevantMetadata: Array<{ tagName: string, path: string }> = getAllComponents(metadata).map((component: { tagName: string, path: string }) => {
    const { tagName, path } = component
    tagNames.push(tagName)

    return { tagName, path }
  })

  relevantMetadata.forEach(({ tagName, path }) => {
    it(`Should not register any components: ${tagName}`, async () => {
      // Check if importing the files automatically registers any components
      await import("../../dist/" + path)

      const registeredTags = tagNames.filter((tag) => Boolean(window.customElements.get(tag)))

      const errorMessage = `Expected ${path} to not register any tags, but it registered the following tags: ` +
                      registeredTags.map((tag) => tag).join(", ")
      expect(registeredTags.length).to.equal(0, errorMessage)
    })
  })
})

beforeEach(() => {
  Sinon.restore()
  stubCustomElements()
})
