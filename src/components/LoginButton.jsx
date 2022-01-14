import React, { useState } from 'react';
import Modal from "./LoginModal"

export default function LoginButton({ className, children }) {
  const [loginModal, setLoginModal] = useState(false);

  const handleToggle = () => {
    setLoginModal(state => !state);
  }

  return (
    <div className="d-inline">
      <button type="button" className={className} onClick={handleToggle}>
        {children}
      </button>
      {loginModal 
        ? <Modal toggle={handleToggle} login_success={this.props.handle_login}/>
        : null
      }
    </div>
  )
}
