import './style.scss'

import { Avatar, Divider, Stack, Typography } from '@mui/material'

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

const NotificationItem = ({ avatar, nameObj, noti, time }) => {
  return (
    <Stack>
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

function Notification() {
  return (
    <Stack p={2} sx={{ width:'400px', maxHeight:'90vh' }}>
      <Typography variant='h6' sx={{ fontWeight:'bold' }}>Notification</Typography>
      {listNoti.map((item, index) => {
        return <NotificationItem key={index} avatar={item.avatar} nameObj={item.nameObj} noti={item.noti} time={item.time}/>
      })}
    </Stack>
  )
}

export default Notification