import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import filterReducer from './filterReducer';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  todos: todoReducer,
  form: formReducer,
  filter: filterReducer,
  auth: authReducer
});
