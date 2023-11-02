
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout.js'
import Home from './pages/home/Home.js'
import Register from './pages/register/Register.js'
import Login from './pages/login/Login.js'
import NoPage from './pages/noPage/NoPage.js'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path="register" element = {<Register/>}/>
          <Route path="login" element = {<Login/>}/>
          <Route path="*" element = {<NoPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
