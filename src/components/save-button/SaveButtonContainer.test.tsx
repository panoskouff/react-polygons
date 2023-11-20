import { render, screen } from '@testing-library/react';
import SessionProvider from '../SessionProvider';
import { PolygonsContextProvider } from '#/context/polygons-context/PolygonsContext';
import { SaveButtonContainer } from './SaveButtonContainer';
import { act } from 'react-dom/test-utils';
import React from 'react';

// jest has an issue with server functions
jest.mock('#/actions/saveWorkspace', () => ({
  saveWorkspace: () => new Promise((resolve) => resolve('OK')),
}));

// we can't use let here due to the way jest.mock scope works
var MockSaveButton: jest.Mock;

jest.mock('./SaveButton', () => {
  const { forwardRef } = jest.requireActual('react');
  MockSaveButton = jest
    .fn()
    .mockImplementation((props, ref) => <div>[SaveButton]</div>);
  return {
    SaveButton: forwardRef(MockSaveButton),
  };
});

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider session={null}>
      <PolygonsContextProvider initialWorkSpace={null}>
        {children}
      </PolygonsContextProvider>
    </SessionProvider>
  );
};

describe('SaveButtonContainer', () => {
  it('should render SaveButton correctly by default', () => {
    render(
      <Wrapper>
        <SaveButtonContainer />
      </Wrapper>
    );

    expect(screen.getByText('[SaveButton]')).toBeInTheDocument();
    expect(MockSaveButton).toHaveBeenCalledWith(
      expect.objectContaining({
        pending: false,
        saveWork: expect.any(Function),
        isDisabled: false,
        // response message undefined since we haven't performed the request
        toastMessage: 'Something went wrong 😢',
        buttonText: 'save',
        pendingButtonText: 'saving...',
      }),
      expect.objectContaining({
        current: null,
      })
    );
  });

  it('should handle correctly the ui while saveWorkspace is executing', async () => {
    jest.useFakeTimers();
    const setPending = jest.fn();
    const setSaveResponse = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    // our first setState is setPending and the second is setSaveResponse
    useStateSpy
      .mockImplementationOnce(((init: any) => [
        init,
        setPending,
      ]) as unknown as any)
      .mockImplementationOnce(((init: any) => [
        init,
        setSaveResponse,
      ]) as unknown as any);

    render(
      <Wrapper>
        <SaveButtonContainer />
      </Wrapper>
    );

    await act(async () => {
      await MockSaveButton.mock.calls[0][0].saveWork();
      // need this to advance the setTimeout so we get the 2nd setSaveResponse
      jest.advanceTimersByTime(2000);
    });

    // pending is set to true and then false
    expect(setPending.mock.calls).toEqual([[true], [false]]);
    // saveResponse is set to 'OK' and then null once we close the toast
    expect(setSaveResponse.mock.calls).toEqual([['OK'], [null]]);

    useStateSpy.mockRestore();

    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
