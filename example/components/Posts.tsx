import { DataGrab } from 'xshield/core';
import { suspender } from 'xshield/react';

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

export function assertPosts(res: unknown) {
  if (!(res != null && Array.isArray(res) && res.every(isPost))) {
    throw new Error('Invalid data format');
  }
  return res;
}

const api = new DataGrab('https://jsonplaceholder.typicode.com')
  .setUrl('/posts')
  .appendHeader('Accept', 'application/json')
  .appendHeader('Content-Type', 'application/json');

export default function Posts() {
  const posts = suspender(() => api.get.json(assertPosts));

  return (
    <main>
      <h2>Posts</h2>
      {posts.map(post => (
        <article
          key={post.id}
          style={{ padding: 16, background: '#f2f2f2', marginBottom: 16 }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </main>
  );
}
