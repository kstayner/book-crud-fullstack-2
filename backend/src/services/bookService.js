const db = require('../config/db');

class BookService {
    static async createBook(title, publication_year, author_id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT id FROM authors WHERE id = ?', [author_id], (err, row) => {
                if (err) return reject(err);
                if (!row) return reject(new Error('Author not found. Please create the author first.'));

                const sql = 'INSERT INTO books (title, publication_year, author_id) VALUES (?, ?, ?)';
                db.run(sql, [title, publication_year, author_id], function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, title, publication_year, author_id });
                });
            });
        });
    }

    static async getAllBooks() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM books', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getBookById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static getBooksByAuthor(author_id, callback) {
        db.all('SELECT * FROM books WHERE author_id = ?', [author_id], (err, books) => {
            if (err) return callback(err);
            callback(null, books || []);
        });
    }
    

    static async updateBook(id, title, publication_year, author_id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(false);

                db.get('SELECT id FROM authors WHERE id = ?', [author_id], (err, authorRow) => {
                    if (err) return reject(err);
                    if (!authorRow) return reject(new Error('Author not found. Please create the author first.'));

                    const sql = 'UPDATE books SET title = ?, publication_year = ?, author_id = ? WHERE id = ?';
                    db.run(sql, [title, publication_year, author_id, id], function (err) {
                        if (err) return reject(err);
                        resolve(this.changes > 0);
                    });
                });
            });
        });
    }

    static async deleteBook(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(false);

                db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
                    if (err) return reject(err);
                    resolve(this.changes > 0);
                });
            });
        });
    }

    static checkAuthorExists(author_id, callback) {
        db.get('SELECT id FROM authors WHERE id = ?', [author_id], (err, row) => {
            if (err) return callback(err);
            callback(null, !!row);
        });
    }
    
    
}

module.exports = BookService;
