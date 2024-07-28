import { useState } from 'react';
import { connect } from 'react-redux';
import PollCard from './PollCard';

const Home = ({ answeredPolls, unansweredPolls, users }) => {
  const [showPoll, setShowPoll] = useState(0);
  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <div className="d-flex justify-content-center my-4">
        <div className="btn-group" role="group" aria-label="Polls">
          <button
            onClick={() => setShowPoll(0)}
            className={`btn btn-outline-primary ${showPoll === 0 && 'active'}`}
          >
            Unanswered Poll
          </button>
          <button
            onClick={() => setShowPoll(1)}
            className={`btn btn-outline-primary ${showPoll === 1 && 'active'}`}
          >
            Answered Poll
          </button>
        </div>
      </div>
      {showPoll === 0 ? (
        <div>
          <h2 className="text-center text-primary mb-4">Unanswered Polls</h2>
          <div className="row">
            {unansweredPolls.map((poll) => (
              <div key={poll.id} className="col-md-4 mb-3">
                <PollCard poll={poll} author={users[poll.author]} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-primary mb-4">Answered Polls</h2>
          <div className="row">
            {answeredPolls.map((poll) => (
              <div key={poll.id} className="col-md-4 mb-3">
                <PollCard poll={poll} author={users[poll.author]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authUser, questions, users }) => {
  const answeredPolls = Object.values(questions)
    .filter((poll) => {
      return (
        poll.optionOne.votes.includes(authUser.id) ||
        poll.optionTwo.votes.includes(authUser.id)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredPolls = Object.values(questions)
    .filter((poll) => {
      return (
        !poll.optionOne.votes.includes(authUser.id) &&
        !poll.optionTwo.votes.includes(authUser.id)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    answeredPolls,
    unansweredPolls,
    users,
  };
};

export default connect(mapStateToProps)(Home);
