const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'user:set':
      return action.payload.user;

    case 'user:delete':
      return null;

    default:
      return state;
  }
};
