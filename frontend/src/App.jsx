import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Author Components
import AuthorList from './components/authors/AuthorList';
import AuthorForm from './components/authors/AuthorForm';
import AuthorDetail from './components/authors/AuthorDetail';

// Book Components
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm';
import BookDetail from './components/books/BookDetail';

import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Book Management System</h1>
          <nav>
            <ul>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/authors">Authors</Link></li>
            </ul>
          </nav>
        </header>
        
        <main>
          <Routes>
            {/* Redirect root to books list */}
            <Route path="/" element={<Navigate to="/books" replace />} />
            
            {/* Book Routes */}
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books/edit/:id" element={<BookForm />} />
            
            {/* Author Routes */}
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/new" element={<AuthorForm />} />
            <Route path="/authors/:id" element={<AuthorDetail />} />
            <Route path="/authors/edit/:id" element={<AuthorForm />} />
            
            {/* 404 Route */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; {new Date().getFullYear()} Book Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;