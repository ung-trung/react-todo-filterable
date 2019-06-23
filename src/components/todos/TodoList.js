import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';
import { Link } from 'react-router-dom';

import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

import ProgressBar from '../layouts/ProgressBar';

import formatDateString from '../utils/formatDateString';
import today from '../utils/today';
import getDisplayedTodos from '../utils/getDisplayedTodos';

const TodoList = ({ selectedDay, sortedDisplayedTodos, fetchTodos }) => {
  const selectedDayString = formatDateString(new Date(selectedDay));

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const renderTodoList = () => {
    return sortedDisplayedTodos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ));
  };

  const renderText = () => {
    //declare tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (selectedDayString < formatDateString(today)) {
      return 'You cannot add New Todo in the past.';
    }
    if (selectedDayString === formatDateString(today)) {
      return 'Please add some todos for today.';
    }
    if (selectedDayString === formatDateString(tomorrow)) {
      return `Please add some todos for tomorrow.`;
    }

    return `Please add some todos for the day ${selectedDayString}.`;
  };

  return (
    <div className="columns is-mobile is-multiline is-centered">
      <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        <h1 className="title" style={{ marginBottom: '6px' }}>
          My Tasks
        </h1>

        <TodoFilter />
        <hr
          className="is-divider"
          style={{ marginBlockStart: '2px', marginBlockEnd: '12px' }}
        />
        <ProgressBar />
        <div
          style={{
            maxHeight: '350px',
            scrollbarWidth: 'none',
            minWidth: '200px',
            overflowY: 'auto',
            marginBottom: '15px'
          }}>
          {sortedDisplayedTodos.length > 0 ? renderTodoList() : renderText()}
        </div>
        <Link
          className={
            // @ts-ignore
            selectedDayString < formatDateString(today)
              ? 'button is-pulled-right is-light is-loading'
              : 'button is-pulled-right is-danger'
          }
          to={
            // @ts-ignore
            selectedDayString < formatDateString(today) ? '/' : '/addTodo'
          }>
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span>New Todo</span>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedDay:
    state.form.daySort !== undefined
      ? state.form.daySort.values.selectedDay
      : new Date(),
  sortedDisplayedTodos:
    state.form.daySort !== undefined
      ? getDisplayedTodos(
          state.todos.todos,
          state.form.daySort.values.selectedDay
        ).sort((a, b) => {
          if (a.isCompleted === b.isCompleted) {
            return a.purpose > b.purpose ? -1 : 1;
          } else {
            return a.isCompleted ? 1 : -1;
          }
        })
      : []
});

export default connect(
  mapStateToProps,
  { fetchTodos }
)(TodoList);
