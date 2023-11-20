import { render, screen } from '@testing-library/react';
import { getServerSession } from 'next-auth';
import Page from './page';

// we can't use let here due to the way jest.mock scope works
var mockSessionProvider: jest.Mock;
var mockPolygonsContextProvider: jest.Mock;

jest.mock('next-auth/react', () => {
  mockSessionProvider = jest.fn(({ children }) => (
    <div>
      [SessionProvider]
      {children}
    </div>
  ));
  return {
    SessionProvider: mockSessionProvider,
  };
});

jest.mock('#/context/polygons-context/PolygonsContext', () => {
  mockPolygonsContextProvider = jest.fn(({ children }) => (
    <div>
      [PolygonsContextProvider]
      {children}
    </div>
  ));
  return {
    PolygonsContextProvider: mockPolygonsContextProvider,
  };
});

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => ({ user: { id: 'mock-user-id' } })),
}));

jest.mock('#/state/ServerMemoryState', () => ({
  getWorkspaceForUser: jest.fn((key: string) => {
    const workspaces: { [key: string]: string } = {
      'mock-user-id': 'mock-workspace',
    };

    if (key in workspaces) {
      return workspaces[key];
    } else {
      return undefined;
    }
  }),
}));

jest.mock('#/components/svg-panel/SvgPanel', () => ({
  SvgPanel: jest.fn(() => <div>[SvgPanel]</div>),
}));

describe('SvgPanel', () => {
  it('should render correctly', async () => {
    render(await Page());
    expect(screen.getByText('[SessionProvider]')).toBeInTheDocument();
    expect(screen.getByText('[SessionProvider]')).toBeInTheDocument();
    expect(screen.getByText('[SvgPanel]')).toBeInTheDocument();
  });

  it('should pass the session to the SessionProvider if it exists', async () => {
    render(await Page());
    expect(mockSessionProvider).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        session: { user: { id: 'mock-user-id' } },
      },
      {}
    );
  });

  it(`should pass the correct initialWorkSpace to the
  PolygonsContextProvider if the user is signed in`, async () => {
    render(await Page());
    expect(mockPolygonsContextProvider).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        initialWorkSpace: 'mock-workspace',
      },
      {}
    );
  });

  it(`should pass null to session and initialWorkSpace if the
    user is not signed in and still render the SvgPanel`, async () => {
    (getServerSession as jest.Mock).mockImplementationOnce(() => null);
    render(await Page());
    expect(mockSessionProvider).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        session: null,
      },
      {}
    );
    expect(mockPolygonsContextProvider).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        initialWorkSpace: null,
      },
      {}
    );
    expect(screen.getByText('[SvgPanel]')).toBeInTheDocument();
  });
});
