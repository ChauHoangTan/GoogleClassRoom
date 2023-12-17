import { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Grid, IconButton, MenuItem, Modal, Select, Stack, TextField, Tooltip, Typography, Button } from '@mui/material'
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteClassAction, getAllClassesAction, updateClassAction } from '../../../redux/actions/classActions'
import Loader from '../../../components/notification/Loader'
import { Empty, DateFormat } from '../../../components/notification/Empty'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { editUserInfoValidation } from '../../../components/validation/classValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const styleModalEditClass = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #005B48',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
}

const ModalEditClass = ({ isOpen, handleOpen, setClassRow, classRow, setIsOpen }) => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState('')

  const { isLoading: updateLoading, isError: editError, classInfo: editClassInfo, isSuccess: editSuccess } = useSelector(
    state => state.adminUpdateClass
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(editUserInfoValidation)
  })

  useEffect(() => {
    if (classRow) {
      setValue('classId', classRow?.classId)
      setValue('className', classRow?.className)
      setIsActive(classRow?.isActive ? 'active' : 'inactive')
    }
  }, [classRow, setValue, setIsActive])

  useEffect(() => {
    if (editClassInfo) {
      dispatch(getAllClassesAction())
    }

    if (editSuccess) {
      setIsOpen(!isOpen)
      dispatch({ type: 'UPDATE_CLASS_RESET' })
    }
    if (editError) {
      toast.error(editError)
      setIsOpen(!isOpen)
      dispatch({ type: 'UPDATE_CLASS_RESET' })
    }
  }, [editClassInfo, editSuccess, editError, dispatch, setIsOpen])

  const onSubmit = (data) => {
    dispatch(updateClassAction(
      classRow?._id,
      {
        ...data,
        isActive: isActive === 'active' ? true : false
      }
    ))
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => { handleOpen(); setClassRow(null) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={styleModalEditClass}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
              Edit User
          </Typography>

          <TextField
            name="classId"
            id="classId"
            label="Class Id"
            variant="outlined"
            {...register('classId')}
            error={!!errors.classId}
            helperText={errors.classId?.message || ''}
            sx={{ mt:'20px', width:'100%' }}
          />
          <TextField
            name="className"
            id="className"
            label="Class Name"
            variant="outlined"
            {...register('className')}
            error={!!errors.className}
            helperText={errors.className?.message || ''}
            sx={{ mt:'20px', width:'100%' }}
          />

          <Grid container spacing={2} sx={{ mt: '20px' }}>
            <Grid item xs={6}>
              <Select
                variant="outlined"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
                sx={{ width: '100%' }}>
                <MenuItem value="active" sx={{ py: '8px' }}>Active</MenuItem>
                <MenuItem value="inactive" sx={{ py: '8px' }}>Inactive</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={() => {handleOpen(); setClassRow(null)}}>Cancel</Button>
            <Button variant='contained' type="submit">Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}


const Classes = () => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5)
  const [rowId, setRowId] = useState(null)
  const [classRow, setClassRow] = useState(null)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const isOpenMenu = useSelector(state => state.isOpenMenu);

  const { isLoading, isError, classes } = useSelector(
    (state) => state.adminGetAllClasses
  )
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteClass
  )

  // delete Class handler
  const deleteClassHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this class?' + id)) {
      dispatch(deleteClassAction(id))
    }
  }

  // useEffect
  useEffect(() => {
    dispatch(getAllClassesAction())
    if (isError || deleteError) {
      toast.error(isError || deleteError)
      dispatch({ type: isError ? 'GET_ALL_CLASSES_RESET' : 'DELETE_CLASS_RESET' })
    }
  }, [dispatch, isError, deleteError, isSuccess])

  const columns = useMemo(
    () => [
      { field: 'classId', headerName: 'Class Id', width: 150 },
      { field: 'className', headerName: 'Class Name', width: 350 },
      {
        field: 'isActive',
        headerName: 'Active',
        width: 150,
        type: 'boolean'
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        renderCell: (params) =>
          DateFormat(params.row.createdAt)
      },
      {
        field: 'userCreator',
        headerName: 'Created By',
        width: 250,
        renderCell: (params) => {
          const firstTeacher = params.row.teachers[0] // Người tạo là giáo viên đầu tiên trong danh sách giáo viên
          return (
            firstTeacher ? (
              <Box>
                <Avatar src={params.row.image} />
                {firstTeacher.firstName}
              </Box>
            ) : (
              'No Creator'
            )
          )
        }
      },
      {
        field: 'teacherCount',
        headerName: 'Teacher Count',
        width: 150,
        valueGetter: (params) => params.row.teachers.length
      },
      {
        field: 'studentCount',
        headerName: 'Student Count',
        width: 150,
        valueGetter: (params) => params.row.students.length
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 140,
        renderCell: (params) => (
          <Box>
            <Tooltip title="View room details">
              <IconButton
                onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: params.row })}
              >
                <Preview />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit this room">
              <IconButton onClick={() => { handleOpen(); setClassRow(params.row) }}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete this room">
              <IconButton
                onClick={() => deleteClassHandler(params.row._id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ],
    [rowId]
  )

  return (
    <Grid
      container
      justifyContent="center"
      style={{ padding: '40px' }}
    >
      <ModalEditClass isOpen={isOpen} handleOpen={handleOpen} classRow={classRow} setClassRow={setClassRow} setIsOpen={setIsOpen} />
      <Grid item xs={12}>
        <Box
          sx={{
            width: '100%',
            minHeight: '400px',
            textAlign: 'center'
          }}
        >
          <Typography
            variant='h3'
            component='h3'
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
            Manage Classes
          </Typography>
          {
            isLoading ? (
              <Loader />
            ) : (
              <DataGrid
                rows={classes}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: pageSize }
                  }
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 1,
                  bottom: params.isLastVisible ? 0 : 1
                })}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? grey[200] : grey[900]
                  },
                  '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
                    'mt': '1em',
                    'mb': '1em'
                  }
                }}
                onCellEditCommit={(params) => setRowId(params.id)}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                columnVisibilityModel={{
                    userCreator: !isOpenMenu,
                }}
              />
            )
          }
        </Box>
      </Grid>
    </Grid>
  )
}

export default Classes