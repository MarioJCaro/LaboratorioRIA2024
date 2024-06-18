const { productos } = require('../datos/dataPrIns');
let carritos = [];

exports.getCart = (req, res) => {
    const { userId } = req.params;
    const carrito = carritos.find(c => c.userId == userId);
    if (carrito) {
        res.json(carrito);
    } else {
        res.json({ userId, productos: [] });
    }
};
exports.addToCart = (req, res) => {
    const { userId } = req.params;
    const { productId, cantidad } = req.body;

    let carrito = carritos.find(c => c.userId == userId);
    if (!carrito) {
        carrito = { userId, productos: [] };
        carritos.push(carrito);
    }

    const producto = productos.find(p => p.id == productId);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const existingProducto = carrito.productos.find(p => p.productId == productId);
    if (existingProducto) {
        existingProducto.cantidad += cantidad;
    } else {
        carrito.productos.push({ productId, cantidad });
    }

    res.json(carrito);
};

exports.updateCart = (req, res) => {
    const { userId } = req.params;
    const { productId, cantidad } = req.body;

    const carrito = carritos.find(c => c.userId == userId);
    if (!carrito) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const producto = productos.find(p => p.id == productId);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const existingProducto = carrito.productos.find(p => p.productId == productId);
    if (existingProducto) {
        existingProducto.cantidad = cantidad;
    } else {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    res.json(carrito);
};


exports.removeFromCart = (req, res) => {
    const { userId, productId } = req.params;

    const carrito = carritos.find(c => c.userId == userId);
    if (!carrito) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const productoIndex = carrito.productos.findIndex(p => p.productId == productId);
    if (productoIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    carrito.productos.splice(productoIndex, 1);
    res.json(carrito);
};

exports.clearCart = (req, res) => {
    const { userId } = req.params;
    const carritoIndex = carritos.findIndex(c => c.userId == userId);
    if (carritoIndex !== -1) {
        carritos.splice(carritoIndex, 1);
        res.json({ message: 'Carrito vaciado' });
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
};
