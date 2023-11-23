import * as userConstants from '../constants/userConstants'
import * as userApi from '../APIs/userServices'
// import { toast } from "react-hot-toast";
import { ErrorsAction, tokenProtection } from '../protection'
import toast from 'react-hot-toast'

// Login action
const loginAction = (provider, datas) => async dispatch => {
  switch (provider) {
  case 'google':
    try {
      dispatch({ type: userConstants.USER_LOGIN_GOOGLE_REQUEST })
      const response = await userApi.loginSuccessService({...datas, provider})
      dispatch({
        type: userConstants.USER_LOGIN_GOOGLE_SUCCESS,
        payload: response
      })
    } catch (error) {
      ErrorsAction(
        error,
        dispatch,
        userConstants.USER_LOGIN_GOOGLE_FAIL
      )
    }
    break
  case 'facebook':
    try {
      dispatch({ type: userConstants.USER_LOGIN_FACEBOOK_REQUEST })
      const response = await userApi.loginSuccessService({...datas, provider})
      dispatch({
        type: userConstants.USER_LOGIN_FACEBOOK_SUCCESS,
        payload: response
      })
    } catch (error) {
      ErrorsAction(
        error,
        dispatch,
        userConstants.USER_LOGIN_FACEBOOK_FAIL
      )
    }
    break
  case 'Github':
    try {
      dispatch({ type: userConstants.USER_LOGIN_GITHUB_REQUEST })
      const response = await userApi.loginSuccessService({...datas, provider})
      dispatch({
        type: userConstants.USER_LOGIN_GITHUB_SUCCESS,
        payload: response
      })
    } catch (error) {
      ErrorsAction(
        error,
        dispatch,
        userConstants.USER_LOGIN_GITHUB_FAIL
      )
    }
    break
  case 'local':
    try {
      dispatch({ type: userConstants.USER_LOGIN_REQUEST })
      const response = await userApi.loginService(datas)
      dispatch({
        type: userConstants.USER_LOGIN_SUCCESS,
        payload: response
      })
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL)
    }
    break
  default:
    break
  }
}

// const loginAction = (datas) => async (dispatch) => {
//     try {
//         dispatch({ type: userConstants.USER_LOGIN_REQUEST });
//         const response = await userApi.loginService(datas);
//         dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
//     } catch (error) {
//         ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
//     }
// };

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
const logoutAction = datas => async dispatch => {
  userApi.logoutService()
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_REGISTER_RESET })
  dispatch({ type: userConstants.USER_LOGIN_RESET })
  dispatch({ type: userConstants.USER_LOGIN_GOOGLE_RESET })
  dispatch({ type: userConstants.USER_LOGIN_FACEBOOK_RESET })
}

// Change password action
const changePasswordAction = password => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST })
    const response = await userApi.changePasswordService(
      password,
      tokenProtection(getState)
    )
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL)
  }
}

// update profile action
const updateProfileAction = user => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST })
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    )
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
  updateProfileAction
}
