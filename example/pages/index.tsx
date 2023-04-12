import { Suspense, useEffect } from 'react';
import { controller } from '../utils/postApi';
import dynamic from 'next/dynamic';

const LazyPosts = dynamic(() => import('../components/Posts'), {
  ssr: false,
  loading: () => <p>Loading Cat Facts...</p>,
});

export default function Docs() {
  return (
    <div>
      <h1>Example</h1>
      <button onClick={() => controller.abort()}>Abort Fetch</button>
      <br />
      <Suspense fallback={<p>Loading Cat Facts...</p>}>
        <LazyPosts />
      </Suspense>
    </div>
  );
}
