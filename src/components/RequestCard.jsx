import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal } from "reactstrap";
import JitsiModal from "./JitsiModal";

import { create_room_link } from "../utils/combinators";


export default function RequestCard({ req, api, light }) {
  const [currentSession, setCurrentSession] = useState(null);

  const tryAcceptRequest = (reqid) => () => {
    api('accept_req', {req: reqid}).then((sess) => {
      setCurrentSession(sess)
    })
  }

  const toggle = () => {
    setCurrentSession(null);
  }

  return (
    <Card className={light ? "bg-white" : "bg-secondary"}>
      {currentSession ? <JitsiModal toggle={toggle} api={api} sid={currentSession.id}/> : null}
      <CardBody>
        <CardTitle tag="h5">{req.student.user.username}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{req.description}</CardSubtitle>
        <CardText>
          Subject: <code>{req.subject.name}</code> <br/>
          Date: <code>{req.date}</code> <br/>
          {/* Accepted Tutors: <code>{JSON.stringify(JSON.stringify(req.accepted_tutors))}</code> <br/> */}
          Active: <code>{JSON.stringify(req.active)}</code> <br/>
          {/* Key: <code>{JSON.stringify(req.id)}</code> <br/> */}
          {/* Session: <code>{JSON.stringify(req.session)}</code> <br/> */}
          <a href={create_room_link("https://meet.jit.si", req.id)}>Link</a> <br/>
          <Button onClick={tryAcceptRequest(req.id)}>Accept</Button>
          {/* <Jitsi domain="meet.jit.si" roomName={create_room_name(req.id )}/> */}
        </CardText>
      </CardBody>
    </Card>
  )
}