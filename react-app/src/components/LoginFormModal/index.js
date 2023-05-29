import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push('/feed')
    }
  };

  const demoUser = async () => {
    setEmail("elon@tesla.com");
    setPassword("password");
    const data = await dispatch(login("elon@tesla.com", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/feed');
    }
  };

  return (
    <>
        <h1 className='login-header-text'>Log In</h1>
      <form className='login-form-container' onSubmit={handleSubmit}>
        {errors.map((error, idx) => (
          <div className='login-form-errors' key={idx}>{error}</div>
        ))}
        <div className="login-email-container">
          <label className="login-email-text">
            Email
          </label>
          <input
            className="login-form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='login-password-container'>
          <label className="login-password-text">
            Password
          </label>
          <input
            className="login-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='login-submit-button' type="submit">Log In</button>
        <div className="line-container">
          <span className="line"></span>
          <span className="or">or</span>
          <span className="line"></span>
        </div>
        <button className="demo-user-button" onClick={demoUser}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
