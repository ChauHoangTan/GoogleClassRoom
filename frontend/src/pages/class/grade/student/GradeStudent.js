import { Container, Typography, Card, CardContent, Divider, Stack, IconButton, MenuItem, Menu, ListItemIcon, ListItemText, Box, TextField } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useState, useEffect } from 'react'
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
import { getAllGradeCompositionByStudentId, createNewReviewGrade } from '../../../../redux/APIs/gradeServices'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CardGrade ({ data }) {
  const title= 'Teacher posted a new assignment'
  const composition= data?.composition
  const time= convertTime(data?.time)
  const percent= `${data?.grade} / ${data?.scale}`

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

  const handleInputChangeExpectedGrade = (event) => {
    const inputValue = event.target.value
    const parsedValue = Number(inputValue)

    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > data?.scale) {
      setErrorText(`Invalid input. Please enter a positive number less than or equal to ${data?.scale}.`)
    } else {
      setErrorText('')
      setIsExpectedGrade(parsedValue)
    }
  }

  const handleInputChangeExplanation = (event) => {
    const inputValue = event.target.value
    setIsExplanation(inputValue)
  }

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const [errorText, setErrorText] = useState('')
  const [isExpectedGrade, setIsExpectedGrade] = useState(0)
  const [isExplanation, setIsExplanation] = useState('')

  const { classId } = useParams()

  const handleReviewRequest = async () => {
    handleCloseDialog()

    const gradeCompositionId = data?._id
    const studentId = userInfo?.userId
    const expectGrade = isExpectedGrade
    const oldGrade = data?.grade
    const explanation = isExplanation
    try {
      const result = await createNewReviewGrade(classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation)

      if (result.success)
        toast.success(result.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
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
            <Button autoFocus color="inherit" onClick={() => {handleReviewRequest()}}>
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
              ID: {userInfo?.userId}
            </Typography>
            <Typography>
              Name: {userInfo?.firstName} {userInfo?.lastName}
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
            <TextField type='number' size='small' sx={{ px: 2 }}
              onChange={handleInputChangeExpectedGrade}
              error={Boolean(errorText)}
              helperText={errorText}>
            </TextField>
            <Typography variant="body1"> / {data?.scale}</Typography>
          </Box>
          <TextField
            id=""
            label="Comment"
            fullWidth
            onChange={handleInputChangeExplanation}
          />
        </ Container>
      </Dialog>
    </>
  )
}

const convertTime = (time) => {
  // Tạo đối tượng Date từ chuỗi ISO
  const dateObject = new Date(time)

  // Lấy thông tin ngày, tháng, năm, giờ, phút và giây
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
  const day = dateObject.getDate()
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const seconds = dateObject.getSeconds()

  // Tạo chuỗi ngày tháng năm giờ phút giây
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

function GradeComposition () {
  const { classId } = useParams()

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const [isGradeCompositionList, setIsGradeCompositionList] = useState([])

  const totalGrade = isGradeCompositionList.reduce((acc, data) => {
    const grade = data?.grade || 0
    const scale = data?.scale || 1 // Assuming a default value of 1 if scale is not present or is 0
    return acc + (grade / scale)
  }, 0)

  useEffect(() => {
    // Get all grade compositon by userId
    const fetchData = async () => {
      try {
        const result = await getAllGradeCompositionByStudentId(classId, userInfo.userId)
        setIsGradeCompositionList(result.data)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchData()
  }, [])

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
        {isGradeCompositionList.map((data, index) => (
          data.isPublic &&
          <CardGrade
            key={index}
            data={data}
          />
        ))}
      </Stack>

      <Divider />

      <Container sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <Typography variant='h6'>
          Total grade: <Typography variant='body-2'>
            {totalGrade.toFixed(2)}
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