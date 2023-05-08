import { pipe, identity, noop } from '../src/utils';

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

  test('Identity', () => {
    expect(identity('test')).toBe('test');

    expect(identity(2023)).toBe(2023);

    expect(identity({ title: 'test', values: [1, 2, 3, 4] })).toMatchObject({
      title: 'test',
      values: [1, 2, 3, 4],
    });
  });

  test('Noop', () => {
    expect(noop()).toBe(undefined);

    expect(noop(2023, 'test')).toBe(undefined);

    expect(noop({ title: 'test' })).toBe(undefined);
  });
});
