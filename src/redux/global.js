const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
  api: null,
  light: true
}

export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SET_THEME = 'SET_THEME';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CREDENTIALS:
      return { ...state, isLoggedIn: action.isLoggedIn, token: action.token, user: action.user, api: action.api };
    case SET_THEME:
      return { ...state, light: action.value };
    default:
      return state;
  }
}