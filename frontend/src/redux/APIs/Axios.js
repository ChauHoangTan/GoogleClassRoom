import axios from "axios";

const Axios = axios.create({
    // baseURL: "https://eduspherehub.onrender.com/api",
    baseURL: "http://localhost:5000/api",
});

export default Axios;