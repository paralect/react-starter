import { configureStore } from '@reduxjs/toolkit';

import history from 'services/history.service';

import user from './user/user.slice';

export default configureStore({
  reducer: {
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: { extraArgument: history },
  }),
});
