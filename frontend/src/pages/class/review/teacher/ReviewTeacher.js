import { Container, Typography, Card, CardContent, Stack, IconButton, MenuItem, Menu, ListItemIcon, ListItemText, Box, TextField, Grid } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useState } from 'react'
import PreviewIcon from '@mui/icons-material/Preview'
import DeleteIcon from '@mui/icons-material/Delete'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CardGradeReview ({ title, composition, time, percent, status, expectedGrade }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card
        sx={{
          '&:hover': {
            bgcolor: '#A9A9A9'
          }
        }}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between',
          '&:last-child': {
            p: 0
          }
        }}>
          <Stack direction={'row'} alignItems='center' sx={{ gap: 2, p: 1 }}>
            <IconButton aria-label="">
              <DragHandleIcon fontSize='large'/>
            </IconButton>
            <Stack>
              <Typography>{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
              <Typography variant='body-2' sx={{ fontStyle:'italic', color:'rgba(21, 139, 50, 0.7)' }}>{time}</Typography>
              <Typography sx={{ fontSize: 'small', fontStyle:'italic' }}>Status: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold', color: status === 'pending' ? 'rgba(226, 255, 0, 0.9)' : 'rgba(39, 245, 46, 0.8)', fontSize: 'small' }}>{status}</Typography></Typography>
              <Typography sx={{ fontSize: 'small', fontStyle:'italic' }}>Expected grade: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold', fontSize: 'small' }}>{expectedGrade}</Typography></Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems='center'>
            <Typography variant='h6' sx={{ fontStyle:'italic', mx: 5 }}>{percent}</Typography>

            <IconButton fontSize='small'
              id="basic-button"
              aria-controls={open ? { composition } : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon/>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              {status == 'pending' ?
                <>
                  <MenuItem onClick={handleClickOpenDialog}>
                    <ListItemIcon>
                      <PreviewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Review this article</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete review request</ListItemText>
                  </MenuItem>
                </> :
                <MenuItem onClick={handleClickOpenDialog}>
                  <ListItemIcon>
                    <PreviewIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Preview review request</ListItemText>
                </MenuItem>
              }

            </Menu>
          </Stack>
        </CardContent>
      </Card>

      <React.Fragment>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleCloseDialog}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 1, flex: 0.5 }} variant="h6" component="div">
                Review
              </Typography>
              <Typography sx={{ flex: 1 }} variant="h6">{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
              <Button autoFocus color="inherit" onClick={handleCloseDialog} disabled={status !== 'pending'}>
                Return result
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container sx={{
            p: 3,
            my: 2
          }}>
            <Grid item
              sm={9}
              md={9}
            >
              <Container sx={{
                borderRadius: 5,
                border: '2px solid #A9A9A9',
                p: 2,
                mb: 2
              }}>
                <Typography gutterBottom variant="h5" >
                Review of Teacher
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                ID: 20127662
                  </Typography>
                  <Typography>
                Name: Nguyễn Đình Văn
                  </Typography>
                  <Typography>
                Grade compostion: {composition}
                  </Typography>
                  <Typography>
                Old grade: {percent}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 0 }}>
                  <Typography variant="body1">Grade after reviewed:  </Typography>
                  <TextField size='small' sx={{ px: 2 }}></TextField>
                  <Typography variant="body1"> / 100</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                />
              </ Container>

              <Container sx={{
                borderRadius: 5,
                border: '2px solid #A9A9A9',
                p: 2
              }}>
                <Typography gutterBottom variant="h5" >
                  Review Grade
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                ID: 20127662
                  </Typography>
                  <Typography>
                Name: Nguyễn Đình Văn
                  </Typography>
                  <Typography>
                Grade compostion: {composition}
                  </Typography>
                  <Typography>
                Old grade: {percent}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 0 }}>
                  <Typography variant="body1">Expeted grade:  </Typography>
                  <TextField size='small' sx={{ px: 2 }}></TextField>
                  <Typography variant="body1"> / 100</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                />
              </ Container>
            </Grid>

            <Grid item
              sm={3}
              md={3}
            >
              <Container sx={{
                borderRadius: 5,
                border: '2px solid #A9A9A9',
                p: 2,
                ml: 2
              }}>
                <Typography gutterBottom variant="h5" >
                  Related reviews
                </Typography>

                <Stack spacing={1} py={1}>
                  <CardRelatedReview title='Dev posted a new assignment' composition='Finalterm' time='12:00' percent='20/50' status='Reviewed' expectedGrade='10' />
                  <CardRelatedReview title='Dev posted a new assignment' composition='Midterm' time='12:00' percent='25/30' status='Reviewed' expectedGrade='20' />
                  <CardRelatedReview title='Dev posted a new assignment' composition='Exercise 2' time='12:00' percent='5/10' status='Reviewed' expectedGrade='30' />
                  <CardRelatedReview title='Dev posted a new assignment' composition='Exercise 1' time='12:00' percent='10/10' status='Reviewed' expectedGrade='40' />
                </Stack>

              </ Container>
            </Grid>
          </Grid>

        </Dialog>
      </React.Fragment>
    </>
  )
}

