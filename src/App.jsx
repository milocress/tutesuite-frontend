import React, { useEffect } from 'react';
import './App.css';

import NavBar from './components/NavBar'
import LoginButton from './components/LoginButton';
import SignupButton from './components/SignupButton';
import StudentView from './components/StudentView';
import UserInfo from './components/UserInfo';
import TutorView from './components/TutorView';
import ColorTheme from './components/ColorTheme';

import { api } from './utils/api';
import PaymentModal from './components/PaymentModal';
import { withCookies } from 'react-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { SET_CREDENTIALS, SET_THEME } from './redux/global';


function App({ cookies }) {
  const dispatch = useDispatch();
  const { isLoggedIn, user, api: userApi, light} = useSelector((state) => state.global);

  const handleLogin = (creds) => {
    const { token, user } = creds
    dispatch({
      type: SET_CREDENTIALS,
      isLoggedIn: true,
      token: token,
      user: user,
      api: api(creds)
    })
    cookies.set('creds', creds, {path: '/'});
  }

  useEffect(() => {
    const creds = cookies.get('creds')
    if (creds) {
      const { token, user } = creds
      dispatch({
        type: SET_CREDENTIALS,
        isLoggedIn: true,
        token: token,
        user: user,
        api: api(creds)
      })
    }
  }, []);

  return (
    <div>
      <header>
        <NavBar light >
          { isLoggedIn
          ? null
          : <div className="d-inline">
              <LoginButton handle_login={handleLogin} className="btn btn-outline-dark mx-1">
                <ColorTheme>Login</ColorTheme>
              </LoginButton>
              <SignupButton handle_signup={handleLogin} className="btn btn-warning mx-1">
                Sign Up
              </SignupButton>
            </div>
          }
          <button onClick={() => dispatch({ type: SET_THEME, value: !light })} className="btn btn-outline-dark d-inline mx-1">
            <ColorTheme>Light</ColorTheme>
          </button>
        </NavBar>
      </header>

      <main>
        <div className={"px-4 py-5 text-center " + (light ? "bg-light" : "bg-dark text-white")}>
          {
            isLoggedIn
            ? <div>
                {user.student[0].amount_owed && false
                ? <PaymentModal 
                    money={user.student[0].amount_owed} 
                    sid={user.student[0].id}
                    api={userApi} />
                : null}
                {/* <UserInfo user={this.state.user}/>  */}
                <StudentView api={userApi} light/>
                <TutorView api={userApi} light/>
              </div> 
            : null
          }
        </div>
      </main>
    </div>
  );
}

export default withCookies(App)