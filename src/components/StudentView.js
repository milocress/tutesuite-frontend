import { Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';

import JitsiModal from "./JitsiModal";
import SessionCard from "./SessionCard"

import { handle_change, create_room_name } from '../utils/combinators';

export default class StudentView extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      active_request: false,
      description: "",
      subject: "",
      past_sessions: []
    }
  }

  componentDidMount = () => {
    this.refresh()
  }

  create_request = () => {
    console.log(this.state)
    this.props.api('create_request', {
      description: this.state.description,
      subject: this.state.subject
    }).then(this.handle_request).catch(this.handle_fail)
  }

  handle_request = (success) => {
    console.log(success)
    this.setState({active_request: success})
  }

  refresh = () => {
    if (this.state.active_request) {
      this.props.api('get_request', {
        rid: this.state.active_request.id
      }).then((request) => {
        this.setState({active_request: request})
      })
    }

    this.props.api('past_sessions', {}).then((sessions) => {
      console.log(sessions)
      this.setState({past_sessions: sessions})
    })
  }

  handle_fail = (err) => {
    console.log(err)
  }

  toggle = () => {
    this.setState({active_request: null})
  }

  render = () => {
    return !this.state.active_request ? (
      <Row className="justify-content-center">
      <Col className="my-5" lg={7}>
        <h2 className="display-5 fw-bold">Rate Your Sessions</h2>
        {this.state.past_sessions.map((sess, i) => 
          <SessionCard key={i} session={sess} light={this.props.light} api={this.props.api}>{JSON.stringify(sess)}</SessionCard>
        )}
        <h2 className="display-5 fw-bold">Request a Tutor</h2>
        <Form>
          <FormGroup>
            <Label for="request-subject">Enter Your Subject</Label>
            <Input 
              type="text" 
              id="request-subject"
              name="subject"
              onChange={handle_change(this)}/>
          </FormGroup>
          <FormGroup>
            <Label for="request-description">Enter Your Description</Label>
            <Input 
              type="text" 
              id="request-description"
              name="description"
              onChange={handle_change(this)}/>
          </FormGroup>
          <Button color="primary" className="my-2" onClick={this.create_request}>Submit Request</Button>
        </Form>
      </Col>
    </Row>
    ) : ( 
        (this.state.active_request.session.length === 0)
        ? <div>Pending: <br/> 
            <Spinner/><br/> 
            <Button onClick={this.refresh}>Refresh</Button>
          </div>
        : <JitsiModal toggle={this.toggle} sid={this.state.active_request.id} api={this.props.api}></JitsiModal>
    );
  }
}