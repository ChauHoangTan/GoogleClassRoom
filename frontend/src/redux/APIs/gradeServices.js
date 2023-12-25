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

// upload grade composition
const editGradeComposition = async ( classId, listGradeComposition ) => {
  const { data } = await AxiosJWT.post('/grade/editGradeComposition', { classId, listGradeComposition })
  return data
}
export {
  getAllGradeCompositionByClassIdService,
  createNewGradeComposition,
  removeGradeComposition,
  getAllGradeCompositionByStudentId,
  uploadGradeComposition,
  editGradeComposition
}