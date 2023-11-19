'use client';
import { useRef, useState } from 'react';
import { css } from '#/styled-system/css';
import { Button, Padding, Text } from '#/atoms';
import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { saveWorkspace, SaveWorkResponse } from '../actions/saveWorkspace';

export const SaveButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { state } = usePolygonsContext();
  const [pending, setPending] = useState(false);
  const [saveResponse, setSaveResponse] = useState<SaveWorkResponse | null>(
    null
  );

  const saveWork = async () => {
    setPending(true);
    const saveResponse = await saveWorkspace(state.polygons);
    setSaveResponse(saveResponse);
    setPending(false);
    dialogRef.current?.showModal();
    setTimeout(() => {
      dialogRef.current?.close();
      setSaveResponse(null);
    }, 2000);
  };

  return (
    <>
      {/* <dialog> is our toast element */}
      <dialog className={dialogStyles} ref={dialogRef}>
        <Padding p='5px 20px'>
          {saveResponse === 'OK' ? (
            <Text> Your work is saved! 👌</Text>
          ) : (
            <Text> {saveResponse?.message}</Text>
          )}
        </Padding>
      </dialog>

      <Button
        text={pending ? 'saving...' : 'save'}
        disabled={pending || state.mode !== 'idle'}
        onClick={saveWork}
      ></Button>
    </>
  );
};

/* dialog element needs to be styled
directly because is out of the flow */
const dialogStyles = css({
  position: 'absolute',
  top: '20vh',
  left: '50vw',
  transform: 'translateX(-50%)',
  border: '1px solid black',
  borderRadius: 'md',
});
