import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authorService from '../../services/authorService';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const data = await authorService.getAllAuthors();
      setAuthors(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch authors. Please try again later.');
      console.error('Error fetching authors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAuthor = async (id) => {
    if (window.confirm('Are you sure you want to delete this author? This will also delete all their books.')) {
      try {
        await authorService.deleteAuthor(id);
        // Refresh the authors list
        fetchAuthors();
      } catch (err) {
        setError('Failed to delete author. Please try again.');
        console.error('Error deleting author:', err);
      }
    }
  };

  if (loading) return <div>Loading authors...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="author-list">
      <h2>Authors</h2>
      
      <Link to="/authors/new" className="button">Add New Author</Link>
      
      {authors.length === 0 ? (
        <p>No authors found. Add a new author to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.nationality}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/authors/${author.id}`} className="button">View</Link>
                    <Link to={`/authors/edit/${author.id}`} className="button">Edit</Link>
                    <button 
                      onClick={() => handleDeleteAuthor(author.id)}
                      className="button delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuthorList;