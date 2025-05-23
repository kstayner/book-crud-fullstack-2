import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import authorService from '../../services/authorService';
import bookService from '../../services/bookService';

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthorDetails();
  }, [id]);

  const fetchAuthorDetails = async () => {
    try {
      setLoading(true);
      const authorData = await authorService.getAuthorById(id);
      setAuthor(authorData);
      
      // Fetch books by this author
      const authorBooks = await bookService.getBooksByAuthor(id);
      setBooks(authorBooks);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch author details. Please try again.');
      console.error('Error fetching author details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading author details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!author) return <div>Author not found</div>;

  return (
    <div className="author-detail">
      <h2>Author Details</h2>
      
      <div className="author-info">
        <p><strong>ID:</strong> {author.id}</p>
        <p><strong>Name:</strong> {author.name}</p>
        <p><strong>Nationality:</strong> {author.nationality}</p>
      </div>
      
      <div className="action-buttons">
        <Link to={`/authors/edit/${author.id}`} className="button">Edit Author</Link>
        <Link to="/authors" className="button">Back to Authors</Link>
      </div>
      
      <div className="author-books">
        <h3>Books by {author.name}</h3>
        
        <Link to={`/books/new?author_id=${author.id}`} className="button">
          Add New Book for This Author
        </Link>
        
        {books.length === 0 ? (
          <p>No books found for this author.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Publication Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.publication_year}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/books/${book.id}`} className="button">View</Link>
                      <Link to={`/books/edit/${book.id}`} className="button">Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AuthorDetail;