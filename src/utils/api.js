import axios from "axios";

const URL = 'https://tutesuite-backend.herokuapp.com/'

export const api = (creds) => async (op, params, succeed, failure) => {
  const { token, user } = creds
  console.log(creds)
  switch(op) {
    case 'get_requests':
      get_requests(token, succeed, failure)
      break
    case 'create_request': {
      console.log(params)
      const { description, subject } = params
      create_request(token, {
        description: description,
        subject: subject,
        student: user.student[0].id,
        active: true
      }, succeed, failure)
    };

  }
}

export const create_request = async (token, params, succeed, failure) => {
  try {
    console.log(params)
    const { description, subject, student, active } = params
    const response = await axios.post(URL + 'api/requests', {
      description: description,
      subject: subject,
      student: student,
      active: active
    }, {
      headers: {
        Authorization: 'Token ' + token,
        'Content-type': 'application/json',
      }
    });

    return succeed(response.data)
  } catch (err) {
    failure(err)
  }
}

export const get_requests = async (token, succeed, failure) => {
  try {
    const response = await axios.get(URL + 'api/requests', {
      headers: {
        Authorization: 'Token ' + token,
        'Content-type': 'application/json',
      }
    });

    return succeed(response.data)
  } catch (err) {
    failure(err)
  }
}

export const signup = async (creds, succeed, failure) => {
  const { username, email, password, first_name, last_name } = creds
  console.log(creds)
  try {
    const response = await axios.post(URL + 'api/users', {
      username: username,
      password: password,
      email: email,
      first_name: first_name,
      last_name: last_name,
      student: [],
      tutor: []
    }, 
    {
      headers: {
      }
    });

    login(username, password, succeed, failure);

  } catch (err) {
    failure(err)
  }
}

export const login = async (username, password, succeed, failure) => {
  try {
    const response = await axios.post(URL + 'api/token-auth/', {
      username: username,
      password: password
    },
    {
      headers: {
        'Content-type': 'application/json'
      }
    });

    const { token } = response.data
    const user = await user_info(token, username)
    succeed({
      token: token,
      user: user
    });

  } catch (err) {
    failure(err)
  }
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
    console.log(err)
  }
}