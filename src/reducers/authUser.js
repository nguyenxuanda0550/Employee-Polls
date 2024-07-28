import { AUTH_USER_LOGIN, AUTH_USER_LOGOUT } from '../actions/authedUser';

const authUser = (state = null, action) => {
  switch (action.type) {
    case AUTH_USER_LOGIN:
      return action.authedUser;
    case AUTH_USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default authUser;
