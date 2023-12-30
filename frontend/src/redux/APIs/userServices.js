import Axios from './Axios'
import AxiosJWT from './AxiosJWT'

// Change password API
const changePasswordService = async (password) => {
  const { data } = await AxiosJWT.put('/users/password', password)
  return data
}

// update profile API call
const updateProfileService = async (user) => {
  const { data } = await AxiosJWT.put('/users/profile', user)
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  return data
}

// Get profile API call
const getProfileService = async () => {
  const { data } = await AxiosJWT.get('/users/info')

  return data
}

// admin get all users
const getAllEmailUsersService = async () => {
  const { data } = await AxiosJWT.get('/users/email/all')
  return data
}

// *************** ADMIN APIs ***************

// admin get all users
const getAllUsersService = async () => {
  const { data } = await AxiosJWT.get('/users/all')
  return data
}

// admin delete user
const deleteUserService = async (id) => {
  const { data } = await AxiosJWT.delete(`/users/all/${id}`)
  return data
}

// admin update profile API call
const updateUserService = async (id, user) => {
  const { data } = await AxiosJWT.put(`/users/all/${id}`, user)
  return data
}

const countUsersByLoginMethodsService = async () => {
  const { data } = await AxiosJWT.get('/users/count-method-login')
  return data
}

const countUsersByRoleJoinService = async () => {
  const { data } = await AxiosJWT.get('/users/count-role-join')
  return data
}

// admin upload student list
const adminUploadStudentList = async(studentsListUpload) => {
    console.log(studentsListUpload)
    const { data } = await AxiosJWT.post('/users/students/upload', { studentsListUpload })
    return data
  }


export {
  changePasswordService,
  updateProfileService,
  getProfileService,
  getAllUsersService,
  deleteUserService,
  updateUserService,
  countUsersByLoginMethodsService,
  countUsersByRoleJoinService,
  getAllEmailUsersService,
  adminUploadStudentList
}