import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteClassAction, getAllClassesAction } from '../../../redux/actions/classActions'
import ClassTable from '../../../components/table/ClassTable'


const Classes = () => {
  const dispatch = useDispatch()

  const [selectionModel, setSelectionModel] = useState([]);

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
  const deleteClassHandler = (id, name) => {
    if (window.confirm('Are you sure you want to delete this class?' + name)) {
      dispatch(deleteClassAction(id))
    }
  }

  const handleDeleteSelectedRows = () => {
    const id = selectionModel.map((rowId) => rowId.toString()).join(',');
    if (window.confirm(`Are you sure you want to delete ${selectionModel.length} class?` )) {
        dispatch(deleteClassAction(id))
    }
    setSelectionModel([]);
};

  return (
    <ClassTable deleteHandler={deleteClassHandler} isLoading={isLoading} classes={classes} deleteSelectedHandler={handleDeleteSelectedRows} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
  )
}

export default Classes