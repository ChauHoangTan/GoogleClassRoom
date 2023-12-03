import { Box, Button, Stack } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import './style.scss'
import { useState } from 'react'
import theme from '../../theme'

function SearchBar() {
  const [input, setInput] = useState( '' )
  const onChange = ( e ) => {
    setInput(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Stack>
      <form onSubmit={onSubmit} className='search'>
        <input className='inputSearch' label="Search..." placeholder='Search...' value={input}
          onChange={onChange}/>
        <Button><SearchOutlinedIcon/></Button>
      </form>
    </Stack>
  )
}

export default SearchBar