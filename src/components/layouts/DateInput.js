import React from 'react'
import RenderDateInput from './RenderDateInput'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import today from '../utils/today'

export const DateInput = props => {
  const { label, input, meta } = props
  return (
    <DayPickerInput
      format="DD/MM/YYYY"
      inputProps={{ ...input, label, meta }}
      dayPickerProps={{
        disabledDays: { before: today }
      }}
      value={input.value}
      onDayChange={input.onChange}
      component={RenderDateInput}
    />
  )
}

export default DateInput
