// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Loader2 } from 'lucide-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PostDetails = () => {
  const { postId } = useParams();
  const { data: post, error } = useSWR(
      postId ? `https://localhost:44319/api/post/${postId}` : null,
      fetcher
  );

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500">Failed to load post</p>
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

  if (!post) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
    );
  }

  return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex">
            <div className="flex flex-col items-center px-2 py-4 bg-gray-50 rounded-l-lg">
              <button className="p-1 hover:bg-gray-200 rounded">
                <ArrowBigUp className="w-6 h-6 text-gray-400 hover:text-orange-500" />
              </button>
              <span className="text-sm font-medium text-gray-900 my-1">0</span>
              <button className="p-1 hover:bg-gray-200 rounded">
                <ArrowBigDown className="w-6 h-6 text-gray-400 hover:text-blue-500" />
              </button>
            </div>

            <div className="flex-1 p-4">
              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                <span>{post.user?.userName}</span>
                <span>•</span>
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>

              <h1 className="text-2xl font-medium text-gray-900 mb-4">{post.title}</h1>
              <p className="text-gray-700 mb-4">{post.body}</p>

              <div className="flex items-center space-x-4 border-t border-gray-200 pt-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Comments</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-medium mb-4">Comments</h2>
          <div className="mb-4">
          <textarea
              placeholder="What are your thoughts?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
          />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                Comment
              </button>
            </div>
          </div>
          <div className="text-gray-500 text-center py-8">
            No comments yet. Be the first to share what you think!
          </div>
        </div>
      </div>
  );
};

export default PostDetails;