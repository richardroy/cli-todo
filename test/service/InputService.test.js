const InputService = require('../../src/service/InputService')
const rl = require('readline');

jest.mock('readline');

describe('InputService', () => {
  test('prompt', async () => {
    expect.assertions(5);

    const mockInterface = {
      question: jest.fn().mockImplementationOnce((question, answer) => answer("y")),
      close: jest.fn().mockImplementationOnce(() => undefined)
    }
    rl.createInterface = jest.fn().mockReturnValue(mockInterface);

    await InputService.prompt('question');

    expect(rl.createInterface).toHaveBeenCalledTimes(1);
 
    expect(mockInterface.question).toHaveBeenCalledTimes(1);
    expect(mockInterface.question).toHaveBeenCalledWith('question', expect.anything(Function));

    expect(mockInterface.close).toHaveBeenCalledTimes(1);
    expect(mockInterface.close).toHaveBeenCalledWith();
  })
})