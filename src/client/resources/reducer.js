import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'services/history.service';

import toast from './toast/toast.reducer';
import user from './user/user.reducer';


const reducers = {
  user,
  toast,
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
});

export default rootReducer;
