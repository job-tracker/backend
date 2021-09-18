const router = require('express').Router({ mergeParams: true });

require('dotenv').config();

const Jobsite = require('../models/jobsite');
const bcrypt = require('bcryptjs');
const express = require('express');

const buildingRouter = require('./buildingRouter');
const contactRouter = require('./contactRouter');

router.use(express.json());

router.use('/:jobsiteId/buildings', buildingRouter);
router.use('/:jobsiteId/contacts', contactRouter);

// GET Jobsite table
router.get('/', async (req, res) => {
  const { userId } = req.params;
  try {
    const jobsites = await Jobsite.findBy({ user_id: userId });
    if (Object.entries(jobsites).length != 0) {
      res.status(200).json(jobsites);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Jobsite table with ID
router.get('/:id', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const jobsite = await Jobsite.findBy({ id: id, user_id: userId });

    if (Object.entries(jobsite).length != 0) {
      res.status(200).json(jobsite);
    } else {
      res.status(404).json({ message: 'could not find jobsite' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to get jobsite' });
  }
});

// POST new Jobsite
router.post('/', async (req, res) => {
  const { userId } = req.params;
  const newJob = req.body;
  if (Object.entries(newJob).length === 0) {
    return res.status(400).json({
      error: 'Missing required property: tracking number',
    });
  }
  try {
    const jobsite = await Jobsite.add({ user_id: userId, ...newJob });
    res.status(201).json(jobsite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// EDIT Jobsite with ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const jobsite = await Jobsite.findById(id);

    if (jobsite) {
      await Jobsite.update(changes, id);

      res.status(200).json(changes);
    } else {
      res.status(404).json({ message: 'could not find jobsite with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update jobsite' });
  }
});

// DEL request to with ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Jobsite.remove(id);

    if (deleted) {
      res.status(200).json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'could not find jobsite with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'failed to jobsite user' });
  }
});

module.exports = router;
