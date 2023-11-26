/* eslint-disable react/no-unknown-property */
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardContent, Grid, Paper, Rating, Stack, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import landing from '../../assets/img/landing.png'


const theme = createTheme({
  palette: {
    primary: {
      main: '#439FFF'
    },
    secondary: {
      main: '#00EBBE'
    }

  }
})

const Title = ({ children }) => {
  return (
    <Typography variant='body-1' sx={{ fontSize: '30px', fontWeight: 'bold', color: '#347FDB', textDecoration: 'underline 2px solid #347FDB' }}>
      {children}
    </Typography>
  )
}

const Introduction = () => {

  const navigate = useNavigate()
  const handleClickBthStart = () => {
    navigate('/login')
  }


  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' justifyContent='center' >
        <Grid container sx={{ width: '100%' }} alignItems='center' className='containerGrid'>
          <Grid item md={12} lg={6} className='showResponsive'>
            <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'>
              <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'
                sx={{ width: '90%' }}>
                <Typography variant='h4' mt={5}
                  sx={{ fontFamily:'Arima', fontWeight:'600', textShadow:'1px 1px 0px black' }}>
                                    Welcome to Google Classroom!
                </Typography>
                <Typography variant='h6'
                  sx={{ fontFamily:'Arima', fontWeight:'600', textShadow:'1px 1px 0px black' }}>
                                    Come to us, we will bring you the best education experience!
                </Typography>
                <Typography variant='body-1' mt={3}
                  sx={{ fontSize: '16px' }}>
                                    Greetings, educators and students alike! We extend a warm welcome to our dedicated space
                                    for Google Classroom, where learning and collaboration thrive. Whether you&apos;re a teacher
                                    shaping minds or a student on a quest for knowledge, this hub is designed with you in mind.
                </Typography>
                <button className='btnStart'
                  onClick={handleClickBthStart}>Let&apos;s Start</button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item md={12} lg={6} className='hideResponsive'>
            <Stack direction='column' className='containerImg' sx={{padding:'20px'}}>
              <img src='https://i.pinimg.com/originals/b3/60/fa/b360fa2748b24cb1ed01aab987a03d31.gif'/>
            </Stack>
          </Grid>
        </Grid>
      </Stack>


    </ThemeProvider>
  )
}

const Famous = () => {
  return (
    <Stack direction='row' justifyContent='center' mt={10}>
      <Stack direction='column' sx={{ width: '90%' }}>

        <Grid container spacing={3} className='showResponsive'>
          <Grid item md={12} lg={8}>
            <Title>Why Should Use My Google Classroom</Title>
            <Stack direction='column' mt={6}>
              <Paper elevation={1} sx={{ borderRadius: '20px' }} className='paperQuantity'>
                <Grid container spacing={3} justifyContent="center" >
                  {/* Số liệu 1 */}
                  <Grid item xs={12} sm={6} md={3}>
                    <div align="center">
                                            50M+
                    </div>
                    <span align="center">
                                            Teachers use it every day
                    </span>
                  </Grid>

                  {/* Số liệu 2 */}
                  <Grid item xs={12} sm={6} md={3}>
                    <div align="center">
                                            100M+
                    </div>
                    <span align="center">
                                            Students participate in class
                    </span>
                  </Grid>

                  {/* Số liệu 3 */}
                  <Grid item xs={12} sm={6} md={3}>
                    <div align="center">
                                            1.5M+
                    </div>
                    <span align="center">
                                            Lectures are created every day
                    </span>
                  </Grid>

                  {/* Số liệu 4 */}
                  <Grid item xs={12} sm={6} md={3}>
                    <div align="center">
                                            95%
                    </div>
                    <span align="center">
                                            User satisfaction
                    </span>
                  </Grid>
                </Grid>
              </Paper>

              <Typography variant='body-1' mt={2}>
                <li>
                  <Typography variant='body-1' sx={{ fontWeight:'bold' }}>Seamless Integration with Google Services: </Typography>
                                    Google Classroom seamlessly integrates with other
                                    Google services such as Google Drive, Google Docs, and Google Calendar. </li>

              </Typography>

              <Typography variant='body-1' mt={1}>
                <li>
                  <Typography variant='body-1' sx={{ fontWeight:'bold' }}>User-Friendly and Intuitive Interface: </Typography>
                                    Google Classroom offers a user-friendly and
                                    intuitive interface that is accessible for both teachers and students.
                </li>


              </Typography>

              <Typography variant='body-1' mt={1}>
                <li>
                  <Typography variant='body-1' sx={{ fontWeight:'bold' }}>Powerful Collaboration and Communication Tools: </Typography>
                                    Google Classroom provides powerful tools for real-time collaboration
                                    and communication.
                </li>

              </Typography>
            </Stack>

          </Grid>

          <Grid item lg={4} className='hideResponsive'>
            <img
              className='img'
              src='https://i.pinimg.com/564x/03/f2/34/03f23479c81a356126bc1ba54a091c0f.jpg'/>
          </Grid>
        </Grid>
      </Stack>

    </Stack>
  )
}

