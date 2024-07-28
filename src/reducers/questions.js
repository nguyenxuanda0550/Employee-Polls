import {
  ADD_POLL_ANSWER,
  ADD_POLL,
  FETCH_POLLS,
} from '../actions/polls';

const questions = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_POLL:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_POLL_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat(
              action.authUser,
            ),
          },
        },
      };
    default:
      return state;
  }
};

export default questions;
