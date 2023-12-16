import { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteClassAction, getAllClassesAction } from '../../../redux/actions/classActions'
import Loader from '../../../components/notification/Loader'
import { Empty, DateFormat } from '../../../components/notification/Empty'
import { Delete, Edit, Preview } from '@mui/icons-material'

const Classes = () => {
    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);

    const { isLoading, isError, classes } = useSelector(
      (state) => state.adminGetAllClasses
    );
        console.log(classes)
      const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteClass
  );

  // delete Class handler
  const deleteClassHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this class?' + id)) {
      dispatch(deleteClassAction(id));
    }
  };

  const handleClassEdit = () => {

  }

  // useEffect
  useEffect(() => {
    dispatch(getAllClassesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: isError ? 'GET_ALL_CLASSES_RESET' : 'Class_DELETE_CLASSES_RESET'});
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  const columns = useMemo(
    () => [
      { field: 'classId', headerName: 'Class Id', width: 150 },
      { field: 'className', headerName: 'Class Name', width: 350 },
      {
        field: 'isActive',
        headerName: 'Active',
        width: 100,
        type: 'boolean',
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
            const firstTeacher = params.row.teachers[0]; // Người tạo là giáo viên đầu tiên trong danh sách giáo viên
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
        },
      },
      {
        field: 'teacherCount',
        headerName: 'Teacher Count',
        width: 150,
        valueGetter: (params) => params.row.teachers.length,
      },
      {
        field: 'studentCount',
        headerName: 'Student Count',
        width: 150,
        valueGetter: (params) => params.row.students.length,
      },
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
              <IconButton onClick={handleClassEdit}>
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

export default Classes