const router = require('express').Router({ mergeParams: true });
const Floor = require('../models/floor');
const { findFloorById } = require('../middleware');

const unitRouter = require('../routes/unitRouter');

router.use('/:floorId/units', unitRouter);

// GET building table
router.get('/', async (req, res) => {
  const { userId, jobsiteId, buildingId } = req.params;
  try {
    const floors = await Floor.findBy({
      user_id: userId,
      jobsite_id: jobsiteId,
      building_id: buildingId,
    });
    res.status(200).json(floors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET building table with ID
router.get('/:id', findFloorById, async (req, res) => {
  const { floor } = req;
  try {
    if (floor) {
      res.status(200).json(floor);
    } else {
      res.status(404).json({ message: 'could not find floor' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to get floor' });
  }
});

// POST new floor
router.post('/', async (req, res) => {
  const { jobsiteId, buildingId } = req.params;
  const newFloor = req.body;
  if (Object.entries(newFloor).length === 0) {
    return res.status(400).json({
      error: 'Empty request',
    });
  }
  try {
    const floor = await Floor.add({
      jobsite_id: jobsiteId,
      building_id: buildingId,
      ...newFloor,
    });
    if (floor) {
      res.status(201).json(floor);
    } else {
      res.status(404).json({ message: 'Floor could not be added' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to add new floor' });
  }
});

// EDIT building with ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const floor = await Floor.findById(id);

    if (floor) {
      await Floor.update(changes, id);

      res.status(200).json(changes);
    } else {
      res.status(404).json({ message: 'could not find floor with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update floor' });
  }
});

// DEL request to with ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Floor.remove(id);

    if (deleted) {
      res.status(200).json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'could not find floor with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to delete floor' });
  }
});

module.exports = router;
