import { combineReducers, configureStore } from '@reduxjs/toolkit'
import * as User from './reducers/userReducers'
import * as Class from './reducers/classReducers'

import * as Auth from './reducers/authReducers'

import { moreIconReducer } from './reducers/moreIconReducers'

const rootReducer = combineReducers({
  // User reducer
  userLogin: Auth.userLoginReducer,
  userRegister: Auth.userRegisterReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetProfile: User.userGetProfileReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  adminEditUser: User.adminEditUserReducer,


  //Class reducer
  adminGetAllClasses: Class.adminGetAllClassesReducer,
  adminDeleteClass: Class.adminDeleteClassReducer,
  adminUpdateClass: Class.adminUpdateClassReducer,
  userGetAllMyClasses: Class.adminGetAllMyClassesReducer,
  userCreateNewClass: Class.userCreateNewClassReducer,

  isOpenMenu: moreIconReducer

})

// Get userInfo from localStorage
const userInfoFormStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFormStorage }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
})