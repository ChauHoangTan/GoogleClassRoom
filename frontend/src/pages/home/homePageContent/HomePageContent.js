import { Grid, Typography, Card, Stack, Avatar } from '@mui/material'
import './style.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import { useNavigate } from 'react-router-dom'

const CardClass = ({ title, tagline, author }) => {
  return (
    <Card className='card'>
      <Stack direction='column' className='cardHeader'>
        <Stack direction='row' alignItems='center'><Typography variant='h5' className='text-limit'>{title} </Typography> <MoreVertIcon/> </Stack>
        <div><Typography variant='body-1' className='text-limit'>{tagline}</Typography></div>
        <div><Typography variant='body-2' className='text-limit'>{author}</Typography></div>

        <img src='https://wallpapercave.com/wp/wp6827255.jpg'/>
        <Avatar className='avatar'/>
      </Stack>

      <div className='expandBottom'></div>
      <Stack direction='row' sx={{ borderTop:'2px solid rgb(199, 199, 199)', padding:'10px 20px', color:'black' }}
        justifyContent='end'>
        <AssignmentIndOutlinedIcon sx={{ cursor:'pointer' }}/>
        <FolderOpenOutlinedIcon sx={{ marginLeft:'20px', cursor:'pointer' }}/>
      </Stack>


    </Card>
  )
}

function HomePageContent() {
  const navigate = useNavigate()
  const handleNavigateToClassDetails = () => {
    navigate('/class/1')
  }
  return (
    <Grid container spacing={2} mt={1} id='homePageContent'>
      <Grid item component='div' onClick={handleNavigateToClassDetails}>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>

      <Grid item>
        <CardClass title='2310-CLC-AWP-20KTPM2'
          tagline='Advanced Web Programming'
          author='Khánh Nguyễn Huy'/>
      </Grid>
    </Grid>
  )
}

export default HomePageContent