'use client';
import { useRef, useState } from 'react';
import { css } from '#/styled-system/css';
import { Button, Padding, Text } from '#/atoms';
import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';

export const SaveButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { state } = usePolygonsContext();
  const [pending, setPending] = useState(false);
  const saveWork = async () => {
    const currentWork = JSON.stringify(state.polygons);

    setPending(true);
    // @todo server action
    setPending(false);
    dialogRef.current?.showModal();
    setTimeout(() => {
      dialogRef.current?.close();
    }, 2000);
  };

  return (
    <>
      {/* we dialog use it as a toast here.. */}
      <dialog className={dialogStyles} ref={dialogRef}>
        <Padding p='5px 20px'>
          <Text>Your work is saved! 👌</Text>
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
