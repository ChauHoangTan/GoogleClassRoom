import { useMemo, useState } from 'react'
import { Avatar, Box, Grid, IconButton, Tooltip, Typography, Button } from '@mui/material'
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors'
import { Delete, Edit } from '@mui/icons-material'
import { DateFormat } from '../notification/Empty'
import Loader from '../notification/Loader'
import { useSelector } from 'react-redux'
import ModalEditUser from '../Auth/Modal/ModalEditUser'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles'
import Papa from 'papaparse'

function UserTable({ deleteHandler, isLoading, users, deleteSelectedHandler, selectionModel, setSelectionModel, isUploadLoading, adminUpdateStudentIds }) {

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const [isOpen, setIsOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5)
  const [rowId, setRowId] = useState(null)
  const [userRow, setUserRow] = useState(null)
  const isOpenMenu = useSelector(state => state.isOpenMenu)

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const readFileCSV = async (e) => {
    const selectedFile = e.target.files[0]
    const result = await read(selectedFile)
    let studentsListUpload = []
    result.data.map(data => {
      if (isNaN(data['Student Id'])) {
        data['Student Id'] = ''
      }
      studentsListUpload.push(data)
    })
    adminUpdateStudentIds(studentsListUpload)
  }

  const read = (file) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (result) => {
          resolve(result)
        },
        header: true // Nếu CSV có header (tên cột)
      })
    })
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleRowSelection = (newSelectionModel) => {
    setSelectionModel(newSelectionModel)
  }

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
      { field: 'firstName', headerName: 'First Name', width: 100, getTooltip: (params) => params.value },
      { field: 'lastName', headerName: 'Last Name', width: 150, getTooltip: (params) => params.value },
      { field: 'email', headerName: 'Email', width: 250, getTooltip: (params) => params.value },
      {
        field: 'teacherClasses',
        headerName: 'Teacher Classes',
        width: 120,
        valueGetter: (params) => params.row.teacherClassList?.length
      },
      {
        field: 'studentClasses',
        headerName: 'Student Classes',
        width: 115,
        valueGetter: (params) => params.row.studentClassList?.length
      },
      {
        field: 'isVerifiedEmail',
        headerName: 'Active',
        width: 100,
        type: 'boolean'
      },
      {
        field: 'isBanned',
        headerName: 'Ban',
        width: 100,
        type: 'boolean'
      },
      {
        field: 'isAdmin',
        headerName: 'Admin',
        width: 100,
        type: 'boolean'
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 150,
        renderCell: (params) =>
          DateFormat(params.row.createdAt)
      },
      { field: 'userId', headerName: 'Student Id', width: 130 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 120,
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
              <IconButton disabled={params.row._id === userInfo?._id} onClick={() => { handleOpen(); setUserRow(params.row) }}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete this room">
              <IconButton
                disabled={params.row._id === userInfo?._id}
                onClick={() => deleteHandler(params.row)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowId]
  )

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ mt: 1, mb: 5, p: 4 }}
    >
      <ModalEditUser isOpen={isOpen} handleOpen={handleOpen} userRow={userRow} setUserRow={setUserRow} setIsOpen={setIsOpen} />
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
                Manage Users
          </Typography>
          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Button component="label" variant='contained' startIcon={<UploadIcon />} disabled={ isLoading || isUploadLoading } >
                Upload Student Ids
              <VisuallyHiddenInput type='file' accept='.csv'onChange={(e) => readFileCSV(e)}/>
            </Button>

            <Button startIcon={<Delete/>} sx={{ ml: 2 }} variant="contained" color="primary" onClick={deleteSelectedHandler} disabled={selectionModel.length === 0}>
                Delete selected rows
            </Button>
          </Box>
          {
            isLoading || isUploadLoading ? (
              <Loader />
            ) : (
              <DataGrid
                rows={users || 0}
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
                slots={{
                  toolbar: GridToolbar,
                  noRowsOverlay: CustomNoRowsOverlay

                }}
                columnVisibilityModel={{
                  teacherClasses: !isOpenMenu,
                  studentClasses: !isOpenMenu
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

export default UserTable