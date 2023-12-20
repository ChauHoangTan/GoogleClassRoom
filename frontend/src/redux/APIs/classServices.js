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

// Get class by ID API
const getClassByIDService = async (id) => {
  const { data } = await AxiosJWT.get(`/class/getClassByID/${id}`)
  return data
}

// Join class by code API
const joinClassByCodeService = async (code) => {
  const { data } = await AxiosJWT.post('/class/joinClassByCode/', code)
  return data
}

// Invite url API
const invitationByUrlService = async (invitation_token) => {
  const { data } = await AxiosJWT.post('/class/invitation', invitation_token)
  return data
}

// Get Invite url API
const getInvitationByUrlService = async (classId) => {
  const { data } = await AxiosJWT.post('/class/getInvitation', { classId: classId })
  return data
}
// get All students of Class
const getAllStudentsService = async (id) => {
  const { data } = await AxiosJWT.post('/class/students/all', id)
  return data
}

// get All Teachers of Class
const getAllTeachersService = async (id) => {
  const { data } = await AxiosJWT.post('/class/students/all', id)
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
  const { data } = await AxiosJWT.put(`/class/all/${id}`, classData)
  return data
}

export {
  getAllClassesService,
  deleteClassService,
  updateClassService,
  getAllMyClassesService,
  createNewClassService,
  getClassByIDService,
  joinClassByCodeService,
  invitationByUrlService,
  getInvitationByUrlService,
  getAllStudentsService,
  getAllTeachersService
}