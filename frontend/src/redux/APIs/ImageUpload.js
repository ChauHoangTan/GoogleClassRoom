import toast from 'react-hot-toast'
import Axios from './Axios'

const uploadImageService = async (file, setLoading) => {
  try {
    setLoading(true)
    const { data } = await Axios.post('/upload', file)
    setLoading(false)
    toast.success('Image Upload successfully')
    return data
  } catch (error) {
    setLoading(false)
    // toast.error('Image Upload Failure')
    toast.error(error.response.data.message)
  }
}


const deleteImageService = async (url) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await Axios.delete('/upload', { data: { imageUrl: url } })
    return true
  } catch (error) {
    return false
  }
}

export { uploadImageService, deleteImageService }
