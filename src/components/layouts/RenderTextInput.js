import React from 'react'
import RenderError from './RenderError'

import TextField from '@material-ui/core/TextField'

const RenderInput = ({ input, label, meta, placeholder, type }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <div className="control">
        <TextField
          type={type}
          // className="input"
          variant="outlined"
          {...input}
          autoComplete="off"
          fullWidth
          placeholder={placeholder}
        />
      </div>
      {RenderError(meta)}
    </div>
  )
}

export default RenderInput
