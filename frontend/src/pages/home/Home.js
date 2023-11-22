import './style.scss'
import HomePageContent from './homePageContent/HomePageContent'
import { Button, Pagination, Stack } from '@mui/material'
import SearchBar from '../../components/search/SearchBar'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import PinIcon from '@mui/icons-material/Pin'

function Home() {

  return (
    <Stack id='home' direction='column'>
      <div className='content'>
        <Stack direction='row' justifyContent='end' spacing={2} pt={2} pr={2}>
          <Button variant='contained' sx={{ backgroundColor:'#005B48' }}>
            <PinIcon sx={{ mr:'5px' }}/>Join</Button>
          <Button variant='contained' sx={{ backgroundColor:'#005B48' }}>
            <LibraryAddIcon sx={{ mr:'5px' }}/>New class</Button>
        </Stack>
        <SearchBar/>
        <HomePageContent/>
      </div>
      <Stack alignItems='center' className='pagination'>
        <Pagination count={10} size='large' shape='rounded' variant="outlined" color="primary" />
      </Stack>
    </Stack>
  )
}

export default Home