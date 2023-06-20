import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [aboutMe, setAboutMe] = useState("");
	const [location, setLocation] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [frontEndErrors, setFrontEndErrors] = useState('')
	const { closeModal } = useModal();

	// console.log('PROFILE IMAGE--->', profileImage)

	const handleSubmit = async (e) => {
		e.preventDefault();

		let allErrors = {}

		if (!profileImage || profileImage === '') allErrors.profileImage = '*Profile picture is required';

		if (Object.keys(allErrors).length) {
			return setFrontEndErrors(allErrors)
		}

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, firstName, lastName, profileImage, aboutMe, location, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/feed')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const handleProfileImageChange = (e) => {
		setProfileImage(e.target.files[0]);
		setFrontEndErrors({});
	  };

	return (
		<>
			<h1 className="signup-header-text">Sign Up</h1>
			<form className="signup-form-container" method='POST' encType="multipart/form-data" onSubmit={handleSubmit}>
				{errors.map((error, idx) => (
					<ul className='signup-form-errors' key={idx}>{error}</ul>
				))}
				<div className="signup-container">
					<label className="signup-label-text">
						Username
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						Email
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						First Name
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						Last Name
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className="signup-container">
					<label htmlFor="profile-image-upload" className="signup-image-label-text">
						<div>
						{frontEndErrors.profileImage ? <p className='signup-form-frontend-errors'>{frontEndErrors.profileImage}</p> : null}
						Profile Picture
						</div>
						<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
							<i className="fa-regular fa-image"></i>
							<div className="signup-image-file-name">{profileImage.name}</div>
						</div>
					</label>
					<input
						id='profile-image-upload'
						className="signup-form-profile-image"
						type="file"
						onChange={handleProfileImageChange}
						accept=".jpg, .jpeg, .png"
						name='profile-image'
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						About Me
					</label>
					<textarea
						className="signup-textarea-input"
						rows={4}
						value={aboutMe}
						placeholder="Optional"
						onChange={(e) => setAboutMe(e.target.value)}
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						Location
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={location}
						placeholder="Optional"
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						Password
					</label>
					<input
						className="signup-form-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="signup-container">
					<label className="signup-label-text">
						Confirm Password
					</label>
					<input
						className="signup-form-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div className="signup-submit-container">
					<button className="signup-submit-button" type="submit">Sign Up</button>
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;
