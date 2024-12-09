const { getAllBooksHandler } = require('../handlers/booksHandler');

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    // Tambahkan rute lain sesuai kebutuhan
];

module.exports = routes;
