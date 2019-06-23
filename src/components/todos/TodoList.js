import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';
import { Link } from 'react-router-dom';

import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

import formatDateString from '../utils/formatDateString';
import today from '../utils/todayString';

const TodoList = ({ todos, selectedDay, fetchTodos }) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const renderTodoList = () => {
    let tempDate;

    if (selectedDay.daySort !== undefined) {
      //define selectedDate if available
      const selectedDateString = formatDateString(
        new Date(selectedDay.daySort.values.selectedDay)
      );

      //set tempDate to render notification
      tempDate = selectedDateString;

      //define selectedTodos via comparing todo date and selectedDate
      const selectedTodos = todos.filter(todo => {
        const createDateString = formatDateString(new Date(todo.createDate));

        return createDateString === selectedDateString;
      });

      //print results
      if (selectedTodos.length > 0) {
        return selectedTodos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ));
      }
    }

    //declare tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (typeof tempDate === 'string') {
      if (tempDate === formatDateString(today)) {
        return `Please add some todos for today.`;
      }
      if (tempDate === formatDateString(tomorrow)) {
        return `Please add some todos for tomorrow.`;
      }
    }

    return `Please add some todos for the day ${tempDate}.`;
  };

  return (
    <div className="columns is-mobile is-multiline is-centered">
      <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        <h1 className="title" style={{ marginBottom: '6px' }}>
          My Tasks
        </h1>
        <TodoFilter />
        <hr className="is-divider" style={{ marginBlockStart: '2px' }} />

        <div
          style={{
            maxHeight: '350px',
            scrollbarWidth: 'none',
            minWidth: '200px',
            overflowY: 'auto',
            marginBottom: '12px'
          }}>
          {renderTodoList()}
        </div>
        <Link className="button is-pulled-right is-danger" to="/addTodo">
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
  todos: state.todos.todos,
  selectedDay: state.form
});

export default connect(
  mapStateToProps,
  { fetchTodos }
)(TodoList);
