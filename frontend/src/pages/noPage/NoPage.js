// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Grid, Paper } from '@mui/material';

const NoPage = () => {
  return (
    <Container maxWidth="md" component={Paper} elevation={10} sx={{ my:5, borderRadius: 10 }}>
      <Typography variant="h1" component="div" gutterBottom sx={{ color: '#465d74' }}>
        404 - Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might be unavailable or does not exist.
      </Typography>
      <Button component={Link} to="/" variant="outlined" sx={{ color: '#465d74', my: 5}}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NoPage;
