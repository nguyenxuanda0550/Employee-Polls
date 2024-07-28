import { getInitialData } from '../data/api';
import { receiveUsers } from './users';
import { fetchPolls } from './polls';

const receiveInitialData = () => {
  return async (dispatch) => {
    const { users, questions } = await getInitialData();
    dispatch(receiveUsers(users));
    dispatch(fetchPolls(questions));
  };
};

export { receiveInitialData };
