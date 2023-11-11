import Axios from "./Axios";

// Register new user API
const registerService = async (user) => {
    const {data} = await Axios.post("/users", user);

    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// Logout user
const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null;
};

// Login user API
const loginService = async (user) => {
    const {data} = await Axios.post("/users/login", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

export { registerService, logoutService, loginService };