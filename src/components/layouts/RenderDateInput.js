import React, { Component } from 'react'
import RenderError from './RenderError'

import TextField from '@material-ui/core/TextField'
// I need to use class component here because react-day-picker use this components with ref

export class RenderDateInput extends Component {
  render() {
    const { label, ...props } = this.props

    return (
      <div className="field">
        <label htmlFor="" className="label">
          {label}
        </label>
        <div className="control">
          <TextField
            className="input"
            {...props}
            style={{ marginBottom: '1.25rem' }}
            autoComplete="off"
            variant="outlined"
            fullWidth
          />
        </div>
        {RenderError(this.props.meta)}
      </div>
    )
  }
}

export default RenderDateInput
