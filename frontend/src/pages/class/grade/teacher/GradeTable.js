import { Typography, TablePagination, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import React, { useEffect, useState } from 'react'


export default function GradeTable ({ columns, rows, setRows, isEdit }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChangeGrade = (e, indexRow, indexGrade) => {
    const newGrade = e.target.value
    let newTextFields = [...rows]
    newTextFields[indexRow].listGrade[indexGrade].grade = newGrade
    setRows(newTextFields)
  }

  const rowTotal =
    { id: 1000, listGrade: rows[0]?.listGrade && rows[0].listGrade, total: '40' }

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
          averageComposition/rows.length
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
        averageComposition/rows.length
      )

      return averageCompositionList
    }
    else {
      return []
    }
  }

  let averages = averageComposition(rows)
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
              .map((row, indexRow) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      // Customized TableCell content based on column id
                      let cellContent
                      // Check if the column has listGrade
                      if (column.listGrade) {
                        cellContent = value.map((col, indexGrade) => (
                          <TableCell key={`${col.composition}`} align={col.align}>
                            <TextField
                              size="small"
                              value={
                                rows[indexRow].listGrade[indexGrade].grade
                              }
                              onChange={(e) => handleChangeGrade(e, indexRow, indexGrade)}
                              disabled={!isEdit}
                            />
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
                if (column.listGrade && value) {
                  cellContent = value.map((col, index) => (
                    <TableCell key={`${col.composition}`} align={col.align}>
                      {averages[index]}
                    </TableCell>
                  ))
                } else {
                  switch (column.id) {
                  case 'id':
                    cellContent = <Typography variant="subtitle1">Average Score</Typography>
                    break
                  case 'total':
                    cellContent = <Typography variant="body1">{averages.length > 0 && averages[averages.length - 1]}</Typography>
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
        rowsPerPageOptions={[1, 2, 10, 20, 25, 50, 100]}
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