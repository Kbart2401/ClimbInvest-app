import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
    <form onSubmit={handleSubmit} >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label for='username'>Username or Email</label>
      <input required id='username' name='username'
        type='text' value={credentials} 
        onChange={e => setCredential(e.target.value)} />
      <label for='password'>Password</label>
      <input required id='password' name='password'
        type='password' 
        value={password} onChange={e => setPassword(e.target.value)} />
      <input type='submit' value='Submit' />
    </form>
  )
}

export default LoginFormPage;