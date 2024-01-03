// import { Typography, TablePagination, TextField } from '@mui/material'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import React, { useEffect, useState } from 'react'


// export default function GradeTable ({ columns, rows, setRows, isEdit }) {
//   const [page, setPage] = React.useState(0)
//   const [rowsPerPage, setRowsPerPage] = React.useState(2)

//   console.log(columns)

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value)
//     setPage(0)
//   }

//   const handleChangeGrade = (e, indexRow, indexGrade) => {
//     const newGrade = e.target.value
//     let newTextFields = [...rows]
//     newTextFields[indexRow].listGrade[indexGrade].grade = newGrade
//     setRows(newTextFields)
//   }

//   const rowTotal =
//     { id: 1000, listGrade: rows[0]?.listGrade && rows[0].listGrade, total: '40' }

//   const averageComposition = (rows) => {
//     if (rows.length > 0) {
//       const amountComposition = rows[0].listGrade.length
//       let averageCompositionList = []
//       for (let i = 0; i < amountComposition; i++) {
//         let averageComposition = 0

//         for (let j = 0; j < rows.length; j++) {
//           averageComposition += parseFloat(rows[j].listGrade[i].grade)
//           if (averageComposition === '') {
//             averageComposition = ''
//             break
//           }
//         }
//         averageCompositionList.push(
//           averageComposition/rows.length
//         )
//       }

//       // cal average total
//       let averageComposition = 0
//       for (let j = 0; j < rows.length; j++) {
//         averageComposition += rows[j].total
//         if (averageComposition === '') {
//           averageComposition = ''
//           break
//         }
//       }
//       averageCompositionList.push(
//         averageComposition/rows.length
//       )

//       return averageCompositionList
//     }
//     else {
//       return []
//     }
//   }

//   let averages = averageComposition(rows)
//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <React.Fragment key={column.label}>
//                   {column.listGrade ? (
//                     column.listGrade.map((col) => (
//                       <TableCell key={`${col.composition}`} align={col.align}>
//                         {`${col.composition} (${col.percent})`}
//                       </TableCell>
//                     ))
//                   ) : (
//                     <TableCell key={column.label} align={column.align}>
//                       {column.label}
//                     </TableCell>
//                   )}
//                 </React.Fragment>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, indexRow) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id]
//                       // Customized TableCell content based on column id
//                       let cellContent
//                       // Check if the column has listGrade
//                       if (column.listGrade) {
//                         cellContent = value.map((col, indexGrade) => (
//                           <TableCell key={`${col.composition}`} align={col.align}>
//                             <TextField
//                               size="small"
//                               value={
//                                 rows[indexRow].listGrade[indexGrade].grade
//                               }
//                               onChange={(e) => handleChangeGrade(e, indexRow, indexGrade)}
//                               disabled={!isEdit}
//                             />
//                           </TableCell>
//                         ))
//                       } else {
//                         switch (column.id) {
//                         case 'id':
//                           cellContent = <Typography variant="subtitle1">{value}</Typography>
//                           break
//                         case 'fullName':
//                           cellContent = <Typography variant="body1">{value}</Typography>
//                           break
//                         case 'total':
//                           cellContent = <Typography variant="body1">{value}</Typography>
//                           break
//                         default:
//                           cellContent = value
//                         }
//                         cellContent = <TableCell key={column.id} align={column.align}>{cellContent}</TableCell>
//                       }
//                       return cellContent
//                     })}
//                   </TableRow>
//                 )
//               })}

//             <TableRow hover role="checkbox" tabIndex={-1} key={rowTotal.code}>
//               {columns.map((column) => {
//                 const value = rowTotal[column.id]
//                 // Customized TableCell content based on column id
//                 let cellContent
//                 // Check if the column has listGrade
//                 if (column.listGrade && value) {
//                   cellContent = value.map((col, index) => (
//                     <TableCell key={`${col.composition}`} align={col.align}>
//                       {averages[index]}
//                     </TableCell>
//                   ))
//                 } else {
//                   switch (column.id) {
//                   case 'id':
//                     cellContent = <Typography variant="subtitle1">Average Score</Typography>
//                     break
//                   case 'total':
//                     cellContent = <Typography variant="body1">{averages.length > 0 && averages[averages.length - 1]}</Typography>
//                     break
//                   }
//                   cellContent = <TableCell key={column.id} align={column.align}>{cellContent}</TableCell>
//                 }
//                 return cellContent
//               })}
//             </TableRow>
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

