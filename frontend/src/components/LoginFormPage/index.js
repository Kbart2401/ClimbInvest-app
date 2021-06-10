import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import Footer from '../Footer';
import './loginFormPage.css';


const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [credentials, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState('')

  const loginImage = () => {
    const array = ['/images/money.jpg', '/images/bank-note.jpg',
      '/images/arrow.jpg', '/images/inspiration.jpg',
      '/images/success.jpg'];
    const num = Math.floor(Math.random() * (array.length - 0) + 0)
    return array[num];
  }

  useEffect(() => {
    setImage(loginImage())
  }, [])

  if (sessionUser) return <Redirect to='/home' />

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.logUserIn({ credentials, password }))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
  }

  const demoSignIn = () => {
    dispatch(sessionActions.logUserIn({credentials: 'demo@aa.io', password: 'password'}))
  }


  return (
    <>
      <div className='login-body'>
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
          <div className='demo-login'>
            <button onClick={demoSignIn}>Demo User Login</button>
          </div>

        </div>
        <div className='login-image'>
          <img src={image} alt='money' />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LoginFormPage;