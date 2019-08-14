import React from 'react'
import { connect } from 'react-redux'
import { setCurrentSelectedDay } from '../../actions'

import RenderDateInput from './RenderDateInput'

import getDistinctDays from '../utils/getDistinctDays'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import formatDateString from '../utils/formatDateString'

export const DateFilterInput = props => {
  const { label, input, meta, distinctDays } = props

  const preModifiers = distinctDays.map(day => new Date(day))

  const preModifiersStyles = distinctDays.map(() => ({
    color: 'white',
    backgroundColor: 'hsl(348, 100%, 61%)'
  }))

  const modifiers = { ...preModifiers }
  const modifiersStyles = { ...preModifiersStyles }

  return (
    <DayPickerInput
      format="DD/MM/YYYY"
      inputProps={{ ...input, label, meta }}
      dayPickerProps={{
        modifiers: { ...modifiers },
        modifiersStyles: { ...modifiersStyles }
      }}
      value={input.value}
      onDayChange={e => {
        input.onChange(formatDateString(e))
        props.setCurrentSelectedDay(formatDateString(e))
      }}
      component={RenderDateInput}
    />
  )
}

const mapStateToProps = state => ({
  distinctDays: getDistinctDays(
    state.todos.todos.filter(todo => todo.isCompleted === false)
  )
})

export default connect(
  mapStateToProps,
  { setCurrentSelectedDay }
)(DateFilterInput)
