import React from 'react';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import Footer from '../Footer';
import './SplashPage.css'

const SplashPage = () => {

    return (
        <div className='splash-page-bigger-container' >
            <div className='splash-container'>
                <div className='splash-button-container'>
                    <h1>Welcome to your professional community</h1>
                    <OpenModalButton
                        className='splash-login-sign-up-button'
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalButton
                        className='splash-login-sign-up-button'
                        buttonText='New to LinkUp? Join now'
                        modalComponent={<SignupFormModal />}
                    />
                </div>
                <img className='splash-page-image' src="/images/splash-page-image.jpg" alt='splash-page-image' />
            </div>
            <Footer />
        </div>
    )
}

export default SplashPage;
