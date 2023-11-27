import { Container, Typography, Card, CardContent, Divider, Stack, IconButton, MenuItem, Menu, ListItemIcon, ListItemText } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useState } from 'react'
import PreviewIcon from '@mui/icons-material/Preview'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'listGrade', label: 'List Grade', minWidth: 170, listGrade: [
    { composition: 'Exercise 1', percent: '10%' },
    { composition: 'Exercise 2', percent: '10%' },
    { composition: 'Midterm', percent: '30%' },
    { composition: 'Finalterm', percent: '50%' }
    // Add more exercises if needed
  ] },
  { id: 'total', label: 'Total', minWidth: 170 }
]

const rows = [
  { id: 1, fullName: 'John Doe', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '25' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '40'
  },
  { id: 2, fullName: 'Jane Smith', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '6' },
    { composition: 'Midterm', percent: '30%', grade: '22' },
    { composition: 'Finalterm', percent: '50%', grade: '45' }
  ], total: '30'
  },
  { id: 3, fullName: 'Bob Johnson', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '5' },
    { composition: 'Exercise 2', percent: '10%', grade: '8' },
    { composition: 'Midterm', percent: '30%', grade: '28' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '30'
  },
  // Add more entries as needed
  { id: 4, fullName: 'Alice Brown', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '9' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '24' },
    { composition: 'Finalterm', percent: '50%', grade: '38' }
  ], total: '30'
  },
  { id: 5, fullName: 'Charlie Davis', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '26' },
    { composition: 'Finalterm', percent: '50%', grade: '42' }
  ], total: '35'
  },
  { id: 6, fullName: 'Eva White', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '23' },
    { composition: 'Finalterm', percent: '50%', grade: '39' }
  ], total: '38'
  },
  { id: 7, fullName: 'David Black', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '6' },
    { composition: 'Exercise 2', percent: '10%', grade: '8' },
    { composition: 'Midterm', percent: '30%', grade: '25' },
    { composition: 'Finalterm', percent: '50%', grade: '37' }
  ], total: '30'
  },
  { id: 8, fullName: 'Grace Lee', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '5' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '27' },
    { composition: 'Finalterm', percent: '50%', grade: '41' }
  ], total: '31'
  },
  { id: 9, fullName: 'Frank Adams', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '6' },
    { composition: 'Midterm', percent: '30%', grade: '22' },
    { composition: 'Finalterm', percent: '50%', grade: '36' }
  ], total: '31'
  },
  { id: 10, fullName: 'Helen Taylor', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '24' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '40'
  }
]

function CardGrade ({ title, composition, time, percent }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
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

  const [isOpenCreateNewGradeComposition, setIsOpenCreateNewGradeComposition] = useState(false)

  const handleOpenCreateNewGradeComposition = () => {
    setIsOpenCreateNewGradeComposition(!isOpenCreateNewGradeComposition)
  }

  return (
    <>
      <GradeComposition />
    </>
  )
}