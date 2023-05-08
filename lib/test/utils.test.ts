import { pipe } from '../src';

describe('Utility functions', () => {
  test('Pipe', () => {
    const length = jest.fn((s: string) => s.length);
    const addOne = jest.fn((n: number) => n + 1);
    const double = jest.fn((n: number) => n * 2);

    const result = pipe('aaa', length, addOne, double);

    expect(length).toBeCalledWith('aaa');
    expect(addOne).toBeCalledWith(3);
    expect(double).toBeCalledWith(4);
    expect(result).toBe(8);
  });
});
