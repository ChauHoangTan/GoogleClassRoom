import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import UserTable from '../../../components/table/UserTable'
import { adminUpdateStudentIdsAction, deleteUserAction, getAllUsersAction } from '../../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { styled } from '@mui/system'

const StyledClassTable = styled('div')({
  transform: 'scale(0.9)',
  transformOrigin: 'top left',
  width: 'calc(100% / 0.9)'
})

const Users = () => {
  const dispatch = useDispatch()

  const [selectionModel, setSelectionModel] = useState([])
  const [isLoadingFile, setIsLoadingFile] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const { isUploadLoading, isError: isUploadError, isSuccess: isUploadSuccess } = useSelector(
    (state) => state.adminUpdateStudentIds
  )

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  )

  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  )
  const prevIsUploadSuccess = useRef(isSuccess)
  // useEffect
  useEffect(() => {
    if (!prevIsUploadSuccess.current || isSuccess) {
      dispatch(getAllUsersAction())
      setIsLoadingFile(false)
    }

    // Cập nhật giá trị trạng thái trước đó của isUploadSuccess
    prevIsUploadSuccess.current = isUploadSuccess
    if (isError || deleteError || isUploadError) {
      toast.error(isError || deleteError || isUploadError)
      dispatch({ type: isError ? 'GET_ALL_USERS_RESET' : deleteError ? 'DELETE_USER_RESET' : 'UPDATE_STUDENT_IDS_RESET' })
    }
  }, [dispatch, isError, deleteError, isUploadError, isSuccess, isUploadSuccess])

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
      <UserTable deleteHandler={deleteUserHandler} isLoading={isLoading} users={users} isUploadSuccess={isUploadSuccess} deleteSelectedHandler={handleDeleteSelectedRows} selectionModel={selectionModel} setSelectionModel={setSelectionModel} isLoadingFile={isLoadingFile} adminUpdateStudentIds={(adminUploadStudentList) => dispatch(adminUpdateStudentIdsAction(adminUploadStudentList))} setIsLoadingFile={setIsLoadingFile} />
    </StyledClassTable>
  )
}

export default Users

