import { MORE_ICON_REQUEST } from '../constants/moreIconConstants.js'

export const moreIconReducer = (state = false, action) => {
  switch (action.type) {
  case MORE_ICON_REQUEST:
    return state ? false : true
  default :
    return state
  }
}