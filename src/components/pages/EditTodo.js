import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TodoForm from '../todos/TodoForm'

import formatDateString from '../utils/formatDateString'

import {
  editTodo,
  fetchTodos,
  setCurrentTodo,
  setCurrentSelectedDay
} from '../../actions'
import BigHeartLoader from '../layouts/Loaders/BigHeartLoader'

const EditTodo = ({
  editTodo,
  fetchTodos,
  setCurrentTodo,
  setCurrentSelectedDay,
  match,
  currentTodo,
  history,
  isLoadingNewEdit
}) => {
  useEffect(() => {
    fetchTodos()
      .then(result => {
        setCurrentTodo(match.params.id)
      })
      .catch(err => {
        console.log(err)
      })
  }, [fetchTodos, match.params.id, setCurrentTodo])

  const onSubmit = async value => {
    await editTodo({ ...value })
    setCurrentSelectedDay(formatDateString(value.createDate))
    history.push('/')
  }

  if (isLoadingNewEdit) {
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
            Edit Todo
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <TodoForm
            buttonText="Submit"
            onSubmit={onSubmit}
            initialValues={
              currentTodo !== null
                ? {
                    ...currentTodo,
                    createDate: formatDateString(
                      new Date(currentTodo.createDate)
                    )
                  }
                : null
            }
          />
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  currentTodo: state.todos.currentTodo,
  isLoadingNewEdit: state.todos.isSingleTodoLoading
})

export default connect(
  mapStateToProps,
  { editTodo, fetchTodos, setCurrentTodo, setCurrentSelectedDay }
)(EditTodo)
