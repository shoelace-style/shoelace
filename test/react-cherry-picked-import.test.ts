import { expect } from '@open-wc/testing';

/**
 * This file tests that Node and TypeScript are able to resolve the
 * cherry-picked import style for React components.
 */
import SlAnimatedImage from '@shoelace-style/shoelace/dist/react/animated-image';
import SlAvatar from '@shoelace-style/shoelace/dist/react/avatar';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlSelect from '@shoelace-style/shoelace/dist/react/select';

it('Should export cherry-pick-able React wrappers of the components', () => {
  expect(SlAvatar).not.to.be.undefined;
  expect(SlAnimatedImage).not.to.be.undefined;
  expect(SlIcon).not.to.be.undefined;
  expect(SlSelect).not.to.be.undefined;
});
