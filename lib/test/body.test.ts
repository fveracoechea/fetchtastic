import { Fetchtastic } from '../mod.ts';

const fetchMock = jest.fn();
global.fetch = fetchMock;

beforeEach(() => {
  fetchMock.mockClear();
});

describe('Body', () => {
  it('Sends stringified JSON', async () => {
    const endpoint = 'https://catfact.ninja';
    const data = {
      title: 'Lorem Ipsum',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      comments: [
        {
          username: 'jhon',
          text: 'Ut enim ad minim veniam',
        },
        {
          username: 'frank',
          text: 'quis nostrud exercitation ullamco laboris nisi',
        },
      ],
    };

    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        new Response(JSON.stringify(data), {
          status: 200,
        }),
      ),
    );

    const config = new Fetchtastic(endpoint)
      .appendHeader('Content-Type', 'application/json')
      .post('/cats', data);

    expect(config.body).toBe(data);

    expect(config.resolve()).resolves.toBeInstanceOf(Response);

    expect(fetchMock).toHaveBeenCalledWith(endpoint + '/cats', {
      ...config.requestOptions,
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  });

  it('Sends HTML', async () => {
    const data = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BODY TEST</title>
      </head>
      <body>
        <h1>BODY TEST</h1>
      </body>
    </html>
    `;

    const config = new Fetchtastic('https://catfact.ninja')
      .appendHeader('Content-Type', 'text/html')
      .setBody(data);

    expect(config.body).toBe(data);
  });

  it('Sends ReadableStream', async () => {
    const stream = new ReadableStream<string>({
      start(controller) {
        controller.enqueue('Lorem Ipsum');
        setTimeout(() => {
          controller.enqueue('dolor sit amet');
        }, 500);
        setTimeout(() => {
          controller.close();
        }, 800);
      },
    });

    const config = new Fetchtastic('https://catfact.ninja')
      .appendHeader('Content-Type', 'text/html')
      .put('', stream)
      .setOptions({ cache: 'no-cache' });

    expect(config.body).toBeInstanceOf(ReadableStream);
  });

  it('Sends FormData', async () => {
    const data = new FormData();
    data.append('title', 'Lorem Ipsum');
    data.append(
      'html',
      new Blob(['<q id="a"><span id="b">hey!</span></q>'], {
        type: 'text/html',
      }),
    );

    const config = new Fetchtastic('https://catfact.ninja')
      .delete('/delete', { fake: '' })
      .appendHeader('Content-Type', 'text/html')
      .setBody(data)
      .unauthorized(() => console.error('unauthorized'));

    expect(config.body).toBeInstanceOf(FormData);
  });
});
