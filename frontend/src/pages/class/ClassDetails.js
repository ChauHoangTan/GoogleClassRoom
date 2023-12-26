
import { Box, Tab } from '@mui/material'
import './style.scss'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import DashBoard from './dashBoard/DashBoard'
import Participants from './participants/Participants'
import GradeTeacher from './grade/teacher/GradeTeacher'
import GradeStudent from './grade/student/GradeStudent'
import ReviewStudent from './review/student/ReviewStudent'
import ReviewTeacher from './review/teacher/ReviewTeacher'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Loader from '../../components/notification/Loader'
import { getClassByIDActions } from '../../redux/actions/classActions'

function ClassDetails() {
  const dispatch = useDispatch()

  const { isLoading: classLoading, isError: classError, classes, isSuccess } = useSelector(
    (state) => state.userGetClassByID
  )

  const { classId } = useParams()
  // useEffect
  useEffect(() => {
    dispatch(getClassByIDActions(classId))

    if (isSuccess) {
      console.log('SUCCESS')
    }

    if (classError) {
      toast.error(classError)
      dispatch({ type: 'GET_CLASS_BY_ID_RESET' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, classError])

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue( newValue )
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} mt={ 2 } id = 'classDetails'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} ml={ 4 }>
          <TabList onChange={handleChange} aria-label="lab API tabs example" scrollButtons>
            <Tab label="Stream" value="1" sx={{ marginRight:'20px' }}/>
            <Tab label="People" value="2" sx={{ marginRight:'20px' }}/>
            <Tab label="Grade Composition" value="3" sx={{ marginRight:'20px' }} />
            <Tab label="Review" value="4" />

          </TabList>
        </Box>
        {
          classLoading ?
            <Loader/>
            :
            <>
              <TabPanel value="1"><DashBoard/></TabPanel>
              <TabPanel value="2"><Participants /></TabPanel>
              <TabPanel value="3">{classes.data?.isTeacherOfThisClass ?
                <GradeTeacher/> : <GradeStudent/>}</TabPanel>
              <TabPanel value="4">{classes.data?.isTeacherOfThisClass ? <ReviewTeacher/> :
                <ReviewStudent/>}</TabPanel>
            </>
        }

      </TabContext>
    </Box>
  )
}

export default ClassDetails