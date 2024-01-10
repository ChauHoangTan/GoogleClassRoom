import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

export const SocketContext = createContext()

function SocketProvider({ children }) {
  const navigate = useNavigate()
  const [socket, setSocket] = useState(null)
  const [notifications, setNotifications] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [isNewNotification, setIsNewNotification] = useState(false)
  const { userInfo } = useSelector(
    state => state.userLogin
  )

  useEffect(() => {
    const newSocket = io('https://nexusedu.onrender.com', {
    // const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        // 'Access-Control-Allow-Origin': 'https://google-class-room-five.vercel.app'
        'Access-Control-Allow-Origin': 'https://nexusedu.vercel.app'
      }
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect() // Disconnect the socket on unmount
    }
  }, [])

  useEffect(() => {
    if (userInfo?.Authorization) {
      socket?.emit('newUser', userInfo?._id)

      socket?.emit('initial_data', userInfo._id)
      socket?.on('get_data', getData)
      socket?.on('change_data', changeData)
      return () => {
        socket?.off('get_data')
        socket?.off('change_data')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userInfo])

  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        window.location.reload() // Reload the page on socket disconnect
      })
    }
  }, [socket])

  const getData = (notifications) => {
    if (notifications.length && notifications.some((notification) => notification.read === false)) {
      setIsNewNotification(true)
    } else {
      setIsNewNotification(false)
    }
    setNotifications(notifications)
  }
  const changeData = () => socket?.emit('initial_data', userInfo._id)

  const handleClick = (index) => {
    navigate(notifications[index].link, { replace: true })
    socket.emit('check_select_notification', notifications[index])
    window.location.reload()
  }

  const handleClickAll = () => {
    socket?.emit('check_all_notifications', userInfo._id)
  }

  return (
    <SocketContext.Provider
      value={{ socket, setSocket, notifications, handleClick, handleClickAll }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider