const router = require('express').Router();

const {
  signup,
  login,
} = require('../controllers/authController');

const User = require('../models/User');

const authMiddleware = require('../middleware/authMiddleware');


// AUTH ROUTES

router.post('/signup', signup);

router.post('/login', login);


// GET USERS ROUTE

router.get(
  '/users',
  authMiddleware,

  async (req, res) => {

    try {

      const users = await User.find().select(
        '-password'
      );

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;