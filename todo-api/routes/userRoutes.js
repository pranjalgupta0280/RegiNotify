const express = require('express');
const { registerUser, getAllUsers, getUserById } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

// POST /api/users - Register a new user
router.post('/', validateUser, registerUser);

// GET /api/users - Get all users with pagination and search
router.get('/', getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

module.exports = router;
