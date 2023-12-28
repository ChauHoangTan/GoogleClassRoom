import { Container, Typography, Card, CardContent, Stack, IconButton, MenuItem, Menu, ListItemIcon, ListItemText, Box, TextField, Grid } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useState, useEffect, useContext } from 'react'
import PreviewIcon from '@mui/icons-material/Preview'
import DeleteIcon from '@mui/icons-material/Delete'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { convertTime } from '../../../../utils/timeConvert/timeConvert'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { getAllReviewGradeCompositionAction, getAllReviewGradeCompositionByStudentIdAction } from '../../../../redux/actions/gradeActions'
import { updateReviewGrade } from '../../../../redux/APIs/gradeServices'
import Comment from '../Comment'
import { SocketContext } from '../../../../Context/SocketProvider'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CardGradeReview ({ data, isShowDetail }) {
  const title = 'Student need to review assignment: '
  const composition = data?.composition
  const time = convertTime(data?.time)
  const percent = `${data?.oldGrade}/${data?.scale}`
  const status = data?.status
  const expectedGrade = data?.expectGrade

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpenDialog = () => {
    handleClose()
    setOpenDialog(true)
    // const studentId = data?.studentId
    // dispatch(getAllReviewGradeCompositionByStudentIdAction(classId, studentId))
  }

  useEffect(() => {
    const studentId = data?.studentId
    dispatch(getAllReviewGradeCompositionByStudentIdAction(classId, studentId))
  }, [])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseAllDialog = async () => {
    setOpenDialog(false)
  }

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [errorText, setErrorText] = useState('')
  const [isReviewedGrade, setIsReviewedGrade] = useState(0)
  const [isExplanation, setIsExplanation] = useState('')

  const { classId } = useParams()

  const { socket } = useContext(SocketContext)

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const dispatch = useDispatch()

  const handleReturnResult = async () => {
    if (isReviewedGrade === 0 || isExplanation === '') {
      toast.error('Please enter reviewed grade and comment')
      return
    }

    handleCloseDialog()

    const expectGrade = data?.expectGrade
    const explanation = data?.explanation
    const explanationTeacher = isExplanation
    const gradeCompositionId = data?.gradeCompositionId
    const oldGrade = data?.oldGrade
    const reviewedGrade = isReviewedGrade
    const status = 'Reviewed'
    const studentId = data?.studentId
    const teacher_Id = userInfo?._id

    try {
      const result = await updateReviewGrade(classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation, explanationTeacher, reviewedGrade, status, teacher_Id)

      if (result.success) {
        dispatch(getAllReviewGradeCompositionAction(classId))
        toast.success(result.message)

        const notificationData = {
          userSendId: userInfo?._id,
          userReceiverId: data?.student_Id, // ID của sinh viên nhận thông báo
          userName: userInfo?.firstName + ' ' + userInfo?.lastName,
          image: userInfo?.image,
          content: `Teacher return result review ${data?.composition}`,
          link: `/class/${classId}/review/${data?._id}`
        }
        console.log('notificationData', notificationData)
        socket?.emit('post_data', notificationData)
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleInputChangeReviewedGrade = (event) => {
    const inputValue = event.target.value
    const parsedValue = Number(inputValue)

    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > data?.scale) {
      setErrorText(`Invalid input. Please enter a positive number less than or equal to ${data?.scale}.`)
    } else {
      setErrorText('')
      setIsReviewedGrade(parsedValue)
    }
  }

  const handleInputChangeExplanationTeacher = (event) => {
    const inputValue = event.target.value
    setIsExplanation(inputValue)
  }

  const { isLoading, isError, reviews, isSuccess } = useSelector(
    (state) => state.userGetAllReviewGradeCompositionByStudentId
  )

  useEffect(() => {
    // Check if is have url to show review detail
    if (isShowDetail) {
      handleClickOpenDialog()
    }
  }, [])

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
              <Typography sx={{ fontSize: 'small', fontStyle:'italic' }}>Status: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold', color: status === 'Pending' ? 'rgba(226, 255, 0, 0.9)' : 'rgba(39, 245, 46, 0.8)', fontSize: 'small' }}>{status}</Typography></Typography>
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
              {status === 'Pending' ?
                [
                  <MenuItem key="review" onClick={handleClickOpenDialog}>
                    <ListItemIcon>
                      <PreviewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Review this article</ListItemText>
                  </MenuItem>,
                  <MenuItem key="delete" disabled onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete review request</ListItemText>
                  </MenuItem>
                ] :
                <MenuItem onClick={() => {handleClickOpenDialog(), handleClose()}}>
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
                onClick={() => {handleCloseAllDialog()}}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 1, flex: 0.5 }} variant="h6" component="div">
                Review
              </Typography>
              <Typography sx={{ flex: 1 }} variant="h6">{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
              <Button autoFocus color="inherit" onClick={() => {handleReturnResult()}} disabled={status !== 'Pending'}>
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
                  <Typography variant="body1">Grade after reviewed:  </Typography>
                  <TextField size='small'
                    sx={{ px: 2 }}
                    disabled={status !== 'Pending'}
                    defaultValue={data?.reviewedGrade}
                    onChange={handleInputChangeReviewedGrade}
                    error={Boolean(errorText)}
                    helperText={errorText}>
                  </TextField>
                  <Typography variant="body1"> / {data?.scale}</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                  disabled={status !== 'Pending'}
                  defaultValue={data?.explanationTeacher}
                  onChange={handleInputChangeExplanationTeacher}
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
                ID: {data?.studentId}
                  </Typography>
                  <Typography>
                Name: {data?.studentFirstName} {data?.studentLastName}
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
                  <TextField size='small' sx={{ px: 2 }} disabled defaultValue={data?.expectGrade}></TextField>
                  <Typography variant="body1"> / {data?.scale}</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                  disabled
                  defaultValue={data?.explanation}
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

                <Stack spacing={1} py={1} sx={{ maxHeight: '100%', overflowY: 'auto' }}>
                  {!isLoading ? reviews.data?.allReviews.map((data, index) => (
                    <CardRelatedReview key={index} data={data} close={handleCloseDialog} />
                  )): <></>}

                </Stack>

              </ Container>
            </Grid>
          </Grid>

          <Comment classId={classId} gradeCompositionId={data?.gradeCompositionId} studentId={data?.studentId} student_Id={data?.student_Id} composition={data?.composition} reviewId={data?._id}/>
        </Dialog>
      </React.Fragment>
    </>
  )
}

function CardRelatedReview ({ data, close }) {

  const title = 'Student need to review assignment: '
  const composition = data?.composition
  const time = convertTime(data?.time)
  const percent = `${data?.oldGrade}/${data?.scale}`
  const status = data?.status

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleClickOpenDialog = () => {
    // close()
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseAllDialog = async () => {
    setOpenDialog(false)
  }

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [errorText, setErrorText] = useState('')
  const [isReviewedGrade, setIsReviewedGrade] = useState(0)
  const [isExplanation, setIsExplanation] = useState('')

  const { classId } = useParams()

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const { socket } = useContext(SocketContext)

  const dispatch = useDispatch()

  const handleReturnResult = async () => {
    if (isReviewedGrade === 0 || isExplanation === '') {
      toast.error('Please enter reviewed grade and comment')
      return
    }

    handleCloseDialog()

    const expectGrade = data?.expectGrade
    const explanation = data?.explanation
    const explanationTeacher = isExplanation
    const gradeCompositionId = data?.gradeCompositionId
    const oldGrade = data?.oldGrade
    const reviewedGrade = isReviewedGrade
    const status = 'Reviewed'
    const studentId = data?.studentId
    const teacher_Id = userInfo?._id

    try {
      const result = await updateReviewGrade(classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation, explanationTeacher, reviewedGrade, status, teacher_Id)

      if (result.success) {
        dispatch(getAllReviewGradeCompositionAction(classId))
        toast.success(result.message)

        console.log('data', data)

        const notificationData = {
          userSendId: userInfo?._id,
          userReceiverId: data?.student_Id, // ID của sinh viên nhận thông báo
          userName: userInfo?.firstName + ' ' + userInfo?.lastName,
          image: userInfo?.image,
          content: `Teacher return result review ${data?.composition}`,
          link: `/class/${classId}/review/${data?._id}`
        }
        console.log('notificationData', notificationData)
        socket?.emit('post_data', notificationData)
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleInputChangeReviewedGrade = (event) => {
    const inputValue = event.target.value
    const parsedValue = Number(inputValue)

    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > data?.scale) {
      setErrorText(`Invalid input. Please enter a positive number less than or equal to ${data?.scale}.`)
    } else {
      setErrorText('')
      setIsReviewedGrade(parsedValue)
    }
  }

  const handleInputChangeExplanationTeacher = (event) => {
    const inputValue = event.target.value
    setIsExplanation(inputValue)
  }

  const { isLoading, isError, reviews, isSuccess } = useSelector(
    (state) => state.userGetAllReviewGradeCompositionByStudentId
  )

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
              <Typography sx={{ fontSize: 'small', fontStyle:'italic' }}>Status: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold', color: status === 'Pending' ? 'rgba(226, 255, 0, 0.9)' : 'rgba(39, 245, 46, 0.8)', fontSize: 'small' }}>{status}</Typography></Typography>
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
              {status === 'Pending' ?
                [
                  <MenuItem key="review" onClick={handleClickOpenDialog}>
                    <ListItemIcon>
                      <PreviewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Review this article</ListItemText>
                  </MenuItem>,
                  <MenuItem key="delete" onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete review request</ListItemText>
                  </MenuItem>
                ] :
                <MenuItem onClick={() => {handleClickOpenDialog(), handleClose()}}>
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
                onClick={() => {handleCloseAllDialog()}}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 1, flex: 0.5 }} variant="h6" component="div">
                Review
              </Typography>
              <Typography sx={{ flex: 1 }} variant="h6">{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
              <Button autoFocus color="inherit" onClick={() => {handleReturnResult()}} disabled={status !== 'Pending'}>
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
                  <Typography variant="body1">Grade after reviewed:  </Typography>
                  <TextField size='small'
                    sx={{ px: 2 }}
                    disabled={status !== 'Pending'}
                    defaultValue={data?.reviewedGrade}
                    onChange={handleInputChangeReviewedGrade}
                    error={Boolean(errorText)}
                    helperText={errorText}>
                  </TextField>
                  <Typography variant="body1"> / {data?.scale}</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                  disabled={status !== 'Pending'}
                  defaultValue={data?.explanationTeacher}
                  onChange={handleInputChangeExplanationTeacher}
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
                ID: {data?.studentId}
                  </Typography>
                  <Typography>
                Name: {data?.studentFirstName} {data?.studentLastName}
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
                  <TextField size='small' sx={{ px: 2 }} disabled defaultValue={data?.expectGrade}></TextField>
                  <Typography variant="body1"> / {data?.scale}</Typography>
                </Box>
                <TextField
                  id=""
                  label="Comment"
                  fullWidth
                  disabled
                  defaultValue={data?.explanation}
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
                  {!isLoading ? reviews.data?.allReviews.map((data, index) => (
                    <CardRelatedReview key={index} data={data} close={handleCloseDialog} />
                  )): <></>}

                </Stack>

              </ Container>
            </Grid>
          </Grid>

          <Comment classId={classId} gradeCompositionId={data?.gradeCompositionId} studentId={data?.studentId} student_Id={data?.student_Id} composition={data?.composition} reviewId={data?._id}/>
        </Dialog>
      </React.Fragment>
    </>
  )
}

function GradeReviewPending ({ reviewList, isShowReview }) {
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
        {reviewList &&
          reviewList.map((data, index) => {
            const isShowDetail = data._id === isShowReview
            return (
              <CardGradeReview
                key={index}
                data={data}
                isShowDetail={isShowDetail}
              />
            )
          })}
      </Stack>
    </Container>
  )
}

function GradeReviewed ({ reviewList, isShowReview }) {
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
        {reviewList &&
          reviewList.map((data, index) => {
            const isShowDetail = data._id === isShowReview
            return (
              <CardGradeReview
                key={index}
                data={data}
                isShowDetail={isShowDetail}
              />
            )
          })}
      </Stack>
    </Container>
  )
}

export default function ReviewStudent () {

  const dispatch = useDispatch()
  const { isLoading, isError, reviews, isSuccess } = useSelector(
    (state) => state.userGetAllReviewGradeComposition
  )

  const { classId, reviewId } = useParams()

  useEffect(() => {
    dispatch(getAllReviewGradeCompositionAction(classId))
    if (isError) {
      toast.error(isError)
      dispatch({ type: 'GET_ALL_REVIEW_RESET' })
    }
  }, [dispatch, isError])

  return (
    <>
      <Typography gutterBottom variant="h4" sx={{ my: 1, px: 3 }} >History</Typography>

      <GradeReviewPending reviewList={!isLoading ? reviews.data?.pendingReviews : []} isShowReview={reviewId}/>

      <GradeReviewed reviewList={!isLoading ? reviews.data?.reviewedReviews : []} isShowReview={reviewId}/>
    </>
  )
}