
const AuthorService = require('../services/authorService');

// comments
class AuthorController {
    static async createAuthor(req, res) {
        try {
            const { name, nationality } = req.body;
            const author = await AuthorService.createAuthor(name, nationality);
            res.status(201).json(author);
        } catch (error) {
            AuthorController.handleError(res, error);
        }
    }

    static async getAllAuthors(req, res) {
        try {
            const authors = await AuthorService.getAllAuthors();
            res.json(authors);
        } catch (error) {
            AuthorController.handleError(res, error);
        }
    }

    static async getAuthorById(req, res) {
        try {
            const author = await AuthorService.getAuthorById(req.params.id);
            if (!author) return res.status(404).json({ error: 'Author not found' });
            res.json(author);
        } catch (error) {
            AuthorController.handleError(res, error);
        }
    }

    static async updateAuthor(req, res) {
        try {
            const { name, nationality } = req.body;
            const updated = await AuthorService.updateAuthor(req.params.id, name, nationality);

            if (!updated) return res.status(404).json({ error: 'Author not found' });

            const author = await AuthorService.getAuthorById(req.params.id);
            res.status(200).json(author);
        } catch (error) {
            AuthorController.handleError(res, error);
        }
    }

    static async deleteAuthor(req, res) {
        try {
            const deleted = await AuthorService.deleteAuthor(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Author not found' });

            res.status(200).json({ message: 'Author deleted successfully' });
        } catch (error) {
            AuthorController.handleError(res, error);
        }
    }

    static handleError(res, error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

module.exports = AuthorController;
