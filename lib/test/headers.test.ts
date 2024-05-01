import { Fetchtastic } from '../mod.ts';

describe('Headers operator', () => {
  it('Concats', async () => {
    const config = new Fetchtastic()
      .headers({
        'Content-Type': 'application/json',
      })
      .headers([['Accept', 'application/json']])
      .appendHeader('Authorization', 'Token XXX');

    const headers = config.getOptions('GET').headers as Headers;

    expect(headers).toBeTruthy();
    expect(headers).toBeInstanceOf(Headers);
    expect(headers.get('Content-Type')).toBe('application/json');
    expect(headers.get('Accept')).toBe('application/json');
    expect(headers.get('Authorization')).toBe('Token XXX');
  });

  it('Replaces', async () => {
    const config = new Fetchtastic()
      .headers({
        'Content-Type': 'application/json',
      })
      .appendHeader('Accept', 'application/json')
      .headers([['X-Headers', 'all']], true);

    const headers = config.getOptions('GET').headers as Headers;

    expect(headers).toBeTruthy();
    expect(headers).toBeInstanceOf(Headers);
    expect(headers.has('Content-Type')).toBe(false);
    expect(headers.has('Accept')).toBe(false);
    expect(headers.has('X-Headers')).toBe(true);
    expect(headers.get('X-Headers')).toBe('all');
  });

  it('Removes', async () => {
    const config = new Fetchtastic()
      .headers({
        'Content-Type': 'application/json',
        'Fake-Header': 'test',
        Accept: 'application/json',
      })
      .deleteHeader('Fake-Header');

    const headers = config.getOptions('GET').headers as Headers;

    expect(headers).toBeTruthy();
    expect(headers).toBeInstanceOf(Headers);

    expect(headers.has('Fake-Header')).toBe(false);
    expect(headers.has('Content-Type')).toBe(true);
    expect(headers.has('Accept')).toBe(true);
  });
});
