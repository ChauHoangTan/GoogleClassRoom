
import { Box, Tab } from '@mui/material'
import './style.scss'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
function ClassDetails() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue( newValue )
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} mt={ 2 } id = 'classDetails'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} ml={ 4 }>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Stream" value="1" sx={{ marginRight:'20px' }}/>
            <Tab label="Classwork" value="2" sx={{ marginRight:'20px' }}/>
            <Tab label="People" value="3" sx={{ marginRight:'20px' }}/>
            <Tab label="Grade Composition" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Stream</TabPanel>
        <TabPanel value="2">Classwork</TabPanel>
        <TabPanel value="3">People</TabPanel>
        <TabPanel value="4">Grade Composition</TabPanel>
      </TabContext>
    </Box>
  )
}

export default ClassDetails;