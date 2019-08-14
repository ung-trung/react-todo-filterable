import React, { Component } from 'react'
import RenderError from './RenderError'

// I need to use class component here because react-day-picker use this components with ref

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
    )
  }
}

export default RenderDateInput
