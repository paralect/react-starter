import { combineReducers } from 'redux';

import toast from './toast/toast.reducer';
import user from './user/user.reducer';

export default combineReducers({
  user,
  toast,
});
