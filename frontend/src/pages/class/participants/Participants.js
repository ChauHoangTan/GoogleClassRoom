import { Box, Typography, IconButton, Modal, TextField, InputAdornment, Stack, Autocomplete, Avatar, Button } from '@mui/material'
import SearchBar from '../../../components/search/SearchBar'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ParticipantTable from './ParticipantTable'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import UploadIcon from '@mui/icons-material/Upload'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import './style.scss'
import { useParams } from 'react-router-dom'
import { getAllTeachersAction, getAllStudentsAction } from '../../../redux/actions/classActions'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Loader from '../../../components/notification/Loader'
import { getInvitationTeacherByUrlService } from '../../../redux/APIs/classServices'
import copy from 'clipboard-copy'

const styleModal = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #005B48',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
}

const users = [
  {
    avatar: 'link-to-avatar-1.jpg',
    id: '20127660',
    fullName: 'User 1',
    isTeacher: false
  }
  // {
  //   avatar: 'link-to-avatar-2.jpg',
  //   id: '20127660',
  //   fullName: 'User 2',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-3.jpg',
  //   id: '20127660',
  //   fullName: 'User 3',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-4.jpg',
  //   id: '20127660',
  //   fullName: 'User 4',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-5.jpg',
  //   id: '20127660',
  //   fullName: 'User 5',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-1.jpg',
  //   id: '20127660',
  //   fullName: 'User 1',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-2.jpg',
  //   id: '20127660',
  //   fullName: 'User 2',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-3.jpg',
  //   id: '20127660',
  //   fullName: 'User 3',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-4.jpg',
  //   id: '20127660',
  //   fullName: 'User 4',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-5.jpg',
  //   id: '20127660',
  //   fullName: 'User 5',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-1.jpg',
  //   id: '20127660',
  //   fullName: 'User 1',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-2.jpg',
  //   id: '20127660',
  //   fullName: 'User 2',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-3.jpg',
  //   id: '20127660',
  //   fullName: 'User 3',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-4.jpg',
  //   id: '20127660',
  //   fullName: 'User 4',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-5.jpg',
  //   id: '20127660',
  //   fullName: 'User 5',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-1.jpg',
  //   id: '20127660',
  //   fullName: 'User 1',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-2.jpg',
  //   id: '20127660',
  //   fullName: 'User 2',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-3.jpg',
  //   id: '20127660',
  //   fullName: 'User 3',
  //   isTeacher: false
  // },
  // {
  //   avatar: 'link-to-avatar-4.jpg',
  //   id: '20127660',
  //   fullName: 'User 4',
  //   isTeacher: true
  // },
  // {
  //   avatar: 'link-to-avatar-5.jpg',
  //   id: '20127660',
  //   fullName: 'User 5',
  //   isTeacher: false
  // }
]

const columns = [
  { id: 'image', label: 'Avatar', minWidth: 170 },
  { id: 'userId', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'isTeacher', label: 'Kick', minWidth: 170 }
]

const Emails = [
  {
    label: 'chauhoangtan6937@gmail.com',
    name: 'Chau Hoang Tan',
    avatar: 'https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-cute-anime-13.jpg'
  },
  {
    label: 'hualamchicuong@gmail.com',
    name: 'Hua Lam Chi Cuong',
    avatar: 'https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-cute-anime-13.jpg'
  },
  {
    label: 'nguyendinhvan@gmail.com',
    name: 'Nguyen Dinh Van',
    avatar: 'https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-cute-anime-13.jpg'
  },
  {
    label: 'letranphihung@gmail.com',
    name: 'Le Tran Phi Hung',
    avatar: 'https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-cute-anime-13.jpg'
  }
]

const ItemResultEmail = ({ email, name, avatar }) => {
  return (
    <Stack direction='row' alignItems='center' mb={1}>
      <Avatar src={avatar} sx={{ margin: '0px 5px' }}/>
      <Stack>
        <Typography variant='body-1' sx={{ fontWeight: 'bold' }}>{email}</Typography>
        <Typography variant='body-2' sx={{ fontStyle:'italic' }}>{name}</Typography>
      </Stack>
    </Stack>
  )
}

