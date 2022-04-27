const fastify = require('fastify')({ logger: true });
const router = require('./routes/router');
require('dotenv').config({ path: "config.env" });
const mongoose = require('mongoose');

mongoose
    .connect(process.env.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))

fastify.register(router);

const start = async function () {
    try {
        await fastify.listen(5000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();