import * as userConstants from '../constants/userConstants'


// CHANGE PASSWORD
export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
  case userConstants.USER_CHANGE_PASSWORD_REQUEST:
    return { isLoading: true }
  case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
    return { isLoading: false, isSuccess: true, message: action.payload.message }
  case userConstants.USER_CHANGE_PASSWORD_FAIL:
    return { isLoading: false, isError: action.payload }
  case userConstants.USER_CHANGE_PASSWORD_RESET:
    return {}
  default:
    return state
  }
}

// UPDATE PROFILE
export const userUpdateProfileReducer = ( state = {}, action) => {
  switch (action.type) {
  case userConstants.USER_UPDATE_PROFILE_REQUEST:
    return { isLoading: true }
  case userConstants.USER_UPDATE_PROFILE_SUCCESS:
    return { isLoading: false, userInfo: action.payload, isSuccess: true }
  case userConstants.USER_UPDATE_PROFILE_FAIL:
    return { isLoading: false, isError: action.payload }
  case userConstants.USER_UPDATE_PROFILE_RESET:
    return {}
  default:
    return state
  }
}

// USER INFO
export const userGetProfileReducer = ( state = {}, action) => {
  switch (action.type) {
  case userConstants.USER_GET_PROFILE_REQUEST:
    return { isLoading: true }
  case userConstants.USER_GET_PROFILE_SUCCESS:
    return { isLoading: false, userInfo: action.payload, isSuccess: true }
  case userConstants.USER_GET_PROFILE_FAIL:
    return { isLoading: false, isError: action.payload }
  case userConstants.USER_GET_PROFILE_RESET:
    return {}
  default:
    return state
  }
}

// ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
  case userConstants.GET_ALL_USERS_REQUEST:
    return { isLoading: true }
  case userConstants.GET_ALL_USERS_SUCCESS:
    return { isLoading: false, users: action.payload }
  case userConstants.GET_ALL_USERS_FAIL:
    return { isLoading: false, isError: action.payload }
  case userConstants.GET_ALL_USERS_RESET:
    return {
      users: []
    }
  default:
    return state
  }
}

// ADMIN DELETE USER
export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
  case userConstants.DELETE_USER_REQUEST:
    return { isLoading: true }
  case userConstants.DELETE_USER_SUCCESS:
    return { isLoading: false, isSuccess: true }
  case userConstants.DELETE_USER_FAIL:
    return { isLoading: false, isError: action.payload }
  case userConstants.DELETE_USER_RESET:
    return {}
  default:
    return state
  }
}

// ADMIN UPDATE PROFILE
export const adminEditUserReducer = ( state = {}, action) => {
    switch (action.type) {
    case userConstants.UPDATE_USER_REQUEST:
      return { isLoading: true }
    case userConstants.UPDATE_USER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true }
    case userConstants.UPDATE_USER_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.UPDATE_USER_RESET:
      return {}
    default:
      return state
    }
  }
