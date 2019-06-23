import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoForm from '../todos/TodoForm';

import { editTodo, fetchTodo, setCurrentTodo } from '../../actions';

const EditTodo = ({
  editTodo,
  fetchTodo,
  setCurrentTodo,
  match,
  currentTodo
}) => {
  useEffect(() => {
    fetchTodo(match.params.id)
      .then(result => {
        setCurrentTodo(match.params.id);
      })
      .catch(err => {
        console.log(err);
      });
  }, [fetchTodo, match.params.id, setCurrentTodo]);

  const onSubmit = value => {
    editTodo({ ...value });
  };

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Edit Todo
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <TodoForm
            buttonText="Submit"
            onSubmit={onSubmit}
            initialValues={currentTodo !== null ? { ...currentTodo } : null}
          />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  currentTodo: state.todos.currentTodo
});

export default connect(
  mapStateToProps,
  { editTodo, fetchTodo, setCurrentTodo }
)(EditTodo);
