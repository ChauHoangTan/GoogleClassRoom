
import { Box, Container, Tab } from '@mui/material'
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
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Loader from '../../components/notification/Loader'
import { getClassByIDActions } from '../../redux/actions/classActions'

function ClassDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const { isLoading: classLoading, isError: classError, classes, isSuccess } = useSelector(
    (state) => state.userGetClassByID
  )

  const { classId, tabName } = useParams()

  const [value, setValue] = useState(tabName)
  // useEffect
  useEffect(() => {
    if (!tabName) {
      setValue('stream')
    }

    dispatch(getClassByIDActions(classId))

    if (classError) {
      navigate('/home')
      toast.error(classError)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, classError])

  const handleChange = (event, newValue) => {
    setValue( newValue )
    navigate(`/class/${classId}/${newValue}`)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} mt={2} id="classDetails">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} ml={4}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" scrollButtons>
            <Tab label="Stream" value="stream" />
            <Tab label="People" value="people" />
            <Tab label="Grade Composition" value="grade" />
            <Tab label="Review" value="review" />
          </TabList>
        </Box>
        {classLoading ? (
          <Container sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
          </Container>
        ) : (
          <>
            <TabPanel value="stream"><DashBoard /></TabPanel>
            <TabPanel value="people"><Participants /></TabPanel>
            <TabPanel value="grade">
              {classes?.data?.isTeacherOfThisClass ? (
                <GradeTeacher />
              ) : (
                <GradeStudent />
              )}
            </TabPanel>
            <TabPanel value="review">
              {classes?.data?.isTeacherOfThisClass ? (
                <ReviewTeacher />
              ) : (
                <ReviewStudent />
              )}
            </TabPanel>
          </>
        )}
      </TabContext>
    </Box>
  )
}

export default ClassDetails