const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { isUser, verifyToken } = require('../middleware/auth');
const { verify } = require('crypto');

router.post('/register', (req, res) => {
  /* #swagger.summary = 'Registra un nuevo usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Registro de nuevo usuario.',
        schema: { $ref: '#/definitions/RegisterUser' }
    } */
  usuariosController.register(req, res);
});

router.post('/login', (req, res) => {
  /* #swagger.summary = 'Inicia sesión' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Credenciales de usuario.',
        schema: { $ref: '#/definitions/Login' }
    } */
  usuariosController.login(req, res);
});

router.post('/change-password', verifyToken,isUser , (req, res) => {
  /* #swagger.summary = 'Cambia la contraseña del usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Cambio de contraseña de usuario.',
        schema: { $ref: '#/definitions/ChangePassword' }
    } */
  usuariosController.changePassword(req, res);
});

router.post('/forgot-password', (req, res) => {
  /* #swagger.summary = 'Recupera la contraseña olvidada' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Recuperación de contraseña de usuario.',
        schema: { $ref: '#/definitions/ForgotPassword' }
    } */
  usuariosController.forgotPassword(req, res);
});

router.post('/enable-user', (req, res) => {
  /* #swagger.summary = 'Habilita un usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Habilitación de usuario.',
        schema: { $ref: '#/definitions/EnableDisableUser' }
    } */
  usuariosController.enableUser(req, res);
});

router.post('/disable-user', (req, res) => {
  /* #swagger.summary = 'Deshabilita un usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Deshabilitación de usuario.',
        schema: { $ref: '#/definitions/EnableDisableUser' }
    } */
  usuariosController.disableUser(req, res);
});

router.get('/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene un usuario por ID' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['id'] = { description: 'ID del usuario', type: 'integer', required: true } */
  usuariosController.getUserById(req, res);
});

module.exports = router;
