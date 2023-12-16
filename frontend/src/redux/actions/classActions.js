import * as classConstants from '../constants/classConstants'
import * as authConstants from '../constants/authConstants'
import * as classApi from '../APIs/classServices'
import { ErrorsAction } from '../protection'
import toast from 'react-hot-toast'

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
    toast.success('Favorite Movies Deleted')
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
    } catch(error) {
        ErrorsAction(error, dispatch, classConstants.UPDATE_CLASS_FAIL)
    }
}
export {
  getAllClassesAction,
  deleteClassAction,
  updateClassAction,
}
