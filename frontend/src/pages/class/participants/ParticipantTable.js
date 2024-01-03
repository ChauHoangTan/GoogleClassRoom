// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
// import React from 'react'
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow
// } from '@mui/material'
// import { Typography, IconButton, Avatar } from '@mui/material'


// export default function ParticipantTable ({ columns, rows, isTeacherTable }) {
//   const [page, setPage] = React.useState(0)
//   const [rowsPerPage, setRowsPerPage] = React.useState(2)

//   if (rows === undefined) {
//     rows = []
//   }

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value)
//     setPage(0)
//   }

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {

//                       // Customized TableCell content based on column id
//                       let cellContent
//                       switch (column.id) {
//                       case 'image':
//                         cellContent = <Avatar src={row.image} alt={`Avatar of ${row.fullName}`} />
//                         break
//                       case 'userId':
//                         cellContent = <Typography variant="subtitle1">{row.userId}</Typography>
//                         break
//                       case 'fullName':
//                         cellContent = <Typography variant="body1">{row.lastName} {row.firstName}</Typography>
//                         break
//                       case 'status':
//                         cellContent = <Typography variant="body1"
//                           fontStyle={'italic'}
//                           fontWeight={'bold'}
//                           color={row.status === 'mapped' ? 'green' : row.status === 'not exist' ? 'red' : row.status === 'not mapping' ? 'yellow' : 'black'}>
//                           {row.status.toUpperCase()}
//                         </Typography>
//                         break
//                       case 'isTeacher':
//                         cellContent = !isTeacherTable && (
//                           <IconButton>
//                             <RemoveCircleOutlineIcon />
//                           </IconButton>
//                         )
//                         break
//                       default:
//                         cellContent = ''
//                       }

//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {cellContent}
//                         </TableCell>
//                       )
//                     })}
//                   </TableRow>
//                 )
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[1, 2, 10, 20, 25, 50, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         sx={{
//           '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
//             'mt': '1em',
//             'mb': '1em'
//           }
//         }}
//       />
//     </Paper>
//   )
// }

import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Typography, IconButton, Avatar, Paper } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { kickUserOutOfClass } from '../../../redux/APIs/classServices'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllTypeOfStudentsAction, getAllTeachersAction } from '../../../redux/actions/classActions'
import { useDispatch, useSelector } from 'react-redux'

const VISIBLE_FIELDS = ['image', 'userId', 'fullName', 'status', 'isTeacher']

export default function ParticipantDataGrid({ columns, rows, isTeacherTable }) {
  // Check if 'rows' is undefined or empty
  if (!rows || rows.length === 0) {
    return <Typography variant="body1">No data available</Typography>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { classId } = useParams()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userInfo } = useSelector(state => state.userLogin)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data
  const isMainTeacher = classInfo.teachers[0] === userInfo._id


  const handleKickUser = (user) => {

    const fetchData = async () => {
      try {
        let userId = ''
        if (!isTeacherTable) {
          userId = user.userId
        }
        const id = user._id
        const result = await kickUserOutOfClass(classId, id, userId)
        toast.success(result.message)
        dispatch(getAllTypeOfStudentsAction(classId))
        dispatch(getAllTeachersAction(classId))
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchData()
  }

  // Create dynamic columns based on the provided set of columns
  const columnsForDataGrid = columns
    .filter((column) => VISIBLE_FIELDS.includes(column.id))
    .map((column) => {
      switch (column.id) {
      case 'image':
        return {
          field: 'image',
          headerName: column.label,
          renderCell: (params) => <Avatar src={params.value} alt={`Avatar of ${params.row.fullName}`} />,
          flex: 1 // Set a flexible width for the column
        }
      case 'userId':
        return {
          field: 'userId',
          headerName: column.label,
          renderCell: (params) => <Typography variant="subtitle1">{params.value}</Typography>,
          flex: 1 // Set a flexible width for the column
        }
      case 'fullName':
        return {
          field: 'lastName',
          headerName: column.label,
          renderCell: (params) => <Typography variant="body1">{`${params.row.lastName} ${params.row.firstName}`}</Typography>,
          flex: 1, // Set a flexible width for the column
          valueGetter: (params) => `${params.row.lastName} ${params.row.firstName}`
        }
      case 'status':
        return !isTeacherTable && {
          field: 'status',
          headerName: column.label,
          renderCell: (params) => (
            <Typography
              variant="body1"
              fontStyle={'italic'}
              fontWeight={'bold'}
              color={
                params.row.status === 'mapped'
                  ? 'green'
                  : params.row.status === 'not exist'
                    ? 'red'
                    : params.row.status === 'not mapping'
                      ? 'yellow'
                      : 'black'
              }
            >
              {params.row.status.toUpperCase()}
            </Typography>
          ),
          flex: 1 // Set a flexible width for the column
        }
      case 'isTeacher':
        return {
          field: 'isTeacher',
          headerName: column.label,
          renderCell: (params) => (
            <IconButton disabled={isTeacherTable ? isMainTeacher ? false: true : !classInfo.isTeacherOfThisClass} onClick={() => {handleKickUser(params.row)}}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          ),
          flex: 1 // Set a flexible width for the column
        }
      default:
        return null
      }
    })
    .filter((column) => column !== null)

  const data = {
    rows: rows.map((row, index) => ({ ...row, id: index })),
    columns: columnsForDataGrid
  }

  return (
    <Paper style={{ height: 'auto', width: '100%', overflow: 'hidden' }}>
      <DataGrid {...data} components={{ Toolbar: GridToolbar }} hideFooterRowCount
        sx={{
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
            'mt': '1em',
            'mb': '1em'
          },

          '.MuiDataGrid-selectedRowCount': {
            'visibility': 'hidden'
          }
        }}
        pageSizeOptions={[1, 2, 10, 20, 25, 50, 100]}
      />
    </Paper>
  )
}

