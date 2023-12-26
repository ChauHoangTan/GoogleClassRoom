import Axios from './Axios'
import AxiosJWT from './AxiosJWT'

// *************** USER APIs ***************

// Get all courses of user
const getAllGradeCompositionByClassIdService = async ( classId ) => {
  const { data } = await AxiosJWT.post('/grade/allGradeCompositionByIdClass', { classId } )
  return data
}

// Create new grade composition
const createNewGradeComposition = async ( classId, name, scale ) => {
  const { data } = await AxiosJWT.post('/grade/create', { classId, name, scale })
  return data
}

// Remove a grade composition
const removeGradeComposition = async ( classId, gradeCompositionId ) => {
  const { data } = await AxiosJWT.delete(`/grade/delete/${classId}/${gradeCompositionId}`)
  return data
}

// Get all grade composition by studentId
const getAllGradeCompositionByStudentId = async ( classId, studentId ) => {
  const { data } = await AxiosJWT.post('/grade/getGradeCompositionByStudentId', { classId, studentId })
  return data
}

// uploadGradeComposition
// upload grade composition
const uploadGradeComposition = async ( classId, compositionId, studentGradeList ) => {
  const { data } = await AxiosJWT.post('/grade/uploadGradeComposition', { classId, compositionId, studentGradeList })
  return data
}

const createNewReviewGrade = async ( classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation ) => {
  const { data } = await AxiosJWT.post('/grade/createNewReviewGrade', { classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation })
  return data
}

const getAllReviewGradeCompositionByStudentId = async ( classId, studentId ) => {
  const { data } = await AxiosJWT.post('/grade/getAllReviewGradeCompositionByStudentId', { classId, studentId })
  return data
}

const updateReviewGrade = async ( classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation, explanationTeacher, reviewedGrade, status, teacher_Id ) => {
  const { data } = await AxiosJWT.post('/grade/updateReviewGrade', { classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation, explanationTeacher, reviewedGrade, status, teacher_Id })
  return data
}

const deleteReviewGrade = async ( classId, gradeCompositionId, userId ) => {
  const { data } = await AxiosJWT.delete(`/grade/deleteReviewGrade/${classId}/${gradeCompositionId}/${userId}`)
  return data
}

const getAllReviewGradeComposition = async ( classId ) => {
  const { data } = await AxiosJWT.post('/grade/getAllReviewGradeComposition', { classId })
  return data
}

// upload grade composition
const editGradeComposition = async ( classId, listGradeComposition ) => {
  const { data } = await AxiosJWT.post('/grade/editGradeComposition', { classId, listGradeComposition })
  return data
}

const createNewComment = async ( classId, gradeCompositionId, studentId, content, isTeacherComment ) => {
  console.log('isTeacherComment',classId, gradeCompositionId, studentId, content, isTeacherComment)
  const { data } = await AxiosJWT.post('/grade/createNewComment', { classId, gradeCompositionId, studentId, content, isTeacherComment })
  return data
}

const deleteComment = async ( classId, gradeCompositionId, userId, commentId ) => {
  const { data } = await AxiosJWT.delete(`/grade/deleteComment/${classId}/${gradeCompositionId}/${userId}/${commentId}`)
  return data
}

const getAllComment = async ( classId, gradeCompositionId, studentId ) => {
  const { data } = await AxiosJWT.post('/grade/getAllComment', { classId, gradeCompositionId, studentId })
  return data
}

export {
  getAllGradeCompositionByClassIdService,
  createNewGradeComposition,
  removeGradeComposition,
  getAllGradeCompositionByStudentId,
  uploadGradeComposition,
  createNewReviewGrade,
  getAllReviewGradeCompositionByStudentId,
  updateReviewGrade,
  deleteReviewGrade,
  getAllReviewGradeComposition,
  editGradeComposition,
  createNewComment,
  deleteComment,
  getAllComment
}