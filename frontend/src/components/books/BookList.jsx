import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import authorService from '../../services/authorService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const data = await authorService.getAllAuthors();
      const authorsMap = {};
      data.forEach(author => {
        authorsMap[author.id] = author;
      });
      setAuthors(authorsMap);
    } catch (err) {
      console.error('Error fetching authors:', err);
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        // Refresh the books list
        fetchBooks();
      } catch (err) {
        setError('Failed to delete book. Please try again.');
        console.error('Error deleting book:', err);
      }
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-list">
      <h2>Books</h2>
      
      <Link to="/books/new" className="button">Add New Book</Link>
      
      {books.length === 0 ? (
        <p>No books found. Add a new book to get started.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Publication Year</th>
              <th>Author</th>
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
                  {authors[book.author_id] ? (
                    <Link to={`/authors/${book.author_id}`}>
                      {authors[book.author_id].name}
                    </Link>
                  ) : (
                    `Author ID: ${book.author_id}`
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/books/${book.id}`} className="button">View</Link>
                    <Link to={`/books/edit/${book.id}`} className="button">Edit</Link>
                    <button 
                      onClick={() => handleDeleteBook(book.id)}
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

export default BookList;