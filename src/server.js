const Hapi = require('@hapi/hapi');
const routes = require('./routes');


const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    await server.start(routes);
    console.log(`Server is running in : ${server.info.uri}`);
};

init();