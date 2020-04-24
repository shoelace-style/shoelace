//
// Shows an element by removing its hidden property, then forces a reflow. Useful when you need a hidden element to
// appear but don't want to miss out on its transition.
//
export function showWithReflow(el: HTMLElement) {
  el.hidden = false;
  el.clientWidth; // see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
}
