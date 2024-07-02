let productos = [
    { id: 1, nombre: 'Pan 1/2 Kg', descripcion: '1/2 Kg pan felipe', imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA', precio: 10.0, insumos: [{insumoId:1,cantidad:0.3}, {insumoId:3, cantidad:5}] },
    { id: 2, nombre: 'Sanguches JyQ', descripcion: 'Una bandeja de 12 unidades.', imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA', precio: 20.0, insumos: [{insumoId:4, cantidad: 0.1}, {insumoId:5, cantidad: 0.1}] },
];

let insumos = [
    { id: 1, nombre: 'Harina', unidad: 'Kg', costo: 100 },
    { id: 2, nombre: 'Sal', unidad: 'Kg', costo: 300 },
    { id: 3, nombre: 'Levadura', unidad: 'Gr', costo: 200 },
    { id: 4, nombre: 'Jamón', unidad: 'Kg', costo: 500 },
    { id: 5, nombre: 'Queso', unidad: 'Kg', costo: 500 }
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
