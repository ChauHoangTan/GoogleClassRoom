import { Grid, IconButton, Stack, Typography } from '@mui/material'
import './style.scss'
import Container from '@mui/material/Container'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { useSelector } from 'react-redux'
import Loader from '../../../components/notification/Loader'

const HeadComponent = ({ name, title }) => {
  return (
    <Stack className='headComponent'>
      <img src='https://wallpapercave.com/wp/wp6827255.jpg'/>
      <Stack>
        <Typography className='name' variant='h4'>{name}</Typography>
        <Typography className='title' variant='h6'>{title}</Typography>
      </Stack>
      <IconButton>
        <InfoOutlinedIcon sx={{ transform:'scale(1.2)' }}/>
      </IconButton>
    </Stack>
  )
}

const ApproachJoin = ({ approach, code }) => {
  return (
    <Stack className='approachJoin component' spacing={1} mt={1}>
      <Typography variant='body-1' sx={{ paddingLeft:'5px' }}>By {approach}</Typography>
      <Stack direction='row' alignItems='center'>
        <Stack className='code' direction='row' alignItems='center'>
          <Typography variant='body-1'>{code}</Typography>
        </Stack>
        <IconButton>
          <ContentCopyOutlinedIcon/>
        </IconButton>
      </Stack>
    </Stack>
  )
}
const JoinComponent = ({ code, link }) => {
  return (
    <Container className='component'>
      <Stack direction='column' className='joinComponent'>
        <Typography variant='h6'>Join Class</Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <ApproachJoin approach='code' code={code}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <ApproachJoin approach='link' code={link}/>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

const NotificationItem = ({ title, composition, time }) => {
  return (
    <Container className='notificationComponent component' sx={{ cursor:'pointer' }}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{ width:'100%', padding:'10px 20px' }}>
        <div>
          <AssignmentOutlinedIcon/>
        </div>
        <Stack sx={{ flexGrow:'1' }}>
          <Typography>{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
          <Typography variant='body-2' sx={{ fontStyle:'italic' }}>{time}</Typography>
        </Stack>
        <IconButton><MoreVertOutlinedIcon/></IconButton>
      </Stack>
    </Container>
  )
}

const list = [
  {
    title: 'DevWeb posted a new assignment',
    composition:'Exercise 1',
    time:'Nov 16, 2023' },
  {
    title: 'DevWeb posted a new assignment',
    composition:'Exercise 2',
    time:'Nov 23, 2023' },
  {
    title: 'DevWeb posted a new assignment',
    composition:'Mid Term',
    time:'Nov 30, 2023' },
  {
    title: 'DevWeb posted a new assignment',
    composition:'Final Term',
    time:'00:24' }
]

const StreamItem = ({ list }) => {
  const newList = list.slice().reverse()
  return (
    <Stack className='component'>
      <Typography variant='h6'>Stream</Typography>
      {newList.map((item, index) => {
        return (
          <NotificationItem key={index} title={item.title} composition={item.composition} time={item.time}/>
        )
      })}
    </Stack>
  )
}

function DashBoard() {
  let { isLoading, classes : classInfo } = useSelector(
    (state) => state.userGetClassByID
  )

  classInfo = classInfo?.data

  return (
    <>
      {
        isLoading
          ?
          <Loader/>
          :
          <Container className='dashBoard' maxWidth='lg'>
            <Stack className='contentDashBoard' direction='column' spacing={3}>
              <HeadComponent name={'2310-CLC-AWP-20KTPM2'} title={classInfo?.className}/>
              <JoinComponent code={classInfo?.classId} link={'https://classroom.google.com/c/NjQxNTkxMjEzNDU4?cjc=qulvh74'}/>
              <StreamItem list={list}/>
            </Stack>
          </Container>
      }
    </>
  )
}

export default DashBoard