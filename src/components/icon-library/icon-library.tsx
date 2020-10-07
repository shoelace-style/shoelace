import { Component, Prop, Watch } from '@stencil/core';
import { registerLibrary, unregisterLibrary, IconLibraryResolver, IconLibraryMutator } from './icon-library-registry';

/**
 * @since 2.0
 * @status stable
 */

@Component({
  tag: 'sl-icon-library',
  styleUrl: 'icon-library.scss',
  shadow: true
})
export class IconLibrary {
  /** The name of the icon library. */
  @Prop() name: string;

  /**
   * A function that translates an icon name to a URL where the corresponding SVG file exists The URL can be local or a
   * CORS-enabled endpoint.
   */
  @Prop() resolver: IconLibraryResolver;

  /** A function that mutates the SVG element before it renders. */
  @Prop() mutator: IconLibraryMutator;

  @Watch('name')
  @Watch('resolver')
  @Watch('mutator')
  handleUpdate() {
    // Subsequent registrations with the same name will invalidate existing ones
    this.register();
  }

  connectedCallback() {
    if (this.name && this.resolver) {
      this.register();
    }
  }

  disconnectedCallback() {
    unregisterLibrary(this.name);
  }

  register() {
    const { name, resolver, mutator } = this;
    registerLibrary(name, resolver, mutator);
  }

  render() {
    return null;
  }
}
