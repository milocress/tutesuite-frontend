import React, { Component } from "react";
import { Row, Col, Alert, Button } from 'reactstrap';

import RequestCard from "./RequestCard";

export default class TutorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [{
        date: 'Date',
        subject: 'Subject',
        student: {user: {username: 'Student'}},
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

  refresh = () => {
    this.props.api('get_requests', null).then(this.handle_requests).catch(this.handle_request_fail)
  }

  render = () => {
    return (
      <Row className="justify-content-center">
      <h2 className="display-5 fw-bold">Tutor a Student</h2>
      <Col className="my-5" lg={7}>
        <Button onClick={this.refresh}>Refresh</Button>
        { this.state.current_session
        ? <p>Session</p>
        : <div>
            <Alert color='danger' hidden={this.state.hide_failure}>{this.state.request_failure}</Alert>
            <div className="lead mb-4">
              {this.state.requests.map((req, i) => 
                <RequestCard req={req} light={this.props.light} api={this.props.api} key={i}/>)
              }
            </div>
          </div>
        }
      </Col>
    </Row>
    );
  }

  componentDidMount() {
    this.refresh()
  }
}