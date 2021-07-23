interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

export function* createTreeWalker(root: Node, whatToShow = NodeFilter.SHOW_ELEMENT, ...args: any[]): Iterable<Element> {
  const treeWalker = document.createTreeWalker(root, whatToShow, ...args);
  let currentNode = treeWalker.nextNode() as Element;

  while (currentNode) {
    yield currentNode;
    if (currentNode.shadowRoot) {
      yield* createTreeWalker(currentNode.shadowRoot, whatToShow, ...args);
    }
    currentNode = treeWalker.nextNode() as Element;
  }
}
