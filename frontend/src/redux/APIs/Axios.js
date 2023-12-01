import axios from 'axios'

const Axios = axios.create({
    // baseURL: 'http://localhost:5000/api'
    baseURL: 'https://nexusedu.onrender.com/api',
})

export default Axios