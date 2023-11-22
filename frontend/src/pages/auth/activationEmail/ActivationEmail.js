import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { activationEmailService } from '../../../redux/APIs/userServices';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if(activation_token) {
        const activateEmail = async () => {
            try {
                const res = await activationEmailService(activation_token);
                setSuccess(res.message);
                console.log(activation_token,)
        } catch (error) {
          console.log(error);
          error.message && setErr(error.message)
        }
      }
      activateEmail();
    }
  }, [activation_token])

  return (
    <div className='active-page'>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {err && (<Alert severity="error">{err}</Alert>)}
        {success && (<Alert severity="success">{success}</Alert>)}
      </Stack>
    </div>
  )
}

export default ActivationEmail