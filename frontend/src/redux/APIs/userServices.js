import Axios from "./Axios";

// Register new user API
const registerService = async (user) => {
    const {data} = await Axios.post("/users/register", user);

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
    console.log(user, "456")
    const {data} = await Axios.post("/users/login", user);

    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// Change password API 
const changePasswordService = async (password, token) => {
    const { data } = await Axios.put("/users/password", password, {
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return data;
}

export { registerService, logoutService, loginService, changePasswordService };