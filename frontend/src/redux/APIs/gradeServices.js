import Axios from './Axios'
import AxiosJWT from './AxiosJWT'

// *************** USER APIs ***************

// Get all courses of user
const getAllGradeCompositionByClassIdService = async ( classId ) => {
  const { data } = await AxiosJWT.post('/grade/allGradeCompositionByIdClass', classId)
  return data
}

export {
  getAllGradeCompositionByClassIdService
}