// components/PostCard.tsx
import React from 'react';
import Link from 'next/link';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  author: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, author }) => {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{body.slice(0, 100)}...</p>
      <p><strong>Author:</strong> {author}</p>
      <Link href={`/posts/${id}`}>
        <a className="view-details">View Details</a>
      </Link>

      <style jsx>{`
        .post-card {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: box-shadow 0.3s;
        }
        .post-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .post-card h2 {
          margin-top: 0;
        }
        .view-details {
          display: inline-block;
          margin-top: 8px;
          color: #0070f3;
          text-decoration: none;
        }
        .view-details:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default PostCard;
