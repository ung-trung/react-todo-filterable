import React from 'react'
import RenderError from '../layouts/RenderError'

const RenderCheckBox = ({ input, text, meta, type }) => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type={type} {...input} autoComplete="off" /> {text}
        </label>
        {RenderError(meta)}
      </div>
    </div>
  )
}

export default RenderCheckBox
