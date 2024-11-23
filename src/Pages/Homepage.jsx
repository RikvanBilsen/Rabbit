import useSWR from 'swr';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fetcher = (url) => fetch(url).then((res) => res.json());

function MainContent() {
  const { data: posts, error } = useSWR('https://localhost:44319/api/post', fetcher);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  if (error) {
    console.log(error);
    return <div className="alert alert-danger">Failed to load posts.</div>;
  }

  if (!posts) return <div className="text-center my-5">Loading...</div>;

  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  console.log(posts);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredPosts.map((post) => (
        <div
          key={post.postId}  
          className="card mb-3"
          onClick={() => {
            console.log('Navigating to post with ID:', post.postId);
            navigate(`/post/${post.postId}`);  {/* Make sure to use postId here */}
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text text-muted">
              Published on: {new Date(post.publishDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainContent;
