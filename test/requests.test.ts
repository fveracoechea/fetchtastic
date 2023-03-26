import * as x from '../src';

const fetchMock = jest.fn();
global.fetch = fetchMock;

const data = {
  current_page: 1,
  data: [
    {
      breed: 'Abyssinian',
      country: 'Ethiopia',
      origin: 'Natural/Standard',
      coat: 'Short',
      pattern: 'Ticked',
    },
    {
      breed: 'Aegean',
      country: 'Greece',
      origin: 'Natural/Standard',
      coat: 'Semi-long',
      pattern: 'Bi- or tri-colored',
    },
    {
      breed: 'American Curl',
      country: 'United States',
      origin: 'Mutation',
      coat: 'Short/Long',
      pattern: 'All',
    },
  ],
  per_page: 3,
  total: 98,
};

const endpoint = 'https://catfact.ninja/breeds';
const headers = { Accept: 'application/json' };
const body = { test: true };

const config = x.compose(x.initialize(), x.url(endpoint), x.headers(headers));

beforeEach(() => {
  fetchMock.mockClear();
});

describe('GET Requests', () => {
  test('Fulfilling', async () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    const promise = x.build(config).get();

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
    });
    // checks the response
    expect(promise).resolves.toBe(data);
  });

  test('Rejecting with 404', async () => {
    // simulates a 404 server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        ok: false,
        json: () => Promise.resolve(null),
      }),
    );

    const promise = x.build(config).get();

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
    });
    // checks the response
    expect(promise).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 404,
      method: 'GET',
      url: endpoint,
      message: 'Not Found',
    });
  });

  test('Fetch Error', async () => {
    // simulates fetch failure
    fetchMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch')),
    );

    const promise = x.build(config).get();

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
    });
    // checks the response
    expect(promise).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 0,
      method: 'GET',
      url: endpoint,
      message: 'Failed to fetch',
      response: undefined,
    });
  });
});

describe('POST Requests', () => {
  test('Fulfilling', async () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    const promise = x.build(config).post(body);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
    // checks the response
    expect(promise).resolves.toBe(data);
  });

  test('Rejecting with 404', async () => {
    // simulates a 404 server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        ok: false,
        json: () => Promise.resolve(null),
      }),
    );

    const promise = x.build(config).post(body);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
    // checks the response
    expect(promise).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 404,
      method: 'GET',
      url: endpoint,
      message: 'Not Found',
    });
  });

  test('Fetch Error', async () => {
    // simulates fetch failure
    fetchMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch')),
    );

    const promise = x.build(config).post();

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
    });
    // checks the response
    expect(promise).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 0,
      method: 'GET',
      url: endpoint,
      message: 'Failed to fetch',
      response: undefined,
    });
  });
});
