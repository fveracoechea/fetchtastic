import { Fetchtastic } from '../src/index.ts';

describe('Body', () => {
  it('Sends stringified JSON', async () => {
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

    const config = new Fetchtastic('https://catfact.ninja').post('/', data);

    expect(config.getOptions('POST').body).toBe(JSON.stringify(data));
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
      .body(data);

    expect(config.getOptions('POST').body).toBe(data);
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
      .put('', stream);

    expect(config.getOptions('POST').body).toBeInstanceOf(ReadableStream);
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
      .appendHeader('Content-Type', 'text/html')
      .body(data);

    expect(config.getOptions('PUT').body).toBeInstanceOf(FormData);
  });
});
