'use client';
import { forwardRef } from 'react';
import { styled } from '#/styled-system/jsx';
import { Button, Padding, Text } from '#/atoms';

interface SaveButtonProps {
  pending: boolean;
  saveWork: () => void;
  isDisabled: boolean;
  toastMessage: string;
  pendingButtonText: string;
  buttonText: string;
}

export const SaveButton = forwardRef<HTMLDialogElement, SaveButtonProps>(
  (
    {
      pending,
      saveWork,
      isDisabled,
      toastMessage,
      pendingButtonText,
      buttonText,
    },
    ref
  ) => {
    return (
      <>
        {/* dialog element needs to be styled directly
        because is out of the flow */}
        <styled.dialog
          ref={ref}
          position='absolute'
          top='20vh'
          left='50vw'
          transform='translateX(-50%)'
          border='1px solid black'
          borderRadius='md'
        >
          <Padding p='5px 20px'>
            <Text>{toastMessage}</Text>
          </Padding>
        </styled.dialog>
        <Button
          text={pending ? pendingButtonText : buttonText}
          aria-label={pending ? pendingButtonText : buttonText}
          disabled={isDisabled}
          onClick={saveWork}
        ></Button>
      </>
    );
  }
);
