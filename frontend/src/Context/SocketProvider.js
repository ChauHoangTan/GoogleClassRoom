import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

function SocketProvider({ children }) {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isNewNotification, setIsNewNotification] = useState(false);
    const { userInfo } = useSelector(
        state => state.userLogin
    )

    useEffect(() => { 
        setSocket(io('http://localhost:5000', {
        withCredentials: true,
        extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000' 
        }
    }))
    },[])

    useEffect(() => {
        if(userInfo?.Authorization) {
            socket?.emit('newUser', userInfo?._id)
            
            socket?.emit('initial_data', userInfo._id);
            socket?.on('get_data', getData);
            socket?.on('change_data', changeData);
            return () => {
              socket?.off('get_data');
              socket?.off('change_data');
            }
        }
    },[socket, userInfo])
    
    const getData = (notifications) => {
        if (notifications.length && notifications.some((notification) => notification.read === false)) {
          setIsNewNotification(true);
        } else {
          setIsNewNotification(false);
        }
        setNotifications(notifications);
      };
      const changeData = () => socket?.emit('initial_data', userInfo._id);

    const handleClick = (index) => {
        navigate(notifications[index].link)
        socket.emit('check_select_notification', notifications[index]);
      };
    
      const handleClickAll = () => {
        socket.emit('check_all_notifications');
      };

  return (
    <SocketContext.Provider
        value={{ socket, setSocket, notifications, handleClick, handleClickAll }}
    >
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider