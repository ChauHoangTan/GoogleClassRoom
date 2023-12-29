import { CHANGE_STATE } from '../constants/menuContanst'

export const changeStateMenuReducer = (state = false, action) => {
  switch (action.type) {
  case CHANGE_STATE:
    return !state
  default :
    return state
  }
}