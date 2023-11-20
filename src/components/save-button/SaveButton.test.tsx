import { render, screen } from '@testing-library/react';
import { SaveButton } from './SaveButton';
import React from 'react';

const defaultProps = {
  toastMessage: 'mock-toast-message',
  buttonText: 'save',
  pendingButtonText: 'saving...',
  pending: false,
  saveWork: jest.fn(),
  isDisabled: false,
};

describe('SaveButton', () => {
  it('should render correctly when pending is false', () => {
    render(<SaveButton {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'save' })).toBeInTheDocument();
    expect(screen.getByText('mock-toast-message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'save' })).not.toBeDisabled();
  });

  it('should render correctly when pending is true', () => {
    render(<SaveButton {...defaultProps} pending={true} isDisabled={true} />);

    expect(
      screen.getByRole('button', { name: 'saving...' })
    ).toBeInTheDocument();
    expect(screen.getByText('mock-toast-message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'saving...' })).toBeDisabled();
  });

  it('should handle onClick events', () => {
    const saveWork = jest.fn();
    render(<SaveButton {...defaultProps} saveWork={saveWork} />);

    expect(saveWork).toHaveBeenCalledTimes(0);
    screen.getByRole('button', { name: 'save' }).click();
    expect(saveWork).toHaveBeenCalledTimes(1);
  });
});
