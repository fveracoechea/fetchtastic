import * as x from '../src';

describe('Headers operator', () => {
  it('Concat works', async () => {
    const config = x.compose(
      x.initialize(),
      x.headers({ 'Content-Type': 'application/json' }),
      x.headers([['Accept', 'application/json']]),
    );

    expect(config.headers.has('Content-Type')).toBe(true);
    expect(config.headers.get('Content-Type')).toBe('application/json');
    expect(config.headers.has('Accept')).toBe(true);
    expect(config.headers.get('Accept')).toBe('application/json');
  });

  it('Replace works', async () => {
    const config = x.compose(
      x.initialize(),
      x.headers({ 'Content-Type': 'application/json' }),
      x.headers([['Accept', 'application/json']]),
      x.headers([['X-Headers', 'all']], true),
    );

    expect(config.headers.has('Content-Type')).toBe(false);
    expect(config.headers.has('Accept')).toBe(false);
    expect(config.headers.has('X-Headers')).toBe(true);
    expect(config.headers.get('X-Headers')).toBe('all');
  });
});
