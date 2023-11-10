import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../assets/img/logo.png'

function Header() {
    return ( 
        <nav id='header'>
            <div className='logo'>
                <img src={logo}/>
            </div>
            <div>
                <Link to="/">Landing</Link>
            </div>
            <div>
                <Link to="/home">Home</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            
      </nav>
     );
}

export default Header;