import { Grid, Typography, Card, Stack, Avatar, IconButton } from '@mui/material'
import './style.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import { getAllMyClassesAction } from '../../../redux/actions/classActions'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Loader from '../../../components/notification/Loader'

const CardClass = ({ data }) => {
  const className = data.className
  const tagline = data.tagline
  const author = data.teacherNames[0]
  const background = data.background
  return (
    <Card className='card'>
      <Stack direction='column' className='cardHeader'>
        <img src={background}/>
        <IconButton><MoreVertIcon/></IconButton>
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

const listCardClass = [
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://wallpapercave.com/wp/wp6827255.jpg'
  },
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/6b/a9/47/6ba947a6c296e3b3afe87d03f0c29e3a.jpg'
  },
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://wallpapercave.com/wp/wp6827255.jpg'
  },
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/6b/a9/47/6ba947a6c296e3b3afe87d03f0c29e3a.jpg'
  },
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/b9/6f/b8/b96fb88ddf3d59f90756ebe636457cef.jpg'
  },
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://wallpapercave.com/wp/wp6827255.jpg'
  },
  {
    className: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/c4/38/d3/c438d3c8a4d818ba7bee1532027d9f0a.jpg'
  }
]

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

function HomePageContent() {
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
    // Log classes whenever it changes
    console.log(classes)
  }, [classes])

  return (
    <Grid container spacing={2} mt={1} id='homePageContent'>
      {classLoading ?
        <Loader />
        :
        classes.data?.slice().map(( item, index ) => {
          return (
            <GridItemClass key={index}
              data = {item}
            />
          )
        })
      }
      {/* <GridItemClass
        title='Advanced Web Programming'
        author='Khánh Nguyễn Huy'
        tagline=''
        background='https://wallpapercave.com/wp/wp6827255.jpg'/> */}
    </Grid>
  )
}

export default HomePageContent