const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isUser, isPanadero } = require('../middleware/auth');

// Ruta para get paginado de ordenes (debe estar antes de las rutas con parámetros)
router.get('/paginado', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Obtiene la lista de ordenes paginados' */
    /* #swagger.tags = ['Ordenes'] */
    /* #swagger.parameters['page'] = { description: 'Número de página', type: 'integer', required: true } */
    /* #swagger.parameters['limit'] = { description: 'Cantidad de ordenes por página', type: 'integer', required: true } */
    /* #swagger.parameters['filterField'] = { description: 'Campo por el que se quiere filtrar', type: 'string' } */
    /* #swagger.parameters['filterValue'] = { description: 'Valor del filtro', type: 'string' } */
    // Schema de respuesta
    /* #swagger.responses[200] = {
        schema: { $ref: '#/definitions/OrdenesPaginado' },
        description: 'Ordenes paginados'
    } */
    orderController.getOrdersPaginado(req, res);
});

router.post('/', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Crea una nueva orden' */
    /* #swagger.tags = ['Ordenes'] */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Create order.',
        schema: { userId: 1, nombre: 'John', apellido: 'Doe', celular: '123456789', productos: [{ productId: 1, cantidad: 2 }], estado: 'pendiente', fecha: "20/06/2024" }
    } */
    orderController.createOrder(req, res);
});
router.get('/', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Obtiene todas las órdenes' */
    /* #swagger.tags = ['Ordenes'] */
    orderController.getAllOrders(req, res);
});

router.get('/:id', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Obtiene un orden por ID' */
    /* #swagger.tags = ['Ordenes'] */
    /* #swagger.parameters['id'] = { description: 'ID del orden', type: 'integer', required: true } */
    orderController.getOrdenById(req, res);
});

router.put('/:id', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Actualiza un orden existente' */
    /* #swagger.tags = ['Ordenes'] */
    /* #swagger.security = [{ "BearerAuth": [] }] */
    /* #swagger.parameters['id'] = { description: 'ID del orden', type: 'integer', required: true } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update product.',
        schema: { $ref: '#/definitions/Orden' }
    } */
        orderController.updateOrden(req, res);
});

router.delete('/:id', verifyToken, isUser, (req, res) => {
    /* #swagger.summary = 'Elimina un orden' */
    /* #swagger.tags = ['Ordenes'] */
    /* #swagger.security = [{ "BearerAuth": [] }] */
    /* #swagger.parameters['id'] = { description: 'ID del orden', type: 'integer', required: true } */
    orderController.deleteOrden(req, res);
});

module.exports = router;
