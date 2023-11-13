
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout.js'
import Home from './pages/home/Home.js'
import Register from './pages/register/Register.js'
import Login from './pages/login/Login.js'
import Landing from './pages/landing/Landing.js'
import Account from "./pages/account/Account.js";
import NoPage from './pages/noPage/NoPage.js';
import ToastContainer from './components/notification/ToastContainer.js'
import Password from "./pages/password/Password.js";
import Profile from "./pages/profile/Profile.js";
import {ProtectedRouter} from "./ProtectedRouter.js";
import { useState } from "react";

function App() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Layout/>}>
            <Route index element = {<Landing/>}/>
            <Route path="account" element = {<Account/>}/>
            <Route path="*" element = {<NoPage/>} />
            <Route element={<ProtectedRouter />} >
              <Route path="password" element = {<Password/>}/>
              <Route path="profile" element = {<Profile/>}/>
              <Route path="home" element = {<Home/>}/>
            </Route>
          </Route>

          <Route path="login" element = {<Login rememberMe={rememberMe} setRememberMe={setRememberMe} />}/>
          <Route path="register" element = {<Register/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
