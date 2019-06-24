const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  error: null,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
