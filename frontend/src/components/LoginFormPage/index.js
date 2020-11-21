import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './loginFormPage.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credentials, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  
  if (sessionUser) return <Redirect to='/' />

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.logUserIn({ credentials, password }))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
  }
  
  return (
    <div className='login-container'>
      <h1>Log in to your account</h1>
    <form onSubmit={handleSubmit} >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <input className='login-input' required id='username' name='username'
        type='text' value={credentials} placeholder='Username'
        onChange={e => setCredential(e.target.value)} />
      <input className='login-input' required id='password' name='password'
        type='password' placeholder='Password'
        value={password} onChange={e => setPassword(e.target.value)} />
      <input className='login-submit' type='submit' value='Log in' />
    </form>
      <NavLink className='signup-link' to='/signup'>
        Create a username</NavLink>
    </div>
  )
}

export default LoginFormPage;