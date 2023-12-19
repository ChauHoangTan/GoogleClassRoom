import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import UserTable from '../../../components/table/UserTable'
import { deleteUserAction, getAllUsersAction } from '../../../redux/actions/userActions'
import { useDispatch } from 'react-redux'


const Users = () => {
  const dispatch = useDispatch()

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  )

  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  )

  // useEffect
  useEffect(() => {
    dispatch(getAllUsersAction())
    if (isError || deleteError) {
      toast.error(isError || deleteError)
      dispatch({ type: isError ? 'GET_ALL_USERS_RESET' : 'DELETE_USER_RESET' })
    }
  }, [dispatch, isError, deleteError, isSuccess])

    // delete user handler
    const deleteUserHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?' + id)) {
            dispatch(deleteUserAction(id))
        }
    }

  return (
    <UserTable deleteHandler={deleteUserHandler} isLoading={isLoading} users={users} />
  )
}

export default Users
