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
		<ul>
			<ul>
				<NavLink exact to="/">Home</NavLink>
			</ul>
			{isLoaded && (
				<div>
					{sessionUser ? (
						<ul>
							<ProfileButton user={sessionUser} />
						</ul>
					) : (
						<>
							<OpenModalButton
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>

							<OpenModalButton
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
						</>
					)}
				</div>
			)}
		</ul>
	);
}

export default Navigation;
