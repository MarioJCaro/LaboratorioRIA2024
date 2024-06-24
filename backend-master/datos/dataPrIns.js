let productos = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA', precio: 10.0, insumos: [{insumoId:1,cantidad:2}] },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA', precio: 20.0, insumos: [] },
];

let insumos = [
    { id: 1, nombre: 'Harina', unidad: 'Kg', costo: 100 },
    { id: 2, nombre: 'Sal', unidad: 'Kg', costo: 300 }
];

let estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'En preparación' },
    { id: 3, nombre: 'Listo para recoger'},
    { id: 4, nombre: 'Entregado' }
];

module.exports = {
    productos,
    insumos,
    estados
};
