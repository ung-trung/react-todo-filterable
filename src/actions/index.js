import {
  FETCH_TODOS,
  FETCH_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  SET_TODO_COMPLETE,
  UNSET_TODO_COMPLETE,
  SET_CURRENT_SELECTE_DAY,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from './types';

import axios from 'axios';
import todo from '../apis/todo';

import history from '../history';
import setAuthToken from '../components/utils/setAuthToken';

export const fetchTodos = () => async dispatch => {
  try {
    const res = await todo.get('/todos');
    dispatch({ type: FETCH_TODOS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTodo = id => async dispatch => {
  try {
    const res = await todo.get(`/todos/${id}`);
    dispatch({ type: FETCH_TODO, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = newTodo => async dispatch => {
  try {
    const res = await todo.post('/todos', newTodo);

    dispatch({ type: ADD_TODO, payload: res.data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = id => async dispatch => {
  try {
    await todo.delete(`/todos/${id}`);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const editTodo = newTodo => async dispatch => {
  try {
    const res = await todo.patch(`/todos/${newTodo.id}`, newTodo);
    dispatch({ type: EDIT_TODO, payload: res.data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentTodo = id => dispatch => {
  dispatch({ type: SET_CURRENT_TODO, payload: id });
};

export const clearCurrentTodo = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_TODO });
};

export const setTodoComplete = id => async (dispatch, getState) => {
  try {
    const currentSelectedTodo = getState().todos.todos.find(
      todo => todo.id === id
    );
    const completedTodo = { ...currentSelectedTodo, isCompleted: true };

    const res = await todo.patch(`/todos/${id}`, completedTodo);

    dispatch({ type: SET_TODO_COMPLETE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const unsetTodoComplete = id => async (dispatch, getState) => {
  try {
    const currentSelectedTodo = getState().todos.todos.find(
      todo => todo.id === id
    );
    const uncompletedTodo = { ...currentSelectedTodo, isCompleted: false };

    const res = await todo.patch(`/todos/${id}`, uncompletedTodo);

    dispatch({ type: UNSET_TODO_COMPLETE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentSelectedDay = date => ({
  type: SET_CURRENT_SELECTE_DAY,
  payload: date
});

// Load User
export const loadUSer = () => async dispatch => {
  setAuthToken(localStorage.token);
  try {
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
// Register User

// Login User

// Logout

// Clear Error
