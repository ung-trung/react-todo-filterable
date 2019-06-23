import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DateFilterInput from '../layouts/DateFilterInput';

import today from '../utils/today';

const TodoFilter = () => {
  return (
    <form>
      <Field name="selectedDay" component={DateFilterInput} />
    </form>
  );
};

const mapStateToProps = state => ({
  initialValues: state.filter.currentSelected
    ? { selectedDay: state.filter.currentSelected }
    : { selectedDay: today }
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'daySort'
  })(TodoFilter)
);
