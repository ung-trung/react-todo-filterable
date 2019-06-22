import React from 'react';
import { connect } from 'react-redux';

import {
  setCurrentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete
} from '../../actions';

const TodoItem = ({
  todo,
  setCurrentTodo,
  currentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete
}) => {
  const { header, description, id } = todo;

  const onSeeMoreClick = id => {
    setCurrentTodo(id);
  };

  const isExpand = () => {
    if (currentTodo) {
      if (currentTodo.id === id) {
        return true;
      } else return false;
    } else return false;
  };

  const renderDownArrow = () => (
    <span className="icon">
      <i className="fas fa-angle-down" />
    </span>
  );

  const renderUpArrow = () => (
    <span className="icon">
      <i className="fas fa-angle-up" />
    </span>
  );

  const renderCheckbox = () => {
    if (todo.isCompleted) {
      return (
        <span className="icon" onClick={() => unsetTodoComplete(id)}>
          <i className="far fa-check-square" />
        </span>
      );
    } else {
      return (
        <span className="icon" onClick={() => setTodoComplete(id)}>
          <i className="far fa-square" />
        </span>
      );
    }
  };

  return (
    <div className="card">
      <header className="card-header">
        <div className="card-header-title">
          {renderCheckbox()} {header}
        </div>

        <div
          className="card-header-icon"
          onClick={isExpand() ? clearCurrentTodo : () => onSeeMoreClick(id)}>
          {isExpand() ? renderUpArrow() : renderDownArrow()}
        </div>
      </header>

      {isExpand() && (
        <div className="card-content">
          <div className="content">
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentTodo: state.todos.currentTodo
});

export default connect(
  mapStateToProps,
  { setCurrentTodo, clearCurrentTodo, setTodoComplete, unsetTodoComplete }
)(TodoItem);