import { Typography, TablePagination, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'


export default function GradeTable ({ columns, rows, setRows, isEdit }) {

  const [changeState, setChangeState] = useState(false)
  // console.log(columns)

  const handleChangeGrade = (e, indexRow, indexGrade) => {
    const newGrade = e.target.value
    let newTextFields = [...rows]
    newTextFields[indexRow].listGrade[indexGrade].grade = newGrade
    setRows(newTextFields)
  }

  const averageComposition = (rows) => {
    if (rows.length > 0) {
      const amountComposition = rows[0].listGrade.length
      let averageCompositionList = []
      for (let i = 0; i < amountComposition; i++) {
        let averageComposition = 0

        for (let j = 0; j < rows.length; j++) {
          averageComposition += parseFloat(rows[j].listGrade[i].grade)
          if (averageComposition === '') {
            averageComposition = ''
            break
          }
        }
        averageCompositionList.push(
          (averageComposition/rows.length).toFixed(2)
        )
      }

      // cal average total
      let averageComposition = 0
      for (let j = 0; j < rows.length; j++) {
        averageComposition += rows[j].total
        if (averageComposition === '') {
          averageComposition = ''
          break
        }
      }
      averageCompositionList.push(
        (averageComposition/rows.length).toFixed(2)
      )

      return averageCompositionList
    }
    else {
      return []
    }
  }

  useEffect(() => {
    setChangeState(!changeState)
  }, [rows])

  const columnsForDataGrid = columns
    .map((column) => {
      switch (column.id) {
      case 'id':
        return {
          field: 'id',
          headerName: column.label,
          renderCell: (params) => <Typography variant="subtitle1">{params.row.id}</Typography>,
          flex: 1 // Set a flexible width for the column
        }
      case 'fullName':
        return {
          field: 'fullName',
          headerName: column.label,
          renderCell: (params) => <Typography variant="body1">{`${params.row.fullName}`}</Typography>,
          flex: 1 // Set a flexible width for the column
        }
      case 'listGrade':
        // eslint-disable-next-line no-case-declarations
        if ( rows.length > 0 ) {
          if (columns[2].listGrade.length > 0 ) {
            const listGradeColumns = Object.keys(rows[0].listGrade).map((key, index) => {
              return {
                field: `${columns[2].listGrade[index].composition}`,
                headerName: `${columns[2].listGrade[index].composition} (${columns[2].listGrade[index].percent})`,
                renderCell: (params) =>
                  (
                    (getIndexById(params.row.id) != null) ?
                      (<TextField
                        size="small"
                        value={
                          rows[getIndexById(params.row.id) - 1].listGrade[index].grade
                        }
                        onChange={(e) => handleChangeGrade(e, getIndexById(params.row.id) - 1, index)}
                        disabled={!isEdit}
                      />)
                      :
                      (<Typography variant="body1">{`${params.row.listGrade[index].grade}`}</Typography>)
                  ),
                flex: 1
              }
            })
            return listGradeColumns
          }
        }
        return null
      case 'total':
        return {
          field: 'total',
          headerName: column.label,
          renderCell: (params) => <Typography variant="body1">{`${sumGradeComposition(params.row.listGrade)}`}</Typography>,
          flex: 1 // Set a flexible width for the column
        }
      case 'average':
        return {
          field: 'average',
          headerName: column.label,
          renderCell: (params) => <Typography variant="body1"></Typography>,
          flex: 1 // Set a flexible width for the column
        }
      default:
        return {
          renderCell: (params) => <Typography variant="body1">{params.row.value}</Typography>
        }
      }
    })
    .flat()
    .filter((column) => column !== null)

  const listAverage = averageComposition(rows)

  let rowsData = rows.map((row) => ({ ...row }))
  let columnsData = columnsForDataGrid

  if (rows.length > 0) {
    let averageRow = JSON.parse(JSON.stringify(rows[0]))
    averageRow.id = 'Average'
    averageRow.fullName = ''
    averageRow.total = listAverage[listAverage.length - 1]
    averageRow.listGrade.map((item, index) => {
      item.grade = listAverage[index]
    })
    rowsData.push(
      averageRow
    )
  }


  const getIndexById = (id) => {
    const index = rows.findIndex((row) => row.id === id);
    return index !== -1 ? index + 1 : null // +1 để bắt đầu từ 1, hoặc return null nếu không tìm thấy
  }

  const sumGradeComposition = (listGrade) => {
    let sum = 0
    if (listGrade) {
      listGrade.map((composition) => {
        if (composition.grade === '') {
          sum += 0
        } else {
          sum += parseFloat(composition.grade)
        }
      })
    }
    return sum.toFixed(2)
  }

  return (
    <Paper style={{ height: 'auto', width: '100%', overflow: 'hidden' }}>
      <DataGrid rows={rowsData} columns={columnsData} components={{ Toolbar: GridToolbar }} hideFooterRowCount
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
