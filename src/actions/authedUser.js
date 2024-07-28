const AUTH_USER_LOGIN = 'AUTH_USER_LOGIN';
const AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT';

const authUserLogin = (user) => {
  return {
    type: AUTH_USER_LOGIN,
    user,
  };
};

const handleAuthUserLogin = (credentials) => {
  return (dispatch, getState) => {
    const { users } = getState();
    const user = Object.values(users).find(
      (user) =>
        user.id === credentials.username &&
        user.password === credentials.password
    );
    if (user) {
      return dispatch(authUserLogin(user));
    } else {
      return false;
    }
  };
};

const authUserLogout = () => {
  return {
    type: AUTH_USER_LOGOUT,
  };
};

const handleAuthUserLogout = () => {
  return (dispatch) => {
    dispatch(authUserLogout());
  };
};

export {
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT,
  authUserLogin,
  authUserLogout,
  handleAuthUserLogin,
  handleAuthUserLogout,
};
