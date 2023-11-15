'use client';

import { styled } from '#/styled-system/jsx';
import {
  PolygonsContextProvider,
  usePolygonsContext,
} from '#/context/polygons-context/PolygonsContext';
import { Text, Position, Background } from '#/atoms';
import { SideMenu } from '#/components/SideMenu';
import { TopMenu } from '#/components/TopMenu';

// @todo rename this
const SVGBoard = () => {
  const { state, dispatch } = usePolygonsContext();
  console.log('##', state);

  const svgClickHandler = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const target = event.target as SVGElement;

    if (state.mode === 'add') {
      if (target.tagName === 'svg' || target.tagName === 'circle') {
        dispatch({
          type: 'ADD_POINT',
          payload: {
            point: { x: event.clientX, y: event.clientY },
            clickedOnPoint: target.tagName === 'circle',
          },
        });
      }
      return;
    }

    // if (target.tagName === 'circle') {
    //   const circle = target as SVGCircleElement;
    //   const cx = circle.getAttribute('cx');
    //   const cy = circle.getAttribute('cy');
    //   alert('Circle position: cx = ' + cx + ', cy = ' + cy);
    // }
  };

  const polygonKeys = Object.keys(state.polygons ?? {});

  // @todo fix keys
  return (
    <>
      <Position {...expanded}>
        <svg
          width='100%'
          height='100%'
          onClick={svgClickHandler}
          xmlns='http://www.w3.org/2000/svg'
        >
          {polygonKeys.map((polygonKey) => {
            const polygon = state?.polygons?.[polygonKey];
            if (!polygon) {
              return null;
            }
            const points = polygon.points.map((point) => {
              return `${point.x},${point.y}`;
            });
            const pointsString = points.join(' ');

            return (
              <g>
                {polygon.isComplete && (
                  <polygon
                    key={polygonKey}
                    points={pointsString}
                    style={{
                      fill: 'lime',
                      stroke: 'purple',
                      strokeWidth: 1,
                    }}
                  />
                )}

                {polygon.points.map((point, index) => {
                  const nextPoint = polygon.points[index + 1];
                  if (nextPoint) {
                    return (
                      <line
                        key={`${polygonKey}-line-${index}`}
                        x1={point.x}
                        y1={point.y}
                        x2={nextPoint.x}
                        y2={nextPoint.y}
                        stroke='black'
                      />
                    );
                  }
                })}
                {polygon.points.map((point, index) => {
                  if (
                    index === polygon.points.length - 1 &&
                    polygon.isComplete
                  ) {
                    // last point is the same as first point if completed
                    return null;
                  }
                  return (
                    <circle
                      key={`${polygonKey}-point-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r='5'
                      stroke='black'
                      strokeWidth='3'
                      fill='red'
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </Position>
      <Position top='2vw' left='40vw'>
        <TopMenu />
      </Position>
      <Position right='2vw' top='20vh'>
        <SideMenu />
      </Position>
    </>
  );
};

export default function Home() {
  return (
    <PolygonsContextProvider>
      {/* top={0} right={0} bottom={0} left={0} */}
      <Position pos='fixed' {...expanded} css={{ h: '100vh' }}>
        <Background
          bg='#f7f7f7'
          backgroundSize='30px 30px'
          backgroundImage='linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px)'
          h='100%'
        >
          <SVGBoard />
        </Background>
      </Position>
    </PolygonsContextProvider>
  );
}

const expanded = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
