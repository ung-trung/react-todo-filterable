import formatDateString from './formatDateString'

export default (todos, selectedDay) =>
  todos.filter(
    todo => formatDateString(new Date(todo.createDate)) === selectedDay
  )
