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

// Invite url API Student
const invitationStudentByUrlService = async (invitation_token) => {
  const { data } = await AxiosJWT.post('/class/invitationStudent', invitation_token)
  return data
}

// Invite url API Teacher
const invitationTeacherByUrlService = async (invitation_token) => {
  const { data } = await AxiosJWT.post('/class/invitationTeacher', invitation_token)
  return data
}

// Invite url API Teacher and Student by Email
const invitationByEmailService = async (invitation_token) => {
  const { data } = await AxiosJWT.post('/class/receive-invitation', invitation_token)
  return data
}

// Invite url API Teacher and Student by Email
const sendInvitationByEmailService = async (emails, role, classId) => {
  const { data } = await AxiosJWT.post('/class/send-invitation', { emails, role, classId })
  return data
}

// Get Invite url API Student
const getInvitationStudentByUrlService = async (classId) => {
  const { data } = await AxiosJWT.post('/class/getInvitationStudent', { classId: classId })
  return data
}

// Get Invite url API
const getInvitationTeacherByUrlService = async (classId) => {
  const { data } = await AxiosJWT.post('/class/getInvitationTeacher', { classId: classId })
  return data
}

// get All students of Class
const getAllStudentsService = async (id) => {
  const { data } = await AxiosJWT.post('/class/students/all', { classId: id })
  return data
}

// get All Teachers of Class
const getAllTeachersService = async (id) => {
  const { data } = await AxiosJWT.post('/class/teachers/all', { classId: id })
  return data
}

// get All students of type in Class
const getAllTypeOfStudentsService = async (id) => {
  const { data } = await AxiosJWT.post('/class/students/allTypeOfStudents', { classId: id })
  return data
}

// Leave of class
const leaveThisClass = async (classId) => {
  const { data } = await AxiosJWT.post('/class/leaveThisClass', { classId: classId })
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

// admin upload student list
const uploadStudentList = async(studentsListUpload, classId) => {
  const { data } = await AxiosJWT.post('/class/students/upload', { studentsListUpload, classId })
  return data
}

// admin upload student list
const getStudentIdList = async(classId) => {
  const { data } = await AxiosJWT.post('/class/students/getStudentIdList', { classId })
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
  invitationStudentByUrlService,
  getInvitationStudentByUrlService,
  getAllStudentsService,
  getAllTeachersService,
  invitationTeacherByUrlService,
  getInvitationTeacherByUrlService,
  invitationByEmailService,
  sendInvitationByEmailService,
  uploadStudentList,
  getAllTypeOfStudentsService,
  getStudentIdList,
  leaveThisClass
}