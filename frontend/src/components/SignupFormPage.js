import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';


const SignupFormPage = () => {
  const dispatch = useDispatch();
  const [credentials, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])


  return (
    <form>
      
    </form>
  )
}

export default SignupFormPage;