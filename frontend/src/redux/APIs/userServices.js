import Axios from './Axios'

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

// Login user API
const loginService = async (user) => {
  const { data } = await Axios.post('/users/login', user)

  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }
  return data
}

// LoginSuccess user API
const loginSuccessService = async (user) => {
    console.log(user)
  const { data } = await Axios.post('/users/login-success', user)

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
  const { data } = await Axios.post('users/activation', token);
  return data;
}

export { 
  registerService,
  logoutService,
  loginService,
  changePasswordService,
  updateProfileService,
  loginSuccessService,
  activationEmailService,
  forgotPasswordService,
  resetPasswordService
}