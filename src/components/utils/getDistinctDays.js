import formatDateString from './formatDateString';

export default todos => [
  ...new Set(todos.map(todo => formatDateString(new Date(todo.createDate))))
];
