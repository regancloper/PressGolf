import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {

    const [headerColor, setHeaderColor] = useState('header-clear');

    useEffect(() => {
        document.addEventListener("scroll", scrollListener);
        return () => {
            document.removeEventListener("scroll", scrollListener);
        }
    }, []);

    const scrollListener = () => {
        const background = window.scrollY > 220 ? 'header-dark' : 'header-clear';
        setHeaderColor(background);
    }

    return (
        <>
            <Header color={headerColor} loggedIn={false} />
            <div className="background-course">
                <div className="container">
                    <div className="text-center text-white" style={{ paddingTop: '16rem', paddingBottom: '16rem' }}>
                        <h1>Start Playing with Your Friends.</h1>
                        <p>Keep track of all of your bets in one place.</p>
                        <Link to='/login' className="btn btn-lg btn-primary rounded-0 shadow">Log In</Link>
                    </div>

                </div>
            </div>
            <div className="container-fluid bg-white" style={{ paddingBottom: '5rem' }}>
                <div className="py-5">
                    <h1 className="register-text text-center" style={{ fontWeight: 600 }}>
                        Press
                </h1>
                    <p className="text-center">A golf app to manage all of your bets when you play golf.</p>
                </div>

                <div className="container">
                    <div className="card-deck">
                        <div className="card shadow border-0 rounded-0 d-flex align-items-center">
                            <div className="card-body">
                                <p className="card-text register-text text-center">Create a free account with your name and email address.</p>
                            </div>
                        </div>
                        <div className="card shadow border-0 rounded-0 d-flex align-items-center">
                            <div className="card-body">
                                <p className="card-text register-text text-center">Post all of your scores, or just scores from your most recent golf rounds.</p>
                            </div>
                        </div>
                        <div className="card shadow border-0 rounded-0 d-flex align-items-center">
                            <div className="card-body">
                                <p className="card-text register-text text-center">Keep track of an official handicap index as you continue to post scores.</p>
                            </div>
                        </div>
                        <div className="card shadow border-0 rounded-0 d-flex align-items-center">
                            <div className="card-body">
                                <p className="card-text register-text text-center">Auto-manage bets and amounts when playing with friends.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default Home;