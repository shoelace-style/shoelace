import { fixture } from '@open-wc/testing';
import { spread } from './spread';

interface ComplexFixture<CustomElement> {
  root: CustomElement;
  targetElement: CustomElement;
}

export async function simpleFixture<CustomElement extends Element>(tagName: string, innerHTML = '', attrs: { [key: string]: unknown } = {} ): Promise<CustomElement> {

  const container = await fixture<CustomElement>(`
    <${tagName} ${spread(attrs)}>${innerHTML}</${tagName}>
  `);

  return container;
}

export async function complexFixture<CustomElement extends Element>(html: string, targetElementTagName: string): Promise<ComplexFixture<CustomElement>> {

  const container = await fixture<CustomElement>(html);

  return {
    root: container,
    targetElement: container.querySelector(targetElementTagName)! as CustomElement
  };
}
