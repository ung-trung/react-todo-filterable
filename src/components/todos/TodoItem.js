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
  const { header, description, _id, isCompleted, purpose } = todo

  const isExpand = () => {
    if (currentTodo) {
      if (currentTodo._id === _id) {
        return true
      } else return false
    } else return false
  }
  const props = useSpring({
    from: { opacity: 0, marginTop: -60 },
    to: { opacity: isExpand() ? 1 : 0, marginTop: 0 },
    config: { ...config.wobbly, duration: 350 }
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
      case 'Family':
        return Ivory
      default:
        return Mist
    }
  }

  const renderItemTagColor = () => {
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
    <span className={`tag ${renderItemTagColor()}`}>{purpose}</span>
  )

  const isLoading = isSingleTodoLoading && clickedTodo._id === _id

  if (isLoading) {
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
    <div
      className="card"
      style={{
        marginBottom: 6,
        marginLeft: 1,
        marginRight: 1
      }}>
      <header
        className="card-header"
        style={{ backgroundColor: renderItemBGColor() }}>
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
            <div className="">{toUpperCaseFirstLetter(header)}</div>
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
