import React from 'react'
import RenderError from '../layouts/RenderError'

const RenderRadio = ({ input, meta, type }) => {
  return (
    <>
      <label className="radio">
        <input type={type} className="radio" {...input} autoComplete="off" />
        {input.value}
      </label>
      {input.value === 'Leisure' && RenderError(meta)}
    </>
  )
}

export default RenderRadio
