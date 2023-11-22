import './style.scss'
import HomePageContent from './homePageContent/HomePageContent'
import { Pagination, Stack } from '@mui/material'

function Home() {

  return (
    <Stack id='home' direction='column'>
      <div className='content'>
        <HomePageContent/>
      </div>
      <Stack alignItems='center' className='pagination'>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </Stack>
  )
}

export default Home