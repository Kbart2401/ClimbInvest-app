import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import './CreateAccount.css';

function CreateAccountModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <>
      <div className='modal-container'>
        <div className='create-account-modal' >
        <h4 className='model-header'>Create an Account</h4>
          <form>
            <input placeholder='Type something'></input>
          </form>
        </div>
      </div>
    </>
  )

  return (
    <>
      <button onClick={handleOpen}>Create Account</button>
      <Modal
        open={open}
        onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}

export default CreateAccountModal;