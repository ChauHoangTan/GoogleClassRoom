import { Grid, IconButton, Stack, Typography, Menu, MenuItem } from '@mui/material'
import './style.scss'
import Container from '@mui/material/Container'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../components/notification/Loader'
import { getInvitationStudentByUrlService } from '../../../redux/APIs/classServices'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import copy from 'clipboard-copy'
import { useParams } from 'react-router'
import { getAllGradeCompositionByClassIdAction } from '../../../redux/actions/gradeActions'
import { mapOrder } from '../../../utils/SortOrderArray/mapOrder'
import EditIcon from '@mui/icons-material/Edit'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { leaveThisClass, updateClassDetailService } from '../../../redux/APIs/classServices'
import { useNavigate } from 'react-router-dom'
import { changStateAction } from '../../../redux/actions/menuActions'
import { convertTime } from '../../../utils/timeConvert/timeConvert'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createClassInfoValidation } from '../../../components/validation/classValidation'
import { Box, Button, Modal, TextField } from '@mui/material'
import { getClassByIDActions } from '../../../redux/actions/classActions'

const styleModalEditClass = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #005B48',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
}

const ModalEditClass = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createClassInfoValidation)
  })

  const { classId } = useParams()

  // on submit
  const onSubmit = (data) => {
    handleOpen()
    const fetchData = async () => {
      try {
        const result = await updateClassDetailService(classId, data)
        toast.success(result.message)
        dispatch(getClassByIDActions(classId))
        dispatch(changStateAction())
      } catch (error) {
        toast.error(error.response)
      }
    }
    fetchData()
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          handleOpen()
          reset()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalEditClass}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Edit class
          </Typography>
          <TextField {...register('className')}
            error={!!errors.className}
            helperText={errors.className?.message || ''}
            required
            name="className"
            id="inputName"
            label="Enter class name"
            variant="outlined"
            sx={{ mt:'20px', width:'100%' }}/>
          <TextField {...register('codeClassName')}
            error={!!errors.codeClassName}
            helperText={errors.codeClassName?.message || ''}
            required
            name="codeClassName"
            id="inputCodeClassName"
            label="Enter code class name"
            variant="outlined"
            sx={{ mt:'20px', width:'100%' }}/>
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={() => {handleOpen(); reset() }}>Cancel</Button>
            <Button type="submit" variant='contained'>Update</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

