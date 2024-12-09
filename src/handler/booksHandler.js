const books = require('../models/books');

// Handler untuk mendapatkan semua buku
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let filteredBooks = books;

    if (name) {
        filteredBooks = filteredBooks.filter((book) =>
            book.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter(
            (book) => book.reading === (reading === '1')
        );
    }

    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter(
            (book) => book.finished === (finished === '1')
        );
    }

    return h.response({
        status: 'success',
        data: {
            books: filteredBooks.map(({ id, name, publisher }) => ({
                id,
                name,
                publisher,
            })),
        },
    }).code(200);
};

// Tambahkan fungsi handler lainnya...

module.exports = {
    getAllBooksHandler,
};
