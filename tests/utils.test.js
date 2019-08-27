import { generateSequence } from '../utils.js';

describe('generateSequence', () => {
  Math.random = jest.fn();
  const options = [0, 1, 2, 3];

  afterEach(() => {
    Math.random.mockClear();
  });

  test('should correctly generate a new sequence of given length', () => {
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3);
    expect(generateSequence(options, 4)).toEqual([0, 1, 2, 3]);
    expect(Math.random).toHaveBeenCalledTimes(4);
    Math.random.mockReturnValue(2);
    expect(generateSequence(options, 2)).toEqual([2, 2]);
    expect(Math.random).toHaveBeenCalledTimes(6);
    expect(generateSequence(options, 8)).toEqual([2, 2, 2, 2, 2, 2, 2, 2]);
    expect(Math.random).toHaveBeenCalledTimes(14);
  });

  test.todo('should correctly add onto an existing given sequence');
  test.todo(
    'should return an unchanged copy if given sequence is already as long as specified length',
  );
  test.todo('should slice a previous sequence if it is longer than the specified length');
  test.todo('should return an empty array if given no options to choose from');
  test.todo('should return an empty array if given a length of 0');
});
