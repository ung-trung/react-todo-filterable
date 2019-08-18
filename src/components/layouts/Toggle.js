import React from 'react'

const Toggle = ({ checked, label, onChange, id }) => {
  return (
    <>
      <input
        id={id}
        name={id}
        type="checkbox"
        className="switch is-thin is-danger"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={label} />
    </>
  )
}

export default Toggle
