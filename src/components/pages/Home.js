import React, { useEffect } from 'react';
import TodoList from '../todos/TodoList';
import { loadUser } from '../../actions';
import { connect } from 'react-redux';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <section className="section">
      <TodoList />
    </section>
  );
};

export default connect(
  null,
  { loadUser }
)(Home);
