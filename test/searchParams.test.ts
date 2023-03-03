import * as x from '../src';

describe('Search params operator', () => {
  it('Concat works', async () => {
    const pagination = x.compose(
      x.searchParams({ offset: 2 }),
      x.searchParams('perPage=12'),
    );

    const published = x.compose(
      pagination,
      x.searchParams({ published: true }),
    );

    const instance = published();

    expect(instance.searchParams.has('perPage')).toBe(true);
    expect(instance.searchParams.get('perPage')).toBe('12');

    expect(instance.searchParams.has('offset')).toBe(true);
    expect(instance.searchParams.get('offset')).toBe('2');

    expect(instance.searchParams.has('published')).toBe(true);
    expect(instance.searchParams.get('published')).toBe('true');
  });

  it('Replace works', async () => {
    const pagination = x.compose(x.searchParams({ perPage: 12, offset: 2 }));

    const published = x.compose(
      pagination,
      x.searchParams({ published: true }, true),
    );

    const instance = published();

    expect(instance.searchParams.has('perPage')).toBe(false);
    expect(instance.searchParams.get('perPage')).toBe(null);

    expect(instance.searchParams.has('offset')).toBe(false);
    expect(instance.searchParams.get('offset')).toBe(null);

    expect(instance.searchParams.has('published')).toBe(true);
    expect(instance.searchParams.get('published')).toBe('true');
  });
});
