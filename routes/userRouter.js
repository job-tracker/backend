const router = require('express').Router({ mergeParams: true });
const User = require('../models/user');
const { findUserById } = require('../middleware');

const jobsiteRouter = require('../routes/jobsiteRouter');
const supplyListRouter = require('../routes/supplyListRouter');

router.use('/:userId/jobsites', jobsiteRouter);
router.use('/:userId/supplylists', supplyListRouter);

// GET user table
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user table with ID
router.get('/:user_id', findUserById, async (req, res) => {
  const { user } = req;
  try {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'could not find user' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to get user' });
  }
});

// POST new user
router.post('/', async (req, res) => {
  const { jobsiteId } = req.params;
  const newBuilding = req.body;
  if (Object.entries(newBuilding).length === 0) {
    return res.status(400).json({
      error: 'Empty request',
    });
  }
  try {
    const building = await Building.add({
      jobsite_id: jobsiteId,
      ...newBuilding,
    });
    if (building) {
      res.status(201).json(building);
    } else {
      res.status(404).json({ message: 'Building could not be added' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to add new building' });
  }
});

// EDIT user with ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const building = await Building.findById(id);

    if (building) {
      await Building.update(changes, id);

      res.status(200).json(changes);
    } else {
      res
        .status(404)
        .json({ message: 'could not find building with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update building' });
  }
});

// DEL user with ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Building.remove(id);

    if (deleted) {
      res.status(200).json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: 'could not find building with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to delete building' });
  }
});

module.exports = router;
