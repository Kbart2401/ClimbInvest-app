import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';
import './SignupForm.css';


const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = e => {
    e.preventDefault();
    if(password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signUpUser({
        username, email, 
        password})).catch(res => {
          if(res.data && res.data.errors) setErrors(res.data.errors);
        })
    }
    return setErrors([`Confirm Password field must be the same as
     the Password field`])
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>Username</label>
      <input required name='username' type='text' value={username}
      onChange={e => setUsername(e.target.value)}/>
      <label>Email</label>
      <input required name='email' type='email' value={email}
      onChange={e => setEmail(e.target.value)}/>
      <label>Password</label>
      <input required name='password' type='password' value={password}
      onChange={e => setPassword(e.target.value)}/>
      <label>Confirm Password</label>
      <input required name='confirmPassword' type='password' value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}/>
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignupFormPage;