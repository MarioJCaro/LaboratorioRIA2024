const orders = [];

exports.createOrder = (req, res) => {
    const { userId, nombre, apellido, celular, productos } = req.body;
    
    const newOrder = {
        id: orders.length + 1,
        userId,
        nombre,
        apellido,
        celular,
        productos,
        fecha: new Date()
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
};

exports.getAllOrders = (req, res) => {
    res.json(orders);
};


exports.getOrdersPaginado = (req, res) => {
    const { page = 1, limit = 10, filterField, filterValue } = req.query;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let filteredOrders = orders;

    // Aplicar filtros si existen
    if (filterField && filterValue) {
        filteredOrders = orders.filter(order => 
            order[filterField] && order[filterField].toString().toLowerCase().includes(filterValue.toLowerCase())
        );
    }

    const paginatedResults = filteredOrders.slice(startIndex, endIndex);

    res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredOrders.length,
        data: paginatedResults
    });
};