import { Fetchtastic, suspender } from '../../lib/src';

type Post = {
  title: string;
  body: string;
  id: number;
};

function isPost(data: unknown): data is Post {
  return (
    data != null &&
    typeof data === 'object' &&
    'title' in data &&
    typeof data.title === 'string' &&
    'body' in data &&
    typeof data.body === 'string'
  );
}

export function assertPosts(data: unknown) {
  if (data && Array.isArray(data) && data.every(isPost)) {
    return data;
  }
  throw new Error('Invalid data format');
}

const api = new Fetchtastic('https://jsonplaceholder.typicode.com')
  .appendHeader('Accept', 'application/json')
  .appendHeader('Content-Type', 'application/json');

export default function Posts() {
  const posts = suspender(() =>
    api
      .get('/postss')
      .notFound(() => console.log('not found!'))
      .json(assertPosts)
      .catch(() => []),
  );

  function addPost() {
    api.post('/posts', { title: 'test', body: 'test' }).resolve();
  }

  return (
    <main>
      <h2>Posts</h2>
      <button onClick={addPost}>Add new post</button>
      {posts.map(post => (
        <article key={post.id} style={{ padding: 16, background: '#f2f2f2', marginBottom: 16 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </main>
  );
}
