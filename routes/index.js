const express = require('express');


const productsRouter = require('./products.router');
const userRouter = require('./users.router');
const categoryRouter = require('./categories.router');

// este es un patron de una sola responsabilidad

function routerApi(app) {

    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/users', userRouter);
    router.use('/categories', categoryRouter);
}

module.exports = routerApi
