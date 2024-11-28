// eslint-disable-next-line no-unused-vars
import React from 'react';
import useSWR from 'swr';
import PostCard from '../components/PostCard';
import { Loader2 } from 'lucide-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: posts, error } = useSWR('https://localhost:44319/api/post', fetcher);

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500">Failed to load posts</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Try again
            </button>
          </div>
        </div>
    );
  }

  if (!posts) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
    );
  }

  return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="space-y-4">
          {posts.map((post) => (
              <PostCard key={post.postId} post={post} />
          ))}
        </div>
      </div>
  );
};

export default Home;