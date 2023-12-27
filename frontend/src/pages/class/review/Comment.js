import { Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Grid,
  Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { createNewComment, deleteComment, getAllComment } from '../../../redux/APIs/gradeServices'
import { useState, useEffect, useContext } from 'react'
import { getAllCommentAction } from '../../../redux/actions/gradeActions'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { convertTime } from '../../../utils/timeConvert/timeConvert'
import { SocketContext } from '../../../Context/SocketProvider'

function Message ({ data, state }) {
  return (
    <Grid container py={1}>
      <Grid item xs={11.2} sx={{ order: state ? 0 : 1, textAlign: state ? 'right' : 'inherit' }}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold' }}> {data?.firstName} {data?.lastName} <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{convertTime(data?.time)}</Typography></Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>{data?.content}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={0.8} sx={{ justifyContent:'center', alignItems:'center', order: state ? 1 : 0 }}>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Avatar sx={{ width: 50, height: 50 }} alt={data?.firstName} src={data?.image}></Avatar>
        </Grid>
      </Grid>

    </Grid>
  )
}

function Comment ({ classId, gradeCompositionId, studentId, student_Id, composition, reviewId }) {

  const dispatch = useDispatch()

  const { socket } = useContext(SocketContext)

  const { isLoading, isError, comments, isSuccess } = useSelector(
    (state) => state.userGetAllComment
  )

  const { userInfo } = useSelector(
    (state) => state.userLogin
  )

  const [isContent, setIsContent] = useState('')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    dispatch(getAllCommentAction(classId, gradeCompositionId, studentId))
    if (isError) {
      toast.error(isError)
      dispatch({ type: 'GET_ALL_COMMENT_RESET' })
    }
  }, [dispatch, isError])

  const handleInputContent = (event) => {
    const inputValue = event.target.value
    setIsContent(inputValue)
  }

  let { isLoading: classLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  const handleClickComment = () => {
    if (isContent === '') {
      setErrorText('Invalid input.')
      return
    }

    const isTeacherComment = classInfo.isTeacherOfThisClass
    const content = isContent
    const fetchData = async () => {
      try {
        const result = await createNewComment(classId, gradeCompositionId, studentId, content, isTeacherComment)
        toast.success(result.message)
        dispatch(getAllCommentAction(classId, gradeCompositionId, studentId))

        if (classInfo.isTeacherOfThisClass) {
          const notificationData = {
            userSendId: userInfo?._id,
            userReceiverId: student_Id, // ID của học sinh nhận thông báo
            userName: userInfo?.firstName + ' ' + userInfo?.lastName,
            image: userInfo?.image,
            content: `Teacher send a message at request review ${composition}`,
            link: `/class/${classId}/review/${reviewId}`
          }

          console.log('notificationData', notificationData)
          socket?.emit('post_data', notificationData)
        } else {
          classInfo.teachers.forEach((teacher) => {
            const notificationData = {
              userSendId: userInfo?._id,
              userReceiverId: teacher, // ID của giáo viên nhận thông báo
              userName: userInfo?.firstName + ' ' + userInfo?.lastName,
              image: userInfo?.image,
              content: `Teacher send a message at request review ${composition}`,
              link: `/class/${classId}/review/${reviewId}`
            }
            console.log('notificationData', notificationData)
            socket?.emit('post_data', notificationData)
          }) 
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchData()

    setIsContent('')
    setErrorText('')
  }

  return (
    <>
      <Container sx={{
        borderRadius: 5,
        p: 3,
        // border: '2px solid #A9A9A9',
        my: 2
      }}>
        <Typography gutterBottom variant="h5" >
        Comment
        </Typography>
        <TextField size='large'
          fullWidth
          value={isContent}
          onChange={handleInputContent}
          error={Boolean(errorText)}
          helperText={errorText}>
        </TextField>

        <Button sx={{ my: 3 }} component="label" variant='contained' startIcon={<SendIcon />} onClick={() => {handleClickComment()}}>
          Comment
        </Button>

        <Stack spacing={1} py={1}>
          {!isLoading ? comments.data?.slice().reverse().map((data, index) => (
            <Message
              key={index}
              data={data}
              state={classInfo.isTeacherOfThisClass ? data.isTeacherComment ? true : false : data.isTeacherComment ? false : true}
            />
          )) : <></>}
        </Stack>
      </Container>
    </>
  )
}

export default Comment