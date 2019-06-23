import React from 'react';
import { connect } from 'react-redux';
import formatDateString from './formatDateString';

let displayTodos;

const DisplayTodos = ({ displayedTodos }) => {
  console.log(displayedTodos);

  return <div>displayTodos</div>;
};

const mapStateToProps = state => ({
  displayedTodos: state.todos.todos.filter(
    todo =>
      formatDateString(new Date(todo.createDate)) ===
      formatDateString(state.form.daySort.values.selectedDay)
  )
});

export default connect(mapStateToProps)(DisplayTodos);
