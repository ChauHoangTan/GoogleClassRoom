import axios from "axios";

const Axios = axios.create({
    baseURL: "https://eduspherehub.onrender.com/api",
});

export default Axios;