const HeadComponent = ({ name, title, background }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { classId } = useParams()
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditClass = () => {
    // Handle logic for editing class
    handleClose()
    setIsOpen(true)
  }

  const dispatch = useDispatch()

  const handleLeaveClass = () => {

    const fetchData = async () => {
      try {
        const result = await leaveThisClass(classId)
        toast.success(result.message)
        dispatch(changStateAction())
        navigate('/home', { replace: true, state: { reload: true } })
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchData()

    handleClose()
  }

  // eslint-disable-next-line no-unused-vars
  const { isLoading: classLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  return (
    <Stack className='headComponent'>
      <img src={background}/>
      <Stack>
        <Typography className='name' variant='h4'>{name}</Typography>
        <Typography className='title' variant='h6'>{title}</Typography>
      </Stack>
      <IconButton onClick={handleClick}>
        <InfoOutlinedIcon sx={{ transform:'scale(1.2)' }}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          classInfo?.data?.isTeacherOfThisClass &&
            <MenuItem onClick={handleEditClass}>
              <EditIcon fontSize="small" style={{ marginRight: '8px' }} />
            Edit Class
            </MenuItem>
        }

        <MenuItem onClick={() => {handleLeaveClass()}}>
          <ExitToAppIcon fontSize="small" style={{ marginRight: '8px' }} />
          Leave Class
        </MenuItem>
      </Menu>
      <ModalEditClass isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Stack>
  )
}

const ApproachJoin = ({ approach, code }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [islink, setIsLink] = useState('')
  const { classId } = useParams()

  useEffect(() => {
    if (classId) {
      const getUrlInviteClass = async () => {
        try {
          const res = await getInvitationStudentByUrlService(classId)
          setIsLoading(false)
          setIsLink(res.url)
        } catch (error) {
          setIsLoading(false)
        }
      }
      getUrlInviteClass()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const handleOnClickCopy = () => {
    if (approach === 'link') {
      setIsLoading(!isLoading)
      copy(islink)
        .then(() => {
          toast.success('Copy success')
        })
        .catch((err) => {
          toast.error('Can not copy because of', err)
        })
    } else {
      copy(code)
        .then(() => {
          toast.success('Copy success')
        })
        .catch((err) => {
          toast.error('Can not copy because of', err)
        })
    }
  }

  function formatNumberWithDashes(number) {
    if (!number)
      return

    const numberString = number.toString()
    const parts = []

    for (let i = numberString.length; i > 0; i -= 3) {
      parts.unshift(numberString.slice(Math.max(0, i - 3), i))
    }

    return parts.join('-')
  }

  return (
    <Stack className='approachJoin component' spacing={1} mt={1}>
      <Typography variant='body-1' sx={{ paddingLeft:'5px' }}>By {approach}</Typography>
      <Stack direction='row' alignItems='center'>
        <Stack className='code' direction='row' alignItems='center'>
          <Typography variant='body-1'>{approach === 'link' ? islink : formatNumberWithDashes(code)}</Typography>
        </Stack>
        <IconButton onClick={handleOnClickCopy}>
          <ContentCopyOutlinedIcon/>
        </IconButton>
      </Stack>
    </Stack>
  )
}
const JoinComponent = ({ code, link }) => {
  return (
    <Container className='component'>
      <Stack direction='column' className='joinComponent'>
        <Typography variant='h6'>Join Class</Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <ApproachJoin approach='code' code={code}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <ApproachJoin approach='link' code={link}/>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

const NotificationItem = ({ title, composition, time }) => {
  return (
    <Container className='notificationComponent component' sx={{ cursor:'pointer' }}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{ width:'100%', padding:'10px 20px' }}>
        <div>
          <AssignmentOutlinedIcon/>
        </div>
        <Stack sx={{ flexGrow:'1' }}>
          <Typography>{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
          <Typography variant='body-2' sx={{ fontStyle:'italic' }}>{convertTime(time)}</Typography>
        </Stack>
      </Stack>
    </Container>
  )
}

const list = [
  {
    title: 'DevWeb posted a new assignment',
    composition:'Exercise 1',
    time:'Nov 16, 2023' },
  {
    title: 'DevWeb posted a new assignment',
    composition:'Exercise 2',
    time:'Nov 23, 2023' },
  {
    title: 'DevWeb posted a new assignment',
    composition:'Mid Term',
    time:'Nov 30, 2023' },
  {
    title: 'DevWeb posted a new assignment',
    composition:'Final Term',
    time:'00:24' }
]

// eslint-disable-next-line no-unused-vars
const StreamItem = ({ list }) => {
  const dispatch = useDispatch()
  // useEffect
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isError, gradeCompositions } = useSelector(
    (state) => state.userGetAllGradeCompositionByClassId
  )
  const { classId } = useParams()

  useEffect(() => {
    dispatch(getAllGradeCompositionByClassIdAction(classId))
    if (isError) {
      toast.error(isError)
      dispatch({ type: 'GET_ALL_GRADE_COMPOSITION_RESET' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const gradeCompositionList = gradeCompositions?.gradeCompositionList
  const orderGradeComposition = gradeCompositions?.orderGradeComposition
  const orderedGradeCompositionList = mapOrder(gradeCompositionList, orderGradeComposition, '_id')

  return (
    <Stack className='component'>
      <Typography variant='h6'>Stream</Typography>
      {orderedGradeCompositionList.map((item, index) => (
        item.isPublic && <NotificationItem key={index} title='Teacher posted a new assignment' composition={item.name} time={item.time} />
      ))}
    </Stack>
  )
}

function DashBoard() {
  let { isLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  return (
    <>
      {
        isLoading
          ?
          <Loader/>
          :
          <Container className='dashBoard' maxWidth='lg'>
            <Stack className='contentDashBoard' direction='column' spacing={3}>
              <HeadComponent name={classInfo?.codeClassName} title={classInfo?.className} background={classInfo?.background}/>
              <JoinComponent code={classInfo?.classId} link={'https://classroom.google.com/c/NjQxNTkxMjEzNDU4?cjc=qulvh74'}/>
              <StreamItem list={list}/>
            </Stack>
          </Container>
      }
    </>
  )
}

export default DashBoard