import Axios from './Axios'
import AxiosJWT from './AxiosJWT'

// *************** USER APIs ***************

// Get all courses of user
const getAllMyClassesService = async () => {
  const { data } = await AxiosJWT.get('/class/allMyCourses')
  return data
}

// Create new class API
const createNewClassService = async (info) => {
  const { data } = await AxiosJWT.post('/class/createNewClass', info)
  return data
}

// *************** ADMIN APIs ***************

// admin get all class
const getAllClassesService = async () => {
  const { data } = await AxiosJWT.get('/class/all')
  return data
}

// admin delete user
const deleteClassService = async (id) => {
  const { data } = await AxiosJWT.delete(`/class/all/${id}`)
  return data
}

// admin edit class
const updateClassService = async(id, classData) => {
  const { data } = await AxiosJWT.post(`/class/all/${id}`, classData)
  return data
}

export {
  getAllClassesService,
  deleteClassService,
  updateClassService,
  getAllMyClassesService,
  createNewClassService
}