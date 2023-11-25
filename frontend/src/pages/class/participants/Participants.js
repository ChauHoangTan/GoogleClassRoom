import { Box, Typography, IconButton, Modal, TextField, InputAdornment } from '@mui/material'
import SearchBar from '../../../components/search/SearchBar'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ParticipantTable from './ParticipantTable'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const styleModal = {
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

const users = [
  {
    avatar: 'link-to-avatar-1.jpg',
    id: '20127660',
    fullName: 'User 1',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-2.jpg',
    id: '20127660',
    fullName: 'User 2',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-3.jpg',
    id: '20127660',
    fullName: 'User 3',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-4.jpg',
    id: '20127660',
    fullName: 'User 4',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-5.jpg',
    id: '20127660',
    fullName: 'User 5',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-1.jpg',
    id: '20127660',
    fullName: 'User 1',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-2.jpg',
    id: '20127660',
    fullName: 'User 2',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-3.jpg',
    id: '20127660',
    fullName: 'User 3',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-4.jpg',
    id: '20127660',
    fullName: 'User 4',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-5.jpg',
    id: '20127660',
    fullName: 'User 5',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-1.jpg',
    id: '20127660',
    fullName: 'User 1',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-2.jpg',
    id: '20127660',
    fullName: 'User 2',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-3.jpg',
    id: '20127660',
    fullName: 'User 3',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-4.jpg',
    id: '20127660',
    fullName: 'User 4',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-5.jpg',
    id: '20127660',
    fullName: 'User 5',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-1.jpg',
    id: '20127660',
    fullName: 'User 1',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-2.jpg',
    id: '20127660',
    fullName: 'User 2',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-3.jpg',
    id: '20127660',
    fullName: 'User 3',
    isTeacher: false
  },
  {
    avatar: 'link-to-avatar-4.jpg',
    id: '20127660',
    fullName: 'User 4',
    isTeacher: true
  },
  {
    avatar: 'link-to-avatar-5.jpg',
    id: '20127660',
    fullName: 'User 5',
    isTeacher: false
  }
]

const columns = [
  { id: 'avatar', label: 'Avatar', minWidth: 170 },
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'isTeacher', label: 'Kick', minWidth: 170 }
]

export default function Participants() {
  const [isOpenInviteTeacher, setIsOpenInviteTeacher] = useState(false)
  const [isOpenInviteStudent, setIsOpenInviteStudent] = useState(false)

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
          <ParticipantTable columns={columns} rows={users}/>
        </Box>
      </Box>
      <Modal
        open={isOpenInviteTeacher}
        onClose={handleOpenInviteTeacher}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Invite teachers
          </Typography>
          <TextField
            value= 'http://localhost:3000/class/1daudhiasubdasidbiuasbdu'
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer',
                  '&:hover': {
                    color: '#D0D4CA'
                  } }}>
                  <ContentCopyIcon onClick={handleOpenInviteTeacher}/>
                </InputAdornment>
              )
            }}
            sx={{ width: '100%' }}
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
          <ParticipantTable columns={columns} rows={users}/>
        </Box>

        <Modal
          open={isOpenInviteStudent}
          onClose={handleOpenInviteStudent}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Invite students
            </Typography>
            <TextField
              value= 'http://localhost:3000/class/1daudhiasubdasidbiuasbdu'
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer',
                    '&:hover': {
                      color: '#D0D4CA'
                    } }}>
                    <ContentCopyIcon onClick={handleOpenInviteStudent}/>
                  </InputAdornment>
                )
              }}
              sx={{ width: '100%' }}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}