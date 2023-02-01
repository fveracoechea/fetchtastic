import * as x from '../src';

describe('Headers operator', () => {
  it('Concat works', async () => {
    const xshield = x.compose(
      x.headers({ 'Content-Type': 'application/json' }),
      x.headers([['Accept', 'application/json']]),
    );

    const instance = xshield();

    expect(instance.headers.has('Content-Type')).toBe(true);
    expect(instance.headers.get('Content-Type')).toBe('application/json');
    expect(instance.headers.has('Accept')).toBe(true);
    expect(instance.headers.get('Accept')).toBe('application/json');
  });

  it('Replace works', async () => {
    const xshield = x.compose(
      x.headers({ 'Content-Type': 'application/json' }),
      x.headers([['Accept', 'application/json']]),
      x.headers([['X-Headers', 'all']], true),
    );
    const instance = xshield();
    expect(instance.headers.has('Content-Type')).toBe(false);
    expect(instance.headers.has('Accept')).toBe(false);
    expect(instance.headers.has('X-Headers')).toBe(true);
    expect(instance.headers.get('X-Headers')).toBe('all');
  });
});
