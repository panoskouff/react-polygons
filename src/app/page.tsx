'use client';

import {
  PolygonsContextProvider,
  usePolygonsContext,
} from '#/context/polygons-context/PolygonsContext';
import { Position, Background } from '#/atoms';
import { SideMenu } from '#/components/SideMenu';
import { ToolOptions } from '#/components/ToolOptions';
import { Polygons } from '#/components/Polygons';
import { useSvgPanelHandlers } from '#/hooks';
import { TopMenu } from '#/components/TopMenu';

const SVGPanel = () => {
  const { state, dispatch } = usePolygonsContext();
  console.log('render', state.polygons);

  const {
    svgPanelClickHandler,
    svgPanelMouseDownHandler,
    svgPanelMouseMoveHandler,
    svgPanelMouseUpHandler,
  } = useSvgPanelHandlers(state, dispatch);

  return (
    <>
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
    </>
  );
};

export default function Home() {
  return (
    <PolygonsContextProvider>
      <Position pos='fixed' {...expanded} css={{ h: '100vh' }}>
        <Background
          bg='#f7f7f7'
          backgroundSize='30px 30px'
          backgroundImage='linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px)'
          h='100%'
        >
          <SVGPanel />
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
