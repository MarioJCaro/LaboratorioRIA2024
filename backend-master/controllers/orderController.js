const {estados} = require('../datos/dataPrIns'); 

const orders = [
    {
        id: 1,
        userId: 3,
        nombre: 'Juan',
        apellido: 'Perez',
        celular: '123456789',
        productos: [
            { productId: 1, cantidad: 2 },
            { productId: 2, cantidad: 1 }
        ],
        estado: estados[0].nombre,
        fecha: "19/05/2024"
    },
];

exports.createOrder = (req, res) => {
    const { userId, nombre, apellido, celular, productos, estado, fecha } = req.body;
    
    const newOrder = {
        id: orders.length + 1,
        userId,
        nombre,
        apellido,
        celular,
        productos,
        estado,
        fecha
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
};

exports.getAllOrders = (req, res) => {
    res.json(orders);
};


exports.getOrdersPaginado = (req, res) => {
    const { page = 1, limit = 10, filterField, filterValue, sortField = 'id', sortDirection = 'asc', userId } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let filteredOrders = orders;

    // Aplicar filtros si existen
    if (filterField && filterValue) {
        if (filterField === 'cliente') {
            const lowerFilterValue = filterValue.toLowerCase();
            filteredOrders = orders.filter(order =>
                (`${order.nombre} ${order.apellido}`).toLowerCase().includes(lowerFilterValue)
            );
        } else {
            filteredOrders = orders.filter(order =>
                order[filterField] && order[filterField].toString().toLowerCase().includes(filterValue.toLowerCase())
            );
        }
    }

    // Filtrar por userId si se proporciona
    if (userId) {
        filteredOrders = filteredOrders.filter(order => order.userId === parseInt(userId));
    }

    // Aplicar ordenación
    filteredOrders.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'cliente') {
            aValue = `${a.nombre} ${a.apellido}`;
            bValue = `${b.nombre} ${b.apellido}`;
        }

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const paginatedResults = filteredOrders.slice(startIndex, endIndex);

    res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredOrders.length,
        data: paginatedResults
    });
};


exports.getOrdenById = (req, res) => {
    const { id } = req.params;
    const order = orders.find(p => p.id == id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Orden no encontrado' });
    }
};


exports.updateOrden = (req, res) => {
    const { id } = req.params;
    const updatedOrden = req.body;
    const ordenIndex = orders.findIndex(p => p.id == id);
    if (ordenIndex !== -1) {
        orders[ordenIndex] = { ...orders[ordenIndex], ...updatedOrden };
        res.json(orders[ordenIndex]);
    } else {
        res.status(404).json({ message: 'Orden no encontrado' });
    }
};

exports.deleteOrden = (req, res) => {
    const { id } = req.params;
    const ordenIndex = orders.findIndex(p => p.id == id);
    if (ordenIndex !== -1) {
        const deletedOrden = orders.splice(ordenIndex, 1);
        res.json(deletedOrden);
    } else {
        res.status(404).json({ message: 'Orden no encontrado' });
    }
};

exports.updateOrdenEstado = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const ordenIndex = orders.findIndex(p => p.id == id);
    if (ordenIndex !== -1) {
        if (estados.find(e => e.nombre === estado)) {
            orders[ordenIndex].estado = estado;
            res.json(orders[ordenIndex]);
        } else {
            res.status(400).json({ message: 'Estado no válido' });
        }
    } else {
        res.status(404).json({ message: 'Orden no encontrada' });
    }
};