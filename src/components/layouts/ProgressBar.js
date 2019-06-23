import React from 'react';
import { connect } from 'react-redux';
import getDisplayedTodos from '../utils/getDisplayedTodos';

const ProgressBar = ({ displayTodos }) => {
  const getProgress = todos => {
    const numberCompletedTodos = todos.reduce(
      (acc, current) => (current.isCompleted ? ++acc : acc),
      0
    );

    if (isNaN(numberCompletedTodos / todos.length)) {
      return 100;
    }
    return (numberCompletedTodos / todos.length) * 100;
  };

  return (
    <progress
      className="progress is-danger"
      value={getProgress(displayTodos)}
      max="100"
    />
  );
};

const mapStateToProps = state => ({
  displayTodos: getDisplayedTodos(
    state.todos.todos,
    state.form.daySort.values.selectedDay
  )
});

export default connect(mapStateToProps)(ProgressBar);
