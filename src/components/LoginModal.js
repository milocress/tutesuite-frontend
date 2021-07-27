import React, { Component } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { handle_change } from "../utils/combinators";
import { login } from "../utils/api";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_login_err: false,
      login_err: "",
      username: "",
      password: ""
    };
  }


  login_fail = (err) => {
    this.setState({
      show_login_err: true,
      login_err: err.toString()
    })
  }

  login_success = (creds) => {
    this.props.toggle()
    this.props.login_success(creds)
  }

  render() {
    const { toggle } = this.props;
    const { login_err, show_login_err } = this.state;


    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Log in to TuteSuite</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="user-username">Username</Label>
              <Input
                type="text"
                id="user-username"
                name="username"
                placeholder="Enter Your username"
                onChange={handle_change(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-password">Password</Label>
              <Input
                type="password"
                id="user-password"
                name="password"
                placeholder="Enter Password"
                onChange={handle_change(this)}
              />
            </FormGroup>
          </Form>
          {<Alert color='danger' hidden={!show_login_err}>{login_err}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => { login(this.state.username, this.state.password).then(this.login_success).catch(this.login_fail) }}
          >
            Login
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}