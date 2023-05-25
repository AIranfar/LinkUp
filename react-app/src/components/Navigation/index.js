import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar-container'>
			{sessionUser ? (
				<div className='up-link-container'>
					<NavLink exact to="/feed" className='up-link'>Link<span className="up">up</span></NavLink>
				</div>
			) : (
				<div className='splash-page-up-link-container'>
					<div className='up-link'>Link<span className="up">up</span></div>
				</div>
			)}
			{isLoaded && (
				<div>
					{sessionUser ? (
						<ul>
							<ProfileButton user={sessionUser} />
						</ul>
					) : (
						<div className='navigation-signup-login-button-container'>
							{/* <div className='navigation-signup-container'> */}
								<OpenModalButton
									className='navigation-signup-button'
									buttonText="Join Now"
									modalComponent={<SignupFormModal />}
								/>
							{/* </div> */}
							{/* <div className='navigation-login-button'> */}
								<OpenModalButton
									className='navigation-login-button'
									buttonText="Log In"
									modalComponent={<LoginFormModal />}
								/>
							{/* </div> */}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Navigation;
