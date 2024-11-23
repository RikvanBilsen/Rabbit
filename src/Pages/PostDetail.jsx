import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function PostDetails() {
  const { postId } = useParams();  // Get postId from the URL
  
  console.log('Post ID:', postId); // Add this to check if postId is extracted correctly

  // Conditionally fetch post data only when postId is available
  const { data: post, error } = useSWR(
    postId ? `https://localhost:44319/api/post/${postId}` : null, 
    fetcher
  );

  if (error) {
    return <div className="alert alert-danger">Failed to load post details.</div>;
  }

  if (!post) {
    return <div className="text-center my-5">Loading post details...</div>;
  }

  return (
    <div className="container my-4">
      <h2>{post.title}</h2>
      <p><strong>Published on: </strong>{new Date(post.publishDate).toLocaleDateString()}</p>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetails;
