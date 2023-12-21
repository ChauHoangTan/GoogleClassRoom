import * as classConstants from '../constants/classConstants'
import * as authConstants from '../constants/authConstants'
import * as classApi from '../APIs/classServices'
import { ErrorsAction } from '../protection'
import toast from 'react-hot-toast'

// User get all their Classes action
const getAllMyClassesAction = () => async (dispatch) => {
  try {
    dispatch({ type: classConstants.GET_ALL_MY_CLASSES_REQUEST })
    const response = await classApi.getAllMyClassesService()
    dispatch({ type: classConstants.GET_ALL_MY_CLASSES_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.GET_ALL_MY_CLASSES_FAIL)
  }
}

// User create new Classes action
const createNewClassActions = (classData) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.CREATE_CLASS_REQUEST })
    const reponse = await classApi.createNewClassService(classData)
    dispatch({
      type: classConstants.CREATE_CLASS_SUCCESS,
      payload: reponse
    })
    toast.success('Class create successfully')
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.CREATE_CLASS_FAIL)
  }
}

// User get Classes by ID
const getClassByIDActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.GET_CLASS_BY_ID_REQUEST })
    const reponse = await classApi.getClassByIDService(id)
    dispatch({
      type: classConstants.GET_CLASS_BY_ID_SUCCESS,
      payload: reponse
    })
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.GET_CLASS_BY_ID_FAIL)
  }
}

// Student join Class by code
const joinClassByCodeActions = (code) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.JOIN_CLASS_BY_CODE_REQUEST })
    const reponse = await classApi.joinClassByCodeService(code)
    dispatch({
      type: classConstants.JOIN_CLASS_BY_CODE_SUCCESS,
      payload: reponse
    })
    toast.success('You are joined the class')
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.JOIN_CLASS_BY_CODE_FAIL)
  }
}

// admin get all Classes action
const getAllClassesAction = () => async (dispatch) => {
  try {
    dispatch({ type: classConstants.GET_ALL_CLASSES_REQUEST })
    const response = await classApi.getAllClassesService()
    dispatch({ type: classConstants.GET_ALL_CLASSES_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.GET_ALL_CLASSES_FAIL)
  }
}

// admin delete Class action
const deleteClassAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.DELETE_CLASS_REQUEST })
    await classApi.deleteClassService(id )
    dispatch({ type: classConstants.DELETE_CLASS_SUCCESS })
    toast.success('Class delete successfully')
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.DELETE_CLASS_FAIL)
  }
}

// admin update class action
const updateClassAction = (id, classData) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.UPDATE_CLASS_REQUEST })
    const reponse = await classApi.updateClassService(id, classData)
    dispatch({
      type: classConstants.UPDATE_CLASS_SUCCESS,
      payload: reponse
    })
    toast.success('Class Edit successfully')
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.UPDATE_CLASS_FAIL)
  }
}

const getAllStudentsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.GET_ALL_STUDENTS_REQUEST })
    const reponse = await classApi.getAllStudentsService(id)
    dispatch({
      type: classConstants.GET_ALL_STUDENTS_SUCCESS,
      payload: reponse
    })
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.GET_ALL_STUDENTS_FAIL)
  }

}
const getAllTeachersAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.GET_ALL_TEACHERS_REQUEST })
    const reponse = await classApi.getAllTeachersService(id)
    dispatch({
      type: classConstants.GET_ALL_TEACHERS_SUCCESS,
      payload: reponse
    })
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.GET_ALL_TEACHERS_FAIL)
  }

}

const sendInvitationByEmailAction = (emails, role, classId) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.SEND_INVITATION_BY_EMAIL_REQUEST })
    const reponse = await classApi.sendInvitationByEmailService(emails, role, classId)
    dispatch({
      type: classConstants.SEND_INVITATION_BY_EMAIL_SUCCESS,
      payload: reponse
    })
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.SEND_INVITATION_BY_EMAIL_FAIL)
  }

}
export {
  getAllClassesAction,
  deleteClassAction,
  updateClassAction,
  getAllMyClassesAction,
  createNewClassActions,
  getAllStudentsAction,
  getAllTeachersAction,
  getClassByIDActions,
  joinClassByCodeActions,
  sendInvitationByEmailAction
}
