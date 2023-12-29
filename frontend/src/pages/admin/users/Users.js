import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import UserTable from '../../../components/table/UserTable'
import { deleteUserAction, getAllUsersAction } from '../../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/system';

const StyledClassTable = styled('div')({
    transform: 'scale(0.9)',
    transformOrigin: 'top left',
    width: 'calc(100% / 0.9)',
  });

const Users = () => {
  const dispatch = useDispatch()

  const [selectionModel, setSelectionModel] = useState([])

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
  const deleteUserHandler = (user) => {
    if (window.confirm('Are you sure you want to delete ?' + user.firstName)) {
      dispatch(deleteUserAction(user._id))
    }
  }

  const handleDeleteSelectedRows = () => {
    const id = selectionModel.map((rowId) => rowId.toString()).join(',')
    if (window.confirm(`Are you sure you want to delete ${selectionModel.length} users?` )) {
      dispatch(deleteUserAction(id))
    }
    setSelectionModel([])
  }

  return (
    <StyledClassTable>
        <UserTable deleteHandler={deleteUserHandler} isLoading={isLoading} users={users} deleteSelectedHandler={handleDeleteSelectedRows} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
    </StyledClassTable>
  )
}

export default Users

