import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteClassAction, getAllClassesAction } from '../../../redux/actions/classActions'
import ClassTable from '../../../components/table/ClassTable'
import { SocketContext } from '../../../Context/SocketProvider'
import { styled } from '@mui/system'

const StyledClassTable = styled('div')({
  transform: 'scale(0.9)',
  transformOrigin: 'top left',
  width: 'calc(100% / 0.9)'
})

const Classes = () => {
  const dispatch = useDispatch()

  const { socket } = useContext(SocketContext)

  const [selectionModel, setSelectionModel] = useState([])
  const { userInfo } = useSelector(
    state => state.userLogin
  )

  const { isLoading, isError, classes } = useSelector(
    (state) => state.adminGetAllClasses
  )
  const { isError: deleteError, isSuccess: deleteSuccess } = useSelector(
    (state) => state.adminDeleteClass
  )

  // useEffect
  useEffect(() => {
    dispatch(getAllClassesAction())
    if (isError || deleteError) {
      toast.error(isError || deleteError)
      dispatch({ type: isError ? 'GET_ALL_CLASSES_RESET': 'DELETE_CLASS_RESET' })
    }
  }, [dispatch, isError, deleteError, deleteSuccess])

  // delete Class handler
  const deleteClassHandler = (classItem) => {
    if (window.confirm(`Are you sure you want to delete ${classItem.className} class`)) {
      // socket.emit('sendNotification', {
      //     userInfo,
      //     receiverId: classItem.teachers[0]._id,
      //     type: 1,
      //   });
      //   console.log(socket)
      const data = {
        userSendId: userInfo?._id,
        userReceiverId: classItem.teachers[0]._id,
        userName:  classItem.teachers[0].firstName,
        image:  classItem.teachers[0].image,
        content: `delete ${ classItem.className} class`
      }
      socket?.emit('post_data', data)

      dispatch(deleteClassAction(classItem._id))
    }
  }

  const handleDeleteSelectedRows = () => {
    const id = selectionModel.map((rowId) => rowId.toString()).join(',')
    if (window.confirm(`Are you sure you want to delete ${selectionModel.length} class?` )) {
      dispatch(deleteClassAction(id))
    }
    setSelectionModel([])
  }

  return (
    <StyledClassTable>
      <ClassTable deleteHandler={deleteClassHandler} isLoading={isLoading} classes={classes} deleteSelectedHandler={handleDeleteSelectedRows} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
    </StyledClassTable>
  )
}

export default Classes