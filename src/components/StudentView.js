import { Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { handle_change } from '../utils/combinators';


export default class StudentView extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      active_request: false,
      description: "",
      subject: ""
    }
  }

  create_request = () => {
    console.log(this.state)
    this.props.api('create_request', {
      description: this.state.description,
      subject: this.state.subject
    }, this.handle_request, this.handle_fail)
  }

  handle_request = (success) => {
    console.log(success)
    this.setState({active_request: JSON.stringify(success)})
  }

  handle_fail = (err) => {
    console.log(err)
  }

  render() {
    return !this.state.active_request ? (
      <Row className="justify-content-center">
      <h2 className="display-5 fw-bold">Request a Tutor</h2>
      <Col className="my-5" lg={7}>
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
      <div><code>{this.state.active_request}</code></div>
    );
  }
}