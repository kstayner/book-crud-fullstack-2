const express = require('express');
const app = express();
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));