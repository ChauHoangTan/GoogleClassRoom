import { Button, Stack, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import './style.scss'
import { useState } from 'react'

function SearchBar({ setSearchTerm }) {
  const [input, setInput] = useState( '' )
  const onChange = ( e ) => {
    setInput(e.target.value)
    setSearchTerm(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <Stack>
      <form onSubmit={onSubmit} className='search'>
        <TextField className='inputSearch' label="Search..." value={input}
          onChange={onChange} sx={{ '& fieldset': {
            borderColor: (theme) => theme.palette.primary.main
          },
          '&:hover fieldset': {
            borderColor: (theme) => theme.palette.primary.main + '!important'
          } }}/>
        <Button sx={{ backgroundColor: (theme) => theme.palette.primary.main }}><SearchOutlinedIcon/></Button>
      </form>
    </Stack>
  )
}

export default SearchBar