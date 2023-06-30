import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import Posts from '../components/Posts';

export default function Docs() {
  return (
    <div>
      <h1>Example</h1>
      <br />

      <Posts />
    </div>
  );
}
