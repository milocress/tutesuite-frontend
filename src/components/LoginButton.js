import Modal from "./LoginModal"

import { Component } from "react";

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login_modal: false
    }
  }

  modal_toggle = () => {
    this.setState({login_modal: !this.state.login_modal})
  }

  render() {

    return (
      <div className="d-inline">
        <button type="button" className={this.props.className} onClick={this.modal_toggle}>{this.props.children}</button>
        { this.state.login_modal 
          ? <Modal toggle={this.modal_toggle} login_success={this.props.handle_login}/>
          : null
        }
      </div>
    )
  }

}