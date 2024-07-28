// src/components/Leaderboard.js
import { connect } from 'react-redux';

const Leaderboard = ({ users }) => {
  const sortedUsers = Object.keys(users).sort((a, b) => {
    const userA = users[a];
    const userB = users[b];
    const userAScore =
      Object.keys(userA.answers).length + Object.keys(userA.questions).length;
    const userBScore =
      Object.keys(userB.answers).length + Object.keys(userB.questions).length;
    return userBScore - userAScore;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Answers</th>
              <th scope="col">Questions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => {
              const { name, avatarURL, answers, questions, id } = users[user];
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td className="d-flex align-items-center">
                    {avatarURL ? (
                      <img
                        src={avatarURL}
                        alt={name}
                        className="rounded-circle mr-2"
                        style={{ width: '40px', height: '40px' }}
                      />
                    ) : (
                      <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mr-2" style={{ width: '40px', height: '40px' }}>
                        <svg
                          className="bi bi-person-fill text-white"
                          width="20"
                          height="20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm3-6a3 3 0 100-6 3 3 0 000 6z"
                          />
                        </svg>
                      </div>
                    )}
                    <span>{name} ({id})</span>
                  </td>
                  <td>{Object.keys(answers).length}</td>
                  <td>{Object.keys(questions).length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Leaderboard);
