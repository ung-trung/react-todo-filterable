import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import WatchLoader from '../layouts/Loaders/WatchLoader'
import { useSpring, animated } from 'react-spring'

import {
  setCurrentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete,
  deleteTodo,
  setClickedTodo,
  clearClickedTodo
} from '../../actions'

const TodoItem = ({
  todo,
  setCurrentTodo,
  currentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete,
  deleteTodo,
  setClickedTodo,
  clearClickedTodo,
  isSingleTodoLoading,
  clickedTodo
}) => {
  const { header, description, _id, isCompleted, purpose } = todo

  const isExpand = () => {
    if (currentTodo) {
      if (currentTodo._id === _id) {
        return true
      } else return false
    } else return false
  }
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: isExpand() ? 1 : 0 }
  })

  const renderDownArrow = () => (
    <span className="icon">
      <i className="fas fa-angle-down" />
    </span>
  )

  const renderUpArrow = () => (
    <span className="icon">
      <i className="fas fa-angle-up" />
    </span>
  )

  const renderCheckbox = () => {
    if (isCompleted) {
      return (
        <span className="icon has-text-grey-light">
          <i className="far fa-check-square" />
        </span>
      )
    } else {
      return (
        <span className="icon">
          <i className="far fa-square" />
        </span>
      )
    }
  }

  const renderItemColor = () => {
    switch (purpose) {
      case 'Work':
        return 'is-danger'
      case 'Family':
        return 'is-primary'
      default:
        return 'is-warning'
    }
  }

  const renderPurposeTag = () => (
    <span className={`tag ${renderItemColor()}`}>{purpose}</span>
  )

  if (isSingleTodoLoading && clickedTodo._id === _id) {
    return (
      <div className="card">
        <div className="card-content">
          <WatchLoader />
        </div>
      </div>
    )
  }

  return (
    <div
      className="card"
      style={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>
      <header className="card-header">
        <div
          className="card-header-title"
          style={{ cursor: 'pointer' }}
          onClick={
            isCompleted
              ? () => {
                  unsetTodoComplete(_id)
                  setClickedTodo(_id)
                }
              : () => {
                  clearCurrentTodo()
                  setTodoComplete(_id)
                  setClickedTodo(_id)
                }
          }>
          {renderCheckbox()}
          {isCompleted ? (
            <span
              className="has-text-grey-light"
              style={{ textDecoration: 'line-through' }}>
              {header}
            </span>
          ) : (
            header
          )}
        </div>

        <div
          className="card-header-icon"
          onClick={isExpand() ? clearCurrentTodo : () => setCurrentTodo(_id)}>
          {isCompleted
            ? null
            : isExpand()
            ? renderUpArrow()
            : renderDownArrow()}
        </div>
      </header>

      {isExpand() && (
        <animated.div style={props}>
          <div className="card-content">
            <div className="content">
              Type: {renderPurposeTag()}
              <p>Description: {description}</p>
              <div className="buttons">
                <Link
                  className="button is-info"
                  to={`/editTodo/${_id}`}
                  onClick={setCurrentTodo(_id)}>
                  <span className="icon">
                    <i className="fas fa-edit" />
                  </span>
                  <span>Edit</span>
                </Link>

                <div
                  className="button is-danger"
                  onClick={() => deleteTodo(_id)}>
                  <span className="icon">
                    <i className="fas fa-times" />
                  </span>
                  <span>Delete</span>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  currentTodo: state.todos.currentTodo,
  clickedTodo: state.todos.clickedTodo,
  isSingleTodoLoading: state.todos.isSingleTodoLoading
})

export default connect(
  mapStateToProps,
  {
    setCurrentTodo,
    clearCurrentTodo,
    setTodoComplete,
    unsetTodoComplete,
    deleteTodo,
    setClickedTodo,
    clearClickedTodo
  }
)(TodoItem)
