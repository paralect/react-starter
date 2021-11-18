import { configureStore } from '@reduxjs/toolkit';

import history from 'services/history.service';

import user from './user/user.slice';
import { toastReducer } from './toast/toast.slice';

export default configureStore({
  reducer: {
    user,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: { extraArgument: { history } },
  }),
});
