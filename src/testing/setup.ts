import { spread } from './spread';
import { fixture, html, unsafeStatic } from '@open-wc/testing';

type ComplexFixture<CustomElement> = {
  root: CustomElement,
  targetElement: CustomElement
}

export const simpleFixture = async <CustomElement extends Element>(tagName: string, innerHTML: string = '', attrs: { [key: string]: unknown } = {},  ): Promise<CustomElement> => {

  const container = await fixture<CustomElement>(html`
    <${unsafeStatic(tagName)} ${spread(attrs)}>${unsafeStatic(innerHTML)}</${unsafeStatic(tagName)}>
  `);

  return container;
};

export const complexFixture = async <CustomElement extends Element>(html: string, targetElementTagName: string): Promise<ComplexFixture<CustomElement>> => {

  const container = await fixture<CustomElement>(`${html}`);

  return {
    root: container,
    targetElement: container.querySelector(targetElementTagName) as CustomElement
  };
};
