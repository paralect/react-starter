import React, { useContext } from 'react';

import { ContextStoreProvider, StoreContext } from 'resources/store';
import actions from 'resources/actions';

import Button from 'components/button';

export default {
  title: 'Components/Toaster',
  component: Button,
  decorators: [
    (Story) => (
      <ContextStoreProvider>
        <Story />
      </ContextStoreProvider>
    ),
  ],
};

export const Template = () => {
  const { dispatch } = useContext(StoreContext);

  const showSuccessToast = () => {
    dispatch(actions.createToast({ type: 'success', message: 'This is success toast! This is success toast!' }));
  };

  const showErrorToast = () => {
    dispatch(actions.createToast({ type: 'error', message: 'This is error toast! This is error toast!' }));
  };

  const showInfoToast = () => {
    dispatch(actions.createToast({ type: 'info', message: 'This is info toast! This is info toast!' }));
  };

  const showWarningToast = () => {
    dispatch(actions.createToast({ type: 'warning', message: 'This is warning toast! This is warning toast!' }));
  };

  return (
    <p>
      <Button
        onClick={showSuccessToast}
      >
        success toast
      </Button>
      <Button
        onClick={showErrorToast}
      >
        error toast
      </Button>
      <Button
        onClick={showInfoToast}
      >
        info toast
      </Button>
      <Button
        onClick={showWarningToast}
      >
        warning toast
      </Button>
    </p>
  );
};
