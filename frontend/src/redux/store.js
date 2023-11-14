import { combineReducers, configureStore} from "@reduxjs/toolkit";
import * as User from "./reducers/userReducers";
import { moreIconReducer } from "./reducers/moreIconReducers";

const rootReducer = combineReducers({
    // User reducer
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userChangePassword: User.userChangePasswordReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    
    //
    isOpenMenu: moreIconReducer,

});

// Get userInfo from localStorage
const userInfoFormStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// initialState
const initialState = {
    userLogin: { userInfo: userInfoFormStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
})