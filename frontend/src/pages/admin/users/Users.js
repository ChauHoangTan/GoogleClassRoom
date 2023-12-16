import { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteUserAction, getAllUsersAction } from '../../../redux/actions/userActions'
import Loader from '../../../components/notification/Loader'
import { Empty, DateFormat } from '../../../components/notification/Empty'
import { Delete, Edit, Preview } from '@mui/icons-material'

const Users = () => {
    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);

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
              <IconButton onClick={handleUserEdit}>
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
