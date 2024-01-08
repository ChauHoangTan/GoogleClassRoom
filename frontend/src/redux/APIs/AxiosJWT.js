import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { checkUserAccount, refreshAccessTokenService } from './authServices'
import { store } from '../store'
import * as authActions from '../actions/authActions'
import { ErrorsAction } from '../protection'

const AxiosJWT = axios.create({
  baseURL: 'http://localhost:5000/api'
  // baseURL: 'https://nexusedu.onrender.com/api'
})

AxiosJWT.interceptors.request.use(
  async (config) => {
    const currentState = store.getState()
    // Access the userLogin slice from the state
    const userLoginState = currentState.userLogin
    // Accessing userInfo within userLogin
    const userInfo = userLoginState.userInfo
    const response = await checkUserAccount(userInfo._id)

    if (!response.isExist) {
      store.dispatch(authActions.logoutAction('deleted'))
    }

    else if (response.isBanned) {
      store.dispatch(authActions.logoutAction('banned'))
    } else {
      let date = new Date()
      const decodedToken = jwtDecode(userInfo?.Authorization)
      if (decodedToken.exp < date.getTime() / 1000) {
        try {
          const data = await refreshAccessTokenService()
          const refreshUser = {
            ...userInfo,
            Authorization: data.newAccessToken
          }
          store.dispatch(authActions.updateUserInfoAction(refreshUser))
          localStorage.setItem('userInfo', JSON.stringify(refreshUser))
          config.headers['Authorization'] = `Bearer ${data.newAccessToken}`
        } catch (error) {
          // ErrorsAction(error)
          store.dispatch(authActions.logoutAction('expired'))
        }
      } else {
        config.headers['Authorization'] = `Bearer ${userInfo?.Authorization}`

      }
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default AxiosJWT