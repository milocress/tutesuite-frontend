import { Component } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal } from "reactstrap";
import { handle_change } from "../utils/combinators";


export default class RequestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.session.rating
    }
  }

  rate = (sid) => (rating) => {
    console.log(rating.target.value)
    this.setState({rating: parseInt(rating.target.value)})
    this.props.api('rate', {sid: sid, rating: rating.target.value}).then((resp) => {
    })
  }

  render() {
    const sess = this.props.session
    const rating = this.state.rating
    const sid = sess.id
    return (
      <Card className={this.props.light ? "bg-white" : "bg-secondary"}>
        <CardBody>
          <CardText><code>{sess.request.description}</code></CardText>
          <input type="range" name="rating" class="form-range" min="0" max="5" step="1" id="rating" onChange={this.rate(sid)} value={rating}></input>
        </CardBody>
      </Card>
    )
  }
}