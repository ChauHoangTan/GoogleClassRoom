import * as authConstants from '../constants/authConstants'
import * as userConstants from '../constants/userConstants'
import * as classConstants from '../constants/classConstants'

import * as authApi from '../APIs/authServices'
import { ErrorsAction } from '../protection'
import Swal from 'sweetalert2'
import { ToastContainer } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'


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
const logoutAction = (message) => async dispatch => {
  await authApi.logoutService()
  dispatch({ type: authConstants.USER_LOGOUT })
  dispatch({ type: authConstants.USER_REGISTER_RESET })
  dispatch({ type: authConstants.USER_LOGIN_RESET })
  dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET })
  dispatch({ type: userConstants.USER_GET_PROFILE_RESET })
  dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET })
  dispatch({ type: userConstants.GET_ALL_USERS_RESET })
  dispatch({ type: userConstants.DELETE_USER_RESET })
  dispatch({ type: userConstants.UPDATE_USER_RESET })
  dispatch({ type: userConstants.UPDATE_STUDENT_IDS_RESET })
  dispatch({ type: classConstants.GET_ALL_CLASSES_RESET })
  dispatch({ type: classConstants.DELETE_CLASS_RESET })
  dispatch({ type: classConstants.UPDATE_CLASS_RESET })
  dispatch({ type: classConstants.GET_ALL_MY_CLASSES_RESET })
  dispatch({ type: classConstants.CREATE_CLASS_RESET })
  dispatch({ type: classConstants.GET_CLASS_BY_ID_RESET })
  dispatch({ type: classConstants.JOIN_CLASS_BY_CODE_RESET })
  dispatch({ type: classConstants.GET_ALL_STUDENTS_RESET })
  dispatch({ type: classConstants.GET_ALL_TEACHERS_RESET })
  dispatch({ type: classConstants.SEND_INVITATION_BY_EMAIL_RESET })
  dispatch({ type: classConstants.GET_ALL_TYPE_STUDENTS_RESET })
  localStorage.removeItem('userInfo')

  if (message) {
    if (message === 'banned' || message === 'deleted')
      Swal.fire({
        title: 'Session Expired',
        text: 'Your Account is ' + message + ' by Admin',
        icon: 'error'
      })

    else {
      Swal.fire({
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        icon: 'error'
      })
    }

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
