import { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { handleAuthUserLogin} from '../actions/authedUser';

const Login = ({ dispatch, loggedIn }) => {
  const [credentials, setCredentials] = useState({
    username: 'tylermcginnis',
    password: 'abc321',
  });
  const [error, setError] = useState('');
  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirectTo');
    console.log(redirectUrl);
    return <Navigate to={redirectUrl ? redirectUrl : '/'} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(handleAuthUserLogin(credentials));
    if (!res) {
      setError('Invalid username or password');
    }
  };

  const handleLogin = (username, password) => {
    dispatch(handleAuthUserLogin({ username, password }));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      <div className="dropdown mb-4 text-center">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Existing User
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a
              className="dropdown-item"
              href="#!"
              onClick={() => {
                handleLogin('sarahedo', 'password123');
              }}
            >
              Sarah Edo
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#!"
              onClick={() => {
                handleLogin('tylermcginnis', 'abc321');
              }}
            >
              Tyler McGinnis
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#!"
              onClick={() => {
                handleLogin('mtsamis', 'xyz123');
              }}
            >
              Mike Tsamis
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#!"
              onClick={() => {
                handleLogin('zoshikanlu', 'pass246');
              }}
            >
              Zenobia Oshikanlu
            </a>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-3">
          <label
            htmlFor="username"
            className="form-label"
          >
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                username: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
            required
          />
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  return {
    loggedIn: !!authUser,
  };
};

export default connect(mapStateToProps)(Login);
