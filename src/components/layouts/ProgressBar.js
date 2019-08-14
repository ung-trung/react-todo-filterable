import React from 'react'
import { connect } from 'react-redux'
import getDisplayedTodos from '../utils/getDisplayedTodos'
import { useSpring, animated } from 'react-spring'

const ProgressBar = ({ displayTodos }) => {
  const getProgress = todos => {
    if (todos.length === 0) {
      return 100
    }
    const numberCompletedTodos = todos.reduce(
      (acc, current) => (current.isCompleted ? ++acc : acc),
      0
    )

    return (numberCompletedTodos / todos.length) * 100
  }

  const props = useSpring({
    value: getProgress(displayTodos),
    from: { value: 0 }
  })

  return (
    <animated.progress
      className="progress is-danger"
      value={props.value}
      max="100"
    />
  )
}

const mapStateToProps = state => ({
  displayTodos: getDisplayedTodos(
    state.todos.todos,
    state.form.daySort.values.selectedDay
  )
})

export default connect(mapStateToProps)(ProgressBar)
