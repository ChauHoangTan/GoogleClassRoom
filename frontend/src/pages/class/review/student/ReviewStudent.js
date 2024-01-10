import { Container, Typography, Card, CardContent, Stack, IconButton, MenuItem, Menu, ListItemIcon, ListItemText, Box, TextField } from '@mui/material'
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
import { updateReviewGrade, deleteReviewGrade } from '../../../../redux/APIs/gradeServices'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { convertTime } from '../../../../utils/timeConvert/timeConvert'
import { getAllReviewGradeCompositionByStudentIdAction } from '../../../../redux/actions/gradeActions'
import Comment from '../Comment'
import { SocketContext } from '../../../../Context/SocketProvider'
import Loader from '../../../../components/notification/Loader'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CardGradeReview ({ data, isShowDetail }) {

  const title = 'Student need to review assignment: '
  const composition = data?.composition
  const time = convertTime(data?.time)
  const percent = `${data?.oldGrade} / ${data?.scale}`
  const status = data?.status
  const expectedGrade = data?.expectGrade

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const [errorText, setErrorText] = useState('')
  const [isExpectedGrade, setIsExpectedGrade] = useState(0)
  const [isExplanation, setIsExplanation] = useState('')

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const { classId } = useParams()

  // eslint-disable-next-line no-unused-vars
  let { isLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  const { socket } = useContext(SocketContext)

  const dispatch = useDispatch()

  const handleReviewRequest = async () => {
    if (isExpectedGrade === 0 || isExplanation === '') {
      toast.error('Please enter expected grade and comment')
      return
    }

    handleCloseDialog()

    const gradeCompositionId = data?.gradeCompositionId
    const studentId = userInfo?.userId
    const expectGrade = isExpectedGrade
    const oldGrade = data?.grade
    const explanation = isExplanation
    try {
      const result = await updateReviewGrade(classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation)
      if (result.success) {
        dispatch(getAllReviewGradeCompositionByStudentIdAction(classId, studentId))
        toast.success(result.message)

        classInfo.teachers.forEach((teacher) => {
          const notificationData = {
            userSendId: userInfo?._id,
            userReceiverId: teacher, // ID của giáo viên nhận thông báo
            userName: userInfo?.firstName + ' ' + userInfo?.lastName,
            image: userInfo?.image,
            content: `Student request review ${data?.composition}`,
            link: `/class/${classId}/review/${data?._id}`
          }
          socket?.emit('post_data', notificationData)
        })
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
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

  const handleClickDelete = async () => {
    handleClose()
    const gradeCompositionId = data?.gradeCompositionId
    const userId = data?.studentId
    try {
      const result = await deleteReviewGrade(classId, gradeCompositionId, userId )

      if (result.success) {
        toast.success(result.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }

    const studentId = userInfo?.userId
    dispatch(getAllReviewGradeCompositionByStudentIdAction(classId, studentId))
  }

  const handleClickOpenDialog = () => {
    handleClose()
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

  useEffect(() => {
    // Check if is have url to show review detail
    if (isShowDetail) {
      handleClickOpenDialog()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Card
        sx={{
          '&:hover': {
            bgcolor: '#D3D3D3'
          },
          transition: 'background-color 0.4s',
          py: 1
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
                  <MenuItem key="edit" onClick={handleClickOpenDialog}>
                    <ListItemIcon>
                      <PreviewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit this review</ListItemText>
                  </MenuItem>,
                  <MenuItem key="delete" onClick={() => {handleClickDelete()}}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete review request</ListItemText>
                  </MenuItem>
                ] : [
                  <MenuItem key="preview" onClick={handleClickOpenDialog}>
                    <ListItemIcon>
                      <PreviewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Preview review request</ListItemText>
                  </MenuItem>,
                  <MenuItem key="delete" onClick={() => {handleClickDelete()}}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete review request</ListItemText>
                  </MenuItem>
                ]
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
              <Button autoFocus color="inherit" onClick={() => {handleReviewRequest()}} disabled={status !== 'Pending'}>
                Review request
              </Button>
            </Toolbar>
          </AppBar>
          {status !== 'Pending' && <>
            <Container sx={{
              borderRadius: 2,
              p: 3,
              border: '2px solid #A9A9A9',
              my: 2
            }}>
              <Typography gutterBottom variant="h5" >
                Review of Teacher
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>
                ID: {data?.teacherId}
                </Typography>
                <Typography>
                Name: {data?.teacherFirstName} {data?.teacherLastName}
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
                <TextField size='small' sx={{ px: 2 }} disabled defaultValue={data?.reviewedGrade}></TextField>
                <Typography variant="body1"> / {data?.scale}</Typography>
              </Box>
              <TextField
                id=""
                label="Comment"
                fullWidth
                disabled
                defaultValue={data?.explanationTeacher}
              />
            </ Container>
          </>}
          <Container sx={{
            borderRadius: 2,
            p: 3,
            border: '2px solid #A9A9A9',
            my: 2
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
              <TextField type='number' size='small' sx={{ px: 2 }} disabled={status !== 'Pending'}
                onChange={handleInputChangeExpectedGrade}
                error={Boolean(errorText)}
                helperText={errorText}
                defaultValue={data?.expectGrade}
              ></TextField>
              <Typography variant="body1"> / {data?.scale}</Typography>
            </Box>
            <TextField
              id=""
              label="Comment"
              fullWidth
              disabled={status !== 'Pending'}
              onChange={handleInputChangeExplanation}
              defaultValue={data?.explanation}
            />
          </ Container>

          <Comment classId={classId} gradeCompositionId={data?.gradeCompositionId} studentId={data?.studentId} student_Id={data?.student_Id} composition={composition} reviewId={data?._id}/>

        </Dialog>
      </React.Fragment>
    </>
  )
}

function GradeReviewPending ({ reviewList, isShowReview, isLoading }) {
  return (
    <Container sx={{
      borderRadius: 2,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Pending Review
      </Typography>

      {
        isLoading ?
          <Loader/>
          :
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
      }
    </Container>
  )
}

function GradeReviewed ({ reviewList, isShowReview, isLoading }) {
  return (
    <Container sx={{
      borderRadius: 2,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Reviewed
      </Typography>

      {
        isLoading ?
          <Loader />
          :
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
      }
    </Container>
  )
}

export default function ReviewStudent () {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError, reviews, isSuccess } = useSelector(
    (state) => state.userGetAllReviewGradeCompositionByStudentId
  )

  const { classId, reviewId } = useParams()

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  useEffect(() => {
    const studentId = userInfo?.userId
    dispatch(getAllReviewGradeCompositionByStudentIdAction(classId, studentId))

    if (isError) {
      toast.error(isError)
      dispatch({ type: 'GET_ALL_REVIEW_BY_STUDENT_ID_RESET' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      <Typography gutterBottom variant="h4" sx={{ my: 1, px: 3 }} >History</Typography>

      <GradeReviewPending reviewList={!isLoading ? reviews?.data?.pendingReviews : []} isShowReview={reviewId} isLoading={isLoading}/>

      <GradeReviewed reviewList={!isLoading ? reviews?.data?.reviewedReviews : []} isShowReview={reviewId} isLoading={isLoading}/>
    </>
  )
}