import * as x from '../src';

describe('Compose operator', () => {
  it('Calls all operators', async () => {
    const instance = x.initialize();
    const mockOperator = jest.fn(() => instance);

    x.compose(mockOperator, mockOperator, mockOperator);

    expect(mockOperator).toBeCalledTimes(3);
  });

  it('Pipes all values', async () => {
    const mockOperator1 = jest.fn(() => {
      const instance = x.initialize();
      instance.options = { cache: 'default' };
      return instance;
    });

    const mockOperator2 = jest.fn((i?: x.XShield) => {
      const instance = x.initialize(i);
      instance.url = '/testing';
      return instance;
    });

    const mockOperator3 = jest.fn((i?: x.XShield) => {
      const instance = x.initialize(i);
      instance.options = { cache: 'no-cache' };
      return instance;
    });

    const xshield = x.compose(mockOperator1, mockOperator2, mockOperator3);

    expect(xshield()).toHaveProperty(['url'], '/testing');
    expect(xshield()).toHaveProperty(['options', 'cache'], 'no-cache');
  });
});
