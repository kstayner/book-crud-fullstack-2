# Book Full-Stack

An integrated full-stack application for managing books and authors, featuring a Node.js/Express/SQLite backend API and a React frontend.

## 📚 Project Overview

This monorepo contains both the backend REST API and frontend UI components for a complete book management system where you can:

- Manage authors (Create, Read, Update, Delete)
- Manage books (Create, Read, Update, Delete)
- View relationships between books and authors
- Browse books by author

## 🏗️ Repository Structure

```
book-full-stack/
├── backend/                 # Express.js REST API with SQLite
│   ├── src/                 # API source code
│   └── package.json         # Backend dependencies
├── frontend/                # React frontend application
│   ├── src/                 # Frontend source code
│   └── package.json         # Frontend dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/kstayner/book-full-stack.git
   cd book-full-stack
   ```

2. Install backend dependencies:
   ```sh
   cd backend
   npm install
   cd ..
   ```

3. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   cd ..
   ```

### Running the Applications

#### Backend API

```sh
cd backend
node src/server.js
```

The backend API will be available at: `http://localhost:3000`

#### Frontend Application

In a new terminal:

```sh
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 🛠️ Backend API Endpoints

### Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/authors` | Create an author |
| GET | `/authors` | Get all authors |
| GET | `/authors/:id` | Get author by ID |
| PUT | `/authors/:id` | Update an author |
| DELETE | `/authors/:id` | Delete an author |

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books` | Create a book |
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get book by ID |
| GET | `/books/author/:id` | Get books by author ID |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## 💻 Frontend Features

- **Author Management**
  - View all authors
  - View author details including their books
  - Add new authors
  - Edit existing authors
  - Delete authors

- **Book Management**
  - View all books with author information
  - View book details
  - Add new books
  - Edit existing books
  - Delete books
  - Filter books by author

## 🧪 Development

For backend development, you can use nodemon to automatically restart the server:

```sh
cd backend
npm install -g nodemon
nodemon src/server.js
```

## 📜 License

This project is open-source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

💡 **Happy Coding!** 🚀