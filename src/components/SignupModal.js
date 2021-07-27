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
import { signup } from "../utils/api";

export default class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_signup_err: false,
      signup_err: "",
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: ""
    };
  }


  signup_fail = (err) => {
    this.setState({
      show_signup_err: true,
      signup_err: err.toString()
    })
  }

  signup_success = (creds) => {
    this.props.toggle()
    this.props.signup_success(creds)
  }

  render() {
    const { toggle } = this.props;
    const { signup_err, show_signup_err, email, username, password,  first_name, last_name } = this.state;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign up to TuteSuite</ModalHeader>
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
            <FormGroup>
              <Label for="user-email">Email</Label>
              <Input
                type="email"
                id="user-email"
                name="email"
                placeholder="Enter Email"
                onChange={handle_change(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-first-name">First Name</Label>
              <Input
                type="text"
                id="user-first-name"
                name="first_name"
                placeholder="Enter First Name"
                onChange={handle_change(this)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-last-name">Last Name</Label>
              <Input
                type="text"
                id="user-last-name"
                name="last_name"
                placeholder="Enter Last Name"
                onChange={handle_change(this)}
              />
            </FormGroup>
          </Form>
          {<Alert color='danger' hidden={!show_signup_err}>{signup_err}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => { signup({
              username: username,
              password: password,
              first_name: first_name,
              last_name: last_name,
              email: email
            }).then(this.signup_success).catch(this.signup_fail) }}
          >
            Sign Up
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}