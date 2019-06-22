import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions';
import { Link } from 'react-router-dom';

import TodoItem from './TodoItem';

const TodoList = ({ todos, fetchTodos }) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="columns is-mobile is-multiline is-centered">
      <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
        <h1 className="title">My Tasks</h1>

        <div className="is-divider" />

        <div
          style={{
            maxHeight: '350px',
            scrollbarWidth: 'none',
            minWidth: '200px',
            overflowY: 'auto'
          }}>
          {todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
        <Link
          className="button is-pulled-right is-danger is-rounded"
          to="/addTodo">
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span>New Todo</span>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ todos: state.todos.todos });

export default connect(
  mapStateToProps,
  { fetchTodos }
)(TodoList);
