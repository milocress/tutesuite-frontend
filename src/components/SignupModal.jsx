import React, { useReducer } from "react";
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

import { signup } from "../utils/api";

const SET_ERROR = 'SET_ERROR';
const SET_USER_FIELD = 'SET_USER_FIELD';

const INIT_STATE = {
  showSignupError: false,
  signupError: "",
  username: "",
  password: "",
  email: "",
  firstName: "",
  lastName: ""
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, showSignupError: action.showSignupError, signupError: action.singupError};
    case SET_USER_FIELD:
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export default function SignupModal({ toggle, signup_success }) {
  const [{
    username,
    password,
    firstName,
    lastName,
    email,
    signupErr,
    showSignupError
  }, dispatch] = useReducer(reducer, INIT_STATE);

  const onSignupFail = (err) => {
    dispatch({
      type: SET_ERROR,
      showSignupError: true,
      signupError: err.toString()
    });
  }

  const onSignupSuccess = (creds) => {
    toggle();
    signup_success(creds);
  }

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
              onChange={({target: { value }}) => dispatch({ type: SET_USER_FIELD, value, field: 'username' })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-password">Password</Label>
            <Input
              type="password"
              id="user-password"
              name="password"
              placeholder="Enter Password"
              onChange={({target: { value }}) => dispatch({ type: SET_USER_FIELD, value, field: 'password' })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-email">Email</Label>
            <Input
              type="email"
              id="user-email"
              name="email"
              placeholder="Enter Email"
              onChange={({ target: { value }}) => dispatch({ type: SET_USER_FIELD, value, field: 'email' })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-first-name">First Name</Label>
            <Input
              type="text"
              id="user-first-name"
              name="first_name"
              placeholder="Enter First Name"
              onChange={({target: { value }}) => dispatch({ type: SET_USER_FIELD, value, field: 'firstName' })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-last-name">Last Name</Label>
            <Input
              type="text"
              id="user-last-name"
              name="last_name"
              placeholder="Enter Last Name"
              onChange={({target: { value }}) => dispatch({ type: SET_USER_FIELD, value, field: 'lastName' })}
            />
          </FormGroup>
        </Form>
        {<Alert color='danger' hidden={!showSignupError}>{signupErr}</Alert>}
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => { signup({
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            email: email
          }).then(onSignupSuccess).catch(onSignupFail) }}
        >
          Sign Up
        </Button>
      </ModalFooter>
    </Modal>
  );
}