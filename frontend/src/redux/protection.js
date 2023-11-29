import { logoutAction } from './actions/userActions'

export const ErrorsAction = (error, dispatch, action) => {
  const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
  console.log(message)

  // Logout if token fail
  //   if (message === 'Not authorized, token failed' || message === 'Unauthorized' || message === 'Request failed with status code 401) {
  if (error.response.status === 401) {
    dispatch(logoutAction())
  }
  return dispatch({ type: action, payload: message })
}

// api token protection
export const tokenProtection = (getState) => {
  const {
    userLogin: { userInfo }
  } = getState()
  if (!userInfo?.Authorization) {
    return null
  } else {
    return userInfo.Authorization
  }
}