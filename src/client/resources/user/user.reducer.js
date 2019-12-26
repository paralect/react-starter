const initialState = {
  _id: '',
  createdOn: new Date(),
  firstName: '',
  lastName: '',
  email: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CURRENT_USER':
      return {
        ...action.payload,
      };

    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
