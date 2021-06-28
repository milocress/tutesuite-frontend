import Modal from "./SignupModal"

import { Component } from "react";

export default class SignupButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup_modal: false
    }
  }

  modal_toggle = () => {
    this.setState({signup_modal: !this.state.signup_modal})
  }

  render() {

    return (
      <div className="d-inline">
        <button type="button" className={this.props.className} onClick={this.modal_toggle}>{this.props.children}</button>
        { this.state.signup_modal 
          ? <Modal toggle={this.modal_toggle} signup_success={this.props.handle_signup}/>
          : null
        }
      </div>
    )
  }

}