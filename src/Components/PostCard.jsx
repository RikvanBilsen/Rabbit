// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
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

                <Link to={`/post/${post.postId}`} className="flex-1 p-4">
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                        <span>{post.user?.userName|| "Unknown user"}</span>
                        <span>•</span>
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>

                    <h2 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-gray-700 line-clamp-3">{post.body}</p>

                    <div className="flex items-center space-x-4 mt-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">Comments</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share</span>
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        postId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        publishDate: PropTypes.string.isRequired,
        user: PropTypes.shape({
            userName: PropTypes.string,
        }),
    }).isRequired
};

export default PostCard;