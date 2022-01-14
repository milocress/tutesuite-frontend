import React, { useState } from 'react';
import Modal from "./SignupModal";

export default function SignupButton({ className, handle_signup, children }) {
  const [signupModal, setSignupModal] = useState(false);

  const modalToggle = () => {
    setSignupModal(state => !state);
  }


  return (
    <div className="d-inline">
      <button type="button" className={className} onClick={modalToggle}>{children}</button>
      {signupModal 
        ? <Modal toggle={modalToggle} signup_success={handle_signup}/>
        : null
      }
    </div>
  )
}