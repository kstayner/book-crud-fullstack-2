import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authorService from '../../services/authorService';

const AuthorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [authorData, setAuthorData] = useState({
    name: '',
    nationality: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchAuthorDetails();
    }
  }, [id]);

  const fetchAuthorDetails = async () => {
    try {
      setLoading(true);
      const data = await authorService.getAuthorById(id);
      setAuthorData({
        name: data.name || '',
        nationality: data.nationality || ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch author details. Please try again.');
      console.error('Error fetching author details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await authorService.updateAuthor(id, authorData);
      } else {
        await authorService.createAuthor(authorData);
      }
      
      navigate('/authors');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} author. Please check your input and try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} author:`, err);
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <div>Loading author details...</div>;

  return (
    <div className="author-form">
      <h2>{isEditMode ? 'Edit Author' : 'Add New Author'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={authorData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={authorData.nationality}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/authors')} className="button">
            Cancel
          </button>
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Author' : 'Create Author')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;