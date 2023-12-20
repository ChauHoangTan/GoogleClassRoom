import * as gradeConstants from '../constants/gradeConstants'

// USER GET ALL THEIR CLASS
export const userGetAllGradeCompositionByClassIdReducer = (state = { gradeCompositions: [] }, action) => {
  switch (action.type) {
  case gradeConstants.GET_ALL_GRADE_COMPOSITION_REQUEST:
    return { isLoading: true }
  case gradeConstants.GET_ALL_GRADE_COMPOSITION_SUCCESS:
    return { isLoading: false, gradeCompositions: action.payload }
  case gradeConstants.GET_ALL_GRADE_COMPOSITION_FAIL:
    return { isLoading: false, isError: action.payload }
  case gradeConstants.GET_ALL_GRADE_COMPOSITION_RESET:
    return {
      gradeCompositions: []
    }
  default:
    return state
  }
}