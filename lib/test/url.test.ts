import { Fetchtastic } from '../mod.ts';

describe('Url operator', () => {
  it('Concats', () => {
    const expected = 'https://catfact.ninja/breeds/77';

    const config = new Fetchtastic('https://catfact.ninja').url('/breeds').url('/77');

    expect(config.URL).toBe(expected);
  });

  it('Concats with put', () => {
    const expected = 'https://catfact.ninja/breeds/77';

    const config = new Fetchtastic('https://catfact.ninja').url('/breeds').put('/77', {});

    expect(config.URL).toBe(expected);
  });

  it('Concats with patch', () => {
    const expected = 'https://catfact.ninja/breeds/77';

    const config = new Fetchtastic('https://catfact.ninja').url('/breeds').patch('/77');

    expect(config.URL).toBe(expected);
  });

  it('Concats with options', () => {
    const expected = 'https://catfact.ninja/test/breeds/77';

    const config = new Fetchtastic('https://catfact.ninja')
      .get('/test')
      .url('/breeds')
      .options('/77');

    expect(config.URL).toBe(expected);
  });

  it('Replaces', () => {
    const expected = 'https://other.url/test';

    const config = new Fetchtastic('https://catfact.ninja')
      .url('/breeds')
      .url('https://other.url', true)
      .url('/test');

    expect(config.URL).toBe(expected);
  });

  it('Includes search params', () => {
    const expected = 'https://catfact.ninja/breeds?perPage=12&offset=2&first=10';

    const config = new Fetchtastic('https://catfact.ninja')
      .setSearchParams({ perPage: 12, offset: 2 })
      .url('/breeds')
      .appendSearchParam('first', 10);

    expect(config.URL).toBe(expected);
  });
});
