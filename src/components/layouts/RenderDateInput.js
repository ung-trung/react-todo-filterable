import React, { Component } from 'react';
import RenderError from './RenderError';

export class RenderDateInput extends Component {
  render() {
    return (
      <div className="field">
        <label htmlFor="" className="label">
          {this.props.label}
        </label>
        <div className="control">
          <input
            className="input"
            {...this.props}
            style={{ marginBottom: '0.75rem' }}
            autoComplete="off"
          />
        </div>
        {RenderError(this.props.meta)}
      </div>
    );
  }
}

export default RenderDateInput;
