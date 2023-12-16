import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout.js'
import Home from './pages/home/Home.js'
import ClassDetails from './pages/class/ClassDetails.js'
import Register from './pages/auth/register/Register.js'
import Login from './pages/auth/login/Login.js'
import Landing from './pages/landing/Landing.js'
import NoPage from './pages/noPage/NoPage.js'
import ToastContainer from './components/notification/ToastContainer.js'
import Password from './pages/password/Password.js'
import Profile from './pages/profile/Profile.js'
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter.js'
import { useState } from 'react'
import LoginSuccess from './pages/auth/loginSuccess/LoginSuccess.js'
import ActivationEmail from './pages/auth/activationEmail/ActivationEmail.js'
import ForgotPassword from './pages/auth/ForgotPassword.js/ForgotPassword.js'
import ResetPassword from './pages/auth/ResetPassword.js/ResetPassword.js'
import Users from './pages/admin/users/Users.js'
import Classes from './pages/admin/classes/Classes.js'

function App () {
  const [rememberMe, setRememberMe] = useState(false)
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/login'element={<Login rememberMe={rememberMe} setRememberMe={setRememberMe}/>}/>
          <Route path='/login-success/:provider/:userId/:tokenLogin' element={<LoginSuccess />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login/activate' element={<ActivationEmail/>}/>
          <Route path='/user/:type' element={<ForgotPassword />} />
          <Route path='/user/reset/:activation_token' element={<ResetPassword />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path='/user/activate/:activation_token' element={<ActivationEmail/>}/>
            <Route path='*' element={<NoPage />} />
            <Route element={<ProtectedRouter />}>
              <Route path='password' element={<Password />} />
              <Route path='profile' element={<Profile />} />
              <Route path='home' element={<Home />} />
              <Route path='/class/:classId' element={<ClassDetails/>}/>
                <Route element={<AdminProtectedRouter />}>
                    <Route path='/users' element={<Users />} />
                    <Route path='/classes' element={<Classes />} />
                </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
