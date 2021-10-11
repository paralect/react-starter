import { useSelector, useDispatch } from 'react-redux';

import { userActions } from 'resources/user/user.slice';

export default function useCurrentUser() {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ user }) => user);

  const setCurrentUser = (v) => dispatch(userActions.setUser(v));

  return {
    currentUser,
    setCurrentUser,
  };
}
