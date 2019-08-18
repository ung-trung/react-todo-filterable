import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import WatchLoader from '../layouts/Loaders/WatchLoader'
import { useSpring, animated, config } from 'react-spring'

import {
  setCurrentTodo,
  clearCurrentTodo,
  setTodoComplete,
  unsetTodoComplete,
  deleteTodo,
  setClickedTodo,
  clearClickedTodo
} from '../../actions'
import toUpperCaseFirstLetter from '../utils/toUpperCaseFirstLetter'

const Bubblegum = '#FA6775'
const Mist = '#ACD0C0'
const Ivory = '#2988A9'
const Ice = '#F7EFE2'

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
  const { header, description, _id, isCompleted, purpose, isImportant } = todo

  const isExpand = () => {
    if (currentTodo) {
      if (currentTodo._id === _id) {
        return true
      } else return false
    } else return false
  }
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: isExpand() ? 1 : 0 },
    config: { ...config.wobbly, duration: 350 }
  })

  const { x } = useSpring({
    from: { x: 1 },
    x: isCompleted ? 1 : 0,
    config: { duration: 400 }
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

  const renderItemBGColor = () => {
    switch (purpose) {
      case 'Work':
        return Bubblegum
      case 'School':
        return Mist
      default:
        return Ivory
    }
  }

  const renderItemTagColor = () => {
    switch (purpose) {
      case 'Work':
        return 'is-danger'
      case 'School':
        return 'is-primary'
      default:
        return 'is-warning'
    }
  }

  const renderPurposeTag = () => (
    <span className={`tag ${renderItemTagColor()}`}>{purpose}</span>
  )

  const isLoading = () => {
    if (clickedTodo !== null) {
      return isSingleTodoLoading && clickedTodo._id === _id
    }
    return false
  }

  if (isLoading()) {
    return (
      <div
        style={{
          minHeight: 48,
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <WatchLoader />
      </div>
    )
  }

  return (
    <animated.div
      className="card"
      style={{
        marginBottom: 6,
        marginLeft: 1,
        marginRight: 1,

        transform: x
          .interpolate({
            range: [0, 0.25, 0.65, 0.75, 1],
            output: [1, 0.97, 1.1, 1.03, 1]
          })
          .interpolate(x => `scale(${x})`)
      }}>
      <header
        className="card-header"
        style={{
          backgroundColor: renderItemBGColor(),
          opacity: isCompleted ? 0.47 : 1
        }}>
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
              {toUpperCaseFirstLetter(header)}
            </span>
          ) : (
            <div className="">
              {toUpperCaseFirstLetter(header)}{' '}
              {isImportant && <span className="tag is-danger">!!!</span>}
            </div>
          )}
        </div>

        {!isCompleted && (
          <div
            className="card-header-icon"
            onClick={isExpand() ? clearCurrentTodo : () => setCurrentTodo(_id)}>
            {isExpand() ? renderUpArrow() : renderDownArrow()}
          </div>
        )}
      </header>

      {isExpand() && (
        <animated.div style={props}>
          <div className="card-content" style={{ backgroundColor: Ice }}>
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
    </animated.div>
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
