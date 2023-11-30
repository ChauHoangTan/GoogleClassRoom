import Axios from './Axios'
import AxiosJWT from './AxiosJWT'

// Register new user API
const registerService = async (user) => {
  const { data } = await Axios.post('/users/register', user)
  return data
}

// Logout user
const logoutService = async () => {
  await Axios.post('/users/logout', {}, { withCredentials: true })
}

const refreshAccessTokenService = async () => {
  const { data } = await Axios.post('/users/refresh', {}, {
    withCredentials: true
  })
  return data
}

// Login user API
const loginService = async (provider, user) => {
  const { data } = provider === 'local'
    ? await Axios.post('/users/login', user, { withCredentials: true })
    : await Axios.post('/users/login-success', { ...user, provider }, { withCredentials: true })
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  return data
}


// Change password API
const changePasswordService = async (password) => {
  const { data } = await AxiosJWT.put('/users/password', password)
  return data
}

// Forgot password API
const forgotPasswordService = async (user) => {
  const { data } = await Axios.post('/users/forgot', user)
  return data
}

// Reset password API
const resetPasswordService = async (newPassword, activation_token) => {
    console.log(newPassword, activation_token)
  const { data } = await Axios.post('/users/reset', { newPassword, activation_token })
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

const activationEmailService = async (activation_token) => {
  const { data } = await Axios.post('/users/activation', activation_token)
  return data
}

const resendActivationEmailService = async (datas) => {
  const { data } = await Axios.post('/users/resend-activation', datas)
  return data
}

const getProfileService = async () => {
  const { data } = await AxiosJWT.get('/users/info')

  return data
}

export {
  registerService,
  logoutService,
  loginService,
  changePasswordService,
  updateProfileService,
  activationEmailService,
  forgotPasswordService,
  resetPasswordService,
  resendActivationEmailService,
  getProfileService,
  refreshAccessTokenService
}