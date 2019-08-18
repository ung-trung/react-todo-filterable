import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import DateInput from '../layouts/DateInput'
import RenderTextInput from '../layouts/RenderTextInput'
import RenderRadio from '../layouts/RenderRadio'
import RenderCheckBox from '../layouts/RenderCheckBox'

const validate = ({ header, description, createDate, purpose }) => {
  const errors = {}

  if (!header) {
    errors.header = 'You must enter a title'
  }

  if (!description) {
    errors.description = 'You must enter a description'
  }

  if (!purpose) {
    errors.purpose = 'You must specify your purpose'
  }

  if (!createDate) {
    errors.createDate = 'You must pick a date'
  }

  return errors
}

const TodoForm = ({ onSubmit, buttonText, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="header"
        type="text"
        component={RenderTextInput}
        label="Enter Header"
        placeholder="Go to gym..."
      />
      <Field
        name="description"
        type="text"
        component={RenderTextInput}
        label="Enter Description"
        placeholder="Bring a banana..."
      />
      <div className="field">
        <label className="label">Choose Type</label>
        <div className="control">
          <Field
            name="purpose"
            type="radio"
            component={RenderRadio}
            value="Work"
          />
          <Field
            name="purpose"
            type="radio"
            component={RenderRadio}
            value="School"
          />
          <Field
            name="purpose"
            type="radio"
            component={RenderRadio}
            value="Leisure"
          />
        </div>
      </div>
      <Field name="createDate" component={DateInput} label="Choose Date" />
      <Field
        name="isImportant"
        type="checkbox"
        text="This todo is important !!!"
        component={RenderCheckBox}
      />
      <Field
        name="mustBeCompleted"
        type="checkbox"
        text="This todo must be completed."
        component={RenderCheckBox}
      />

      <div className="divider" />
      <div className="field is-grouped is-pulled-right">
        <div className="control">
          <Link className="button is-text" to="/">
            Back
          </Link>
        </div>
        <div className="control">
          <button className="button is-danger" type="submit">
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'todoForm',
  validate
  // @ts-ignore
})(TodoForm)
