import React, { useEffect, useReducer } from "react";
import { Row, Col, Alert } from 'reactstrap';

import RequestCard from "./RequestCard";

const SET_REQUESTS = 'SET_REQUESTS';
const SET_REQUEST_FAIL = 'SET_REQUEST_FAIL';

const INIT_STATE = {
  requests: [{
    date: 'Date',
    subject: 'Subject',
    student: {
      user: {
        username: 'Student'
      }
    },
    acceptedTutors: 'Accepted Tutors',
    active: 'Active',
    pk: 'Key'
  }],
  hideFailure: true,
  requestFailure: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_REQUESTS:
      return { ...state, requests: action.requests, hideFailure: action.hideFailure };
    case SET_REQUEST_FAIL:
      return { ...state, requestFailure: action.requestFailure, hideFailure: action.hideFailure };
    default:
      return state;
  }
};

export default function TutorView({ api, light }) {
  const [{ currentSession, hideFailure, requestFailure, requests }, dispatch] = useReducer(reducer, INIT_STATE);

  useEffect(() => {
    api('get_requests', null).then((requests) => {
      dispatch({ type: SET_REQUESTS, requests, hideFailure: false });
    }
    ).catch((err) => {
        dispatch({ type: SET_REQUEST_FAIL, hideFailure: true, requestFailure: JSON.stringify(err) });
      }
    );
  }, [api]);

  return (
    <Row className="justify-content-center">
    <h2 className="display-5 fw-bold">Tutor a Student</h2>
    <Col className="my-5" lg={7}>
      { currentSession
      ? <p>Session</p>
      : <div>
          <Alert color='danger' hidden={hideFailure}>{requestFailure}</Alert>
          <div className="lead mb-4">
            {requests.map((req, i) => 
              <RequestCard req={req} light api={api} key={i}/>)
            }
          </div>
        </div>
      }
    </Col>
  </Row>
  );
}