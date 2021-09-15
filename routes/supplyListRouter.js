const router = require('express').Router({ mergeParams: true });
const SupplyList = require('../models/supplyList');
const { findSupplyListById } = require('../middleware');

// GET supply list table
router.get('/', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const supplyList = await SupplyList.findBy({ id: id, user_id: userId });
    res.status(200).json(supplyList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET supply list table with ID
router.get('/:id', findSupplyListById, async (req, res) => {
  const { supplyList } = req;
  try {
    if (supplyList) {
      res.status(200).json(supplyList);
    } else {
      res.status(404).json({ message: 'could not find supply list' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to get supply list' });
  }
});

// POST new supply list
router.post('/', async (req, res) => {
  const { userId } = req.params;
  const newSupplyList = req.body;
  if (Object.entries(newSupplyList).length === 0) {
    return res.status(400).json({
      error: 'Empty request',
    });
  }
  try {
    const supplyList = await SupplyList.add({
      user_id: userId,
      ...newSupplyList,
    });
    if (supplyList) {
      res.status(201).json(supplyList);
    } else {
      res.status(404).json({ message: 'Supply list could not be added' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to add new Supply list' });
  }
});

// EDIT supply list with ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const supplyList = await SupplyList.findById(id);

    if (supplyList) {
      await SupplyList.update(changes, id);

      res.status(200).json(changes);
    } else {
      res
        .status(404)
        .json({ message: 'could not find Supply list with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update Supply list' });
  }
});

// DEL supply list with ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await SupplyList.remove(id);

    if (deleted) {
      res.status(200).json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: 'could not find Supply list with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to delete Supply list' });
  }
});

module.exports = router;
