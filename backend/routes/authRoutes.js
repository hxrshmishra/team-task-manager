const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const {
  signup,
  login,
} = require('../controllers/authController');

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

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;