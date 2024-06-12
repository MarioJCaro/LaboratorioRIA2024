// productosController.js
const { insumos, productos } = require('../datos/dataPrIns');

exports.getProductos = (req, res) => {
    res.json(productos);
};

exports.getProductoById = (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

exports.createProducto = (req, res) => {
    const newProducto = req.body;
    newProducto.id = productos.length ? productos[productos.length - 1].id + 1 : 1;
    newProducto.insumos = [];
    productos.push(newProducto);
    res.status(201).json(newProducto);
};

exports.updateProducto = (req, res) => {
    const { id } = req.params;
    const updatedProducto = req.body;
    const productoIndex = productos.findIndex(p => p.id == id);
    if (productoIndex !== -1) {
        productos[productoIndex] = { ...productos[productoIndex], ...updatedProducto };
        res.json(productos[productoIndex]);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

exports.deleteProducto = (req, res) => {
    const { id } = req.params;
    const productoIndex = productos.findIndex(p => p.id == id);
    if (productoIndex !== -1) {
        const deletedProducto = productos.splice(productoIndex, 1);
        res.json(deletedProducto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

exports.addInsumoToProducto = (req, res) => {
    const { id } = req.params;
    const { insumoId, cantidad } = req.body;

    const producto = productos.find(p => p.id == id);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const insumo = insumos.find(i => i.id == insumoId);
    if (!insumo) {
        return res.status(404).json({ message: 'Insumo no encontrado' });
    }

    const existingInsumo = producto.insumos.find(i => i.insumoId == insumoId);
    if (existingInsumo) {
        existingInsumo.cantidad = cantidad;
    } else {
        producto.insumos.push({ insumoId, cantidad });
    }

    res.json(producto);
};

exports.removeInsumoFromProducto = (req, res) => {
    const { id, insumoId } = req.params;

    const producto = productos.find(p => p.id == id);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const insumoIndex = producto.insumos.findIndex(i => i.insumoId == insumoId);
    if (insumoIndex === -1) {
        return res.status(404).json({ message: 'Insumo no encontrado en el producto' });
    }

    producto.insumos.splice(insumoIndex, 1);
    res.json(producto);
};
