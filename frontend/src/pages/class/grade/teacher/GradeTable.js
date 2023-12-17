import { Typography, TablePagination, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import React from 'react'

export default function GradeTable ({ columns, rows }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rowTotal =
    { id: 1000, listGrade: [
      { composition: 'Exercise 1', percent: '10%', grade: '8' },
      { composition: 'Exercise 2', percent: '10%', grade: '7' },
      { composition: 'Midterm', percent: '30%', grade: '25' },
      { composition: 'Finalterm', percent: '50%', grade: '40' }
    ], total: '40' }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <React.Fragment key={column.label}>
                  {column.listGrade ? (
                    column.listGrade.map((col) => (
                      <TableCell key={`${col.composition}`} align={col.align}>
                        {`${col.composition} (${col.percent})`}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell key={column.label} align={column.align}>
                      {column.label}
                    </TableCell>
                  )}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      // Customized TableCell content based on column id
                      let cellContent
                      // Check if the column has listGrade
                      if (column.listGrade) {
                        cellContent = value.map((col) => (
                          <TableCell key={`${col.composition}`} align={col.align}>
                            <TextField
                              size="small"
                              value={col.grade}
                            >
                              {/* {`${col.grade}`} */}
                            </TextField>
                          </TableCell>
                        ))
                      } else {
                        switch (column.id) {
                        case 'id':
                          cellContent = <Typography variant="subtitle1">{value}</Typography>
                          break
                        case 'fullName':
                          cellContent = <Typography variant="body1">{value}</Typography>
                          break
                        case 'total':
                          cellContent = <Typography variant="body1">{value}</Typography>
                          break
                        default:
                          cellContent = value
                        }
                        cellContent = <TableCell key={column.id} align={column.align}>{cellContent}</TableCell>
                      }
                      return cellContent
                    })}
                  </TableRow>
                )
              })}

            <TableRow hover role="checkbox" tabIndex={-1} key={rowTotal.code}>
              {columns.map((column) => {
                const value = rowTotal[column.id]
                // Customized TableCell content based on column id
                let cellContent
                // Check if the column has listGrade
                if (column.listGrade) {
                  cellContent = value.map((col) => (
                    <TableCell key={`${col.composition}`} align={col.align}>
                      10
                    </TableCell>
                  ))
                } else {
                  switch (column.id) {
                  case 'id':
                    cellContent = <Typography variant="subtitle1">Average Score</Typography>
                    break
                  case 'total':
                    cellContent = <Typography variant="body1">100</Typography>
                    break
                  }
                  cellContent = <TableCell key={column.id} align={column.align}>{cellContent}</TableCell>
                }
                return cellContent
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 10, 20, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
            'mt': '1em',
            'mb': '1em'
          }
        }}
      />
    </Paper>
  )
}