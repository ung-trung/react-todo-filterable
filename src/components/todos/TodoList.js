import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTodos, editTodo } from '../../actions'
import { Link } from 'react-router-dom'

import TodoItem from './TodoItem'
import TodoFilter from './TodoFilter'

import ProgressBar from '../layouts/ProgressBar'

import formatDateString from '../utils/formatDateString'
import today from '../utils/today'

import getDisplayedTodos from '../utils/getDisplayedTodos'
import WatchLoader from '../layouts/Loaders/WatchLoader'

import parseStringDate from '../utils/parseStringDate'
import { isBefore, isToday, isTomorrow } from 'date-fns'

let didUpdate = false

const TodoList = ({
  selectedDayString,
  sortedDisplayedTodos,
  allTodos,
  fetchTodos,
  editTodo,
  isLoading
}) => {
  const selectedDay = parseStringDate(selectedDayString)
  const todayWithoutTime = parseStringDate(formatDateString(today))

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  // update mustBeCompleted Todo in the past
  useEffect(() => {
    const needUpdatedTodos = allTodos.filter(
      todo =>
        todo.mustBeCompleted === true &&
        isBefore(new Date(todo.createDate), todayWithoutTime) &&
        todo.isCompleted === false
    )

    let updateCount = 0

    if (needUpdatedTodos.length !== 0 && !didUpdate) {
      const now = new Date()
      for (const todo of needUpdatedTodos) {
        editTodo({ ...todo, createDate: now.toISOString() })
        ++updateCount
      }
      alert(
        `${needUpdatedTodos
          .map(todo => `${todo.header} has been moved to today!!\n`)
          .join()}`
      )
      return () => {
        didUpdate = updateCount === needUpdatedTodos.length ? true : false
      }
    }
  }, [allTodos, editTodo, todayWithoutTime])

  const renderTodoList = () => {
    return sortedDisplayedTodos.map(todo => (
      <TodoItem todo={todo} key={todo._id} />
    ))
  }

  const renderText = () => {
    if (isBefore(selectedDay, todayWithoutTime)) {
      return <div>You cannot add New Todo in the past.</div>
    }
    if (isToday(selectedDay)) {
      return <div>Please add some todos for today.</div>
    }
    if (isTomorrow(selectedDay)) {
      return <div> Please add some todos for tomorrow.</div>
    }

    return <div>Please add some todos for the day {selectedDayString}.</div>
  }

  return (
    <>
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '6px' }}>
            My Tasks
          </h1>

          <TodoFilter />
          <hr
            className="is-divider"
            style={{ marginBlockStart: '10px', marginBlockEnd: '12px' }}
          />
          <ProgressBar />

          <div //handle too many todos via putting it in a scrollable div
            style={{
              maxHeight: '350px',
              scrollbarWidth: 'none',
              minWidth: '200px',
              overflowY: 'auto',
              marginBottom: '15px'
            }}>
            {isLoading ? (
              <WatchLoader />
            ) : sortedDisplayedTodos.length > 0 ? (
              renderTodoList()
            ) : (
              renderText()
            )}
          </div>
          <Link
            style={{ marginBlockStart: 12, marginTop: 12 }}
            className={
              isBefore(selectedDay, todayWithoutTime)
                ? 'button is-pulled-right is-light is-static'
                : 'button is-pulled-right is-danger'
            }
            to={isBefore(selectedDay, todayWithoutTime) ? '/' : '/addTodo'}>
            {!isBefore(selectedDay, todayWithoutTime) && (
              <span className="icon">
                <i className="fas fa-plus" />
              </span>
            )}

            <span>
              {isBefore(selectedDay, todayWithoutTime)
                ? 'No cheating :)'
                : 'New Todo'}
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  isLoading: state.todos.isLoading,
  selectedDayString:
    state.form.daySort !== undefined
      ? state.form.daySort.values.selectedDay
      : formatDateString(today),
  allTodos: state.todos.todos,
  sortedDisplayedTodos:
    state.form.daySort !== undefined
      ? getDisplayedTodos(
          state.todos.todos,
          state.form.daySort.values.selectedDay
        ).sort((a, b) => {
          if (a.isCompleted === b.isCompleted) {
            if (a.isImportant === b.isImportant) {
              return a.purpose > b.purpose ? -1 : 1
            }
            return a.isImportant ? -1 : 1
          } else {
            return a.isCompleted ? 1 : -1
          }
        })
      : []
})

export default connect(mapStateToProps, { fetchTodos, editTodo })(TodoList)
