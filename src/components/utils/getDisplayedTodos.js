import formatDateString from './formatDateString';

export const getDisplayedTodos = (todos, selectedDay) =>
  todos.filter(
    todo =>
      formatDateString(new Date(todo.createDate)) ===
      formatDateString(selectedDay)
  );
