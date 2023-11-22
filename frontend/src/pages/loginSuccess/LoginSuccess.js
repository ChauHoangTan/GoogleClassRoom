import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../redux/actions/userActions'

function LoginSuccess() {

  const { userId, tokenLogin } = useParams()
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    state => state.userLogin
  )
  useEffect(() => {
    const fetchToken = async () => {
      const data = { userId, tokenLogin }
      dispatch(loginAction('google', data))
    }

    fetchToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isSuccess ? <Navigate to={'/home'} replace={true} /> : <h3>Yêu cầu bạn hãy đăng nhập</h3>}
    </div>
  )
}

export default LoginSuccess