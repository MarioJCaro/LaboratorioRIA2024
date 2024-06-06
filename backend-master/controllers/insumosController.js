let insumos = [
    { id: 1, nombre: 'Harina', unidad: 'Kg', costo: 100 },
    { id: 2, nombre: 'Sal', unidad: 'Kg', costo: 300 }
  ];
  
  exports.getInsumos = (req, res) => {               
    res.json(insumos);
  };
  
  exports.getInsumoById = (req, res) => {
    const { id } = req.params;
    const insumo = insumos.find(p => p.id == id);
    if (insumo) {
      res.json(insumo);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  };
  
  exports.createInsumo = (req, res) => {
    const newInsumo = req.body;
    newInsumo.id = insumos.length ? insumos[insumos.length - 1].id + 1 : 1;
    insumos.push(newInsumo);
    res.status(201).json(newInsumo);
  };
  
  exports.updateInsumo = (req, res) => {
    const { id } = req.params;
    const updatedInsumo = req.body;
    const insumoIndex = insumos.findIndex(p => p.id == id);
    if (insumoIndex !== -1) {
      insumos[insumoIndex] = { ...insumos[insumoIndex], ...updatedInsumo };
      res.json(insumos[insumoIndex]);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  };
  
  exports.deleteInsumo = (req, res) => {
    const { id } = req.params;
    const insumoIndex = insumos.findIndex(p => p.id == id);
    if (insumoIndex !== -1) {
      const deletedInsumo = insumos.splice(insumoIndex, 1);
      res.json(deletedInsumo);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  };
  