const Features = () => {
  return (
    <Stack direction='column' alignItems='center' mt={10}>
      <Stack sx={{ width:'90%' }}>
        <Title>Features</Title>
      </Stack>

      <Grid container sx={{ width:'90%' }} spacing={2} className='gridFeatures' mt={2}>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' sx={{ padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD' }}>
            <img src='https://i.pinimg.com/564x/4a/30/13/4a30135c32abbea9693ce564b7f02348.jpg'/>
            <CardContent>
              <Typography variant='body-1' sx={{ fontWeight:'bold' }}>Effortless Class Management: </Typography>Streamline your classes with the power of Google Classroom.
                            Manage assignments, share resources, and foster collaboration seamlessly.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' sx={{ padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD' }}>
            <img src='https://i.pinimg.com/564x/1f/ec/bc/1fecbc7d8496e7d6a7251d46ca1a84f6.jpg'/>
            <CardContent>
              <Typography variant='body-1' sx={{ fontWeight:'bold' }}>Empowering Educators: </Typography>Discover tips, tricks,
                                and best practices to maximize your teaching potential with Google Classroom. From innovative assignments
                                to effective communication strategies, we&apos;ve got you covered.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' sx={{ padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD' }}>
            <img src='https://i.pinimg.com/564x/b8/b4/e1/b8b4e1118277242dfcdd0624217ee560.jpg'/>
            <CardContent>
              <Typography variant='body-1' sx={{ fontWeight:'bold' }}>Engaging Student Experiences: </Typography>Students, embark
                                on an interactive learning journey! Explore ways to make the most of Google Classroom, participate in discussions,
                                and elevate your academic experience.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' sx={{ padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD' }}>
            <img src='https://i.pinimg.com/564x/2d/30/14/2d301464613de4d3421e8572dc051ecb.jpg'/>
            <CardContent>
              <Typography variant='body-1' sx={{ fontWeight:'bold' }}> Stay Updated: </Typography>Keep abreast of the latest Google Classroom
                            features, updates, and educational trends. Our hub is a dynamic space where the learning never stops.
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

const Review = ({ title, review, rating, avatar, name }) => {
  return (
    <Stack direction='column' mt={3}>
      <Typography variant='body-1' sx={{ fontWeight:'bold' }}>{title}</Typography>
      <Typography variant='body-1' mb={1}>{review}</Typography>
      <Rating value={rating}/>
      <Stack direction='row' alignItems='center' mt={1}>
        <Avatar src={avatar}/>
        <Typography variant='body-1' ml={2}>{name}</Typography>
      </Stack>
    </Stack>
  )
}

const CustomerReviews = () => {
  return (
    <Stack direction='column'>
      <Review title='Excellent Educational Platform'
        review='Google Classroom has truly transformed my teaching experience.
                    The user-friendly interface makes it easy to manage classes, share resources,
                    and interact with students. The seamless integration with Google Drive is a game-changer
                    for organizing and accessing educational materials. The ability to provide real-time
                    feedback enhances communication and student engagement. A highly recommended platform
                    for educators seeking efficiency and collaboration.'
        rating={5}
        avatar='https://i.pinimg.com/564x/93/75/ae/9375aef3b0ea35e0cf4ca12862bb5fef.jpg'
        name='Oreki'/>

      <Review title='User-Friendly but Limited Features'
        review='Google Classroom is undoubtedly easy to use, making it accessible for both
                    teachers and students. The platform excels in basic class management and document sharing.
                     However, I find that it lacks some advanced features compared to other educational platforms.
                     More customization options for assignments and a more robust grading system would enhance the
                      overall experience. Despite these limitations, it remains a solid choice for straightforward
                       online classroom needs.'
        rating={5}
        avatar='https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg'
        name='Annya'/>
    </Stack>
  )
}

const QuestionAndAnswer = ({ question, answer }) => {
  return (
    <Stack direction='column' mb={2}>
      <Stack direction='row'>
        <Accordion>
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ borderRadius:'10px 10px 0px 0px', outline:'none', backgroundColor:'#EEE8A9' }}
          >
            <Typography>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  )
}

