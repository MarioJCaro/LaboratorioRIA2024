const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');

router.get('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de productos' */
  /* #swagger.tags = ['Productos'] */
  productosController.getProductos(req, res);
});

router.get('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Obtiene un producto por ID' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  productosController.getProductoById(req, res);
});

router.post('/', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Agrega un nuevo producto' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new product.',
        schema: { $ref: '#/definitions/Producto' }
    } */
  productosController.createProducto(req, res);
});

router.put('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Actualiza un producto existente' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update product.',
        schema: { $ref: '#/definitions/Producto' }
    } */
  productosController.updateProducto(req, res);
});

router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Elimina un producto' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  productosController.deleteProducto(req, res);
});

// Rutas para agregar y quitar insumos de productos
router.post('/:id/insumos', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Agrega un insumo a un producto' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add insumo to product.',
        schema: { $ref: '#/definitions/InsumoProducto' }
    } */
  productosController.addInsumoToProducto(req, res);
}
);

router.delete('/:id/insumos/:insumoId', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Quita un insumo de un producto' */
  /* #swagger.tags = ['Productos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del producto', type: 'integer', required: true } */
  /* #swagger.parameters['insumoId'] = { description: 'ID del insumo', type: 'integer', required: true } */
  productosController.removeInsumoFromProducto(req, res);
}
);

module.exports = router;
