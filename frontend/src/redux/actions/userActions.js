import * as userConstants from '../constants/userConstants'
import * as userApi from '../APIs/userServices'
// import { toast } from "react-hot-toast";
import { ErrorsAction, tokenProtection } from '../protection'
import toast from 'react-hot-toast'

// Login action
const loginAction = (provider, datas) => async dispatch => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST })
    const response = await userApi.loginService(provider, datas)
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL)
  }
}

const updateUserInfoAction = (userInfo) => async dispatch => {
  dispatch({
    type: userConstants.USER_LOGIN_SUCCESS,
    payload: userInfo
  })
}

// Register action
const registerAction = datas => async dispatch => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST })
    const response = await userApi.registerService(datas)
    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: response.message
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL)
  }
}


// Logout action
// eslint-disable-next-line no-unused-vars
const logoutAction = () => async dispatch => {
  try {
    await userApi.logoutService()
    dispatch({ type: userConstants.USER_LOGOUT })
    dispatch({ type: userConstants.USER_REGISTER_RESET })
    dispatch({ type: userConstants.USER_LOGIN_RESET })
    localStorage.removeItem('userInfo')
  } catch (error) {
    dispatch({ type: userConstants.USER_LOGOUT })
    dispatch({ type: userConstants.USER_REGISTER_RESET })
    dispatch({ type: userConstants.USER_LOGIN_RESET })
    localStorage.removeItem('userInfo')
  }
}

// Change password action
const changePasswordAction = password => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST })
    const response = await userApi.changePasswordService(
      password
    )
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL)
  }
}

// get profile action
const getProfileAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_GET_PROFILE_REQUEST })
    const response = await userApi.getProfileService()
    dispatch({
      type: userConstants.USER_GET_PROFILE_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_GET_PROFILE_FAIL)
  }
}

// update profile action
const updateProfileAction = user => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST })
    const response = await userApi.updateProfileService(user)
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response
    })
    toast.success('Profile Updated')
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL)
  }
}

export {
  loginAction,
  registerAction,
  logoutAction,
  changePasswordAction,
  updateProfileAction,
  getProfileAction,
  updateUserInfoAction
}
