import { Container, Typography, Card, CardContent, Divider, Stack, IconButton, MenuItem, Menu, ListItemIcon, ListItemText, Box, TextField } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useState } from 'react'
import PreviewIcon from '@mui/icons-material/Preview'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CardGrade ({ title, composition, time, percent }) {
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
    handleClickOpenDialog()
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
          <Stack direction={'row'} alignItems='center' sx={{ gap: 2 }}>
            <IconButton aria-label="">
              <DragHandleIcon fontSize='large'/>
            </IconButton>
            <Stack>
              <Typography>{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
              <Typography variant='body-2' sx={{ fontStyle:'italic', color:'rgba(21, 139, 50, 0.7)' }}>{time}</Typography>
              <Typography sx={{ fontSize: 'small', fontStyle:'italic' }}>Status: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold', color:'rgba(21, 139, 50, 0.7)', fontSize: 'small' }}>Submitted</Typography></Typography>
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
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PreviewIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Review this assigment</ListItemText>
              </MenuItem>
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
              <Button autoFocus color="inherit" onClick={handleCloseDialog}>
              Review request
              </Button>
            </Toolbar>
          </AppBar>
          <Container sx={{
            borderRadius: 5,
            p: 3,
            border: '2px solid #A9A9A9',
            my: 2
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
        </Dialog>
      </React.Fragment>
    </>
  )
}

function GradeComposition () {
  return (
    <Container sx={{
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Grade
      </Typography>

      <Stack spacing={1} py={1}>
        <CardGrade title='Dev posted a new assignment' composition='Finalterm' time='12:00' percent='20/50' />
        <CardGrade title='Dev posted a new assignment' composition='Midterm' time='12:00' percent='25/30' />
        <CardGrade title='Dev posted a new assignment' composition='Exercise 2' time='12:00' percent='5/10' />
        <CardGrade title='Dev posted a new assignment' composition='Exercise 1' time='12:00' percent='10/10' />

      </Stack>

      <Divider />

      <Container sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <Typography variant='h6'>
          Total grade: <Typography variant='body-2'>
            100%
          </Typography>
        </Typography>
      </Container>

    </Container>
  )
}

export default function GradeTeacher () {

  return (
    <>
      <GradeComposition />
    </>
  )
}