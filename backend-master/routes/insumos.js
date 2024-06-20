const express = require('express');
const router = express.Router();
const insumosController = require('../controllers/insumosController');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');

// Ruta para get paginado de insumos (debe estar antes de las rutas con parámetros)
router.get('/paginado', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de insumos paginados' */
  /* #swagger.tags = ['Insumos'] */
  /* #swagger.parameters['page'] = { description: 'Número de página', type: 'integer', required: true } */
  /* #swagger.parameters['limit'] = { description: 'Cantidad de insumos por página', type: 'integer', required: true } */
  /* #swagger.parameters['filterField'] = { description: 'Campo por el que se quiere filtrar', type: 'string' } */
  /* #swagger.parameters['filterValue'] = { description: 'Valor del filtro', type: 'string' } */
  // Schema de respuesta
  /* #swagger.responses[200] = {
      schema: { $ref: '#/definitions/InsumoPaginado' },
      description: 'Insumos paginados'
  } */
  insumosController.getInsumosPaginado(req, res);
});

router.get('/', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene la lista de insumos' */
  /* #swagger.tags = ['Insumos'] */
  insumosController.getInsumos(req, res);
});

router.get('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Obtiene un insumo por ID' */
  /* #swagger.tags = ['Insumos'] */
  /* #swagger.parameters['id'] = { description: 'ID del insumo', type: 'integer', required: true } */
  insumosController.getInsumoById(req, res);
});

router.post('/', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Agrega un nuevo insumo' */
  /* #swagger.tags = ['Insumos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new product.',
        schema: { $ref: '#/definitions/Insumo' }
    } */
  insumosController.createInsumo(req, res);
});

router.put('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Actualiza un insumo existente' */
  /* #swagger.tags = ['Insumos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del insumo', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Update product.',
        schema: { $ref: '#/definitions/Insumo' }
    } */
  insumosController.updateInsumo(req, res);
});

router.delete('/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Elimina un insumo' */
  /* #swagger.tags = ['Insumos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del insumo', type: 'integer', required: true } */
  insumosController.deleteInsumo(req, res);
});

module.exports = router;
