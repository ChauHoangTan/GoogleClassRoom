import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouter = () => {
  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  return userInfo?.Authorization ? <Outlet /> : <Navigate to="/" />
}

// admin router protection
function AdminProtectedRouter() {
  const { userInfo } = useSelector(
    (state) => state.userLogin
  )
  return userInfo?.Authorization ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/*" />
    )
  ) : (
    <Navigate to="/" />
  )
}

export { ProtectedRouter, AdminProtectedRouter }