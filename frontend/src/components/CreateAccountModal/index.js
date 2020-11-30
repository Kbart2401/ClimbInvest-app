import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import './CreateAccount.css';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function CreateAccountModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sessionUser = useSelector(state => state.session.user)
  const [inputVal, setInputVal] = useState('');

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.createAccount({
      userId: sessionUser.id,
      name: inputVal
    }))
    setInputVal('');
    handleClose();
  }

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  const body = (
    <>
      <div className='modal-container'>
        <div className='create-account-modal' >
          <h4 className='model-header'>Create an Account</h4>
          <form onSubmit={handleSubmit}>
            <label>Give your account a name </label>
            <input placeholder='Type something' value={inputVal} onChange={handleChange} />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className='home-no-account'>
        <div className='home-create-account-container'>
          <p>Click here to begin!</p>
          <button onClick={handleOpen}>Create Account</button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}

export default CreateAccountModal;