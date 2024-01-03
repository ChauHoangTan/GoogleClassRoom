import './style.scss'

import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../../redux/actions/authActions'
import Loader from '../../../components/notification/Loader'
import toast from 'react-hot-toast'
import { Grid } from '@mui/material'
import Swal from 'sweetalert2'

function LoginSuccess() {
  const { userId, tokenLogin, provider } = useParams()
  const initialized = useRef(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    state => state.userLogin
  )
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const fetchToken = async () => {
        const data = { userId, tokenLogin }
        dispatch(loginAction(provider, data))
      }

      fetchToken()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect
  useEffect(() => {
    if (userInfo) {
      if (userInfo?.isAdmin) {
        navigate('/dashboard')
      } else {
        navigate('/home')
      }
    }

    if (isSuccess) {
      toast.success(`Welcome back ${userInfo?.firstName}`)
    }
    if (isError) {
      Swal.fire({
        title: 'Login by ' + provider,
        text: isError,
        icon: 'error',
        confirmButtonText: 'Back To Login',
        customClass: {
          confirmButton: 'swal-button-custom' //
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
      dispatch({ type: 'USER_LOGIN_RESET' })
    }
  }, [isSuccess, isError, navigate, dispatch, provider, userInfo])

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item>
          {isLoading && <Loader/>}
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginSuccess