import React from 'react'
import { connect } from 'react-redux'
import TodoForm from '../todos/TodoForm'

import { addTodo, setCurrentSelectedDay } from '../../actions'

import parseStringDate from '../utils/parseStringDate'
import formatDateString from '../utils/formatDateString'

import BigHeartLoader from '../layouts/Loaders/BigHeartLoader'

const AddTodo = ({
  addTodo,
  setCurrentSelectedDay,
  initialValues,
  history,
  isLoadingNewAdd
}) => {
  const onSubmit = async value => {
    await addTodo({ ...value, isCompleted: false })
    setCurrentSelectedDay(formatDateString(value.createDate))
    history.push('/')
  }

  if (isLoadingNewAdd) {
    return (
      <div style={{ textAlign: 'center' }}>
        <BigHeartLoader />
      </div>
    )
  }

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            New Todo
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <TodoForm
            buttonText="Add new Todo"
            onSubmit={onSubmit}
            initialValues={{ ...initialValues }}
          />
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  initialValues: state.filter.currentSelected
    ? {
        createDate: parseStringDate(state.filter.currentSelected),
        mustBeCompleted: false,
        isImportant: false,
        subUsers: []
      }
    : {
        createDate: new Date(),
        mustBeCompleted: false,
        isImportant: false,
        subUsers: []
      },
  isLoadingNewAdd: state.todos.isSingleTodoLoading
})

export default connect(mapStateToProps, { addTodo, setCurrentSelectedDay })(
  AddTodo
)