const FrequentlyQuestions = () => {
  return (
    <Stack direction='column' mt={3}>
      <QuestionAndAnswer
        question='How do I create a new class in Google Classroom?'
        answer='To create a new class in Google Classroom, log in to your Google account,
                go to Google Classroom, click the "+" icon, and select "Create class." Follow the
                prompts to set up your class, including adding a class name, section, and description.'/>

      <QuestionAndAnswer
        question={'Can students see each other\'s work in Google Classroom?'}
        answer={`It depends on how you set up assignments. By default,
                 students can view their own work, but you have control over whether 
                 they can see each other's work. When creating an assignment, choose 
                 the appropriate settings under "Student can view" and "Student can edit."`}/>

      <QuestionAndAnswer
        question={'How can I grade assignments in Google Classroom?'}
        answer={`To grade assignments in Google Classroom, go to the Classwork page, 
                select the assignment, and click on "View assignment." You can view and grade 
                individual student submissions, provide feedback, and assign grades. Google 
                Classroom also offers features for efficient grading, such as rubrics and comment banks.`}/>

      <QuestionAndAnswer
        question={'Is Google Classroom free to use?'}
        answer={`Yes, Google Classroom is a free platform for both educators and students. 
                It is part of the Google Workspace for Education suite, which offers additional 
                features for schools and institutions. Users can create classes, share resources, 
                and collaborate without any cost, making it an accessible tool for online learning.`}/>
    </Stack>
  )
}

const CustomerReviewsAndFrequentlyQuestions = () => {
  return (
    <Stack direction='row' justifyContent='center'>
      <Grid container sx={{ width:'90%' }} spacing={2}>
        <Grid item md={12} lg={6} mt={10}>
          <Title>Customer Reviews</Title>
          <CustomerReviews/>
        </Grid>

        <Grid item md={12} lg={6} mt={10}>
          <Title>Frequently Questions</Title>
          <FrequentlyQuestions/>
        </Grid>
      </Grid>
    </Stack>
  )
}


const SubmitQuestion = () => {

  // handle for form submit
  const [inputEmail, setInputEmail] = useState('')
  const [inputQuestion, setInputQuestion] = useState('')

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }

  const handleInputQuestion = (e) => {
    setInputQuestion(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputEmail('')
    setInputQuestion('')
  }

  return (
    <Stack className='submitQuestion'>
      <Typography variant='body-1'>Please fill in your email address and question, we will reply to your email as soon as!</Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack direction='column' justifyContent='center'>
          <input placeholder='Email address...' type='text'
            value={inputEmail}
            onChange={(e) => handleInputEmail(e)}/>
          <textarea placeholder='Your questions...'
            value={inputQuestion}
            onChange={(e) => handleInputQuestion(e)}/>
          <button variant='outlined'>Submit</button>
        </Stack>


      </form>
    </Stack>
  )
}

const Contact = () => {
  return (
    <Grid container className='contact'>
      <Grid item xs={8}>
        <Stack>
          <div><Typography variant='body-1' sx={{ fontWeight:'bold' }}>Địa chỉ: </Typography> 12X đường Nguyễn Thị Thập, Tân Quy, Quận 7, Thành phố Hồ Chí Minh, Việt Nam</div>
          <div><Typography variant='body-1' sx={{ fontWeight:'bold' }}>Zalo: </Typography> 09012345678</div>
          <div><Typography variant='body-1' sx={{ fontWeight:'bold' }}>FaceBook: </Typography> GoogleClassroom</div>
          <div><Typography variant='body-1' sx={{ fontWeight:'bold' }}>Email: </Typography> GoogleClassroom@gmail.com</div>
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <img src='https://i.pinimg.com/564x/36/d9/35/36d935bcd4324d6786d313e69a8e6b9a.jpg'/>
      </Grid>
    </Grid>

  )
}

const SubmitQuestionAndContact = () => {
  return (
    <Stack direction='row' justifyContent='center' sx={{ my: 2 }}>
      <Grid container sx={{ width:'90%' }} spacing={2}>
        <Grid item md={6} lg={6} mt={10}>
          <Title>Have Any Question?</Title>
          <SubmitQuestion/>
        </Grid>

        <Grid item md={6} lg={6} mt={10}>
          <Title>Contact Us</Title>
          <Contact/>
        </Grid>
      </Grid>
    </Stack>
  )
}

function Landing() {
  return (
    <div id='landingPage'>
      <div className='introduction'>
        <Introduction />
      </div>
      <div className='famous'>
        <Famous />
      </div>
      <div className='features'>
        <Features/>
      </div>
      <div className='ReviewsAndQuestions'>
        <CustomerReviewsAndFrequentlyQuestions/>
      </div>
      <div className='SubmitQuestionAndContact'>
        <SubmitQuestionAndContact/>
      </div>

    </div>
  )
}

export default Landing