// pages/posts/index.tsx
import { useEffect, useState } from 'react';
import { fetchPosts, fetchUsers } from '../../api';
import Link from 'next/link';

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const postsData = await fetchPosts(currentPage, postsPerPage);
        setPosts(postsData);

        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Depend on currentPage for pagination

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
  };

  const filteredPosts = selectedUser
    ? posts.filter((post: any) => post.userId === selectedUser)
    : posts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Posts List</h1>

      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="filter">
        <label htmlFor="user-filter">Filter by Author:</label>
        <select id="user-filter" onChange={handleFilterChange} value={selectedUser ?? ''}>
          <option value="">All Users</option>
          {users.map((user: any) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {!loading && !error && (
        <div className="posts-grid">
          {filteredPosts.map((post: any) => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}...</p>
              <p><strong>Author:</strong> {users.find((user) => user.id === post.userId)?.name}</p>
              <Link href={`/posts/${post.id}`}>
                <a>View Details</a>
              </Link>
            </div>
          ))}
        </div>
      )}

    
      <div className="pagination-controls">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={posts.length < postsPerPage}>
          Next
        </button>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
        }
        h1 {
          text-align: center;
        }
        .filter {
          margin: 20px 0;
        }
        .filter select {
          padding: 8px;
          font-size: 1em;
        }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .post-card {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .post-card h2 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        .post-card p {
          font-size: 1em;
          line-height: 1.5;
        }
        .post-card a {
          display: inline-block;
          margin-top: 10px;
          text-decoration: none;
          color: #0070f3;
          font-weight: bold;
        }
        .post-card a:hover {
          text-decoration: underline;
        }

        .loading-spinner {
          text-align: center;
          margin: 20px;
          font-size: 1.5em;
        }
        .error-message {
          color: red;
          text-align: center;
          margin: 20px;
        }

        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        .pagination-controls button {
          padding: 8px 12px;
          margin: 0 10px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .posts-grid {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default PostsList;
