import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import authorService from '../../services/authorService';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const bookData = await bookService.getBookById(id);
      setBook(bookData);
      
      // Fetch author details
      const authorData = await authorService.getAuthorById(bookData.author_id);
      setAuthor(authorData);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
      console.error('Error fetching book details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-detail">
      <h2>Book Details</h2>
      
      <div className="book-info">
        <p><strong>ID:</strong> {book.id}</p>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Publication Year:</strong> {book.publication_year}</p>
        <p>
          <strong>Author:</strong> {' '}
          {author ? (
            <Link to={`/authors/${author.id}`}>
              {author.name} ({author.nationality})
            </Link>
          ) : (
            `Author ID: ${book.author_id}`
          )}
        </p>
      </div>
      
      <div className="action-buttons">
        <Link to={`/books/edit/${book.id}`} className="button">Edit Book</Link>
        <Link to="/books" className="button">Back to Books</Link>
      </div>
    </div>
  );
};

export default BookDetail;