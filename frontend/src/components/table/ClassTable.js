import { useMemo, useState } from 'react'
import { Avatar, Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import Loader from '../notification/Loader'
import { Empty, DateFormat } from '../notification/Empty'
import { Delete, Edit, Preview } from '@mui/icons-material'
import ModalEditClass from '../Auth/Modal/ModalEditClass'
import { useSelector } from 'react-redux'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'


function ClassTable({ deleteHandler, isLoading, classes, deleteSelectedHandler, selectionModel, setSelectionModel }) {
  const [isOpen, setIsOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5)
  const [rowId, setRowId] = useState(null)
  const [classRow, setClassRow] = useState(null)

  const isOpenMenu = useSelector(state => state.isOpenMenu)
  console.log(classes)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleRowSelection = (newSelectionModel) => {
    setSelectionModel(newSelectionModel)
  }

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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={firstTeacher.image} />
                <Typography sx={{ marginLeft: '8px' }}>{firstTeacher.firstName} {firstTeacher.lastName}</Typography>
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
            {/* <Tooltip title="View room details">
                  <IconButton
                    onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: params.row })}
                  >
                    <Preview />
                  </IconButton>
                </Tooltip> */}
            <Tooltip title="Edit this room">
              <IconButton onClick={() => { handleOpen(); setClassRow(params.row) }}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete this room">
              <IconButton
                onClick={() => deleteHandler(params.row)}
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
      sx={{ mt: 1, mb: 5, p: 5, height: '100%' }}
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
            sx={{ textAlign: 'center', mb: 3 }}
          >
                Manage Classes
          </Typography>
          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={deleteSelectedHandler} disabled={selectionModel.length === 0}>
                Delete selected rows
            </Button>
          </Box>
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
                  },
                  height: '400px'
                }}
                onCellEditCommit={(params) => setRowId(params.id)}
                disableRowSelectionOnClick
                slots={{
                  toolbar: GridToolbar,
                  noRowsOverlay: CustomNoRowsOverlay
                }}
                columnVisibilityModel={{
                  userCreator: !isOpenMenu
                }}
                onRowSelectionModelChange={handleRowSelection}
              />
            )
          }
        </Box>
      </Grid>
    </Grid>
  )
}

export default ClassTable