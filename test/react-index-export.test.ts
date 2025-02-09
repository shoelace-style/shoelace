import { expect } from '@open-wc/testing';

/**
 * This file exists to test that Node and TypeScript are able to resolve the
 * legacy single-index import pattern for React components.
 */
import { SlAlert, SlAnimation, SlButton, SlOption } from '@shoelace-style/shoelace/dist/react';

// This test exists to ensure that the package exports React wrappers in a
// manner consistent with the documentation.
it('Should export a single module of all React components', () => {
  expect(SlAlert).not.to.be.undefined;
  expect(SlAnimation).not.to.be.undefined;
  expect(SlButton).not.to.be.undefined;
  expect(SlOption).not.to.be.undefined;
});
