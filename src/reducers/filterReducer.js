import { SET_CURRENT_SELECTE_DAY } from '../actions/types'

const INITIAL_STATE = { currentSelected: null }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_SELECTE_DAY:
      return { ...state, currentSelected: action.payload }
    default:
      return state
  }
}
