import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const userId = JSON.parse(Cookies.get('loggedInUser') || '{}').userId;

  const { data: post, error: postError } = useSWR(
    postId ? `https://localhost:44319/api/post/${postId}` : null,
    fetcher
  );
  
  const { data: comments, error: commentsError, mutate: mutateComments } = useSWR(
    postId ? `https://localhost:44319/api/comments/post/${postId}` : null,
    fetcher
  );

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!userId) {
      navigate('/create-account');
      return;
    }

    if (!newComment.trim()) return;

    try {
      const response = await fetch('https://localhost:44319/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          postId: parseInt(postId),
          userId: parseInt(userId),
        }),
      });

      if (response.ok) {
        setNewComment('');
        mutateComments();  // Re-fetch the comments after submitting
      } else if (response.status === 401) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (postError || commentsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500">Failed to load content</p>
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
              <ArrowBigDown className="w-6 h-6 text-gray-400 hover:text-orange-500" />
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
                <span className="text-sm">{comments?.length || 0} Comments</span>
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
        {userId ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
            />
            <div className="flex justify-end mt-2">
              <button 
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                disabled={!newComment.trim()}
              >
                Comment
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-6 text-center">
            <p className="text-gray-600 mb-2">Please log in to comment</p>
            <button
              onClick={() => navigate('/login')}
              className="text-orange-500 hover:text-orange-600"
            >
              Log in
            </button>
          </div>
        )}

        {comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.commentId} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{comment.user.userName}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            No comments yet. Be the first to share what you think!
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