const ApproachJoin = ({ code }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [islink, setIsLink] = useState('')
  const { classId } = useParams()

  useEffect(() => {
    if (classId) {
      const getUrlInviteClass = async () => {
        try {
          const res = await getInvitationTeacherByUrlService(classId)
          setIsLoading(false)
          setIsLink(res.url)
        } catch (error) {
          console.log(error.response.data.message)
          setIsLoading(false)
        }
      }
      getUrlInviteClass()
    }
  }, [isLoading])

  const handleOnClickCopy = () => {
    setIsLoading(!isLoading)
    copy(islink)
      .then(() => {
        toast.success('Copy success')
      })
      .catch((err) => {
        toast.error('Can not copy because of', err)
      })
  }

  return (
    <Stack className='approachJoin component' spacing={1} mt={1} mb={4}>
      <Stack direction='row' alignItems='center'>
        <Stack className='code' direction='row' alignItems='center'>
          <Typography variant='body-1'>{islink}</Typography>
        </Stack>
        <IconButton>
          {
            isLoading ?
              < Loader/>
              :
              <IconButton onClick={handleOnClickCopy}>
                <ContentCopyOutlinedIcon/>
              </IconButton>
          }
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default function Participants() {
  const { classId } = useParams()

  const dispatch = useDispatch()

  const { isLoading: teachersLoading, isError: teachersError, teachers, isSuccess: teachersSuccess } = useSelector(
    (state) => state.userGetAllTeachers
  )
  const { isLoading: studentsLoading, isError: studentsError, students, isSuccess: studentsSuccess } = useSelector(
    (state) => state.userGetAllStudents
  )

  // useEffect
  useEffect(() => {
    dispatch(getAllTeachersAction(classId))
    dispatch(getAllStudentsAction(classId))

    if (teachersSuccess) {
      dispatch({ type: 'GET_ALL_TEACHERS_RESET' })
    }

    if (studentsSuccess) {
      dispatch({ type: 'GET_ALL_STUDENTS_RESET' })
    }

    if (teachersError) {
      toast.error(teachersError)
      dispatch({ type: 'GET_ALL_TEACHERS_RESET' })
    }

    if (studentsError) {
      toast.error(studentsError)
      dispatch({ type: 'GET_ALL_STUDENTS_RESET' })
    }

  }, [dispatch, studentsError, teachersError])

  const [isOpenInviteTeacher, setIsOpenInviteTeacher] = useState(false)
  const [isOpenInviteStudent, setIsOpenInviteStudent] = useState(false)

  const [inviteTeacher, setInviteTeacher] = useState('')
  const [inviteStudent, setInviteStudent] = useState('')

  const handleInputStudent = ( e ) => {
    setInviteStudent( e.target.value )
  }
  const handleInputTeacher = ( e ) => {
    setInviteTeacher( e.target.value )
  }
  const handleInputTeacherWithAutoComplete = ( newValue ) => {
    if (newValue !== null) {
      if (newValue.label !== null) {
        setInviteTeacher(newValue.label)
      }
    } else {
      setInviteTeacher('')
    }
  }

  const handleOpenInviteTeacher = () => {
    setIsOpenInviteTeacher(!isOpenInviteTeacher)
  }

  const handleOpenInviteStudent = () => {
    setIsOpenInviteStudent(!isOpenInviteStudent)
  }

  return (
    <Box sx={{
      p: 2
    }}>
      <Stack direction='row' justifyContent='end' spacing={3}>
        <Button variant='contained' startIcon={<FileDownloadIcon />}>
          Download Student List
        </Button>
        <Button variant='contained' startIcon={<UploadIcon />}>
          Upload  Student List
        </Button>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar />
      </Box>
      {/* Teacher table */}
      <Box pt={4}>
        <Typography variant='body2'>
          Search result: 3
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6'>
            Teacher
          </Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2'>
              3 teacher
            </Typography>

            <IconButton onClick={handleOpenInviteTeacher}>
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          { teachersLoading ?
            <Loader />
            :
            <ParticipantTable columns={columns} rows={teachers?.teachers} isTeacherTable={true}/>
          }
        </Box>
      </Box>
      <Modal
        className='modalParticipants'
        open={isOpenInviteTeacher}
        onClose={handleOpenInviteTeacher}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold' }}>
            Invite teachers
          </Typography>
          <ApproachJoin approach='link' code={'https://classroom.google.com/c/NjQxNTkxMjEzNDU4?cjc=qulvh74'}/>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: '100%' }}
            onChange={ (e, newValue) => handleInputTeacherWithAutoComplete( newValue ) }
            options={Emails}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <ItemResultEmail email={option.label} name={option.name} avatar={option.avatar}/>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a email"
                value={inviteTeacher}
                onChange={ (e) => handleInputTeacher(e) }
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
      </Modal>

      {/* Student table */}
      <Box pt={4}>
        <Typography variant='body2'>
          Search result: 3
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6'>
            Student
          </Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2'>
              3 student
            </Typography>

            <IconButton onClick={handleOpenInviteStudent}>
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          { studentsLoading ?
            <Loader />
            :
            <ParticipantTable columns={columns} rows={students?.students} isTeacherTable={false}/>
          }
        </Box>

        <Modal
          className='modalParticipants'
          open={isOpenInviteStudent}
          onClose={handleOpenInviteStudent}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold' }}>
            Invite students
            </Typography>
            <Autocomplete
              value={inviteStudent}
              onChange={(e) => handleInputStudent(e)}
              autoHighlight
              options={Emails}
              getOptionLabel = {(option) => option.label}
              renderOption={(props, option) => (
                <ItemResultEmail email={ option.label } name={ option.name } avatar={ option.avatar }/>
              )}
              disablePortal
              id="combo-box-demo"
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Input Email" />}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}