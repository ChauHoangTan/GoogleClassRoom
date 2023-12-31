import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import './style.scss'
import { Stack, Link, Avatar } from '@mui/material'
import logoLight from '../assets/img/logo_light_mode.png'
import logoDark from '../assets/img/logo_dark_mode.png'
import { useColorScheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'

const Footer = () => {
  // eslint-disable-next-line no-unused-vars
  const { mode, setMode } = useColorScheme()

  // eslint-disable-next-line no-unused-vars
  const handleSendEmail = () => {
    // Add your email sending logic here
    // console.log('Email sent!')
  }

  return (
    <Stack
      component="footer"
      id='footer'
    >
      <AppBar position='static'>
        {/* Part 1: Name */}
        <Typography component="h1" sx={{ fontSize: '50px', textAlign: 'center' }}
          className='text'>
          NexusEdu
        </Typography>

        <Grid container spacing={2} sx={{ px: 4, py: 2, mx: 9 }}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Stack>
                <Typography variant='body-1' sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Contact us
                </Typography>
                <Typography variant='body-1' sx={{ fontSize: '20px',
                  wordWrap: 'break-word'
                }}>
              Email: truongdaihockhoahoctunhien@hcmus.edu.vn
                </Typography>
              </Stack>

              <Stack>
                <Link to='/'>
                  <Avatar
                    src={mode === 'dark' ? logoDark : logoLight}
                    sx={{
                      width: 230,
                      height: 60,
                      margin: 2,
                      borderRadius: 0,
                      objectFit: 'cover',
                      display: { xs: 'none', sm: 'block' }
                    }}
                  />
                </Link>
              </Stack>
            </Box>

          </Grid>
          <Grid item xs={12} sm={6} >
            <Stack>
              <Typography variant='body-1' sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              About us
              </Typography>
              <Typography variant='body-1' sx={{ fontSize: '20px' }}>
              20127425 - Lê Trần Phi Hùng
              </Typography>
              <Typography variant='body-1' sx={{ fontSize: '20px' }}>
              20127621 - Châu Hoàng Tấn
              </Typography>
              <Typography variant='body-1' sx={{ fontSize: '20px' }}>
              20127662 - Nguyễn Đình Văn
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton color="inherit" aria-label="facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="linkedin">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="instagram">
            <InstagramIcon />
          </IconButton>
        </Box>
      </AppBar>
    </Stack>
  )
}

export default Footer
