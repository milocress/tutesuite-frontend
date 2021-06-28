import { Component } from "react";
import { Row, Col } from "reactstrap";

export default class UserInfo extends Component {
  render() {
    return (
      <Row>
      <h1 className="display-5 fw-bold">TuteSuite is up</h1>
      <Col className="my-5">
        <p className="lead mb-4"><code>{JSON.stringify(this.props.user)}</code></p>
        {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
        </div> */}
      </Col>
    </Row>
    );
  }
}