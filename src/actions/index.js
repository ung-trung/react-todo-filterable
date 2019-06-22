import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  SET_TODO_COMPLETE,
  UNSET_TODO_COMPLETE
} from './types';

import todo from '../apis/todo';

import history from '../history';

export const fetchTodos = () => async dispatch => {
  try {
    const res = await todo.get('/todos');
    dispatch({ type: FETCH_TODOS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = newTodo => async dispatch => {
  try {
    const res = await todo.post('/todos', newTodo);
    console.log(res.data);

    dispatch({ type: ADD_TODO, payload: res.data });
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
