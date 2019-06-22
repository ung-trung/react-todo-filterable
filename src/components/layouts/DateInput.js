import React, { Component } from 'react';
import RenderError from './RenderError';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export const DateInput = props => {
  const { label, input, meta } = props;

  class renderDateInput extends Component {
    render() {
      return (
        <div className="field">
          <label htmlFor="" className="label">
            {label}
          </label>
          <div className="control">
            <input
              className="input"
              {...this.props}
              style={{ marginBottom: '0.75rem' }}
            />
          </div>
          {RenderError(meta)}
        </div>
      );
    }
  }

  return (
    <DayPickerInput
      format="DD/MM/YYYY"
      inputProps={{ ...input }}
      value={input.value}
      onDayChange={input.onChange}
      component={renderDateInput}
    />
  );
};

export default DateInput;
