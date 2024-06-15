const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hospitalesRoutes = require('./routes/hospitales');
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const insumosRoutes = require('./routes/insumos');
const ordenesRoutes = require('./routes/ordenes');
const app = express();
const port = 3000;

// Aumentar el límite del tamaño del payload
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use('/hospitales', hospitalesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/insumos', insumosRoutes);
app.use('/ordenes', ordenesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
