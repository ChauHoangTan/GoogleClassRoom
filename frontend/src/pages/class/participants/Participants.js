import { Box, Typography, IconButton, Modal, TextField, Stack, Autocomplete, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ParticipantTable from './ParticipantTable'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import UploadIcon from '@mui/icons-material/Upload'
import { useState } from 'react'
import { CSVLink } from 'react-csv'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import './style.scss'
import { useParams } from 'react-router-dom'
import { getAllTeachersAction, getAllTypeOfStudentsAction, sendInvitationByEmailAction } from '../../../redux/actions/classActions'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Loader from '../../../components/notification/Loader'
import { getInvitationTeacherByUrlService, uploadStudentList } from '../../../redux/APIs/classServices'
import copy from 'clipboard-copy'
import Chip from '@mui/material/Chip'
import { getAllEmailUsersService } from '../../../redux/APIs/userServices'
import { styled } from '@mui/material/styles'
import Papa from 'papaparse'

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

const columns = [
  { id: 'image', label: 'Avatar', minWidth: 170 },
  { id: 'userId', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'isTeacher', label: 'Kick', minWidth: 170 }
]

const columnsStudents = [
  { id: 'image', label: 'Avatar', minWidth: 170 },
  { id: 'userId', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'isTeacher', label: 'Kick', minWidth: 170 }
]

// eslint-disable-next-line no-unused-vars
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
          setIsLoading(false)
        }
      }
      getUrlInviteClass()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <IconButton onClick={handleOnClickCopy}>
            <ContentCopyOutlinedIcon/>
          </IconButton>
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default function Participants() {
  const [isEmails, setIsEmails] = useState([])

  const { classId } = useParams()

  const dispatch = useDispatch()

  const { isLoading: teachersLoading, isError: teachersError, teachers, isSuccess: teachersSuccess } = useSelector(
    (state) => state.userGetAllTeachers
  )
  const { isLoading: studentsLoading, isError: studentsError, students, isSuccess: studentsSuccess } = useSelector(
    (state) => state.userGetAllTypeOfStudents
  )
  const { isLoading: sendEmailLoading, isError: sendEmailError, isSuccess: sendEmailSuccess } = useSelector(
    (state) => state.userSendInvitationByEmail
  )

  let { classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  // useEffect
  useEffect(() => {
    dispatch(getAllTeachersAction(classId))
    dispatch(getAllTypeOfStudentsAction(classId))
    if (teachersSuccess) {
      dispatch({ type: 'GET_ALL_TEACHERS_RESET' })
    }

    if (studentsSuccess) {
      dispatch({ type: 'GET_ALL_STUDENTS_RESET' })
    }

    if (sendEmailSuccess) {
      setIsOpenInviteTeacher(false)
      setIsOpenInviteStudent(false)
      toast.success('Send success!')
      dispatch({ type: 'SEND_INVITATION_BY_EMAIL_RESET' })
    }

    if (teachersError) {
      toast.error(teachersError)
      dispatch({ type: 'GET_ALL_TEACHERS_RESET' })
    }

    if (studentsError) {
      toast.error(studentsError)
      dispatch({ type: 'GET_ALL_STUDENTS_RESET' })
    }

    if (sendEmailError) {
      toast.error(sendEmailError)
      dispatch({ type: 'SEND_INVITATION_BY_EMAIL_RESET' })
    }

    const getEmailsUser = async () => {
      try {
        const res = await getAllEmailUsersService()
        setIsEmails(res)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getEmailsUser()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, sendEmailError, sendEmailSuccess])

  const [isOpenInviteTeacher, setIsOpenInviteTeacher] = useState(false)
  const [isOpenInviteStudent, setIsOpenInviteStudent] = useState(false)

  const [valueEmailTeacherList, setValueEmailTeacherList] = useState([])
  const [valueEmailStudentList, setValueEmailStudentList] = useState([])

  const handleOpenInviteTeacher = () => {
    setValueEmailTeacherList([])
    setIsOpenInviteTeacher(!isOpenInviteTeacher)
  }

  const handleOpenInviteStudent = () => {
    setValueEmailStudentList([])
    setIsOpenInviteStudent(!isOpenInviteStudent)
  }

  function areEmailsValid(emailList) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    for (const email of emailList) {
      if (!emailRegex.test(email)) {
        toast.error(`This email: ${email} are invalid`)
        return false
      }
    }
    return true
  }

  const handleOnClickSendMail = ( role ) => {
    if (role === 'teacher') {
      if (!areEmailsValid(valueEmailTeacherList))
        return

      dispatch(sendInvitationByEmailAction(valueEmailTeacherList, role, classId))
    }
    else {
      if (!areEmailsValid(valueEmailStudentList))
        return

      dispatch(sendInvitationByEmailAction(valueEmailStudentList, role, classId))
    }
  }

  const csvData = [
    ['StudentId', 'FullName']
  ]

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const readFileCSV = async (e) => {
    const selectedFile = e.target.files[0]
    const result = await read(selectedFile)
    let studentsListUpload = []

    result.data.map(data => {
      if (data.StudentId !== '' && data.FullName !== '' && !isNaN(data.StudentId)) {
        studentsListUpload.push(handleConvertData(data))
      } else if (data.StudentId === '' && data.FullName === undefined) {
        //
      } else {
        toast.error('Student file upload invalid format!')
      }
      // studentsListUpload.push(handleConvertData(data))
    })

    await uploadStudentList(studentsListUpload, classId)
    dispatch(getAllTypeOfStudentsAction(classId))
  }

  const read = (file) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: (result) => {
          resolve(result)
        },
        header: true // Nếu CSV có header (tên cột)
      })
    })
  }

  const handleConvertData = ({ StudentId, FullName }) => {
    const fullName = splitFullName(FullName)
    let data = {
      userId: StudentId,
      firstName: fullName.firstName,
      lastName: fullName.lastName
    }
    return data
  }

  const splitFullName = (FullName) => {
    const index = FullName.indexOf(' ')
    let lastName = FullName.substring(0, index)
    let firstName = FullName.substring(index+1)
    return { lastName, firstName }
  }

  return (
    <Box sx={{
      p: 2
    }}>
      {
        classInfo?.isTeacherOfThisClass &&
        <Stack direction='row' justifyContent='end' spacing={3} disabled={!classInfo?.isTeacherOfThisClass}>
          <CSVLink data={csvData} filename='participants.csv'>
            <Button variant='contained' startIcon={<FileDownloadIcon />}>
            Download Template
            </Button>
          </CSVLink>
          <Button component="label" variant='contained' startIcon={<UploadIcon />}>
          Upload  Student List
            <VisuallyHiddenInput type='file' accept='.csv'onChange={(e) => readFileCSV(e)}/>
          </Button>
        </Stack>
      }
      {/* Teacher table */}
      <Box pt={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6'>
            Teachers
          </Typography>
          {
            classInfo?.isTeacherOfThisClass &&
             <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
               <Typography variant='body2'>
                Invite teacher
               </Typography>

               <IconButton onClick={handleOpenInviteTeacher}>
                 <PersonAddIcon />
               </IconButton>
             </Box>
          }

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

          <Box>
            <Typography pb={2}>
              Send email invite
            </Typography>

            <Autocomplete
              multiple
              id="tags-filled"
              options={isEmails}
              value={valueEmailTeacherList}
              onChange={(event, newValue) => setValueEmailTeacherList(newValue)}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Search or enter email"
                  placeholder="Emails"
                />
              )}
            />

            <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
              <Button variant='contained' color='error' onClick={handleOpenInviteTeacher}>Cancel</Button>
              <Button variant='contained' onClick={() => handleOnClickSendMail('teacher')} disabled={sendEmailLoading}>{sendEmailLoading ? 'Sending' : 'Send'}</Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

      {/* Student table */}
      <Box pt={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6'>
            Students
          </Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2'>
              Invite student
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
            <ParticipantTable columns={columnsStudents} rows={students?.students} isTeacherTable={false}/>
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
            <Typography id="modal-modal-title" variant="h6" component="h2" pb={2} sx={{ fontWeight:'bold' }}>
            Invite students
            </Typography>
            <Box>

              <Autocomplete
                multiple
                id="tags-filled"
                options={isEmails}
                value={valueEmailStudentList}
                onChange={(event, newValue) => setValueEmailStudentList(newValue)}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                  // eslint-disable-next-line react/jsx-key
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Search or enter email"
                    placeholder="Emails"
                  />
                )}
              />

              <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
                <Button variant='contained' color='error' onClick={handleOpenInviteStudent}>Cancel</Button>
                <Button variant='contained' onClick={() => handleOnClickSendMail('student')} disabled={sendEmailLoading}>{sendEmailLoading ? 'Sending' : 'Send'}</Button>
              </Stack>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}