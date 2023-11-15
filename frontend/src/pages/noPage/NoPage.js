import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'



function NoPage() {
  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <img 
        style={{ width: '100%', objectFit: 'contain', height: '28rem'}} 
        src='/images/404.png' 
        alt='notfound'
      />
      <Typography variant="h5" gutterBottom sx={{ my: 2 }}>
        The page you are looking for might be unavailable or does not exist.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="outlined" 
        sx={{ 
          backgroundColor: '#466874', 
          my: 2, 
          color: '#fff',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#466874',
            border: '1px solid #466874',
          }, 
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default NoPage;
