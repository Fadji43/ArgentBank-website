import React from 'react';
import '../css/main.css';
import HeaderConnect from'../components/HeaderConnect.jsx';
import LayoutUser from '../components/LayoutUser';
import Identify from '../components/Identify.jsx';
import Account from '../components/Account.jsx';
import Footer from '../components/Footer.jsx';

function Profile() {
    return (
        <div>
            <main>
                <HeaderConnect />
                <LayoutUser style={{ backgroundColor: '#12002b'}}>
                    <Identify />
                    <Account/>
                </LayoutUser>
                <Footer />
            </main>  
        </div>
    )
}

export default Profile;

