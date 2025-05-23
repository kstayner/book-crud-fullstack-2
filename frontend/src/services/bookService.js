import api from './api';

const bookService = {
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  },

  getBooksByAuthor: async (authorId) => {
    try {
      const response = await api.get(`/books/author/${authorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching books for author ${authorId}:`, error);
      throw error;
    }
  },

  createBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      throw error;
    }
  }
};

export default bookService;