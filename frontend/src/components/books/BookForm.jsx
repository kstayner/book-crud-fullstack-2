import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import bookService from '../../services/bookService';
import authorService from '../../services/authorService';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;
  
  const [bookData, setBookData] = useState({
    title: '',
    publication_year: new Date().getFullYear(),
    author_id: ''
  });
  
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
    
    // Check if there's a author_id query parameter (when coming from author detail page)
    const queryParams = new URLSearchParams(location.search);
    const authorIdParam = queryParams.get('author_id');
    
    if (authorIdParam) {
      setBookData(prev => ({
        ...prev,
        author_id: authorIdParam
      }));
    }
    
    if (isEditMode) {
      fetchBookDetails();
    } else {
      setLoading(false);
    }
  }, [id, location]);

  const fetchAuthors = async () => {
    try {
      const data = await authorService.getAllAuthors();
      setAuthors(data);
    } catch (err) {
      setError('Failed to fetch authors. Please try again later.');
      console.error('Error fetching authors:', err);
    }
  };

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const data = await bookService.getBookById(id);
      setBookData({
        title: data.title || '',
        publication_year: data.publication_year || new Date().getFullYear(),
        author_id: data.author_id || ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch book details. Please try again.');
      console.error('Error fetching book details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: name === 'publication_year' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookData.author_id) {
      setError('Please select an author');
      return;
    }
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await bookService.updateBook(id, bookData);
      } else {
        await bookService.createBook(bookData);
      }
      
      navigate('/books');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} book. ${err.message}`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} book:`, err);
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <div>Loading book details...</div>;

  return (
    <div className="book-form">
      <h2>{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="publication_year">Publication Year:</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={bookData.publication_year}
            onChange={handleChange}
            min="1000"
            max="9999"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author_id">Author:</label>
          <select
            id="author_id"
            name="author_id"
            value={bookData.author_id}
            onChange={handleChange}
            required
          >
            <option value="">Select an Author</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name} ({author.nationality})
              </option>
            ))}
          </select>
          
          {authors.length === 0 && (
            <p className="note">
              No authors available. <a href="/authors/new" target="_blank" rel="noopener noreferrer">Create an author</a> first.
            </p>
          )}
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/books')} className="button">
            Cancel
          </button>
          <button type="submit" className="button primary" disabled={loading || authors.length === 0}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Book' : 'Create Book')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;