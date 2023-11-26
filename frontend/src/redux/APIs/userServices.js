import Axios from './Axios'
import createAxios from './createInstance'

// Register new user API
const registerService = async (user) => {
  const { data } = await Axios.post('/users/register', user)
  return data
}

// Logout user
const logoutService = () => {
  localStorage.removeItem('userInfo')
  return null
}

const refreshAccessTokenService = async () => {
  const { data } = await Axios.post('/users/refresh', {}, {
    withCredentials: true
  })
  console.log(data)

  return data
}

// Login user API
const loginService = async (provider, user) => {
    const { data } = provider === 'local'
        ? await Axios.post('/users/login', user, { withCredentials: true })
        : await Axios.post('/users/login-success', { ...user, provider })
    console.log(data)
    if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    return data
}

// Change password API
const changePasswordService = async (password, token) => {
  const { data } = await Axios.put('/users/password', password, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

// Forgot password API
const forgotPasswordService = async (user) => {
  const { data } = await Axios.post('/users/forgot', user)
  return data
}

// Reset password API
const resetPasswordService = async (user, token) => {
  const { data } = await Axios.post('/users/reset', user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}


// update profile API call
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put('/users/profile', user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  return data
}

const activationEmailService = async (token) => {
  const { data } = await Axios.post('/users/activation', token)
  return data
}

const resendActivationEmailService = async (token) => {
  const { data } = await Axios.post('/users/resend-activation', token)
  return data
}

const getProfileService = async (userInfo, dispatch, loginSuccess) => {
  const AxiosJWT = createAxios(userInfo, dispatch, loginSuccess)
  const { data } = await AxiosJWT.get('/users/info', {
    headers: {
      Authorization: `Bearer ${userInfo.Authorization}`
    }
  })

  console.log(data)

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