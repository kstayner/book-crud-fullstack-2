const db = require('../config/db');

class AuthorService {
    static async createAuthor(name, nationality) {
        const sql = 'INSERT INTO authors (name, nationality) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
            db.run(sql, [name, nationality], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, name, nationality });
            });
        });
    }

    static async getAllAuthors() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM authors', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static async getAuthorById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM authors WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static async updateAuthor(id, name, nationality) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE authors SET name = ?, nationality = ? WHERE id = ?', [name, nationality, id], function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            });
        });
    }

    static async deleteAuthor(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM authors WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(false);

                db.run('DELETE FROM books WHERE author_id = ?', [id], function (err) {
                    if (err) return reject(err);

                    db.run('DELETE FROM authors WHERE id = ?', [id], function (err) {
                        if (err) return reject(err);
                        resolve(this.changes > 0);
                    });
                });
            });
        });
    }

}

module.exports = AuthorService;
