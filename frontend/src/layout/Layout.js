
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import Menu from './Menu'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllClassTeachAndStudyByID, getAllMyClassesService } from '../redux/APIs/classServices'

function Layout({ socket }) {
  const { userInfo } = useSelector(
    state => state.userLogin
  )
  const isOpenMenu = useSelector(state => state.isOpenMenu)

  useEffect(() => {
    if (userInfo?.Authorization) {
      socket?.emit('newUser', userInfo?._id)
    }
  }, [socket, userInfo])

  const [classTeachingList, setClassTeachingList] = useState([])
  const [classStudyingList, setClassStudyingList] = useState([])

  const stateMenu = useSelector(state => state.changeStateMenu)
  useEffect(() => {
    const fetchDataClasses = async () => {
      const response = await getAllClassTeachAndStudyByID()
      setClassTeachingList(response.data.classTeaching)
      setClassStudyingList(response.data.classStudying)
    }

    userInfo && fetchDataClasses()
  }, [stateMenu])

  return (
    <div id='layout'>
      <Header socket={socket}/>

      <Stack direction='row' id='menuAndOutlet'>
        { userInfo ?
          <div className={`grid1 ${!isOpenMenu && 'hide'} ${userInfo?.isAdmin ? 'admin' : 'user'}`}>
            <Menu classTeaching={classTeachingList} classStudying={classStudyingList}/>
          </div> :
          ''}
        <div className='grid2'>
          <Outlet />
          <Footer/>
        </div>
      </Stack>

    </div>
  )
}

export default Layout