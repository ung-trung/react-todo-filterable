import React from 'react'

const RenderError = ({ error, touched }) => {
  if (touched && error) {
    return <p className="help is-danger">{error}</p>
  }
}

export default RenderError
