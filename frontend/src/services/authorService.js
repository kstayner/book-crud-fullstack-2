import api from './api';

const authorService = {
  getAllAuthors: async () => {
    try {
      const response = await api.get('/authors');
      return response.data;
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  },

  getAuthorById: async (id) => {
    try {
      const response = await api.get(`/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching author with id ${id}:`, error);
      throw error;
    }
  },

  createAuthor: async (authorData) => {
    try {
      const response = await api.post('/authors', authorData);
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  },

  updateAuthor: async (id, authorData) => {
    try {
      const response = await api.put(`/authors/${id}`, authorData);
      return response.data;
    } catch (error) {
      console.error(`Error updating author with id ${id}:`, error);
      throw error;
    }
  },

  deleteAuthor: async (id) => {
    try {
      const response = await api.delete(`/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting author with id ${id}:`, error);
      throw error;
    }
  }
};

export default authorService;