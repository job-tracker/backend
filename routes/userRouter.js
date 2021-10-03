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
  const newUser = req.body;
  if (Object.entries(newUser).length === 0) {
    return res.status(204).json({
      error: 'Empty request',
    });
  }
  try {
    const user = await User.add({
      ...newUser,
    });
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: 'User could not be added' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to add new user' });
  }
});

// EDIT user with ID
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const changes = req.body;
  try {
    const user = await User.findByUserId(userId);

    if (user) {
      await User.update(changes, userId);

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
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deleted = await User.remove(userId);
    if (deleted) {
      res.status(200).json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'could not find user with given id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error msg' });
  }
});

module.exports = router;
