'use client';
import { useRef, useState } from 'react';
import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { saveWorkspace, SaveWorkResponse } from '#/actions/saveWorkspace';
import { SaveButton } from './SaveButton';

export const SaveButtonContainer = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { state } = usePolygonsContext();
  const [pending, setPending] = useState(false);
  const [saveResponse, setSaveResponse] = useState<SaveWorkResponse | null>(
    null
  );

  let message;
  const saveWork = async () => {
    setPending(true);
    const response = await saveWorkspace(state.polygons);
    setSaveResponse(response);
    setPending(false);
    dialogRef.current?.showModal();
    setTimeout(() => {
      dialogRef.current?.close();
      setSaveResponse(null);
      message = undefined;
    }, 2000);
  };

  if (saveResponse === 'OK') {
    message = 'Your work is saved! 👌';
  } else if (saveResponse) {
    message = saveResponse.message;
  }

  return (
    <SaveButton
      ref={dialogRef}
      /* if message is undefined, dialogue should be closed */
      toastMessage={message ?? 'Something went wrong 😢'}
      buttonText='save'
      pendingButtonText='saving...'
      pending={pending}
      saveWork={saveWork}
      isDisabled={pending || state.mode !== 'idle'}
    />
  );
};
