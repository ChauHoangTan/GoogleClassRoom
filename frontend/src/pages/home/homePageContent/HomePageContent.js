import { Grid, Typography, Card, Stack, Avatar, IconButton } from '@mui/material'
import './style.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import { useNavigate } from 'react-router-dom'

const CardClass = ({ title, tagline, author }) => {
  return (
    <Card className='card'>
      <Stack direction='column' className='cardHeader'>
        <img src='https://wallpapercave.com/wp/wp6827255.jpg'/>
        <IconButton><MoreVertIcon/></IconButton>
        <Avatar className='avatar'/>
      </Stack>

      <div className='expandBottom'>
        <div>
          <Stack direction='row' alignItems='center'><Typography variant='h6' sx={{ fontWeight:'500' }} className='text-limit'>{title}</Typography></Stack>
          <div><Typography variant='body-1' className='text-limit'>{tagline}</Typography></div>
          <div><Typography variant='body-2' className='text-limit'>{author}</Typography></div>
        </div>
      </div>
    </Card>
  )
}

const GridItemClass = () => {
  const navigate = useNavigate()
  const handleNavigateToClassDetails = () => {
    navigate('/class/1')
  }
  return (
    <Grid item component='div' onClick={handleNavigateToClassDetails}>
      <CardClass title='2310-CLC-AWP-20KTPM2'
        tagline='Advanced Web Programming'
        author='Khánh Nguyễn Huy'/>
    </Grid>
  )
}

function HomePageContent() {
  return (
    <Grid container spacing={2} mt={1} id='homePageContent'>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
      <GridItemClass/>
    </Grid>
  )
}

export default HomePageContent