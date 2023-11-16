import React from 'react';
import './styles.scss';
import Header from'../components/Header';
import Hero from '../components/Hero';
import Objective from '../components/Objective';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div>
            <main>
                <Header />
                <Hero/>
                <Objective />
                <Footer />
            </main>  
        </div>
       
    )
}

