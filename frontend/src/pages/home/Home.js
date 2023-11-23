import './style.scss'
import HomePageContent from './homePageContent/HomePageContent'
import { Box, Button, Modal, Pagination, Stack, TextField, Typography } from '@mui/material'
import SearchBar from '../../components/search/SearchBar'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import PinIcon from '@mui/icons-material/Pin'
import { useState } from 'react'


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
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <Button variant='contained' sx={{ backgroundColor:'#005B48' }} onClick={handleOpen}>
        <PinIcon sx={{ mr:'5px' }}/>Join</Button>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalJoin}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Join by code
          </Typography>
          <TextField id="inputCode" label="Enter code" variant="outlined" sx={{ mt:'20px', width:'100%' }}/>
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={handleOpen}>Cancel</Button>
            <Button variant='contained' onClick={handleOpen}>Join</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

const ModalNewClass = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      <Button variant='contained' sx={{ backgroundColor:'#005B48' }} onClick={handleOpen}>
        <LibraryAddIcon sx={{ mr:'5px' }}/>New class</Button>
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModalNewClass}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold', color:'#005B48' }}>
            Create new class
          </Typography>
          <TextField id="inputName" label="Enter class name" variant="outlined" sx={{ mt:'20px', width:'100%' }}/>
          <TextField id="inputTitle" label="Enter class subject" variant="outlined" sx={{ mt:'20px', width:'100%' }}/>
          <Stack direction='row' justifyContent='end' mt={4} spacing={2}>
            <Button variant='contained' color='error' onClick={handleOpen}>Cancel</Button>
            <Button variant='contained' onClick={handleOpen}>Create</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

function Home() {

  return (
    <Stack id='home' direction='column'>
      <div className='content'>
        <Stack direction='row' justifyContent='end' spacing={2} pt={2} pr={2}>
          <ModalJoin/>
          <ModalNewClass/>
        </Stack>
        <SearchBar/>
        <Typography mt={2} sx={{ fontStyle:'italic' }}>Search results: 3</Typography>
        <HomePageContent/>
      </div>
      <Stack alignItems='center' className='pagination'>
        <Pagination count={10} size='large' shape='rounded' variant="outlined" color="primary" />
      </Stack>
    </Stack>
  )
}

export default Home