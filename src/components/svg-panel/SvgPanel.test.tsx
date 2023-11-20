import { render, screen } from '@testing-library/react';
import { SvgPanel } from './SvgPanel';
import SessionProvider from '../SessionProvider';
import { PolygonsContextProvider } from '#/context/polygons-context/PolygonsContext';

// we can't use let here due to the way jest.mock scope works
var mockUseSvgPanelHandlersHook: jest.Mock;

jest.mock('#/hooks/useSvgPanelHandlers/useSvgPanelHandlers', () => {
  mockUseSvgPanelHandlersHook = jest.fn(() => ({
    svgPanelClickHandler: () => {},
    svgPanelMouseDownHandler: () => {},
    svgPanelMouseMoveHandler: () => {},
    svgPanelMouseUpHandler: () => {},
  }));
  return {
    useSvgPanelHandlers: mockUseSvgPanelHandlersHook,
  };
});

// jest has an issue with server functions
jest.mock('#/actions/saveWorkspace', () => ({
  saveWorkspace: () => 'OK',
}));

jest.mock('#/components/Polygons', () => ({
  Polygons: () => '[Polygons]',
}));

jest.mock('#/components/SideMenu', () => ({
  SideMenu: () => '[SideMenu]',
}));

jest.mock('#/components/TopMenu', () => ({
  TopMenu: () => '[TopMenu]',
}));

jest.mock('#/components/ToolOptions', () => ({
  ToolOptions: () => '[ToolOptions]',
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider session={null}>
      <PolygonsContextProvider initialWorkSpace={null}>
        {children}
      </PolygonsContextProvider>
    </SessionProvider>
  );
};

describe('SvgPanel', () => {
  it('should render correctly', () => {
    render(
      <Wrapper>
        <SvgPanel />
      </Wrapper>
    );

    expect(screen.getByText('[Polygons]')).toBeInTheDocument();
    expect(screen.getByText('[SideMenu]')).toBeInTheDocument();
    expect(screen.getByText('[ToolOptions]')).toBeInTheDocument();
    expect(screen.getByText('[TopMenu]')).toBeInTheDocument();
  });

  it('should pass state and dispatch to useSvgPanelHandlers', () => {
    render(
      <Wrapper>
        <SvgPanel />
      </Wrapper>
    );

    expect(mockUseSvgPanelHandlersHook).toHaveBeenCalledWith(
      {
        mode: 'idle',
        polygons: {},
        selectedPolygon: null,
      },
      expect.any(Function)
    );
  });
});
