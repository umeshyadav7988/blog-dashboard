
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchPost, fetchUser, fetchComments } from '../../api';
import axios from 'axios';

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<any | null>(null);
  const [author, setAuthor] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState({ name: '', body: '' });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset error before fetching data

        try {
          const postData = await fetchPost(Number(id));
          setPost(postData);

          const userData = await fetchUser(postData.userId);
          setAuthor(userData);

          const commentsData = await fetchComments(Number(id));
          setComments(commentsData);
        } catch (error) {
          setError('Failed to fetch post details or comments. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.body) return;

    try {
      const response = await axios.post(`https://jsonplaceholder.typicode.com/comments`, {
        postId: id,
        name: newComment.name,
        body: newComment.body,
      });
      
      setComments([response.data, ...comments]);
      setNewComment({ name: '', body: '' });
    } catch (error) {
      setError('Failed to add comment. Please try again later.');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="post-detail-container">
      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p><strong>Author:</strong> {author?.name}</p>

          <section className="comments-section">
            <h2>Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.name}</strong> says:</p>
                  <p>{comment.body}</p>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </section>

          <section className="add-comment-section">
            <h3>Add a New Comment</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              />
              <textarea
                placeholder="Your comment"
                value={newComment.body}
                onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
              />
              <button type="submit">Add Comment</button>
            </form>
          </section>
        </>
      )}

      <style jsx>{`
        .post-detail-container {
          padding: 20px;
        }
        .loading-spinner {
          text-align: center;
          font-size: 1.5em;
        }
        .error-message {
          color: red;
          text-align: center;
        }
        .comments-section {
          margin-top: 20px;
        }
        .comment {
          background: #f9f9f9;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .add-comment-section {
          margin-top: 30px;
        }
        .add-comment-section input,
        .add-comment-section textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .add-comment-section button {
          padding: 10px 15px;
          border: none;
          background-color: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .add-comment-section button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default PostDetail;
