import React, { useState } from "react";
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

export default function LoginModal({ toggle, login_success }) {
  const [showLoginErr, setShowLoginErr] = useState(false);
  const [loginErr, setLoginErr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login_fail = (err) => {
    setShowLoginErr(true);
    setLoginErr(err.toString());
  }

  const onSuccess = (creds) => {
    toggle()
    login_success(creds)
  }

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
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-password">Password</Label>
            <Input
              type="password"
              id="user-password"
              name="password"
              placeholder="Enter Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
        </Form>
        {
          <Alert color='danger' hidden={!showLoginErr}>
            {loginErr}
          </Alert>
        }
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => { login(username, password).then(onSuccess).catch(login_fail) }}
        >
          Login
        </Button>
      </ModalFooter>
    </Modal>
  );
}