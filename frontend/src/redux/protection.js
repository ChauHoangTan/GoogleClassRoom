import { logoutAction } from './actions/authActions'
const Swal = require('sweetalert2')

export const ErrorsAction = (error, dispatch, action) => {
  const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
  console.log(message)

  // Logout if token fail
  //   if (message === 'Not authorized, token failed' || message === 'Unauthorized' || message === 'Request failed with status code 401) {
  if (error.response.status === 401) {
    Swal.fire({
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Nếu người dùng nhấn nút OK
          dispatch(logoutAction()); // Gọi hành động để hiển thị cửa sổ đăng nhập
        }
      });
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