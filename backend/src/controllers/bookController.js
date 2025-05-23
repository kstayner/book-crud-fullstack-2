const BookService = require('../services/bookService');

class BookController {
    static async createBook(req, res) {
        try {
            const { title, publication_year, author_id } = req.body;
            const book = await BookService.createBook(title, publication_year, author_id);
            res.status(201).json(book);
        } catch (error) {
            BookController.handleError(res, error);
        }
    }

    static async getAllBooks(req, res) {
        try {
            const books = await BookService.getAllBooks();
            res.json(books);
        } catch (error) {
            BookController.handleError(res, error);
        }
    }

    static async getBookById(req, res) {
        try {
            const book = await BookService.getBookById(req.params.id);
            if (!book) return res.status(404).json({ error: 'Book not found' });
            res.json(book);
        } catch (error) {
            BookController.handleError(res, error);
        }
    }

    static getBooksByAuthor(req, res) {
        const { author_id } = req.params;

        BookService.checkAuthorExists(author_id, (err, authorExists) => {
            if (err) return res.status(500).json({ error: err.message });

            if (!authorExists) {
                return res.status(404).json({ error: "Author not found" });
            }

            BookService.getBooksByAuthor(author_id, (err, books) => {
                if (err) return res.status(500).json({ error: err.message });
                return res.json(books);
            });
        });
    }

    static async updateBook(req, res) {
        try {
            const { title, publication_year, author_id } = req.body;
            const updated = await BookService.updateBook(req.params.id, title, publication_year, author_id);

            if (!updated) return res.status(404).json({ error: 'Book not found' });

            const book = await BookService.getBookById(req.params.id);
            res.status(200).json(book);
        } catch (error) {
            BookController.handleError(res, error);
        }
    }

    static async deleteBook(req, res) {
        try {
            const deleted = await BookService.deleteBook(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Book not found' });

            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            BookController.handleError(res, error);
        }
    }

    static handleError(res, error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

module.exports = BookController;
