import Axios from './Axios'
import AxiosJWT from './AxiosJWT'

// Register new user API
const registerService = async (user) => {
  const { data } = await Axios.post('/auth/register', user)
  return data
}

// Logout user
const logoutService = async () => {
  await Axios.post('/auth/logout', {}, { withCredentials: true })
}

// Send refresh Token to get new access token
const refreshAccessTokenService = async () => {
  const { data } = await Axios.post('/auth/refresh', {}, {
    withCredentials: true
  })
  return data
}

// Login user API
const loginService = async (provider, user) => {
  const { data } = provider === 'local'
    ? await Axios.post('/auth/login', user, { withCredentials: true })
    : await Axios.post('/auth/login-success', { ...user, provider }, { withCredentials: true })
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  return data
}

// Forgot password API
const forgotPasswordService = async (user) => {
  const { data } = await Axios.post('/auth/forgot', user)
  return data
}

// Reset password API
const resetPasswordService = async (newPassword, activation_token) => {
  const { data } = await Axios.post('/auth/reset', { newPassword, activation_token })
  return data
}

// Activation email API
const activationEmailService = async (activation_token) => {
  const { data } = await Axios.post('/auth/activation', activation_token)
  return data
}

// Resend activation email API
const resendActivationEmailService = async (datas) => {
  const { data } = await Axios.post('/auth/resend-activation', datas)
  return data
}

export {
  registerService,
  loginService,
  logoutService,
  activationEmailService,
  forgotPasswordService,
  resetPasswordService,
  resendActivationEmailService,
  refreshAccessTokenService
}