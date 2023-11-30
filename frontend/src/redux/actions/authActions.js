import * as authConstants from '../constants/authConstants'
import * as authApi from '../APIs/authServices'
import { ErrorsAction } from '../protection'
import toast from 'react-hot-toast'

// Login action
const loginAction = (provider, datas) => async dispatch => {
  try {
    dispatch({ type: authConstants.USER_LOGIN_REQUEST })
    const response = await authApi.loginService(provider, datas)
    dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, authConstants.USER_LOGIN_FAIL)
  }
}

// Register action
const registerAction = datas => async dispatch => {
  try {
    dispatch({ type: authConstants.USER_REGISTER_REQUEST })
    const response = await authApi.registerService(datas)
    dispatch({
      type: authConstants.USER_REGISTER_SUCCESS,
      payload: response.message
    })
  } catch (error) {
    ErrorsAction(error, dispatch, authConstants.USER_REGISTER_FAIL)
  }
}

// Logout action
// eslint-disable-next-line no-unused-vars
const logoutAction = () => async dispatch => {
  try {
    await authApi.logoutService()
    dispatch({ type: authConstants.USER_LOGOUT })
    dispatch({ type: authConstants.USER_REGISTER_RESET })
    dispatch({ type: authConstants.USER_LOGIN_RESET })
    localStorage.removeItem('userInfo')
  } catch (error) {
    dispatch({ type: authConstants.USER_LOGOUT })
    dispatch({ type: authConstants.USER_REGISTER_RESET })
    dispatch({ type: authConstants.USER_LOGIN_RESET })
    localStorage.removeItem('userInfo')
  }
}

const updateUserInfoAction = (userInfo) => async dispatch => {
  dispatch({
    type: authConstants.USER_LOGIN_SUCCESS,
    payload: userInfo
  })
}

export {
  loginAction,
  registerAction,
  logoutAction,
  updateUserInfoAction
}
