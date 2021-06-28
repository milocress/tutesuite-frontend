import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Alert } from 'reactstrap';
import Jitsi from "react-jitsi";

import { create_room_link, create_room_name } from "../utils/combinators";


export default class TutorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [{
        date: 'Date',
        subject: 'Subject',
        student: 'Student',
        accepted_tutors: 'Accepted Tutors',
        active: 'Active',
        pk: 'Key'
      }],
      hide_failure: true,
      request_failure: "",

    }
  }

  handle_requests = (requests) => {
    this.setState({
      requests: requests,
      hide_failure: true
    })
  }

  handle_request_fail = (err) => {
    this.setState({
      hide_failure: true,
      request_failure: JSON.stringify(err)
    })
  }

  render() {
    return (
      <Row className="justify-content-center">
      <h2 className="display-5 fw-bold">Tutor a Student</h2>
      <Col className="my-5" lg={7}>
        <Alert color='danger' hidden={this.state.hide_failure}>{this.state.request_failure}</Alert>
        <div className="lead mb-4">
          {this.state.requests.map((req, i) => <div key={i}>{this.render_req(req)}<br/></div>)}
        </div>
      </Col>
    </Row>
    );
  }

  render_req = (req) => {
    return (
      <Card className={this.props.light ? "bg-white" : "bg-secondary"}>
        <CardBody>
          <CardTitle tag="h5">{JSON.stringify(req.student)}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{JSON.stringify(req.description)}</CardSubtitle>
          <CardText>
            { console.log(req) }
            Subject: <code>{JSON.stringify(req.subject)}</code> <br/>
            Date: <code>{req.date}</code> <br/>
            Accepted Tutors: <code>{JSON.stringify(JSON.stringify(req.accepted_tutors))}</code> <br/>
            Active: <code>{JSON.stringify(req.active)}</code> <br/>
            Key: <code>{req.pk}</code> <br/>
            <a href={create_room_link("https://localhost", req.id)}>Link</a>
            {/* <Jitsi domain="meet.jit.si" roomName={create_room_name(req.id )}/> */}
          </CardText>
        </CardBody>
      </Card>
    )
  }

  render_raw = (req) => {
    return <code>{JSON.stringify(req)}</code>
  }

  componentDidMount() {
    this.props.api('get_requests', null, this.handle_requests, this.handle_request_fail);
  }
}