
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import Menu from './Menu'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Layout({ socket }) {
    const { userInfo } = useSelector(
        state => state.userLogin
    )
  const isOpenMenu = useSelector(state => state.isOpenMenu)

  useEffect(() => {
    if(userInfo?.Authorization) {
        socket?.emit('newUser', userInfo?._id)
    }
},[socket, userInfo])

  return (
    <div id='layout'>
      <Header socket={socket}/>

      <Stack direction='row' id='menuAndOutlet'>
        <div className={`grid1 ${!isOpenMenu && 'hide'}`}>
          <Menu/>
        </div>
        <div className='grid2'>
          <Outlet />
          <Footer/>
        </div>
      </Stack>

    </div>
  )
}

export default Layout