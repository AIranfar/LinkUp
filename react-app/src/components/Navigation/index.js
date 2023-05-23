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
					<NavLink exact to="/posts" className='up-link blue-link'><span className="up">up</span></NavLink>
				</div>
			) : (
				<div className='up-link-container'>
					<div className='up-link white-link'>Link<span className="up">up</span></div>
				</div>
			)}
			{isLoaded && (
				<div>
					{sessionUser ? (
						<ul>
							<ProfileButton user={sessionUser} />
						</ul>
					) : (
						<>
							<OpenModalButton
								className='navigation-signup-button'
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
							<OpenModalButton
								className='navigation-login-button'
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Navigation;
