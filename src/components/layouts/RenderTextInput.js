import React from 'react'
import RenderError from './RenderError'

const RenderInput = ({ input, label, meta, placeholder, type }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <div className="control">
        <input
          type={type}
          className="input"
          {...input}
          autoComplete="off"
          placeholder={placeholder}
        />
      </div>
      {RenderError(meta)}
    </div>
  )
}

export default RenderInput
