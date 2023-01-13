/**
 * Allows you to find a DOM element based on the value of its `data-testid` attribute.
 * This attribute can be used to decouple identifying dom elements for testing from
 * styling (which is typically done via class selectors) or other ids which serve
 * different purposes.
 * See also https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change
 * Inspired by https://testing-library.com/docs/queries/bytestid/
 * @param {HTMLElement} container - A parent element of the DOM element to find
 * @param {string} testId - The value of the `data-testid` attribute of the component to find.
 * @returns The found element or null if there was no such element
 */
export const queryByTestId = <T extends Element>(container: HTMLElement, testId: string): T | null => {
  return container.querySelector<T>(`[data-testid="${testId}"]`);
};
