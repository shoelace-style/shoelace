import { Component, Prop, State, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 */

@Component({
  tag: 'sl-relative-time',
  shadow: true
})
export class RelativeTime {
  @State() displayTime = '';

  /** The date from which to calculate time from. */
  @Prop() date: Date | string;

  /** The locale to use when formatting the number. */
  @Prop() locale: string;

  /** The formatting style to use. */
  @Prop() format: 'long' | 'short' | 'narrow' = 'long';

  /**
   * When `auto`, values such as "yesterday" and "tomorrow" will be shown when possible. When `always`, values such as
   * "1 day ago" and "in 1 day" will be shown.
   */
  @Prop() numeric: 'always' | 'auto' = 'auto';

  render() {
    const date = new Date(this.date);

    if (isNaN(date.getSeconds())) {
      return '';
    }

    // // @ts-ignore - https://caniuse.com/mdn-javascript_builtins_intl_relativetimeformat
    // new Intl.RelativeTimeFormat(this.locale, {
    //   numeric: this.numeric,
    //   style: this.type
    // }).format(this.value, this.unit);

    return <time dateTime={date.toISOString()}>{this.displayTime}</time>;
  }
}
