import { sendMouse } from '@web/test-runner-commands';

/** A testing utility that measures an element's position and clicks on it. */
export async function clickOnElement(
  /** The element to click */
  el: Element,
  /** The location of the element to click */
  position: 'top' | 'right' | 'bottom' | 'left' | 'center' = 'center',
  /** The horizontal offset to apply to the position when clicking */
  offsetX = 0,
  /** The vertical offset to apply to the position when clicking */
  offsetY = 0
) {
  const { x, y, width, height } = el.getBoundingClientRect();
  const centerX = Math.floor(x + window.pageXOffset + width / 2);
  const centerY = Math.floor(y + window.pageYOffset + height / 2);
  let clickX: number;
  let clickY: number;

  switch (position) {
    case 'top':
      clickX = centerX;
      clickY = y;
      break;
    case 'right':
      clickX = x + width - 1;
      clickY = centerY;
      break;
    case 'bottom':
      clickX = centerX;
      clickY = y + height - 1;
      break;
    case 'left':
      clickX = x;
      clickY = centerY;
      break;
    default:
      clickX = centerX;
      clickY = centerY;
  }

  clickX += offsetX;
  clickY += offsetY;

  await sendMouse({ type: 'click', position: [clickX, clickY] });
}
