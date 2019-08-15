import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  SET_TODO_COMPLETE,
  UNSET_TODO_COMPLETE,
  SET_CURRENT_SELECTE_DAY,
  TODOS_LOADING,
  SINGLE_TODO_LOADING,
  FETCH_TODOS_FAIL,
  ADD_TODO_FAIL,
  DELETE_TODO_FAIL,
  EDIT_TODO_FAIL,
  SET_TODO_COMPLETE_FAIL,
  UNSET_TODO_COMPLETE_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADING
} from './types'

import { isArray } from 'util'

import todo from '../apis/todo'

import setAuthToken from '../components/utils/setAuthToken'

export const fetchTodos = () => async dispatch => {
  dispatch({ type: TODOS_LOADING })
  try {
    const res = await todo.get('/todos')

    dispatch({ type: FETCH_TODOS, payload: res.data })
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAIL, payload: error.message })
  }
}

// export const fetchTodo = id => async dispatch => {
//   dispatch({ type: TODO_LOADING })
//   try {
//     const res = await todo.get(`/todos/${id}`)
//     dispatch({ type: FETCH_TODO, payload: res.data })
//   } catch (error) {
//     console.log(error.response.data)
//   }
// }

export const addTodo = newTodo => async dispatch => {
  dispatch({
    type: SINGLE_TODO_LOADING
  })
  try {
    const res = await todo.post('/todos', newTodo)

    dispatch({ type: ADD_TODO, payload: res.data })
  } catch (error) {
    dispatch({ type: ADD_TODO_FAIL, payload: error.message })
  }
}

export const deleteTodo = id => async dispatch => {
  dispatch({
    type: SINGLE_TODO_LOADING
  })
  try {
    await todo.delete(`/todos/${id}`)
    dispatch({ type: DELETE_TODO, payload: id })
  } catch (error) {
    dispatch({ type: DELETE_TODO_FAIL, payload: error.message })
  }
}

export const editTodo = newTodo => async dispatch => {
  dispatch({
    type: SINGLE_TODO_LOADING
  })
  try {
    const res = await todo.patch(`/todos/${newTodo._id}`, newTodo)
    dispatch({ type: EDIT_TODO, payload: res.data })
  } catch (error) {
    dispatch({ type: EDIT_TODO_FAIL, payload: error.message })
  }
}

export const setCurrentTodo = id => dispatch => {
  dispatch({ type: SET_CURRENT_TODO, payload: id })
}

export const clearCurrentTodo = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_TODO })
}

export const setTodoComplete = id => async (dispatch, getState) => {
  dispatch({
    type: SINGLE_TODO_LOADING
  })
  try {
    const currentSelectedTodo = getState().todos.todos.find(
      todo => todo._id === id
    )
    const completedTodo = { ...currentSelectedTodo, isCompleted: true }

    const res = await todo.patch(`/todos/${id}`, completedTodo)

    dispatch({ type: SET_TODO_COMPLETE, payload: res.data })
  } catch (error) {
    dispatch({ type: SET_TODO_COMPLETE_FAIL, payload: error.message })
  }
}

export const unsetTodoComplete = id => async (dispatch, getState) => {
  dispatch({
    type: SINGLE_TODO_LOADING
  })
  try {
    const currentSelectedTodo = getState().todos.todos.find(
      todo => todo._id === id
    )

    const uncompletedTodo = { ...currentSelectedTodo, isCompleted: false }

    const res = await todo.patch(`/todos/${id}`, uncompletedTodo)

    dispatch({ type: UNSET_TODO_COMPLETE, payload: res.data })
  } catch (error) {
    dispatch({ type: UNSET_TODO_COMPLETE_FAIL, payload: error.message })
  }
}

export const setCurrentSelectedDay = date => ({
  type: SET_CURRENT_SELECTE_DAY,
  payload: date
})

// Load User
export const loadUser = () => async dispatch => {
  dispatch({ type: USER_LOADING })
  setAuthToken(localStorage.token)
  try {
    const res = await todo.get('/auth')
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (error) {
    dispatch({ type: AUTH_ERROR })
  }
}
// Register User
export const registerUser = formData => async dispatch => {
  dispatch({ type: USER_LOADING })
  try {
    const { data } = await todo.post('/users', formData)

    dispatch({ type: REGISTER_SUCCESS, payload: data })
  } catch (error) {
    const { errors } = error.response.data

    if (isArray(errors)) {
      errors.forEach(error =>
        dispatch({ type: REGISTER_FAIL, payload: error.msg })
      )
    }

    dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg })
  }
}
// Login User
export const login = formData => async dispatch => {
  dispatch({ type: USER_LOADING })
  try {
    const { data } = await todo.post('/auth', formData)
    dispatch({ type: LOGIN_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg })
  }
}

// Logout
export const logout = () => dispatch => dispatch({ type: LOGOUT })

// Clear Error
export const clearError = () => dispatch => dispatch({ type: CLEAR_ERRORS })
