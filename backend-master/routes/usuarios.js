const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { isUser, verifyToken, isAdmin } = require('../middleware/auth');
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

router.post('/reset-password', (req, res) => {
  /* #swagger.summary = 'Restablece la contraseña' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Restablecimiento de contraseña de usuario.',
        schema: { $ref: '#/definitions/ResetPassword' }
    } */
  usuariosController.resetPassword(req, res);
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

router.post('/panaderos', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Crea un nuevo panadero' */
  /* #swagger.tags = ['Panaderos'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Creación de nuevo panadero.',
        schema: { $ref: '#/definitions/RegisterUser' }
    } */
  usuariosController.createPanadero(req, res);
});

router.get('/panaderos', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Obtiene todos los panaderos' */
  /* #swagger.tags = ['Panaderos'] */
  usuariosController.getPanaderos(req, res);
});

router.put('/panaderos/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Actualiza un panadero' */
  /* #swagger.tags = ['Panaderos'] */
  /* #swagger.parameters['id'] = { description: 'ID del panadero', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Actualización de panadero.',
        schema: { $ref: '#/definitions/UpdateUser' }
    } */
  usuariosController.updatePanadero(req, res);
});

router.delete('/panaderos/:id', verifyToken, isAdmin, (req, res) => {
  /* #swagger.summary = 'Elimina un panadero' */
  /* #swagger.tags = ['Panaderos'] */
  /* #swagger.parameters['id'] = { description: 'ID del panadero', type: 'integer', required: true } */
  usuariosController.deletePanadero(req, res);
});

router.get('/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Obtiene un usuario por ID' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.parameters['id'] = { description: 'ID del usuario', type: 'integer', required: true } */
  usuariosController.getUserById(req, res);
});

router.put('/:id', verifyToken, isUser, (req, res) => {
  /* #swagger.summary = 'Actualiza un usuario' */
  /* #swagger.tags = ['Usuarios'] */
  /* #swagger.security = [{ "BearerAuth": [] }] */
  /* #swagger.parameters['id'] = { description: 'ID del usuario', type: 'integer', required: true } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Actualización de usuario.',
        schema: { $ref: '#/definitions/UpdateUser' }
    } */
  usuariosController.updateUser(req, res);
});




module.exports = router;
