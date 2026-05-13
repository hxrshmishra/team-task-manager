const router = require('express').Router();

const Project = require('../models/Project');

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');


// CREATE PROJECT

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),

  async (req, res) => {
    try {

      const project = await Project.create({
        ...req.body,
        createdBy: req.user.id,
      });

      res.status(201).json(project);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// GET PROJECTS

router.get(
  '/',
  authMiddleware,

  async (req, res) => {
    try {

      let projects;

      // Admin sees all projects
      if (req.user.role === 'admin') {

        projects = await Project.find()
          .populate('members');

      } else {

        // Members see only joined projects
        projects = await Project.find({
          members: req.user.id,
        }).populate('members');
      }

      res.json(projects);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;