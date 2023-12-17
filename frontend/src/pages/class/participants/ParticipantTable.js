import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { Typography, IconButton, Avatar } from '@mui/material'


export default function ParticipantTable ({ columns, rows }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
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
                      switch (column.id) {
                      case 'avatar':
                        cellContent = <Avatar src={value} alt={`Avatar of ${row.fullName}`} />
                        break
                      case 'id':
                        cellContent = <Typography variant="subtitle1">{value}</Typography>
                        break
                      case 'fullName':
                        cellContent = <Typography variant="body1">{value}</Typography>
                        break
                      case 'isTeacher':
                        cellContent = !row.isTeacher && (
                          <IconButton>
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )
                        break
                      default:
                        cellContent = value
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : cellContent}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
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