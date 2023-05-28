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
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
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

	return (
		<>
			<h1 className="signup-header-text">Sign Up</h1>
			<form className="signup-form-container" onSubmit={handleSubmit}>
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
					<label className="signup-label-text">
						Profile Picture
					</label>
					<input
						className="signup-form-input"
						type="text"
						value={profileImage}
						onChange={(e) => setProfileImage(e.target.value)}
						required
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
				<button className="signup-submit-button" type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
