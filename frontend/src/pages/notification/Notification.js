import { useState } from 'react'
import './style.scss'

import { Avatar, Stack, Typography, Card, CardContent } from '@mui/material'
import moment from 'moment'
import { teal } from '@mui/material/colors'


const NotificationItem = ({ avatar, nameObj, noti, time, onClick }) => {
  // eslint-disable-next-line no-unused-vars
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Stack
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      sx={{
        cursor: 'pointer', /* Add a pointer cursor for hover indication */
        '&:hover': { /* Apply styles on hover */
          backgroundColor: '#A3A3A3',
          color: '#FFFFFF'
        },
        transition: 'background-color 0.1s linear'
      }}
      px={2}
    >
      <Stack direction='row' alignItems='center' spacing={2} mt={1} pb={2} sx={{ borderBottom: '2px solid #DFE0DF' }}>
        <Avatar src={avatar} />
        <Stack>
          <Typography variant='body-1'><Typography variant='body-1' sx={{ fontWeight: 'bold' }}>{nameObj} </Typography>{noti}</Typography>
          <Typography variant='body-1' sx={{ fontStyle: 'italic', opacity: '0.75' }}>{moment(time).fromNow()}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

function Notification({ notifications, handleClick, handleClickAll }) {
  //  const { socket } = useContext(SocketContext)
  // const { userInfo } = useSelector(
  //     state => state.userLogin
  //   )
  // const [notifications, setNotifications] = useState([]);
  // const [isNewNotification, setIsNewNotification] = useState(false);
  // console.log(userInfo._id)
  // useEffect(() => {
  //   socket.emit('initial_data', userInfo._id);
  //   socket.on('get_data', getData);
  //   socket.on('change_data', changeData);
  //   return () => {
  //     socket.off('get_data');
  //     socket.off('change_data');
  //   };
  // }, []);

  // const getData = (notifications) => {
  //     if (notifications.length && notifications.some((notification) => notification.read === false)) {
  //       setIsNewNotification(true);
  //     } else {
  //       setIsNewNotification(false);
  //     }
  //     setNotifications(notifications);
  //   };
  //   console.log(notifications)
  //   const changeData = () => socket.emit('initial_data');

  //   const handleClick = ({ key }) => {
  //     Message.info(`Clicked on item ${key}`);
  //   };

  //   const handleDropdownClick = () => {
  //     socket.emit('check_all_notifications');
  //   };


  return (
    <Card>
      {/* Header */}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', py: '0!important', color: teal[400] }} px={2}>
          Notifications
        </Typography>
      </CardContent>

      {/* Body with scrolling */}
      <CardContent sx={{ overflowY: 'auto', maxHeight: '60vh', padding: '0!important' }}>
        <Stack sx={{ width: '400px' }}>
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <NotificationItem
                key={index}
                avatar={item.image}
                nameObj={item.userName}
                noti={item.content}
                time={moment(item.createdAt).format('YYYY-MM-DD H:mm:ss')}
                onClick={() => handleClick(index)}
              />
            ))
          ) : (
            <Typography
              variant="body-1"
              sx={{
                p: 2,
                textAlign: 'center',
                color: '#FF0000'
              }}
            >
              Empty
            </Typography>
          )}
        </Stack>
      </CardContent>
      <CardContent sx={{ padding: '0!important' }}>
        {notifications.length > 0 && (
          <Typography
            variant="body-1"
            sx={{
              '&:hover': {
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              py: 1,
              textAlign: 'center',
              color: teal[300],
              fontWeight: 'bold', // Corrected the typo in fontWeight
              margin: 'auto', // Center the text horizontally
              display: 'block' // Ensure block-level display for margin: 'auto' to work
            }}
            onClick={handleClickAll}
          >
            Clear All
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default Notification