import React from 'react';
import { connect } from 'react-redux';

const distinctTodoDays = ({ todos }) => {
  console.log(todos);

  return <div />;
};

const mapStateToProps = state => ({
  todos: state.todos.todos
});

export default connect(mapStateToProps)(distinctTodoDays);
