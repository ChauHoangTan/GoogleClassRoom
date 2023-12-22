import { useContext, useEffect, useState } from 'react'
import './style.scss'

import { Avatar, Divider, Stack, Typography } from '@mui/material'
import { Message } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { SocketContext } from '../../Context/SocketProvider'
import moment from 'moment'

const listNoti = [
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://www.toynk.com/cdn/shop/articles/Is_Avatar_the_Last_Airbender_an_Anime.jpg?v=1661732964',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  },
  {
    avatar:'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190620/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-178699bcb1cf6d58f3f17d3a1ee26472.jpg',
    nameObj:'Advanced Web Programming',
    noti:'just posted an announcement',
    time:'12:20'
  }
]

const NotificationItem = ({ avatar, nameObj, noti, time, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <Stack
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        sx={{
          cursor: 'pointer', /* Add a pointer cursor for hover indication */
          '&:hover': { /* Apply styles on hover */
            backgroundColor: '#F5F5F5',
          },
        }}
      >
      <Stack direction='row' alignItems='center' spacing={2} mt={1} pb={2} sx={{ borderBottom:'2px solid #DFE0DF' }}>
        <Avatar src={avatar}/>
        <Stack>
          <Typography variant='body-1'><Typography variant='body-1' sx={{ fontWeight:'bold' }}>{nameObj} </Typography>{noti}</Typography>
          <Typography variant='body-1' sx={{ fontStyle:'italic', opacity:'0.75' }}>{time}</Typography>
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
    <Stack p={2} sx={{ width:'400px', maxHeight:'90vh' }}>
      <Typography variant='h6' sx={{ fontWeight:'bold' }}>Notification</Typography>
      {notifications.length > 0 ? notifications.map((item, index) => {
        return <NotificationItem
                    key={index} 
                    avatar={item.image} 
                    nameObj={item.nameObj} 
                    noti={item.content} 
                    time={moment(item.createdAt).format(
                        'YYYY-MM-DD H:mm:ss'
                    )}
                    onClick={() => handleClick(index) }
                />
      }
      
      ) : (
        <Typography variant="body-1" sx={{
            // marginLeft: 10,
            // color: 'red',
            mt: 2,
            textAlign: 'center',
          }}
          >
            Empty
          </Typography>
      )}
      {notifications.length > 0 && (<Typography variant="body-1" sx={{
        // marginLeft: 10,
        color: 'red',
        '&:hover': {
          textDecoration: 'underline',
          cursor: 'pointer'
        },
        mt: 2,
        textAlign: 'center',
      }}
        onClick={handleClickAll}
      >
        See All
      </Typography>)}
    </Stack>
  )
}

export default Notification