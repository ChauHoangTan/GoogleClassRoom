import * as userConstants from '../constants/userConstants'
import * as authConstants from '../constants/authConstants'
import * as userApi from '../APIs/userServices'
import { ErrorsAction } from '../protection'
import toast from 'react-hot-toast'

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
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL)
  }
}

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST })
    const response = await userApi.getAllUsersService()
    dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL)
  }
}


export {
  changePasswordAction,
  updateProfileAction,
  getProfileAction,
  getAllUsersAction
}
