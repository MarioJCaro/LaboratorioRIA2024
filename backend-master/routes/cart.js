const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken, isUser } = require('../middleware/auth');

router.get('/:userId', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Obtiene el carrito de un usuario' */
    /* #swagger.tags = ['Carrito'] */
    /* #swagger.parameters['userId'] = { description: 'ID del usuario', type: 'integer', required: true } */
    cartController.getCart(req, res);
});

router.post('/:userId', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Agrega un producto al carrito' */
    /* #swagger.tags = ['Carrito'] */
    /* #swagger.parameters['userId'] = { description: 'ID del usuario', type: 'integer', required: true } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add product to cart.',
        schema: { productId: 1, cantidad: 2 }
    } */
    cartController.addToCart(req, res);
});

router.put('/:userId', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Actualiza la cantidad de un producto en el carrito' */
    /* #swagger.tags = ['Carrito'] */
    /* #swagger.parameters['userId'] = { description: 'ID del usuario', type: 'integer', required: true } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update product quantity in cart.',
        schema: { productId: 1, cantidad: 3 }
    } */
    cartController.updateCart(req, res);
});

router.delete('/:userId/:productId', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Elimina un producto del carrito' */
    /* #swagger.tags = ['Carrito'] */
    /* #swagger.parameters['userId'] = { description: 'ID del usuario', type: 'integer', required: true } */
    /* #swagger.parameters['productId'] = { description: 'ID del producto', type: 'integer', required: true } */
    cartController.removeFromCart(req, res);
});

router.delete('/:userId', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Vacia el carrito del usuario' */
    /* #swagger.tags = ['Carrito'] */
    /* #swagger.parameters['userId'] = { description: 'ID del usuario', type: 'integer', required: true } */
    cartController.clearCart(req, res);
});

module.exports = router;
