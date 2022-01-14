import axios from "axios";

const URL = 'http://localhost:8000/' // 'https://tutesuite-backend.herokuapp.com/'

const make_headers = (token) => {
  return {
    headers: {
      Authorization: 'Token ' + token,
      'Content-type': 'application/json',
    }
  }
}

export const api = (creds) => async (op, params) => {
  const { token, user } = creds
  const student_id = user.student ? user.student[0].id : null
  switch(op) {
    case 'get_requests': {
      return get_requests(token)
    }
    case 'get_request': {
      const {rid} = params
      return get_request(token, rid)
    }
    case 'create_request': {
      const { description, subject } = params
      return create_request(token, {
        description: description,
        subject: subject,
        student: student_id,
        active: true
      })
    }
    case 'accept_req': {
      const { req } = params
      const tid = user.tutor[0].id
      return accept_req(token, req, tid)
    }
    case 'end_session' : {
      const { sid } = params
      return end_session(token, sid)
    }
    case 'clear_balance': {
      const { sid } = params
      return clear_balance(token, sid)
    }
    case 'rate': {
      const { sid, rating } = params
      return rate(token, sid, rating)
    }
    case 'past_sessions': {
      return past_sessions(token, student_id)
    }
    default:
      break;
  };

}

export const clear_balance = (token, sid) => {
  axios.post(URL + 'api/clear_balance/' + sid, make_headers(token))
}

export const rate = (token, sid, rating) => {
  axios.post(URL + 'api/rate/' + sid + '/' + rating, make_headers(token))
}

export const past_sessions = async (token, sid) => {
  const resp = await axios.get(URL + 'api/past_sessions/' + sid, make_headers(token))
  return resp.data.sessions
}

export const end_session = (token, sid) => {
  axios.post(URL + 'api/end_session/' + sid, make_headers(token))
}

export const create_request = async (token, params) => {
  const { description, subject, student, active } = params
  const response = await axios.post(URL + 'api/requests', {
    description: description,
    subject: subject,
    student: student,
    active: active
  }, make_headers(token));

  return response.data
}

export const get_requests = async (token) => {
  const resp = await axios.get(URL + 'api/requests', make_headers(token));
  return resp.data
}

export const get_request = async (token, rid) => {
  const resp = await axios.get(URL + 'api/requests/' + rid, make_headers(token));
  return resp.data
}

export const accept_req = async (token, req, tid) => {
  const resp = await axios.post(URL + 'api/accept/' + req + '/' + tid, make_headers(token))
  return resp.data
}

export const signup = async (creds) => {
  const { username, email, password, first_name, last_name } = creds
  return axios.post(URL + 'api/users', {
    username: username,
    password: password,
    email: email,
    first_name: first_name,
    last_name: last_name,
    student: [],
    tutor: []
  }).then((results) => {
    login(username, password)
  });
}

export const login = async (username, password) => {
  return axios.post(URL + 'api/token-auth/', {
      username: username,
      password: password
    },
    {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(async (response) => {
      const { token } = response.data
      const user = await user_info(token, username)
      return {user: user, token: token}
    })
}

export const user_info = async (token, username) => {
  try {
    const response = await axios.get(URL + 'api/username/' + username + '/', {
      headers: {
        Authorization: 'Token ' + token,
        'Content-type': 'application/json'
      }
    })
    return response.data
  } catch (err) {
  }
}