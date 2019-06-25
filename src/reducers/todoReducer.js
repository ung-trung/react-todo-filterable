import {
  FETCH_TODOS,
  FETCH_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  SET_TODO_COMPLETE,
  UNSET_TODO_COMPLETE
} from '../actions/types';

const INITIAL_STATE = { todos: [], currentTodo: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, todos: [...action.payload] };
    case FETCH_TODO:
      return {
        ...state,
        todos: state.todos.some(todo => todo._id === action.payload._id)
          ? [...state.todos]
          : [...state.todos, action.payload]
      };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: state.todos.find(todo => todo._id === action.payload)
      };
    case CLEAR_CURRENT_TODO:
      return {
        ...state,
        currentTodo: null
      };
    case SET_TODO_COMPLETE:
    case UNSET_TODO_COMPLETE:
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === action.payload._id ? action.payload : todo
        )
      };
    default:
      return state;
  }
};
