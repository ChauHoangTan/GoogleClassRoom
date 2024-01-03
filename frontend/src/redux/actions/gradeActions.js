import * as gradeConstants from '../constants/gradeConstants'
import * as gradeApi from '../APIs/gradeServices'
import { ErrorsAction } from '../protection'

// Get all grade compostion
const getAllGradeCompositionByClassIdAction = (classId) => async (dispatch) => {
  try {
    dispatch({ type: gradeConstants.GET_ALL_GRADE_COMPOSITION_REQUEST })
    const response = await gradeApi.getAllGradeCompositionByClassIdService(classId)
    dispatch({ type: gradeConstants.GET_ALL_GRADE_COMPOSITION_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, gradeConstants.GET_ALL_GRADE_COMPOSITION_FAIL)
  }
}

// Get all review grade by student ID
const getAllReviewGradeCompositionByStudentIdAction = (classId, studentId ) => async (dispatch) => {
  try {
    dispatch({ type: gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_REQUEST })
    const response = await gradeApi.getAllReviewGradeCompositionByStudentId(classId, studentId)
    dispatch({ type: gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, gradeConstants.GET_ALL_REVIEW_BY_STUDENT_ID_FAIL)
  }
}


// Get all review grade ROLE:Teacher
const getAllReviewGradeCompositionAction = (classId ) => async (dispatch) => {
  try {
    dispatch({ type: gradeConstants.GET_ALL_REVIEW_REQUEST })
    const response = await gradeApi.getAllReviewGradeComposition(classId)
    dispatch({ type: gradeConstants.GET_ALL_REVIEW_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, gradeConstants.GET_ALL_REVIEW_FAIL)
  }
}

// Get all commet
const getAllCommentAction = (classId, gradeCompositionId, studentId ) => async (dispatch) => {
  try {
    dispatch({ type: gradeConstants.GET_ALL_COMMENT_REQUEST })
    const response = await gradeApi.getAllComment(classId, gradeCompositionId, studentId)
    dispatch({ type: gradeConstants.GET_ALL_COMMENT_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, gradeConstants.GET_ALL_COMMENT_FAIL)
  }
}

export {
  getAllGradeCompositionByClassIdAction,
  getAllReviewGradeCompositionByStudentIdAction,
  getAllReviewGradeCompositionAction,
  getAllCommentAction
}
