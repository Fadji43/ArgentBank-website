import React from 'react';
import '../css/main.css';
import HeaderConnect from'../components/HeaderConnect.jsx';
import LayoutUser from '../components/LayoutUser';
import Welcome from '../components/Welcome';
import Account from '../components/Account';
import Footer from '../components/Footer';

function User() {
    return (
        <div>
            <main>
                <HeaderConnect />
                <LayoutUser />
                    <Welcome />
                    <Account/>
                    <Account/>
                    <Account/>
                <Footer />
            </main>  
        </div>
       
    )
}

export default User;