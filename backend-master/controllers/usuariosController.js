const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarios = [];
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: '465',
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: 'mcarodiaz010@gmail.com',
    pass: 'fbho tygv sffd adaa'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Función para enviar correos electrónicos
const sendResetEmail = (email, resetLink) => {
  const mailOptions = {
    from: 'mcarodiaz010@gmail.com',
    to: email,
    subject: 'Restablecer contraseña',
    text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`
  };

  return transporter.sendMail(mailOptions);
};

const generateToken = (user) => {
  const expiresIn = '1h';
  const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn });
  const expirationDate = new Date(Date.now() + 3600 * 1000); 
  const formattedExpirationDate = `${expirationDate.getDate().toString().padStart(2, '0')}/${
    (expirationDate.getMonth() + 1).toString().padStart(2, '0')}/${
    expirationDate.getFullYear()} ${
    expirationDate.getHours().toString().padStart(2, '0')}:${
    expirationDate.getMinutes().toString().padStart(2, '0')}:${
    expirationDate.getSeconds().toString().padStart(2, '0')}`;
  return { token, expirationDate: formattedExpirationDate };
};


// Función para crear usuarios por defecto
const createDefaultUsers = async () => {
  const defaultUsers = [
    { id:1, email: 'admin@example.com', password: 'admin123', role: 'ADMIN', telefono: '123456789' },
    { id:2, email: 'panadero@example.com', password: 'panadero123', role: 'PANADERO', telefono: '987654321' },
    { id:3, email: 'user@example.com', password: 'user123', role: 'USER', telefono: '456123789' },
  ];

  for (const user of defaultUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      telefono: user.telefono,
      enabled: true,
    };
    usuarios.push(newUser);
  }
};

// Llama a la función para crear usuarios por defecto al inicio
createDefaultUsers();

const register = async (req, res) => {
  try {
    const { email, password, role, telefono } = req.body;

    if (!email || !password || !role || !telefono) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingUser = usuarios.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      email,
      password: hashedPassword,
      role,
      telefono,
      enabled: true,
    };

    usuarios.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    const { token, expirationDate } = generateToken(user);
    res.json({ id: user.id, nombre: user.email, role: user.role, token, expirationDate });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};


const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user && await bcrypt.compare(oldPassword, user.password)) {
    user.password = await bcrypt.hash(newPassword, 10);
    res.json({ message: 'Password updated' });
  } else {
    res.status(400).json({ message: 'Invalid password' });
  }
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (user) {
    const resetLink = `http://localhost:4200/reset-password/${user.id}`; // Ajusta la URL según tu frontend
    sendResetEmail(email, resetLink)
      .then(() => {
        res.json({ message: 'Password reset link sent' });
      })
      .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
      });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const resetPassword = (req, res) => {
  const { id, newPassword } = req.body;
  const user = usuarios.find(u => u.id === parseInt(id));
  if (user) {
    user.password = bcrypt.hashSync(newPassword, 10);
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};



const enableUser = (req, res) => {
  const { id } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.enabled = true;
    res.json({ message: 'User enabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const disableUser = (req, res) => {
  const { id } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.enabled = false;
    res.json({ message: 'User disabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getUserById = (req, res) => {
  const { id } = req.params; 
  const usuario = usuarios.find(u => u.id == id); 

  if (usuario) {
    res.json(usuario); 
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { email, telefono } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.email = email;
    user.telefono = telefono;
    res.json({ message: 'User updated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

// Crear panadero
const createPanadero = async (req, res) => {
  try {
    const { email, password, telefono } = req.body;

    if (!email || !password || !telefono) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingUser = usuarios.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPanadero = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      email,
      password: hashedPassword,
      role: 'PANADERO',
      telefono,
      enabled: true,
    };

    usuarios.push(newPanadero);
    res.status(201).json(newPanadero);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el panadero', error: error.message });
  }
};

// Obtener todos los panaderos
const getPanaderos = (req, res) => {
  const panaderos = usuarios.filter(user => user.role === 'PANADERO');
  res.json(panaderos);
};

// Actualizar panadero
const updatePanadero = (req, res) => {
  const { id } = req.params;
  const { email, telefono, password } = req.body;
  const panadero = usuarios.find(u => u.id == id && u.role === 'PANADERO');
  if (panadero) {
    panadero.email = email;
    panadero.telefono = telefono;
    panadero.password = bcrypt.hashSync(password, 10);
    res.json({ message: 'Panadero actualizado' });
  } else {
    res.status(404).json({ message: 'Panadero no encontrado' });
  }
};

// Eliminar panadero
const deletePanadero = (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex(u => u.id == id && u.role === 'PANADERO');
  if (index !== -1) {
    usuarios.splice(index, 1);
    res.json({ message: 'Panadero eliminado' });
  } else {
    res.status(404).json({ message: 'Panadero no encontrado' });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  enableUser,
  disableUser,
  getUserById,
  updateUser,
  resetPassword,
  createPanadero,
  getPanaderos,
  updatePanadero,
  deletePanadero
};
