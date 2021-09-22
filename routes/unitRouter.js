const router = require('express').Router({ mergeParams: true });
const Unit = require('../models/unit');
const { findUnitById } = require('../middleware');

// GET unit table
router.get('/', async (req, res) => {
  const { userId, jobsiteId, buildingId, floorId } = req.params;
  try {
    const units = await Unit.findBy({
      user_id: userId,
      jobsite_id: jobsiteId,
      building_id: buildingId,
      floor_id: floorId,
    });
    if (Object.entries(units).length === 0) {
      return res.status(400).json({ error: 'Empty Request' });
    } else {
      res.status(200).json(units);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET unit table with ID
router.get('/:id', findUnitById, async (req, res) => {
  const { unit } = req;
  try {
    if (unit) {
      res.status(200).json(unit);
    } else {
      res.status(404).json({ message: 'could not find unit' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to get unit' });
  }
});

// Yeah

// POST new unit
router.post('/', async (req, res) => {
  const { userId, jobsiteId, buildingId, floorId } = req.params;
  const newUnit = req.body;
  if (Object.entries(newUnit).length === 0) {
    return res.status(400).json({
      error: 'Empty request',
    });
  }
  try {
    const unit = await Unit.add({
      user_id: userId,
      jobsite_id: jobsiteId,
      building_id: buildingId,
      floor_id: floorId,
      ...newUnit,
    });
    if (unit) {
      res.status(201).json(unit);
    } else {
      res.status(404).json({ message: 'Unit could not be added' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// EDIT unit with ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const unit = await Unit.findById(id);

    if (unit) {
      await Unit.update(changes, id);

      res.status(200).json(changes);
    } else {
      res.status(404).json({ message: 'could not find unit with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update unit' });
  }
});

// DEL unit with ID
router.delete('/:id', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const deleted = await Unit.remove(id, userId);

    if (deleted) {
      res.status(200).json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'could not find unit with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to delete unit' });
  }
});

module.exports = router;
