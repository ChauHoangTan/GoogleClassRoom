import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { refreshAccessTokenService } from './userServices'
import { store } from '../store'
import * as userActions from '../actions/userActions'

const AxiosJWT = axios.create({
  // baseURL: "https://eduspherehub.onrender.com/api",
  baseURL: 'http://localhost:5000/api'
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
      try {
        const data = await refreshAccessTokenService()
        const refreshUser = {
          ...userInfo,
          Authorization: data.newAccessToken
        }
        store.dispatch(userActions.updateUserInfoAction(refreshUser))
        localStorage.setItem('userInfo', JSON.stringify(refreshUser))
        config.headers['Authorization'] = `Bearer ${data.newAccessToken}`
      } catch (error) {
        store.dispatch(userActions.logoutAction())
      }
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