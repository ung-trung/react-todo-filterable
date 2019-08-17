import React from 'react'
import RenderDateInput from './RenderDateInput'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import today from '../utils/today'
import formatDateString from '../utils/formatDateString'
import parseStringDate from '../utils/parseStringDate'

export const DateInput = props => {
  const { label, input, meta } = props

  return (
    <DayPickerInput
      format="d-M-yyyy"
      formatDate={formatDateString}
      parseDate={parseStringDate}
      inputProps={{ ...input, label, meta }}
      dayPickerProps={{
        disabledDays: { before: today }
      }}
      value={input.value}
      onDayChange={e => {
        input.onChange(e)
      }}
      component={RenderDateInput}
    />
  )
}

export default DateInput
