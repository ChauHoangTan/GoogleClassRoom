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

// *************** ADMIN APIs ***************

// admin get all users
const getAllUsersService = async (token) => {
  const { data } = await AxiosJWT.get('/users/all')
  return data
}


export {
  changePasswordService,
  updateProfileService,
  getProfileService,
  getAllUsersService
}