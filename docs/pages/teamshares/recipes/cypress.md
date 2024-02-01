## Using Shoelace with Cypress

For the most part, you can use Shoelace components the same way you'd use their HTML equivalents, since they emit many of the same events (`click`, `focus`, etc). But like all web components, Shoelace components encapsulate their internal parts within the [shadow dom](https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/). This means that the internals of Shoelace components aren't available directly on the DOM (via `document.querySelector`, etc.), but have to be queried via the [`Element.shadowRoot` property](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot).

Cypress provides a convenience method for accessing the shadow dom via the [`.shadow()` method.](https://docs.cypress.io/api/commands/shadow).

```js
cy.get('sl-button[href]').shadow().find('a'); // Will find the anchor tag within a link button
cy.get('[data-test-id="some_sl_button"]').click(); // Should work fine on a button where id is set at the top level
```

More tips coming soon! (And remember, _you too_ are free to contribute to this guide!)
