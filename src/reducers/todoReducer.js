import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
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
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: state.todos.find(todo => todo.id === action.payload)
      };
    case CLEAR_CURRENT_TODO:
      return {
        ...state,
        currentTodo: null
      };
    case SET_TODO_COMPLETE:
    case UNSET_TODO_COMPLETE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        )
      };
    default:
      return state;
  }
};
