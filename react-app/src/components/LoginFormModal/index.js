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
    setEmail("bill@microsoft.com");
    setPassword("password");
    const data = await dispatch(login("bill@microsoft.com", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/feed');
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className='signup-form-errors'>
          {errors.map((error, idx) => (
            <ul key={idx}>{error}</ul>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button className="demo-user-button" onClick={demoUser}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
