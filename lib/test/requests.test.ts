import { Fetchtastic, FetchError } from '../src/core';

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
const headers = { accept: 'application/json' };
const body = {
  breed: 'American Bobtail',
  country: 'United States',
  origin: 'Mutation',
  coat: 'Short/Long',
  pattern: 'All',
};

const getConfig = new Fetchtastic(endpoint).headers(headers);
const postConfig = getConfig.body(body);

beforeEach(() => {
  fetchMock.mockClear();
});

describe('GET Requests', () => {
  test('Fulfilling', () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    // checks the response
    expect(getConfig.get.json()).resolves.toMatchObject(data);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, getConfig.getOptions('GET'));
  });

  it('Rejects 404', () => {
    // simulates a 404 server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        ok: false,
        json: () => Promise.resolve(null),
      }),
    );
    // checks the response
    expect(getConfig.get.json()).rejects.toMatchObject({
      status: 404,
      method: 'GET',
      url: endpoint,
      message: 'Not Found',
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, getConfig.getOptions('GET'));
  });

  test('Fetch Error', () => {
    // simulates fetch failure
    fetchMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch')),
    );

    // checks the response
    expect(getConfig.get.json()).rejects.toMatchObject({
      status: 0,
      method: 'GET',
      url: endpoint,
      message: 'Failed to fetch',
      response: undefined,
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, getConfig.getOptions('GET'));
  });
});

describe('POST Requests', () => {
  test('Fulfilling', () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    // checks the response
    expect(postConfig.post.json()).resolves.toMatchObject(data);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, postConfig.getOptions('POST'));
  });

  test('Rejecting with 404', () => {
    // simulates a 404 server response
    fetchMock.mockImplementation(() =>
      Promise.resolve({
        status: 404,
        ok: false,
        json: () => Promise.resolve(null),
      }),
    );

    // checks the response
    expect(postConfig.post.json()).rejects.toBeInstanceOf(FetchError);

    expect(postConfig.post.json()).rejects.toMatchObject({
      status: 404,
      method: 'POST',
      url: endpoint,
      message: 'Not Found',
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, postConfig.getOptions('POST'));
  });

  test('Fetch Error', () => {
    // simulates fetch failure
    fetchMock.mockImplementation(() => Promise.reject(new Error('Failed to fetch')));
    // checks the response
    expect(postConfig.post.json()).rejects.toBeInstanceOf(FetchError);

    expect(postConfig.post.json()).rejects.toMatchObject({
      status: 0,
      method: 'POST',
      url: endpoint,
      message: 'Failed to fetch',
      response: undefined,
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, postConfig.getOptions('POST'));
  });
});
