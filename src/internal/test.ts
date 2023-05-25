import { sendMouse } from '@web/test-runner-commands';

function determineMousePosition(el: Element, position: string, offsetX: number, offsetY: number) {
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
  return { clickX, clickY };
}

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
  const { clickX, clickY } = determineMousePosition(el, position, offsetX, offsetY);

  await sendMouse({ type: 'click', position: [clickX, clickY] });
}

/** A testing utility that moves the mouse onto an element. */
export async function moveMouseOnElement(
  /** The element to click */
  el: Element,
  /** The location of the element to click */
  position: 'top' | 'right' | 'bottom' | 'left' | 'center' = 'center',
  /** The horizontal offset to apply to the position when clicking */
  offsetX = 0,
  /** The vertical offset to apply to the position when clicking */
  offsetY = 0
) {
  const { clickX, clickY } = determineMousePosition(el, position, offsetX, offsetY);

  await sendMouse({ type: 'move', position: [clickX, clickY] });
}

/** A testing utility that drags an element with the mouse. */
export async function dragElement(
  /** The element to drag */
  el: Element,
  /** The horizontal distance to drag in pixels */
  deltaX = 0,
  /** The vertical distance to drag in pixels */
  deltaY = 0
): Promise<void> {
  await moveMouseOnElement(el);
  await sendMouse({ type: 'down' });
  const { clickX, clickY } = determineMousePosition(el, 'center', deltaX, deltaY);
  await sendMouse({ type: 'move', position: [clickX, clickY] });
  await sendMouse({ type: 'up' });
}
