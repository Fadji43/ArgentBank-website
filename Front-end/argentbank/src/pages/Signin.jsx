import React from 'react';
import '../css/main.css';
import Header from'../components/Header';
import Login from '../components/Login';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div>
            <main>
                <Header />
                <Login />
                <Footer />
            </main>  
        </div>
       
    )
}

