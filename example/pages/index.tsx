import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const fallback = <p>Loading posts...</p>;

const LazyPosts = dynamic(() => import('../components/Posts'), {
  ssr: false,
  loading: () => fallback,
});

export default function Docs() {
  return (
    <div>
      <h1>Example</h1>
      <br />
      <Suspense fallback={fallback}>
        <LazyPosts />
      </Suspense>
    </div>
  );
}
