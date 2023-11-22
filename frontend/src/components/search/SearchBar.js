import { Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import './style.scss'

function SearchBar() {
  return (
    <Stack>
      <Stack className='searchbar' direction='row' sx={{ weight:'90%' }}>
        <input/>
        <SearchIcon className='icon'/>
      </Stack>
    </Stack>
  )
}

export default SearchBar