import React, {Component} from 'react';
import './App.css';

import NavBar from './components/NavBar'
import LoginButton from './components/LoginButton';
import SignupButton from './components/SignupButton';
import StudentView from './components/StudentView';
import UserInfo from './components/UserInfo';
import TutorView from './components/TutorView';
import ColorTheme from './components/ColorTheme';

import { api } from './utils/api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_logged_in: false,
      token: null,
      user: null,
      api: null,
      light: true
    }
  }

  handle_login = (creds) => {
    const { token, user } = creds
    this.setState({
      is_logged_in: true,
      token: token,
      user: user,
      api: api(creds)
    })
  }

  render() {
    return (
      <div>
        <header>
          <NavBar light={this.state.light}>
            { this.state.is_logged_in 
            ? null
            : <div className="d-inline">
                <LoginButton handle_login={this.handle_login} className="btn btn-outline-dark mx-1">
                  <ColorTheme light={this.state.light}>Login</ColorTheme>
                </LoginButton>
                <SignupButton handle_signup={this.handle_login} className="btn btn-warning mx-1">
                  Sign Up
                </SignupButton>
              </div>
            }
            <button onClick={() => {this.setState({light: !this.state.light})}} className="btn btn-outline-dark d-inline mx-1">
              <ColorTheme light={this.state.light}>Light</ColorTheme>
            </button>
          </NavBar>
        </header>

        <main>
          <div className={"px-4 py-5 text-center " + (this.state.light ? "bg-light" : "bg-dark text-white")}>
            {
              this.state.is_logged_in 
              ? <div>
                  <UserInfo user={this.state.user}/> 
                  <StudentView api={this.state.api}/>
                  <TutorView api={this.state.api} light={this.state.light}/>
                </div> 
              : null
            }
          </div>
        </main>
      </div>
    );
  }
}