import { Component } from "react";
import { create_room_name } from "../utils/combinators";
import Jitsi from "react-jitsi"

import { Modal } from "reactstrap";

export default class JitsiModal extends Component {
  toggle = () => {
    this.props.toggle()
    this.props.api('end_session', {sid: this.props.sid})
  }

  render() {
    return (
      <Modal 
        isOpen={true} 
        toggle={this.toggle}>
          <Jitsi 
            roomName={create_room_name(this.props.sid)} 
            config={{prejoinPageEnabled: false}}>
          </Jitsi>
      </Modal>
    )
  }
}