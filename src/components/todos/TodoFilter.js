import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DateFilterInput from '../layouts/DateFilterInput';
import today from '../utils/todayString';

const TodoFilter = () => {
  return (
    <form>
      <Field name="selectedDay" component={DateFilterInput} />
    </form>
  );
};

export default reduxForm({
  form: 'daySort',
  initialValues: { selectedDay: today }
})(TodoFilter);
