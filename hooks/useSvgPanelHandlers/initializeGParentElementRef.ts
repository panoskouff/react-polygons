export const initializeGParentElementRef = (
  target: SVGElement,
  elements: { g: SVGGElement | null }
) => {
  /* <g> needed to find children,polygonId and for handleMouseMove
  we need to initialize it only for the correct states or if a graph
  element is the one that was clicked so we can't just have this code
  once, we have to call it in multiple places */
  if (
    target.tagName === 'polygon' ||
    target.tagName === 'line' ||
    target.tagName === 'circle'
  ) {
    if ((target.parentNode as SVGGElement)?.tagName !== 'g') {
      console.error('handleMouseDown: Missing parent <g> element');
      return;
    }

    elements.g = target.parentNode as SVGGElement;
  }
};
