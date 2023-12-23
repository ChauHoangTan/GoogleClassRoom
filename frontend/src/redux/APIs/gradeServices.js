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
export {
  getAllGradeCompositionByClassIdService,
  createNewGradeComposition,
  removeGradeComposition
}