import * as CLASSConstants from '../constants/classConstants'

// ADMIN GET ALL CLASS
export const adminGetAllClassesReducer = (state = { classes: [] }, action) => {
  switch (action.type) {
  case CLASSConstants.GET_ALL_CLASSES_REQUEST:
    return { isLoading: true }
  case CLASSConstants.GET_ALL_CLASSES_SUCCESS:
    return { isLoading: false, classes: action.payload }
  case CLASSConstants.GET_ALL_CLASSES_FAIL:
    return { isLoading: false, isError: action.payload }
  case CLASSConstants.GET_ALL_CLASSES_RESET:
    return {
      CLASS: []
    }
  default:
    return state
  }
}


// ADMIN DELETE CLASS
export const adminDeleteClassReducer = (state = {}, action) => {
  switch (action.type) {
  case CLASSConstants.DELETE_CLASS_REQUEST:
    return { isLoading: true }
  case CLASSConstants.DELETE_CLASS_SUCCESS:
    return { isLoading: false, isSuccess: true }
  case CLASSConstants.DELETE_CLASS_FAIL:
    return { isLoading: false, isError: action.payload }
  case CLASSConstants.DELETE_CLASS_RESET:
    return {}
  default:
    return state
  }
}
