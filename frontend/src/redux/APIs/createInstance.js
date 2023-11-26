import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { refreshAccessTokenService } from './userServices'

const createAxios = (user, dispatch, loginSuccess) => {
  const newInstance = axios.create({
    // baseURL: "https://eduspherehub.onrender.com/api",
    baseURL: 'http://localhost:5000/api'
  })

  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date()
      const decodedToken = jwtDecode(user?.Authorization)
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshAccessTokenService()
        const refreshUser = {
          ...user,
          Authorization: data.newAccessToken
        }
        dispatch({ type: loginSuccess, payload: refreshUser } )
        config.headers['Authorization'] = `Bearer ${data.newAccessToken}`
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  return newInstance
}

export default createAxios