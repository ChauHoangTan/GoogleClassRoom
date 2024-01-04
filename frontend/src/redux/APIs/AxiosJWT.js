import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { refreshAccessTokenService } from './authServices'
import { store } from '../store'
import * as authActions from '../actions/authActions'

const AxiosJWT = axios.create({
  // baseURL: 'http://localhost:5000/api'
  baseURL: 'https://nexusedu.onrender.com/api'
})

AxiosJWT.interceptors.request.use(
  async (config) => {
    const currentState = store.getState()
    // Access the userLogin slice from the state
    const userLoginState = currentState.userLogin
    // Accessing userInfo within userLogin
    const userInfo = userLoginState.userInfo

    let date = new Date()
    const decodedToken = jwtDecode(userInfo?.Authorization)
    if (decodedToken.exp < date.getTime() / 1000) {
    //   try {
      const data = await refreshAccessTokenService()
      const refreshUser = {
        ...userInfo,
        Authorization: data.newAccessToken
      }
      store.dispatch(authActions.updateUserInfoAction(refreshUser))
      localStorage.setItem('userInfo', JSON.stringify(refreshUser))
      config.headers['Authorization'] = `Bearer ${data.newAccessToken}`
    //   } catch (error) {
      // store.dispatch(authActions.logoutAction())
    //   }
    } else {
      config.headers['Authorization'] = `Bearer ${userInfo?.Authorization}`

    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default AxiosJWT