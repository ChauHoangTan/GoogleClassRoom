import { Grid, Typography, Card, Stack, Avatar, Pagination } from '@mui/material'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { getAllMyClassesAction } from '../../../redux/actions/classActions'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Loader from '../../../components/notification/Loader'

const ITEMS_PER_PAGE = 4

const CardClass = ({ data }) => {
  const className = data.className
  const tagline = data.tagline
  const author = data.teacherNames[0]
  const background = data.background
  return (
    <Card className='card'>
      <Stack direction='column' className='cardHeader'>
        <img src={background}/>
        <Avatar className='avatar'/>
      </Stack>

      <div className='expandBottom'>
        <div>
          <Stack direction='row' alignItems='center'><Typography variant='h6' sx={{ fontWeight:'500' }} className='text-limit'>{className}</Typography></Stack>
          <div><Typography variant='body-1' className='text-limit'>{tagline}</Typography></div>
          <div><Typography variant='body-2' className='text-limit'>{author}</Typography></div>
        </div>
      </div>
    </Card>
  )
}

const GridItemClass = ({ data }) => {
  const navigate = useNavigate()
  const handleNavigateToClassDetails = () => {
    navigate(`/class/${data._id}/stream`)
  }
  return (
    <Grid item component='div' onClick={handleNavigateToClassDetails}>
      <CardClass data={data}/>
    </Grid>
  )
}

function HomePageContent({ searchTerm }) {
  const [filteredClasses, setFilteredClasses] = useState([])
  const dispatch = useDispatch()
  // useEffect
  const { isLoading: classLoading, isError: classError, classes } = useSelector(
    (state) => state.userGetAllMyClasses
  )

  useEffect(() => {
    dispatch(getAllMyClassesAction())
    if (classError) {
      toast.error(classError)
      dispatch({ type: 'GET_ALL_MY_CLASSES_RESET' })
    }

  }, [dispatch, classError])

  useEffect(() => {
    if (!classLoading) {
      const filtered = classes?.data?.filter((item) =>
        (searchTerm
          ? item.className.toLowerCase().includes(searchTerm.toLowerCase())
          : classes?.data) && item.isActive === true
      )
      setFilteredClasses(filtered)
    }
  }, [classes, searchTerm])

  const [currentPage, setCurrentPage] = useState(1)
  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <>
      <Typography mt={2} mb={5} sx={{ fontStyle:'italic' }}>Search results: {filteredClasses?.length}</Typography>
      <Grid container spacing={2} mt={1} id='homePageContent'>
        {classLoading ?
          <Loader />
          :
          // Slice the classes array based on the current page
          filteredClasses?.slice(startIndex, endIndex).map((item, index) => {
            return <GridItemClass key={index} data={item} />
          })
        }
        {/* <GridItemClass
        title='Advanced Web Programming'
        author='Khánh Nguyễn Huy'
        tagline=''
        background='https://wallpapercave.com/wp/wp6827255.jpg'/> */}
      </Grid>
      <Stack alignItems='center' className='pagination'>
        <Pagination
          size='large'
          shape='rounded'
          variant="outlined"
          color="primary"
          count={Math.ceil(filteredClasses?.length / ITEMS_PER_PAGE)}// Calculate the total number of pages
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)} />
      </Stack>
    </>
  )
}

export default HomePageContent