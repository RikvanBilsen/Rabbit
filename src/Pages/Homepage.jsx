import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

function MainContent() {
  const { data: posts, error } = useSWR('https://localhost:44319/api/post', fetcher);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPostId, setExpandedPostId] = useState(null); // Track which post is expanded.

  if (error) {
    console.log(error);
    return <div className="alert alert-danger">Failed to load posts.</div>;
  }

  if (!posts) return <div className="text-center my-5">Loading...</div>;

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleExpand = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId); // Toggle the expanded state.
  };

  return (
    <div className="container my-4">
      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Post Cards */}
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="card mb-3"
          onClick={() => toggleExpand(post.id)} // Make the block clickable.
          style={{ cursor: 'pointer' }}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text text-muted">
              Published on: {new Date(post.publishDate).toLocaleDateString()}
            </p>
            {expandedPostId === post.id && ( // Show additional details if expanded.
              <div className="mt-3">
                <p>{post.body}</p>
                <p className="text-muted">Last edited: {new Date(post.lastEdited).toLocaleDateString()}</p>
                <span className="badge bg-primary">Tag: {post.tag}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainContent;
