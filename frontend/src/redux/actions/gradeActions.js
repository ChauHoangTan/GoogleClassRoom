import * as gradeConstants from '../constants/gradeConstants'
import * as gradeApi from '../APIs/gradeServices'
import { ErrorsAction } from '../protection'
import toast from 'react-hot-toast'

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

export {
  getAllGradeCompositionByClassIdAction,
  getAllReviewGradeCompositionByStudentIdAction
}
