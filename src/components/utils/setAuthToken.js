import todo from '../../apis/todo';

const setAuthToken = token => {
  if (token) {
    todo.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete todo.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
