import { Suspense } from 'react';
import { x } from 'xshield';

let status = 'pending';
let cache: any = null;
let error: Error;

function suspender<T>(getPromise: () => Promise<T>) {
  let result: T;
  let suspender: Promise<any>;

  if (status === 'pending') {
    suspender = getPromise()
      .then(r => {
        status = 'fulfilled';
        cache = r;
      })
      .catch(e => {
        status = 'rejected';
        error = e;
      });
  }

  if (cache) {
    result = cache;
  }

  if (status === 'pending') {
    throw suspender!;
  } else if (status === 'rejected') {
    throw error!;
  } else {
    return result!;
  }
}

type Post = {
  title: string;
  body: string;
  id: number;
};

function assertResponse(res: unknown): asserts res is Post[] {
  if (
    !(
      res != null &&
      Array.isArray(res) &&
      res.every(
        v =>
          v != null &&
          typeof v === 'object' &&
          typeof v['title'] === 'string' &&
          typeof v['body'] === 'string',
      )
    )
  ) {
    throw new Error('Invalid object');
  }
}

const postsApi = x.compose(
  x.initialize(),
  x.url('https://jsonplaceholder.typicode.com/posts'),
  x.headers({ Accept: 'application/json' }),
  x.validateResponse(res => {
    assertResponse(res);
    return res;
  }),
  x.build,
);

function Posts() {
  const result = suspender(() => postsApi.get());
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}

export default function Docs() {
  return (
    <div>
      <h1>Example</h1>
      <Suspense fallback="Loading Cat Facts...">
        <Posts />
      </Suspense>
    </div>
  );
}
