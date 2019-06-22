import React from 'react';
import { connect } from 'react-redux';

import {
  setCurrentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete,
  deleteTodo
} from '../../actions';

const TodoItem = ({
  todo,
  setCurrentTodo,
  currentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete,
  deleteTodo
}) => {
  const { header, description, id, isCompleted, purpose } = todo;

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
    if (isCompleted) {
      return (
        <span className="icon has-text-grey-light">
          <i className="far fa-check-square" />
        </span>
      );
    } else {
      return (
        <span className="icon">
          <i className="far fa-square" />
        </span>
      );
    }
  };

  const renderPurposeTag = () => {
    if (purpose === 'Work') {
      return <span className="tag is-danger">{purpose}</span>;
    }
    if (purpose === 'Family') {
      return <span className="tag is-primary">{purpose}</span>;
    }
    return <span className="tag is-warning">{purpose}</span>;
  };

  return (
    <div className="card">
      <header className="card-header">
        <div
          className="card-header-title"
          style={{ cursor: 'pointer' }}
          onClick={
            isCompleted
              ? () => unsetTodoComplete(id)
              : () => {
                  clearCurrentTodo();
                  setTodoComplete(id);
                }
          }>
          {renderCheckbox()}
          {isCompleted ? (
            <span
              className="has-text-grey-light"
              style={{ textDecoration: 'line-through' }}>
              {header}
            </span>
          ) : (
            header
          )}
        </div>

        <div
          className="card-header-icon"
          onClick={isExpand() ? clearCurrentTodo : () => setCurrentTodo(id)}>
          {isCompleted
            ? null
            : isExpand()
            ? renderUpArrow()
            : renderDownArrow()}
        </div>
      </header>

      {isExpand() && (
        <>
          <div className="card-content">
            <div className="content">
              Type: {renderPurposeTag()}
              <p>Description: {description}</p>
              <div className="buttons">
                <div className="button is-info">
                  <span className="icon">
                    <i className="fas fa-edit" />
                  </span>
                  <span>Edit</span>
                </div>

                <div
                  className="button is-danger"
                  onClick={() => deleteTodo(id)}>
                  <span className="icon">
                    <i className="fas fa-times" />
                  </span>
                  <span>Delete</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentTodo: state.todos.currentTodo
});

export default connect(
  mapStateToProps,
  {
    setCurrentTodo,
    clearCurrentTodo,
    setTodoComplete,
    unsetTodoComplete,
    deleteTodo
  }
)(TodoItem);
