import { saveQuestion, saveQuestionAnswer } from '../data/api';
import { addUserPollAnswer, addUserPoll } from './users';

export const ADD_POLL = 'ADD_POLL';
export const ADD_POLL_ANSWER = 'ADD_POLL_ANSWER';
export const FETCH_POLLS = 'FETCH_POLLS';

const addPoll = (poll) => {
  return {
    type: ADD_POLL,
    poll,
  };
};

const addPollAnswer = (authUser, pollId, answer) => {
  return {
    type: ADD_POLL_ANSWER,
    authUser,
    pollId,
    answer,
  };
};

const fetchPolls = (polls) => {
  return {
    type: FETCH_POLLS,
    polls,
  };
};

const handleAddPoll = (firstOption, secondOption) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const poll = {
      optionOneText: firstOption,
      optionTwoText: secondOption,
      author: authUser,
    };
    const pollResponse = await saveQuestion(poll);
    dispatch(addPoll(pollResponse));
    dispatch(addUserPoll(pollResponse));
  };
};

const handleAddPollAnswer = (pollId, answer) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const answerObject = {
      authedUser: authUser.id,
      qid: pollId,
      answer,
    };
    const isAdded = await saveQuestionAnswer(answerObject);
    if (isAdded) {
      dispatch(addPollAnswer(authUser.id, pollId, answer));
      dispatch(addUserPollAnswer(authUser.id, pollId, answer));
    }
  };
};

export { handleAddPoll, handleAddPollAnswer, fetchPolls };
