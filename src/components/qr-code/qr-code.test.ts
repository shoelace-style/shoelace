import '../../../dist/shoelace.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SlQrCode from './qr-code.js';

const getCanvas = (qrCode: SlQrCode): HTMLCanvasElement => {
  const possibleCanvas = qrCode.shadowRoot?.querySelector<HTMLCanvasElement>('.qr-code');
  expect(possibleCanvas).to.exist;
  return possibleCanvas!;
};

const expectCanvasToHaveAriaLabel = (qrCode: SlQrCode, expectedLabel: string): void => {
  const canvas = getCanvas(qrCode);
  expect(canvas).to.have.attribute('aria-label', expectedLabel);
};

class Color {
  r: number;
  g: number;
  b: number;
  alpha: number;

  constructor(r: number, g: number, b: number, alpha: number) {
    this.r = r;
    this.b = b;
    this.g = g;
    this.alpha = alpha;
  }

  equals(other: Color): boolean {
    return (
      other === this || (this.r === other.r && this.b === other.b && this.g === other.g && this.alpha === other.alpha)
    );
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

interface QrCodeColors {
  foreground: Color;
  background: Color;
}

const getColorFromPixel = (colorArray: Uint8ClampedArray, pixelNumber: number): Color => {
  const startEntryNumber = pixelNumber * 4;
  return new Color(
    colorArray[startEntryNumber],
    colorArray[startEntryNumber + 1],
    colorArray[startEntryNumber + 2],
    colorArray[startEntryNumber + 3]
  );
};

const getQrCodeColors = (qrCode: SlQrCode): QrCodeColors => {
  const canvas = getCanvas(qrCode);
  const context = canvas.getContext('2d');
  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
  expect(imageData).not.to.be.null;
  const colorArray = imageData!.data;
  const numberOfPixels = imageData!.width * imageData!.height;
  const foregroundColor = getColorFromPixel(colorArray, 0);
  let backgroundColor: Color | null = null;
  for (let pixelNumber = 0; pixelNumber < numberOfPixels; pixelNumber++) {
    const currentColor = getColorFromPixel(colorArray, pixelNumber);
    if (!currentColor.equals(foregroundColor)) {
      backgroundColor = currentColor;
      break;
    }
  }
  return {
    foreground: foregroundColor,
    background: backgroundColor!
  };
};

const red = new Color(255, 0, 0, 255);
const white = new Color(255, 255, 255, 255);
const blue = new Color(0, 0, 255, 255);

const expectQrCodeColorsToBe = (qrCode: SlQrCode, expectedColors: QrCodeColors): void => {
  const qrCodeColors = getQrCodeColors(qrCode);
  const backgroundMessage =
    'expected background color to be ' +
    expectedColors.background.toString() +
    ' but got ' +
    qrCodeColors.background.toString();
  expect(qrCodeColors.background.equals(expectedColors.background), backgroundMessage).to.be.true;
  const foregroundMessage =
    'expected foreground color to be ' +
    expectedColors.foreground.toString() +
    ' but got ' +
    qrCodeColors.foreground.toString();
  expect(qrCodeColors.foreground.equals(expectedColors.foreground), foregroundMessage).to.be.true;
};

describe('<sl-qr-code>', () => {
  it('should render a component', async () => {
    const qrCode = await fixture<SlQrCode>(html` <sl-qr-code value="test data"></sl-qr-code>`);

    expect(qrCode).to.exist;
  });

  it('should be accessible', async () => {
    const qrCode = await fixture<SlQrCode>(html` <sl-qr-code value="test data"></sl-qr-code>`);

    await expect(qrCode).to.be.accessible();
  });

  it('uses the value as label if none given', async () => {
    const qrCode = await fixture<SlQrCode>(html` <sl-qr-code value="test data"></sl-qr-code>`);

    expectCanvasToHaveAriaLabel(qrCode, 'test data');
  });

  it('uses the label if given', async () => {
    const qrCode = await fixture<SlQrCode>(html` <sl-qr-code value="test data" label="test label"></sl-qr-code>`);

    expectCanvasToHaveAriaLabel(qrCode, 'test label');
  });

  it('sets the correct color for the qr code', async () => {
    const qrCode = await fixture<SlQrCode>(html` <sl-qr-code value="test data" fill="red"></sl-qr-code>`);

    expectQrCodeColorsToBe(qrCode, { foreground: red, background: white });
  });

  it('sets the correct background for the qr code', async () => {
    const qrCode = await fixture<SlQrCode>(
      html` <sl-qr-code value="test data" fill="red" background="blue"></sl-qr-code>`
    );

    expectQrCodeColorsToBe(qrCode, { foreground: red, background: blue });
  });

  it('has the expected size', async () => {
    const qrCode = await fixture<SlQrCode>(html` <sl-qr-code value="test data" size="100"></sl-qr-code>`);

    const height = qrCode.getBoundingClientRect().height;
    const width = qrCode.getBoundingClientRect().width;
    expect(height).to.equal(100);
    expect(width).to.equal(100);
  });
});
