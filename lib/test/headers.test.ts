import { Fetchtastic } from '../mod.ts';

describe('Headers operator', () => {
  it('Concats', async () => {
    const config = new Fetchtastic()
      .setHeaders({
        'Content-Type': 'application/json',
      })
      .setHeaders([['Accept', 'application/json']])
      .appendHeader('Authorization', 'Token XXX');

    expect(config.headers).toBeTruthy();
    expect(config.headers).toBeInstanceOf(Headers);
    expect(config.headers.get('Content-Type')).toBe('application/json');
    expect(config.headers.get('Accept')).toBe('application/json');
    expect(config.headers.get('Authorization')).toBe('Token XXX');
  });

  it('Replaces', async () => {
    const config = new Fetchtastic()
      .setHeaders({
        'Content-Type': 'application/json',
      })
      .appendHeader('Accept', 'application/json')
      .setHeaders([['X-Headers', 'all']], true);

    expect(config.headers).toBeTruthy();
    expect(config.headers).toBeInstanceOf(Headers);
    expect(config.headers.has('Content-Type')).toBe(false);
    expect(config.headers.has('Accept')).toBe(false);
    expect(config.headers.has('X-Headers')).toBe(true);
    expect(config.headers.get('X-Headers')).toBe('all');
  });

  it('Removes', async () => {
    const config = new Fetchtastic()
      .setHeaders({
        'Content-Type': 'application/json',
        'Fake-Header': 'test',
        Accept: 'application/json',
      })
      .deleteHeader('Fake-Header');

    expect(config.headers).toBeTruthy();
    expect(config.headers).toBeInstanceOf(Headers);

    expect(config.headers.has('Fake-Header')).toBe(false);
    expect(config.headers.has('Content-Type')).toBe(true);
    expect(config.headers.has('Accept')).toBe(true);
  });
});
