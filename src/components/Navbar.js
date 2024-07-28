import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleAuthUserLogout} from '../actions/authedUser';

const Navbar = ({ dispatch, authUser }) => {
  const logoutHandle = () => {
    dispatch(handleAuthUserLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          data-testid="logo"
          to="/"
          className="navbar-brand"
        >
          Employee Poll
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" data-testid="home-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" data-testid="new-poll-link" to="/add">
                New Poll
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" data-testid="leaderboard-link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {authUser ? (
              <>
                <span className="navbar-text me-3" data-testid="authUserName">
                  {authUser.name}
                </span>
                <button className="btn btn-outline-danger" data-testid="logout-link" onClick={logoutHandle}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-primary" data-testid="login-link" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps)(Navbar);
