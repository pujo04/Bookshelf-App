const Hapi = require('@hapi/hapi');
const routes = require('./routes/booksRoutes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // Mengizinkan akses dari semua origin
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();