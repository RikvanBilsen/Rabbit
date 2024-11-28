// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Link, Bold, Italic, List } from 'lucide-react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      publishDate: new Date(),
      lastEdited: new Date()
    };

    try {
      const response = await fetch('https://localhost:44319/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-xl font-semibold mb-6">Create a post</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
              />
            </div>

            <div className="mb-2">
              <div className="flex items-center space-x-2 mb-2 border-b border-gray-200 pb-2">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Bold className="w-5 h-5 text-gray-500" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Italic className="w-5 h-5 text-gray-500" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Link className="w-5 h-5 text-gray-500" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <List className="w-5 h-5 text-gray-500" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Image className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <textarea
                  placeholder="Text (optional)"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={8}
              />
            </div>

            <div className="flex justify-end">
              <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreatePost;