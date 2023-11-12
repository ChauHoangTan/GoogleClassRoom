import React, { useState } from 'react';
import {
  Button,
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material';
import { Alert } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const defaultTheme = {}; // Bạn có thể thêm các cài đặt theme tùy chọn ở đây

const EditProfile = () => {
  const [inputUserNameValue, setInputUserNameValue] = useState('');
  const [inputFullNameValue, setInputFullNameValue] = useState('');
  const [inputImageValue, setInputImageValue] = useState('');
  const [inputPhoneValue, setInputPhoneValue] = useState('');
  const [inputDobValue, setInputDobValue] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [value, setValue] = React.useState(dayjs());

  // Thêm các state và hàm xử lý thay đổi tương ứng cho các trường khác

  const handleInputUserNameChange = (event) => {
    setInputUserNameValue(event.target.value);
  };

  const handleInputFullNameChange = (event) => {
    setInputFullNameValue(event.target.value);
  };

  const handleInputImageChange = (event) => {
    setInputImageValue(event.target.value);
  };

  const handleInputPhoneChange = (event) => {
    setInputPhoneValue(event.target.value);
  };

  const handleInputDobChange = (event) => {
    setInputDobValue(event.target.value);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationOpen(false);
  };

  // Thêm các state và hàm xử lý thay đổi tương ứng cho các trường khác

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thêm logic xử lý khi submit form
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid
        container
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        maxWidth="xs"
      >
        <Container margin={4} component={Paper} elevation={6}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: 'FingerPaint', fontSize: '40px' }}
            >
              Edit Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    value={inputUserNameValue}
                    onChange={handleInputUserNameChange}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="image"
                    label="Image URL"
                    name="image"
                    autoComplete="image"
                    value={inputImageValue}
                    onChange={handleInputImageChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="fullName"
                    value={inputFullNameValue}
                    onChange={handleInputFullNameChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    value={inputPhoneValue}
                    onChange={handleInputPhoneChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="Date of birth"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>

      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleNotificationClose}>
        <Alert onClose={handleNotificationClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default EditProfile;
