import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADING
} from '../actions/types'

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  error: null,
  user: null,
  isLoading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }

    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        isLoading: false
      }

    case CLEAR_ERRORS:
      return { ...state, error: null }

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false
      }

    case USER_LOADING:
      return { ...state, isLoading: true }

    case AUTH_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }

    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        isLoading: false
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        isLoading: false
      }

    default:
      return state
  }
}
