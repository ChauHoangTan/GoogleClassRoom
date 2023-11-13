import { Grid, Typography, Card, Stack, Avatar } from '@mui/material';
import React from 'react'
import './style.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

const CardClass = ({title, tagline, author,}) => {
    return(
        <Card className='card'>
            <Stack direction='column' className='cardHeader'>
                <Stack direction='row' alignItems='center'><Typography variant='h5' className='text-limit'>{title} </Typography> <MoreVertIcon/> </Stack>
                <div><Typography variant='body-1' className='text-limit'>{tagline}</Typography></div>
                <div><Typography variant='body-2' className='text-limit'>{author}</Typography></div>

                <img src='https://i.pinimg.com/564x/a7/3d/b9/a73db9ebfd5e0cb4ec1fc466026b2349.jpg'/>
                <Avatar className='avatar'/>
            </Stack>

            <div className='expandBottom'></div>
            <Stack direction='row' sx={{borderTop:'2px solid rgb(199, 199, 199)', padding:'10px 20px', color:'black'}}
                justifyContent='end'>
                <AssignmentIndOutlinedIcon/>
                <FolderOpenOutlinedIcon sx={{marginLeft:'20px'}}/>
            </Stack>
            
            
        </Card>
    )
}

function HomePageContent() {
    return ( 
        <Grid container spacing={2} ml={5} mt={1}>
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
     );
}

export default HomePageContent;