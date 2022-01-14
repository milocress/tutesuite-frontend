import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal } from "reactstrap";
import { handle_change } from "../utils/combinators";


export default function RequestCard({ api, session }) {
  const [rating, setRating] = useState(session.rating);

  const rate = (sid) => (rating) => {
    console.log(rating.target.value);
    setRating(parseInt(rating.target.value));
    api('rate', { sid, rating: rating.target.value }).then((resp) => {});
  }

  return (
    <Card className={this.props.light ? "bg-white" : "bg-secondary"}>
      <CardBody>
        <CardText><code>{session.request.description}</code></CardText>
        <input type="range" name="rating" class="form-range" min="0" max="5" step="1" id="rating" onChange={rate(session.id)} value={rating}></input>
      </CardBody>
    </Card>
  )
}