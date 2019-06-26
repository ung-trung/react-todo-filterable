import React from 'react';
import { connect } from 'react-redux';
import TodoForm from '../todos/TodoForm';

import { addTodo } from '../../actions';
import formatDateString from '../utils/formatDateString';
import today from '../utils/today';

const AddTodo = ({ addTodo, initialValues, history }) => {
  const onSubmit = async value => {
    await addTodo({ ...value, isCompleted: false });
    history.push('/');
  };

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            New Todo
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <TodoForm
            buttonText="Add new Todo"
            onSubmit={onSubmit}
            initialValues={{ ...initialValues }}
          />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  initialValues: state.filter.currentSelected
    ? { createDate: formatDateString(state.filter.currentSelected) }
    : { createDate: formatDateString(today) }
});

export default connect(
  mapStateToProps,
  { addTodo }
)(AddTodo);
