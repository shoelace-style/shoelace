export const queryByTestId = <T extends Element>(container: HTMLElement, testId: string): T | null => {
  return container.querySelector<T>(`[data-testid=${testId}]`);
};
