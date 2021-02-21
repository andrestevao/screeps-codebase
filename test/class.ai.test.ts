import { AdjutantAI } from '../src/class.ai';

describe('testing initialization and expiration', () => {
  test(`should properly set the memory when it doesn't exists`, () => {

    const fakeMemory = {

    };

    const fakeGame = {
      time: 100
    };

    const adjutantAI = new AdjutantAI(fakeMemory, fakeGame);

    expect(JSON.parse(fakeMemory['adjutantAI'])).toMatchObject({
      createdOn: 100,
      expireDate: 200
    });
  });

  test(`should properly expire when time > createdOn`, () => {

    const fakeMemory = {
      adjutantAI: JSON.stringify({
        createdOn: 100,
        expireDate: 200
      })
    }

    const fakeGame = {
      time: 201
    }

    const adjutantAI = new AdjutantAI(fakeMemory, fakeGame);

    expect(JSON.parse(fakeMemory['adjutantAI'])).toMatchObject({
      createdOn: 201,
      expireDate: 301
    });

  });
});