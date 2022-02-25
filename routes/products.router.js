const express = require('express');
// const faker = require('faker');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

//Le digo a express que necesito un router
const router = express.Router();
const service = new ProductsService();

// router.get('/', (req, res) => {
//     // const products = [];
//     // const { size } = req.query;
//     // const limit = size || 10;
//     // for (let index = 0; index < limit; index++) {
//     //     products.push({
//     //         name: faker.commerce.productName(),
//     //         price: parseInt(faker.commerce.price(), 10),
//     //         image: faker.image.imageUrl(),
//     //     });
//     // }
//     const products = service.find();
//     res.json(products);
// });

router.get('/', async(req, res) => {
    const products = await service.find();
    res.json(products);

});


router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});


router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            // if (id === '999') {
            //     res.status(404).json({
            //         message: 'not found'
            //     });
            // } else {
            //     res.status(200).json({
            //         id,
            //         name: 'Product 2',
            //         price: 2000
            //     });
            // }
            const product = await service.findOne(id);
            res.json(product);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    });

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (err) {
            // res.status(404).json({ message: err.message });
            next(err);
        }

        // res.json({
        //     message: 'update',
        //     data: body,
        //     id,
        // });
    });

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json({
        message: 'update',
        data: body,
        id,
    });
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    // res.json({
    //     message: 'deleted',
    //     id,
    // });
    res.json(rta);
});

module.exports = router;
