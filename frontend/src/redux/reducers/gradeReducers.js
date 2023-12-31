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

// USER GET ALL REVIEW BY STUDENT ID
export const userGetAllReviewGradeCompositionByStudentIdReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
  case gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_REQUEST:
    return { isLoading: true }
  case gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_SUCCESS:
    return { isLoading: false, reviews: action.payload, isSuccess: true }
  case gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_FAIL:
    return { isLoading: false, isError: action.payload }
  case gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_RESET:
    return {
      reviews: []
    }
  default:
    return state
  }
}

// USER GET ALL REVIEW BY STUDENT ID
export const userGetAllReviewGradeCompositionReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
  case gradeConstants.GET_ALL_REVIEW_REQUEST:
    return { isLoading: true }
  case gradeConstants.GET_ALL_REVIEW_SUCCESS:
    return { isLoading: false, reviews: action.payload, isSuccess: true }
  case gradeConstants.GET_ALL_REVIEW_FAIL:
    return { isLoading: false, isError: action.payload }
  case gradeConstants.GET_ALL_REVIEW_RESET:
    return {
      reviews: []
    }
  default:
    return state
  }
}

// USER GET ALL COMMENT
export const userGetAllCommentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
  case gradeConstants.GET_ALL_COMMENT_REQUEST:
    return { isLoading: true }
  case gradeConstants.GET_ALL_COMMENT_SUCCESS:
    return { isLoading: false, comments: action.payload, isSuccess: true }
  case gradeConstants.GET_ALL_COMMENT_FAIL:
    return { isLoading: false, isError: action.payload }
  case gradeConstants.GET_ALL_COMMENT_RESET:
    return {
      comments: []
    }
  default:
    return state
  }
}