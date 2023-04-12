import { Suspense, useEffect } from 'react';
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

function isPost(v: unknown): v is Post {
  return (
    v != null &&
    typeof v === 'object' &&
    'title' in v &&
    typeof v.title === 'string' &&
    'body' in v &&
    typeof v.body === 'string'
  );
}

function assertResponse(res: unknown): asserts res is Post[] {
  if (!(res != null && Array.isArray(res) && res.every(isPost))) {
    throw new Error('Invalid object');
  }
}

const controller = new AbortController();

const postsApi = x.compose(
  x.initialize(),
  x.url('https://jsonplaceholder.typicode.com/posts'),
  x.headers({ Accept: 'application/json' }),
  x.signal(controller.signal),
  x.build({
    get(res) {
      assertResponse(res);
      return res;
    },
    post(res) {
      if (!isPost(res)) {
        throw new Error('Invalid object');
      }
      return res;
    },
  }),
);

function Posts() {
  const result = suspender(() => postsApi.get());

  useEffect(() => () => controller.abort(), []);
  
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
