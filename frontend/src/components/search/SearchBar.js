import { Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import './style.scss'

function SearchBar() {
  return (
    <Stack>
      <Stack className='searchBar' direction='row'>
        <input/>
        <SearchIcon className='icon'/>
      </Stack>
    </Stack>
  )
}

export default SearchBar