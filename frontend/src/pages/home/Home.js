import './style.scss'
import HomePageContent from './homePageContent/HomePageContent'
import { Box, Button, Modal, Pagination, Stack, TextField, Typography } from '@mui/material'
import SearchBar from '../../components/search/SearchBar'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import PinIcon from '@mui/icons-material/Pin'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNewClassActions, getAllMyClassesAction, joinClassByCodeActions } from '../../redux/actions/classActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createClassInfoValidation, joinClassByCodeFormInfoValidation } from '../../components/validation/classValidation'
import { io } from 'socket.io-client'


const styleModalJoin = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #005B48',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
}

const styleModalNewClass = {
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

const ModalJoin = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userJoinClassByCode
  )

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  console.log('isLoading, isError, message, isSuccess', isLoading, isError, message, isSuccess)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(joinClassByCodeFormInfoValidation)
  })

  // on submit
  const onSubmit = (data) => {
    handleOpen()
    dispatch(joinClassByCodeActions(data))
  }

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: 'JOIN_CLASS_BY_CODE_RESET' })
      dispatch(getAllMyClassesAction())
    }
    if (isError) {
      toast.error(isError)
      dispatch({ type: 'JOIN_CLASS_BY_CODE_RESET' })
    }
    if (message) {
      toast.success(message)
      reset()
    }
  }, [isSuccess, isError, message, reset, dispatch])
  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        <PinIcon sx={{ mr:'5px' }}/>Join</Button>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalJoin}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Join by code
          </Typography>
          <TextField id="code"
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message || ''}
            required
            label="Enter code"
            variant="outlined"
            sx={{ mt:'20px', width:'100%' }}
          />
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={handleOpen}>Cancel</Button>
            <Button variant='contained' type="submit">Join</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

const ModalNewClass = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.userCreateNewClass
  )

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigate = () => {
    navigate('/class/1')
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createClassInfoValidation)
  })

  // on submit
  const onSubmit = (data) => {
    handleOpen()
    dispatch(createNewClassActions(data))
  }

  // useEffect
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: 'CREATE_CLASS_RESET' })
      dispatch(getAllMyClassesAction())
    }
    if (isError) {
      toast.error(isError)
      dispatch({ type: 'CREATE_CLASS_RESET' })
    }
    if (message) {
      toast.success(message)
      reset()
    }
  }, [isSuccess, isError, message, reset, dispatch])

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        <LibraryAddIcon sx={{ mr:'5px' }}/>New class</Button>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalNewClass}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Create new class
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
          <TextField {...register('classId')}
            error={!!errors.classId}
            helperText={errors.classId?.message || ''}
            required
            name="classId" id="inputTitle"
            label="Enter class ID"
            variant="outlined"
            sx={{ mt:'20px', width:'100%' }}/>
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={handleOpen}>Cancel</Button>
            <Button type="submit" variant='contained'>Create</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

function Home() {
    // useEffect(() => {
    //     // Receive notifications from server
    //     const socket = io('http://localhost:5000', {
    //         withCredentials: true,
    //         extraHeaders: {
    //           'Access-Control-Allow-Origin': 'http://localhost:3000' // Đổi thành origin của bạn
    //         }
    //       });
    //   console.log(socket)
    
    //   }, []);
    

  return (
    <Stack id='home' direction='column'>
      <div className='content'>
        <Stack direction='row' justifyContent='end' spacing={2} pt={6} pr={2} pb={2}>
          <ModalJoin/>
          <ModalNewClass/>
        </Stack>
        <Stack direction='row' justifyContent='center'><SearchBar/></Stack>
        <Typography mt={2} mb={5} sx={{ fontStyle:'italic' }}>Search results: 3</Typography>
        <HomePageContent/>
      </div>
      <Stack alignItems='center' className='pagination'>
        <Pagination count={10} size='large' shape='rounded' variant="outlined" color="primary" />
      </Stack>
    </Stack>
  )
}

export default Home