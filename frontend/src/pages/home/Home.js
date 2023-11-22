import './style.scss'
import HomePageContent from './homePageContent/HomePageContent'
import { Pagination, Stack } from '@mui/material'
import SearchBar from '../../components/search/SearchBar'

function Home() {

  return (
    <Stack id='home' direction='column'>
      <div className='content'>
        <SearchBar/>
        <HomePageContent/>
      </div>
      <Stack alignItems='center' className='pagination'>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </Stack>
  )
}

export default Home