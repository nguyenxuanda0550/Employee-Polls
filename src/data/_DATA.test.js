const { _saveQuestionAnswer, _saveQuestion } = require('./_DATA');

describe('_saveQuestion', () => {
  test('successfully saves a question and updates the user information', async () => {
    const newQuestion = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: { id: 'tylermcginnis' },
    };

    const result = await _saveQuestion(newQuestion);

    expect(result).toMatchObject({
      id: expect.any(String),
      timestamp: expect.any(Number),
      author: 'tylermcginnis',
      optionOne: {
        votes: [],
        text: 'Option One',
      },
      optionTwo: {
        votes: [],
        text: 'Option Two',
      },
    });
  });

  test('fails to save a question when optionOneText, optionTwoText, and author are missing', async () => {
    const incompleteQuestion = {};

    await expect(_saveQuestion(incompleteQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author',
    );
  });
});

describe('_saveQuestionAnswer', () => {
  test('returns true when given valid parameters', async () => {
    const validParams = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionTwo',
    };

    const result = await _saveQuestionAnswer(validParams);

    expect(result).toBe(true);
  });

  test('throws an error when parameters are invalid or missing', async () => {
    const invalidParams = {
      authedUser: undefined,
      qid: undefined,
      answer: 'optionTwo',
    };

    await expect(_saveQuestionAnswer(invalidParams)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
