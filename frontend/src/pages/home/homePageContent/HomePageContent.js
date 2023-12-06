import { Grid, Typography, Card, Stack, Avatar, IconButton } from '@mui/material'
import './style.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'

const CardClass = ({ title, tagline, author, background }) => {
  return (
    <Card className='card'>
      <Stack direction='column' className='cardHeader'>
        <img src={background}/>
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

const listCardClass = [
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://wallpapercave.com/wp/wp6827255.jpg'
  },
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/6b/a9/47/6ba947a6c296e3b3afe87d03f0c29e3a.jpg'
  },
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://wallpapercave.com/wp/wp6827255.jpg'
  },
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/6b/a9/47/6ba947a6c296e3b3afe87d03f0c29e3a.jpg'
  },
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/b9/6f/b8/b96fb88ddf3d59f90756ebe636457cef.jpg'
  },
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://wallpapercave.com/wp/wp6827255.jpg'
  },
  {
    title: 'Advanced Web Programming',
    author: 'Khánh Nguyễn Huy',
    tagline: '',
    background:'https://i.pinimg.com/564x/c4/38/d3/c438d3c8a4d818ba7bee1532027d9f0a.jpg'
  }
]

const GridItemClass = ({ title, tagline, author, background }) => {
  const navigate = useNavigate()
  const handleNavigateToClassDetails = () => {
    navigate('/class/1')
  }
  return (
    <Grid item component='div' onClick={handleNavigateToClassDetails}>
      <CardClass title={title}
        author={author}
        tagline={tagline}
        background={background}/>
    </Grid>
  )
}

function HomePageContent() {
  return (
    <Grid container spacing={2} mt={1} id='homePageContent'>
      {
        listCardClass.map(( item, index ) => {
          return (
            <GridItemClass key={index}
              title={item.title}
              tagline={item.tagline}
              author={item.author}
              background={item.background}
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