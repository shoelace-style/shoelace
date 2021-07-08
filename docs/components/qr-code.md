# QR Code

[component-header:sl-qr-code]

Generates a [QR code](https://www.qrcode.com/) and renders it using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

QR codes are useful for providing small pieces of information to users who can quickly scan them with a smartphone. Most smartphones have built-in QR code scanners, so simply pointing the camera at a QR code will decode it and allow the user to visit a website, dial a phone number, read a message, etc.

```html preview
<sl-qr-code value="https://shoelace.style/" label="Scan this code to visit Shoelace on the web!"></sl-qr-code>
```

## Examples

### Colors

Use the `fill` and `background` attributes to modify the QR code's colors. You should always ensure good contrast for optimal compatibility with QR code scanners.

```html preview
<sl-qr-code value="https://shoelace.style/" fill="deeppink" background="white"></sl-qr-code>
```

### Size

Use the `size` attribute to change the size of the QR code.

```html preview
<sl-qr-code value="https://shoelace.style/" size="64"></sl-qr-code>
```

### Radius

Create a rounded effect with the `radius` attribute.

```html preview
<sl-qr-code value="https://shoelace.style/" radius="0.5"></sl-qr-code>
```

### Error Correction

QR codes can be rendered with various levels of [error correction](https://www.qrcode.com/en/about/error_correction.html) that can be set using the `error-correction` attribute. This example generates four codes with the same value using different error correction levels.

```html preview
<div class="qr-error-correction">
  <sl-qr-code value="https://shoelace.style/" error-correction="L"></sl-qr-code>
  <sl-qr-code value="https://shoelace.style/" error-correction="M"></sl-qr-code>
  <sl-qr-code value="https://shoelace.style/" error-correction="Q"></sl-qr-code>
  <sl-qr-code value="https://shoelace.style/" error-correction="H"></sl-qr-code>
</div>

<style>
  .qr-error-correction {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
```

[component-metadata:sl-qr-code]
