const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentación',
    description: 'Documentación de la API generada automáticamente',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Ingrese su token en el formato: Bearer <token>'
    }
  },
  definitions: {
    Hospital: {
      id: 1,
      nombre: "Hospital Central",
      direccion: "Av. Principal 123",
    },
    Usuario: {
      id: 1,
      email: "user@example.com",
      password: "password123",
      role: "USER",
      telefono: "123456789",
      enabled: true
    },
    RegisterUser: {
      email: "user@example.com",
      password: "password123",
      role: "USER",
      telefono: "123456789",
    },
    Login: {
      email: "user@example.com",
      password: "password123",
    },
    ChangePassword: {
      id: 1,
      oldPassword: "password123",
      newPassword: "newpassword123",
    },
    ForgotPassword: {
      email: "user@example.com",
    },
    EnableDisableUser: {
      id: 1,
    },
    Producto: {
      id: 1,
      nombre: "Producto Ejemplo",
      descripcion: "Descripción del producto",
      imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      precio: 9.99,
      insumos: []
    },
    Insumo: {
      id: 1,
      nombre: "Insumo Ejemplo",
      unidad: "Kg",
      costo: 100
    },
    InsumoProducto: {
      insumoId: 1,
      cantidad: 2.0
    },
    ProductoPaginado: {
      page: 1,
      limit: 10,
      total: 100,
      data: []
    },
    Carrito: {
      userId: 1,
      productos: [{ productId: 1, cantidad: 2 }]
    },
    ProductoCarrito: {
      productId: 1,
      cantidad: 2
    },
    InsumoPaginado: {
      page: 1,
      limit: 10,
      total: 100,
      data: []
    },
    OrdenesPaginado: {
      page: 1,
      limit: 10,
      total: 100,
      data: []
    },
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Tu archivo principal de la aplicación
});
