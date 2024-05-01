import { cache } from 'react';

import { Fetchtastic } from 'fetchtastic';

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

function assertPosts(data: unknown) {
  if (data && Array.isArray(data) && data.every(isPost)) {
    return data;
  }
  throw new Error('Invalid data format');
}

const api = new Fetchtastic('https://jsonplaceholder.typicode.com')
  .appendHeader('Accept', 'application/json')
  .appendHeader('Content-Type', 'application/json');

const fetPosts = cache(() =>
  api
    .get('/posts')
    .notFound(() => console.log('not found!'))
    .json(assertPosts)
    .catch(() => [] as Post[]),
);

export default async function Posts() {
  const posts = await fetPosts();

  return (
    <main>
      <h2>Posts</h2>
      {posts.map(post => (
        <article key={post.id} style={{ padding: 16, background: '#f2f2f2', marginBottom: 16 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </main>
  );
}
