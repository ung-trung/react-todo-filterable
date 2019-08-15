import {
  FETCH_TODOS,
  // FETCH_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  EDIT_TODO_FAIL,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  SET_TODO_COMPLETE,
  UNSET_TODO_COMPLETE,
  TODOS_LOADING,
  SINGLE_TODO_LOADING,
  FETCH_TODOS_FAIL,
  DELETE_TODO_FAIL,
  ADD_TODO_FAIL,
  SET_TODO_COMPLETE_FAIL,
  UNSET_TODO_COMPLETE_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  todos: [],
  currentTodo: null,
  isLoading: false,
  isSingleTodoLoading: false,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, todos: [...action.payload], isLoading: false }
    // case FETCH_TODO:
    //   return {
    //     ...state,
    //     todos: state.todos.some(todo => todo._id === action.payload._id)
    //       ? [...state.todos]
    //       : [...state.todos, action.payload],
    //     isLoading: false
    //   }
    case TODOS_LOADING:
      return { ...state, isLoading: true }
    case SINGLE_TODO_LOADING:
      return { ...state, isSingleTodoLoading: true }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isLoading: false
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        isLoading: false
      }
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: state.todos.find(todo => todo._id === action.payload)
      }
    case CLEAR_CURRENT_TODO:
      return {
        ...state,
        currentTodo: null
      }
    case SET_TODO_COMPLETE:
    case UNSET_TODO_COMPLETE:
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.payload._id ? action.payload : todo
        ),
        isLoading: false
      }
    case FETCH_TODOS_FAIL:
    case DELETE_TODO_FAIL:
    case ADD_TODO_FAIL:
    case EDIT_TODO_FAIL:
    case SET_TODO_COMPLETE_FAIL:
    case UNSET_TODO_COMPLETE_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
