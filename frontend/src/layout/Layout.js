
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import Menu from './Menu'
import { useSelector } from 'react-redux'


function Layout() {

  const isOpenMenu = useSelector(state => state.isOpenMenu)

  return (
    <>
      <Header />

      <Stack direction='row' container id='menuAndOutlet'>
        <div item className={`grid1 ${!isOpenMenu && 'hide'}`}>
          <Menu/>
        </div>
        <div item className='grid2'>
          <Outlet />
        </div>
      </Stack>


      <Footer/>
    </>
  )
}

export default Layout