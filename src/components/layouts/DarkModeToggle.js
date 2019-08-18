import React from 'react'

import Toggle from './Toggle'
import useDarkMode from 'use-dark-mode'

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false)

  return (
    <>
      <button
        type="button"
        className="button is-light"
        onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle
        id="darkmode-toggle"
        label="darkmode-toggle"
        checked={darkMode.value}
        onChange={darkMode.toggle}
      />
      <button
        type="button"
        className="button is-dark"
        onClick={darkMode.enable}>
        ☾
      </button>
    </>
  )
}

export default DarkModeToggle
