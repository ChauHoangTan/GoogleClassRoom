import * as classConstants from '../constants/classConstants'

// USER GET ALL THEIR CLASS
export const userGetAllMyClassesReducer = (state = { classes: [] }, action) => {
  switch (action.type) {
  case classConstants.GET_ALL_MY_CLASSES_REQUEST:
    return { isLoading: true }
  case classConstants.GET_ALL_MY_CLASSES_SUCCESS:
    return { isLoading: false, classes: action.payload }
  case classConstants.GET_ALL_MY_CLASSES_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.GET_ALL_CLASSES_RESET:
    return {
      classes: []
    }
  default:
    return state
  }
}

// USER GET CLASS BY ID
export const userGetClassByIDReducer = (state = { classes: [] }, action) => {
  switch (action.type) {
  case classConstants.GET_CLASS_BY_ID_REQUEST:
    return { isLoading: true }
  case classConstants.GET_CLASS_BY_ID_SUCCESS:
    return { isLoading: false, classes: action.payload }
  case classConstants.GET_CLASS_BY_ID_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.GET_CLASS_BY_ID_RESET:
    return {
      classes: []
    }
  default:
    return state
  }
}

// USER JOIN CLASS BY CODE
export const userJoinClassByCodeReducer = (state = {}, action ) => {
  switch (action.type) {
  case classConstants.JOIN_CLASS_BY_CODE_REQUEST:
    return { isLoading: true }
  case classConstants.JOIN_CLASS_BY_CODE_SUCCESS:
    return { isLoading: false, isSuccess: true }
  case classConstants.JOIN_CLASS_BY_CODE_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.JOIN_CLASS_BY_CODE_RESET:
    return {}
  default:
    return state
  }
}

// USER CREATE NEW CLASS
export const userCreateNewClassReducer = (state = {}, action ) => {
  switch (action.type) {
  case classConstants.CREATE_CLASS_REQUEST:
    return { isLoading: true }
  case classConstants.CREATE_CLASS_SUCCESS:
    return { isLoading: false, classInfo: action.payload, isSuccess: true }
  case classConstants.CREATE_CLASS_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.CREATE_CLASS_RESET:
    return {}
  default:
    return state
  }
}

// USER GET ALL STUDENTS
export const userGetAllStudentsReducer = (state = { students: [] }, action) => {
  switch (action.type) {
  case classConstants.GET_ALL_STUDENTS_REQUEST:
    return { isLoading: true }
  case classConstants.GET_ALL_STUDENTS_SUCCESS:
    return { isLoading: false, students: action.payload }
  case classConstants.GET_ALL_STUDENTS_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.GET_ALL_STUDENTS_RESET:
    return {}
  default:
    return state
  }
}

// USER GET ALL TYPE OF STUDENTS
export const userGetAllTypeOfStudentsReducer = (state = { students: [] }, action) => {
  switch (action.type) {
  case classConstants.GET_ALL_TYPE_STUDENTS_REQUEST:
    return { isLoading: true }
  case classConstants.GET_ALL_TYPE_STUDENTS_SUCCESS:
    return { isLoading: false, students: action.payload }
  case classConstants.GET_ALL_TYPE_STUDENTS_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.GET_ALL_TYPE_STUDENTS_RESET:
    return {}
  default:
    return state
  }
}

// USER GET ALL TEACHERS
export const userGetAllTeachersReducer = (state = { teacher: [] }, action) => {
  switch (action.type) {
  case classConstants.GET_ALL_TEACHERS_REQUEST:
    return { isLoading: true }
  case classConstants.GET_ALL_TEACHERS_SUCCESS:
    return { isLoading: false, teachers: action.payload }
  case classConstants.GET_ALL_TEACHERS_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.GET_ALL_TEACHERS_RESET:
    return {}
  default:
    return state
  }
}

// USER SEND MAIL INVITATION
export const userSendInvitationoByEmailReducer = (state = { }, action) => {
  switch (action.type) {
  case classConstants.SEND_INVITATION_BY_EMAIL_REQUEST:
    return { isLoading: true }
  case classConstants.SEND_INVITATION_BY_EMAIL_SUCCESS:
    return { isLoading: false, isSuccess: true }
  case classConstants.SEND_INVITATION_BY_EMAIL_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.SEND_INVITATION_BY_EMAIL_RESET:
    return {}
  default:
    return state
  }
}

// ADMIN GET ALL CLASS
export const adminGetAllClassesReducer = (state = { classes: [] }, action) => {
  switch (action.type) {
  case classConstants.GET_ALL_CLASSES_REQUEST:
    return { isLoading: true }
  case classConstants.GET_ALL_CLASSES_SUCCESS:
    return { isLoading: false, classes: action.payload }
  case classConstants.GET_ALL_CLASSES_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.GET_ALL_CLASSES_RESET:
    return {
      classes: []
    }
  default:
    return state
  }
}

// ADMIN DELETE CLASS
export const adminDeleteClassReducer = (state = {}, action) => {
  switch (action.type) {
  case classConstants.DELETE_CLASS_REQUEST:
    return { isLoading: true }
  case classConstants.DELETE_CLASS_SUCCESS:
    return { isLoading: false, isSuccess: true }
  case classConstants.DELETE_CLASS_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.DELETE_CLASS_RESET:
    return {}
  default:
    return state
  }
}

// ADMIN UPDATE CLASS

export const adminUpdateClassReducer = (state = {}, action ) => {
  switch (action.type) {
  case classConstants.UPDATE_CLASS_REQUEST:
    return { isLoading: true }
  case classConstants.UPDATE_CLASS_SUCCESS:
    return { isLoading: false, classInfo: action.payload, isSuccess: true }
  case classConstants.UPDATE_CLASS_FAIL:
    return { isLoading: false, isError: action.payload }
  case classConstants.UPDATE_CLASS_RESET:
    return {}
  default:
    return state
  }
}