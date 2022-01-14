import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';

import JitsiModal from "./JitsiModal";
import SessionCard from "./SessionCard"

export default function StudentView({ api, light }) {
  const [activeRequest, setActiveRequest] = useState(false);
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [pastSessions, setPastSessions] = useState("");

  const createRequest = () => {
    api('create_request', {
      description,
      subject
    }).then(handleRequest).catch(handleFail)
  }

  const handleRequest = (success) => {
    console.log(success)
    setActiveRequest(success);
  }

  useEffect(() => {
    if (activeRequest) {
      api('get_request', {
        rid: activeRequest.id
      }).then((request) => {
        setActiveRequest(request);
      })
    }

    api('past_sessions', {}).then((sessions) => {
      console.log(sessions)
      setPastSessions(sessions);
    });
  }, [])

  const handleFail = (err) => {
    console.log(err);
  }

  const toggle = () => {
    setActiveRequest(null);
  }

  return !activeRequest ? (
    <Row className="justify-content-center">
    <Col className="my-5" lg={7}>
      <h2 className="display-5 fw-bold">Rate Your Sessions</h2>
      {pastSessions && pastSessions.map((sess, i) => 
        <SessionCard key={i} session={sess} light={light} api={api}>{JSON.stringify(sess)}</SessionCard>
      )}
      <h2 className="display-5 fw-bold">Request a Tutor</h2>
      <Form>
        <FormGroup>
          <Label for="request-subject">Enter Your Subject</Label>
          <Input 
            type="text" 
            id="request-subject"
            name="subject"
            onChange={(event) => setSubject(event.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="request-description">Enter Your Description</Label>
          <Input 
            type="text" 
            id="request-description"
            name="description"
            onChange={(event) => setDescription(event.target.value)}/>
        </FormGroup>
        <Button color="primary" className="my-2" onClick={createRequest}>Submit Request</Button>
      </Form>
    </Col>
  </Row>
  ) : ( 
      (activeRequest.session.length === 0)
      ? <div>Pending: <br/> 
          <Spinner/><br/> 
        </div>
      : <JitsiModal toggle={toggle} sid={activeRequest.id} api={api}></JitsiModal>
  );
}