import { State } from '#/types/state/polygons';
import { PointsHelpers, SvgElements } from '../types';

export const moveVertexInitializer = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  state: State,
  elements: SvgElements,
  pointsHelpers: PointsHelpers
) => {
  const target = event.target as SVGCircleElement;
  const polygonId = elements.g?.getAttribute('data-polygon-id');
  const vertexIndexStr = target.getAttribute('data-vertex-index');

  if (!polygonId || !vertexIndexStr || !elements.g) {
    console.error(
      'handleMouseDown moveVertexInitializer: Missing polygonId or vertexIndex or <g> parent'
    );
    return;
  }

  /* vertex index will save us a lookup in polygon points on mouseUp
    and is also needed to figure out which lines are adjacent */
  const vertexIndex = parseInt(vertexIndexStr);
  pointsHelpers.circleVertexIndex = vertexIndex;
  const point = state.polygons[polygonId].points[vertexIndex];
  pointsHelpers.circleInitialPosition = point;

  /* Get a reference to all elements related to this point
    so we can move them while dragging the point */
  elements.circle = target as SVGCircleElement;
  const lines = elements.g.querySelectorAll('line');
  elements.nextLine = lines[vertexIndex] as SVGLineElement;
  if (vertexIndex === 0) {
    elements.prevLine = lines[lines.length - 1] as SVGLineElement;
  } else {
    elements.prevLine = lines[vertexIndex - 1] as SVGLineElement;
  }
  elements.polygon = elements.g.querySelector('polygon');
  pointsHelpers.polygonPoints = state.polygons[polygonId].points;
};