function CardRelatedReview ({ title, composition, time, percent, status, expectedGrade }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card
        sx={{
          '&:hover': {
            bgcolor: '#A9A9A9'
          }
        }}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between',
          '&:last-child': {
            p: 0
          }
        }}>
          <Stack direction={'row'} alignItems='center' sx={{ gap: 2, p: 3 }}>
            <Stack>
              <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography>
              <Typography variant='body-2' sx={{ fontStyle:'italic', color:'rgba(21, 139, 50, 0.7)' }}>{time}</Typography>
              <Typography sx={{ fontSize: 'small', fontStyle:'italic' }}>Status: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold', color: status === 'pending' ? 'rgba(226, 255, 0, 0.9)' : 'rgba(39, 245, 46, 0.8)', fontSize: 'small' }}>{status}</Typography></Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems='center'>
            <Typography variant='h6' sx={{ fontStyle:'italic', mx: 1 }}>{percent}</Typography>

            <IconButton fontSize='small'
              id="basic-button"
              aria-controls={open ? { composition } : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon/>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              {status == 'pending' ?
                <>
                  <MenuItem onClick={handleClickOpenDialog}>
                    <ListItemIcon>
                      <PreviewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Review this article</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete review request</ListItemText>
                  </MenuItem>
                </> :
                <MenuItem onClick={handleClickOpenDialog}>
                  <ListItemIcon>
                    <PreviewIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Preview review request</ListItemText>
                </MenuItem>
              }

            </Menu>
          </Stack>
        </CardContent>
      </Card>

      <React.Fragment>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleCloseDialog}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 1, flex: 0.5 }} variant="h6" component="div">
                Review
              </Typography>
              <Typography sx={{ flex: 1 }} variant="h6">{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
              <Button autoFocus color="inherit" onClick={handleCloseDialog} disabled={status !== 'pending'}>
                Return result
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container sx={{
            p: 3,
            my: 2
          }}>
            <Grid item
              sm={9}
              md={9}
            >
              <Container sx={{
                borderRadius: 5,
                border: '2px solid #A9A9A9',
                p: 2,
                mb: 2
              }}>
                <Typography gutterBottom variant="h5" >
                Review of Teacher
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                ID: 20127662
                  </Typography>
                  <Typography>
                Name: Nguyễn Đình Văn
                  </Typography>
                  <Typography>
                Grade compostion: {composition}
                  </Typography>
                  <Typography>
                Old grade: {percent}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 0 }}>
                  <Typography variant="body1">Grade after reviewed:  </Typography>
                  <TextField size='small' sx={{ px: 2 }}></TextField>
                  <Typography variant="body1"> / 100</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                />
              </ Container>

              <Container sx={{
                borderRadius: 5,
                border: '2px solid #A9A9A9',
                p: 2
              }}>
                <Typography gutterBottom variant="h5" >
                  Review Grade
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>
                ID: 20127662
                  </Typography>
                  <Typography>
                Name: Nguyễn Đình Văn
                  </Typography>
                  <Typography>
                Grade compostion: {composition}
                  </Typography>
                  <Typography>
                Old grade: {percent}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 0 }}>
                  <Typography variant="body1">Expeted grade:  </Typography>
                  <TextField size='small' sx={{ px: 2 }}></TextField>
                  <Typography variant="body1"> / 100</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                />
              </ Container>
            </Grid>

            <Grid item
              sm={3}
              md={3}
            >
              <Container sx={{
                borderRadius: 5,
                border: '2px solid #A9A9A9',
                p: 2,
                ml: 2
              }}>
                <Typography gutterBottom variant="h5" >
                  Related reviews
                </Typography>

                <Stack spacing={1} py={1}>
                  <CardRelatedReview title='Dev posted a new assignment' composition='Finalterm' time='12:00' percent='20/50' status='reviewed' expectedGrade='10' />
                  <CardRelatedReview title='Dev posted a new assignment' composition='Midterm' time='12:00' percent='25/30' status='reviewed' expectedGrade='20' />
                  <CardRelatedReview title='Dev posted a new assignment' composition='Exercise 2' time='12:00' percent='5/10' status='reviewed' expectedGrade='30' />
                  <CardRelatedReview title='Dev posted a new assignment' composition='Exercise 1' time='12:00' percent='10/10' status='reviewed' expectedGrade='40' />

                </Stack>

              </ Container>
            </Grid>
          </Grid>

        </Dialog>
      </React.Fragment>
    </>
  )
}

function GradeReviewPending () {
  return (
    <Container sx={{
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Pending Review
      </Typography>

      <Stack spacing={1} py={1}>
        <CardGradeReview title='Dev posted a new assignment' composition='Finalterm' time='12:00' percent='20/50' status='pending' expectedGrade='10' />
        <CardGradeReview title='Dev posted a new assignment' composition='Midterm' time='12:00' percent='25/30' status='pending' expectedGrade='20' />
        <CardGradeReview title='Dev posted a new assignment' composition='Exercise 2' time='12:00' percent='5/10' status='pending' expectedGrade='30' />
        <CardGradeReview title='Dev posted a new assignment' composition='Exercise 1' time='12:00' percent='10/10' status='pending' expectedGrade='40' />

      </Stack>
    </Container>
  )
}

function GradeReviewed () {
  return (
    <Container sx={{
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Reviewed
      </Typography>

      <Stack spacing={1} py={1}>
        <CardGradeReview title='Dev posted a new assignment' composition='Finalterm' time='12:00' percent='20/50' status='Reviewed' expectedGrade='10' />
        <CardGradeReview title='Dev posted a new assignment' composition='Midterm' time='12:00' percent='25/30' status='Reviewed' expectedGrade='20' />
        <CardGradeReview title='Dev posted a new assignment' composition='Exercise 2' time='12:00' percent='5/10' status='Reviewed' expectedGrade='30' />
        <CardGradeReview title='Dev posted a new assignment' composition='Exercise 1' time='12:00' percent='10/10' status='Reviewed' expectedGrade='40' />

      </Stack>
    </Container>
  )
}

export default function ReviewStudent () {

  return (
    <>
      <Typography gutterBottom variant="h4" sx={{ my: 1, px: 3 }} >History</Typography>

      <GradeReviewPending/>

      <GradeReviewed/>
    </>
  )
}