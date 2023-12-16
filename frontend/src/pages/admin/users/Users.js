import { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Button, Grid, IconButton, MenuItem, Modal, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteUserAction, getAllUsersAction } from '../../../redux/actions/userActions'
import Loader from '../../../components/notification/Loader'
import { Empty, DateFormat } from '../../../components/notification/Empty'
import { Delete, Edit, Preview } from '@mui/icons-material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditUserInfoValidation } from '../../../components/validation/userValidation'

const styleModalEditUser = {
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

const ModalEditUser = ({isOpen, handleOpen, user}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(EditUserInfoValidation)
  })
  const handleEditUser = () => {
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalEditUser}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Edit User 
          </Typography>

          <Grid container spacing={2} sx={{ mt: '20px' }}>
            <Grid item xs={6}>
              <TextField 
                id="firstName"
                label="First Name"
                variant="outlined"
                value={user?.firstName}
                fullWidth
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message || ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={user?.lastName}
                fullWidth
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message || ''}
              />
            </Grid>
          </Grid>

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={user?.email}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message || ''}
            sx={{ mt:'20px', width:'100%' }}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            value={user?.phone}
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message || ''}
            sx={{ mt:'20px', width:'100%' }}
          />

          <Grid container spacing={2} sx={{ mt: '20px' }}>
            <Grid item xs={6}>
              <Select 
                variant="outlined"
                value={user?.isVerifiedEmail ? 'active' : 'inactive'}
                sx={{ width: '100%' }}>
                <MenuItem value="active" sx={{ py: '8px' }}>Active</MenuItem>
                <MenuItem value="unactive" sx={{ py: '8px' }}>Unactive</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                variant="outlined"
                value={user?.isBanned ? 'banned' : 'unbanned'}
                sx={{ width: '100%' }}>
                <MenuItem value="banned" sx={{ py: '8px' }}>Banned</MenuItem>
                <MenuItem value="unbanned" sx={{ py: '8px' }}>Unbanned</MenuItem>
              </Select>
            </Grid>
           </Grid>

          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={handleOpen}>Cancel</Button>
            <Button variant='contained' onClick={( ) => { handleOpen(); handleEditUser() }}>Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);
    const [userRow, setUserRow] = useState(null);

    const { isLoading, isError, users } = useSelector(
      (state) => state.adminGetAllUsers
    );

      const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  // delete user handler
  const deleteUserHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this user?' + id)) {
      dispatch(deleteUserAction(id));
    }
  };

  const handleUserEdit = () => {

  }

  // useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: isError ? 'GET_ALL_USERS_RESET' : 'USER_DELETE_USER_RESET'});
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  console.log(pageSize)
  const columns = useMemo(
    () => [
      {
        field: 'photoURL',
        headerName: 'Avatar',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
        sortable: false,
        filterable: false
      },
      { field: 'firstName', headerName: 'First Name', width: 100 },
      { field: 'lastName', headerName: 'Last Name', width: 100 },
      { field: 'email', headerName: 'Email', width: 300 },
      { field: 'phone', headerName: 'Phone', width: 150 },
      {
        field: 'isVerifiedEmail',
        headerName: 'Active',
        width: 100,
        type: 'boolean',
      },
      {
        field: 'isBanned',
        headerName: 'Ban',
        width: 100,
        type: 'boolean',
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        renderCell: (params) => {
          if (params.row.isAdmin) {
            return 'Admin';
          } else if (params.row.teacherClassList && params.row.teacherClassList.length > 0) {
            return 'Teacher';
          } else {
            return 'Student';
          }
        },
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        renderCell: (params) =>
          DateFormat(params.row.createdAt)
      },
      { field: 'userId', headerName: 'studentId', width: 150 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
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
              <IconButton onClick={() => { handleOpen(); setUserRow(params.row); }}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete this room">
              <IconButton
                onClick={() => deleteUserHandler(params.row._id)}
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
      style={{ padding: '0 40px' }}
    >
      <ModalEditUser isOpen={isOpen} handleOpen={handleOpen} user={userRow} />
      <Grid item xs={12}>
        <Box
          sx={{
            width: '100%',
            minHeight: '400px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h3'
            component='h3'
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
            Manage Users
          </Typography>
          {
            isLoading ? (
              <Loader />
              ) : ( 
              <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: pageSize },
                  },
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
                        'margin-top': '1em',
                        'margin-bottom': '1em'
                      }
                }}
                onCellEditCommit={(params) => setRowId(params.id)}
                disableRowSelectionOnClick
              />
              )
          }
        </Box>
      </Grid>
    </Grid>
  )
}

export default Users
