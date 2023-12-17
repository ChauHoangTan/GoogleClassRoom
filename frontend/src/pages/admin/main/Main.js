import { Group, MapsHomeWork } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import moment from 'moment'
import PieUsersLoginMethods from './PieUsersLoginMethods'
import AreaClassesUsers from './AreaClassesUsers'
import { getAllUsersAction } from '../../../redux/actions/userActions'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClassesAction } from '../../../redux/actions/classActions'

const Main = () => {
  const dispatch = useDispatch()
  // useEffect
  const { isLoading: userLoading, isError: userError, users } = useSelector(
    (state) => state.adminGetAllUsers
  )

  const { isLoading: classLoading, isError: classError, classes } = useSelector(
    (state) => state.adminGetAllClasses
  )

  useEffect(() => {
    dispatch(getAllUsersAction())
    dispatch(getAllClassesAction())
    if (userError || classError) {
      toast.error(userError || classError)
      dispatch({ type: userError ? 'GET_ALL_USERS_RESET' : 'GET_ALL_CLASSES_RESET' })
    }
  }, [dispatch, userError, classError])

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: '4.25fr 4.25fr 3.5fr',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Users</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users?.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Classes</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{classes?.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography>Recently added Users</Typography>
          <List>
            {users?.slice(0, 4).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={`Time Created: ${moment(user?.createdAt).format(
                      'YYYY-MM-DD H:mm:ss'
                    )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Recently added Classes</Typography>
          <List>
            {classes?.slice(0, 4).map((classItem, i) => (
              <Box key={classItem?._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={classItem?.className}
                      src={classItem?.image}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={classItem?.className}
                    secondary={`Added: ${moment(classItem?.createdAt).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <PieUsersLoginMethods />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <AreaClassesUsers users={users} classes={classes} />
      </Paper>
    </Box>
  )
}

export default Main
