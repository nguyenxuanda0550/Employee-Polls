import { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleAddPollAnswer } from '../actions/polls';
import Error404 from './Error404';

const Poll = ({ authUser, users, questions, dispatch }) => {
  // get the poll id from the url
  const { id } = useParams();
  const authorName = users[questions[id]?.author]?.name;
  const authUserAnswer = users[authUser?.id]?.answers[id];
  const [answer, setAnswer] = useState(authUserAnswer);
  const initialVoteCount = {
    optionOne: questions[id]?.optionOne?.votes?.length,
    optionTwo: questions[id]?.optionTwo?.votes?.length,
  };
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  if (!questions[id]) return <Error404 />;

  return (
    <div className="container mt-5">
      <h1 className="text-center display-4">
        Poll by {authorName}
      </h1>
      {users[questions[id].author].avatarURL ? (
        <img
          src={users[questions[id].author].avatarURL}
          alt="avatar"
          className="rounded-circle w-25 h-25 mx-auto d-block"
        />
      ) : (
        <div className="rounded-circle w-25 h-25 mx-auto bg-secondary d-flex align-items-center justify-content-center">
          <span className="h1 text-center text-white">
            {authorName[0]}
          </span>
        </div>
      )}
      <div className="mt-5">
        <h2 className="text-center display-5">
          Would you rather
        </h2>
        <div className="d-flex justify-content-center mt-4">
          <button
            onClick={() => {
              if (answer) return;
              dispatch(handleAddPollAnswer(id, 'optionOne'));
              setAnswer('optionOne');
              setVoteCount((prev) => ({
                ...prev,
                optionOne: prev.optionOne + 1,
              }));
            }}
            className={`btn btn-outline-primary btn-lg mx-2 ${answer === 'optionOne' ? 'btn-success' : ''}`}
          >
            <span>{questions[id].optionOne.text}</span>
            {authUserAnswer && (
              <span>
                votes: {voteCount.optionOne} (
                {(
                  (voteCount.optionOne /
                    (voteCount.optionOne + voteCount.optionTwo)) *
                  100
                ).toFixed(2)}{' '}
                %)
              </span>
            )}
          </button>
          <button
            onClick={() => {
              if (answer) return;
              dispatch(handleAddPollAnswer(id, 'optionTwo'));
              setAnswer('optionTwo');
              setVoteCount((prev) => ({
                ...prev,
                optionTwo: prev.optionTwo + 1,
              }));
            }}
            className={`btn btn-outline-primary btn-lg mx-2 ${answer === 'optionTwo' ? 'btn-success' : ''}`}
          >
            <span>{questions[id].optionTwo.text}</span>
            {authUserAnswer && (
              <span>
                votes: {voteCount.optionTwo} (
                {(
                  (voteCount.optionTwo /
                    (voteCount.optionOne + voteCount.optionTwo)) *
                  100
                ).toFixed(2)}{' '}
                %)
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser, users, questions }) => {
  return {
    authUser,
    users,
    questions,
  };
};

export default connect(mapStateToProps)(Poll);
