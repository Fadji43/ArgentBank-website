import React from 'react';
import '../css/main.css';
import HeaderConnect from'../components/HeaderConnect';
import LayoutUser from '../components/LayoutUser';
import Welcome from '../components/Welcome';
import Account from '../components/Account';
import Footer from '../components/Footer';

function User() {
    return (
        <div>
            <main>
                <HeaderConnect />
                <LayoutUser style={{ backgroundColor: '#12002b'}}>
                    <Welcome />
                    <Account/>
                </LayoutUser> 
                <Footer />
            </main>  
        </div>
       
    )
}

export default User;

