import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './style.scss';
import { Stack } from '@mui/material';

const Footer = () => {
  const handleSendEmail = () => {
    // Add your email sending logic here
    console.log('Email sent!');
  };

  return (
        <Box
        component="footer"
        sx={{
            mt: 4,
            pb: 4,
            backgroundColor: '#f2f2f2'
        }}
        id='footer'
        >
            {/* Part 1: Name */}
            <Typography component="h1" sx={{fontFamily:'Arima',fontSize: '50px', color: 'white', textAlign: 'center', backgroundColor: '#466874'}}
                    className='text'>
                    Google Class Room
            </Typography>

            <Grid container spacing={2} sx={{ px: 4, py: 2}}>
                <Grid item xs={12} sm={6}>
                    <Stack>
                        <Typography variant='body-1' sx={{fontSize: '20px', fontWeight: 'bold'}}>
                            Contact us
                        </Typography>
                        <Typography variant='body-1' sx={{fontSize: '20px',
                            wordWrap: 'break-word',
                        }}>
                            Email: truongdaihockhoahoctunhien@hcmus.edu.vn
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Stack>
                        <Typography variant='body-1' sx={{fontSize: '20px', fontWeight: 'bold'}}>
                            About us
                        </Typography>
                        <Typography variant='body-1' sx={{fontSize: '20px'}}>
                            20127425 - Lê Trần Phi Hùng
                        </Typography>
                        <Typography variant='body-1' sx={{fontSize: '20px'}}>
                            20127621 - Châu Hoàng Tấn
                        </Typography>
                        <Typography variant='body-1' sx={{fontSize: '20px'}}>
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
        </Box>
  );
};

export default Footer;
