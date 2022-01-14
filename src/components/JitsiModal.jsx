import React from "react";
import { create_room_name } from "../utils/combinators";
import Jitsi from "react-jitsi"

import { Modal } from "reactstrap";

export default function JitsiModal({ toggle, api, sid }) {
  const handleToggle = () => {
    toggle()
    api('end_session', { sid })
  }

  return (
    <Modal 
      isOpen={true} 
      toggle={handleToggle}>
        <Jitsi 
          roomName={create_room_name(sid)} 
          config={{prejoinPageEnabled: false}}>
        </Jitsi>
    </Modal>
  )
}