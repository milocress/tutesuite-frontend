import { Component } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal } from "reactstrap";
import JitsiModal from "./JitsiModal";

import { create_room_link } from "../utils/combinators";


export default class RequestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_session: null
    }
  }

  try_accept_req = (reqid) => () => {
    this.props.api('accept_req', {req: reqid}).then((sess) => {
      this.setState({
        current_session: sess
      })
    })
  }

  toggle = () => {
    this.setState({
      current_session: null
    })
  }

  render() {
    const req = this.props.req
    const current_session = this.state.current_session
    return (
      <Card className={this.props.light ? "bg-white" : "bg-secondary"}>
        {this.state.current_session ? <JitsiModal toggle={this.toggle} api={this.props.api} sid={current_session.id}/> : null}
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
            <Button onClick={this.try_accept_req(req.id)}>Accept</Button>
            {/* <Jitsi domain="meet.jit.si" roomName={create_room_name(req.id )}/> */}
          </CardText>
        </CardBody>
      </Card>
    )
  }
}