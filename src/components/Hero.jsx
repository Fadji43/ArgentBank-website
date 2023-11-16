import React from 'react';
import Img_hero from '../img/bank-tree';
import '../css/main.scss';

function Hero() {
    return ( 
        <div className="hero">
            <img className="banner_img" src={Img_hero} alt="Bannière" />
            <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
            </section>
      </div>
    )
}

export default Hero;