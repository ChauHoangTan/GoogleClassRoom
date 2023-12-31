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
const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST })
    const response = await userApi.getAllUsersService()
    dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL)
  }
}


// admin delete user action
const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST })
    await userApi.deleteUserService(id )
    dispatch({ type: userConstants.DELETE_USER_SUCCESS })
    toast.success('User Was Deleted Successfully')
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL)
  }
}

// ADMIN UPDATE STUDENT IDS REQUEST
const adminUpdateStudentIdsAction = (studentsListUpload) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.UPDATE_STUDENT_IDS_REQUEST })
    const response = await userApi.adminUploadStudentList(studentsListUpload)
    dispatch({
      type: userConstants.UPDATE_STUDENT_IDS_SUCCESS,
      payload: response
    })
    toast.success('Student List is added Student Ids!')
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.UPDATE_STUDENT_IDS_FAIL)
  }
}

// update profile action
const updateUserAction = (id, user) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.UPDATE_USER_REQUEST })
    const response = await userApi.updateUserService(id, user)
    dispatch({
      type: userConstants.UPDATE_USER_SUCCESS,
      payload: response
    })
    toast.success('User Edit successfully')
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.UPDATE_USER_FAIL)
  }
}


export {
  changePasswordAction,
  updateProfileAction,
  getProfileAction,
  getAllUsersAction,
  deleteUserAction,
  updateUserAction,
  adminUpdateStudentIdsAction
}
