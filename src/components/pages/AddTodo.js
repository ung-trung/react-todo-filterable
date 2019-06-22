import React from 'react';
import { connect } from 'react-redux';
import TodoForm from '../todos/TodoForm';

import { addTodo } from '../../actions';

const AddTodo = ({ addTodo }) => {
  const onSubmit = value => addTodo(value);

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title">New Todo</h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <TodoForm buttonText="Add new Todo" onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default connect(
  null,
  { addTodo }
)(AddTodo);
