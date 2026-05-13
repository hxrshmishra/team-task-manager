const router = require('express').Router();

const Task = require('../models/Task');

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');


// CREATE TASK (Admin only)

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),

  async (req, res) => {
    try {

      const task = await Task.create(req.body);

      res.status(201).json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// GET TASKS

router.get(
  '/',
  authMiddleware,

  async (req, res) => {
    try {

      let tasks;

      // Admin sees all tasks
      if (req.user.role === 'admin') {

        tasks = await Task.find()
          .populate('assignedTo');

      } else {

        // Member sees only assigned tasks
        tasks = await Task.find({
          assignedTo: req.user.id,
        }).populate('assignedTo');
      }

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// UPDATE TASK STATUS

router.put(
  '/:id',
  authMiddleware,

  async (req, res) => {
    try {

      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;