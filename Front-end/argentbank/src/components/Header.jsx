import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';

function Header() {
    return (
        <nav className="main-nav">
            <Link to="/signin">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to="/signin" className="main-nav-item">
                    <FontAwesomeIcon icon={faUserCircle}  className="icon_margin" />
                    Sign In
                </Link>
            </div>
        </nav>
    );
}

export default Header;

