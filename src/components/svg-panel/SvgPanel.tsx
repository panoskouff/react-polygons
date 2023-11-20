'use client';

import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { Position, Background } from '#/atoms';
import { SideMenu } from '#/components/SideMenu';
import { ToolOptions } from '#/components/ToolOptions';
import { Polygons } from '#/components/Polygons';
import { useSvgPanelHandlers } from '#/hooks';
import { TopMenu } from '#/components/TopMenu';

export const SvgPanel = () => {
  const { state, dispatch } = usePolygonsContext();

  const {
    svgPanelClickHandler,
    svgPanelMouseDownHandler,
    svgPanelMouseMoveHandler,
    svgPanelMouseUpHandler,
  } = useSvgPanelHandlers(state, dispatch);

  return (
    <Position pos='fixed' {...expanded} css={{ h: '100vh' }}>
      <Background
        bg='#f7f7f7'
        backgroundSize='30px 30px'
        backgroundImage='linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px)'
        h='100%'
      >
        {/* ideal user experience would save max dimensions
        of panel to user data and implement scroll by mouse. */}
        <Position {...expanded}>
          <svg
            className={state.mode}
            width='100%'
            height='100%'
            onClick={svgPanelClickHandler}
            onMouseDown={svgPanelMouseDownHandler}
            onMouseMove={svgPanelMouseMoveHandler}
            onMouseUp={svgPanelMouseUpHandler}
            xmlns='http://www.w3.org/2000/svg'
          >
            <Polygons />
          </svg>
        </Position>
        <Position top='2vw' left='2vw'>
          <TopMenu />
        </Position>
        <Position top='2vw' left='40vw'>
          <ToolOptions />
        </Position>
        <Position right='2vw' top='10vh'>
          <SideMenu />
        </Position>
      </Background>
    </Position>
  );
};

const expanded = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
