const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Jobsite = require('../models/jobsite.js');
const SupplyList = require('../models/supplyList.js');
const Building = require('../models/building.js');
const Contact = require('../models/contact.js');
const Floor = require('../models/floor.js');
const Unit = require('../models/unit.js');

const secrets = require('../config/secrets');

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //Bad Token!
        res
          .status(401)
          .json({ message: 'Houston, it appears our token is bad' });
      } else {
        //The token is a good token!
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Houston, we dont have any valid tokens' });
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    name: user.name,
  };

  const options = {
    expiresIn: '1d',
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

const findUserById = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const user = await User.findBy({ user_id: user_id });
    if (Object.entries(user).length === 0) {
      return res.status(404).json({
        error: `No user exists with id ${user_id}!`,
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

const findSupplyListById = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const supplyList = await SupplyList.findBy({ id: id, user_id: userId });
    if (Object.entries(supplyList).length === 0) {
      return res.status(404).json({
        error: `No supply list exists with id ${id}!`,
      });
    } else {
      req.supplyList = supplyList;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

const findJobsiteById = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const jobsite = await Jobsite.findBy({ id: id, user_id: userId });
    if (Object.entries(jobsite).length === 0) {
      return res.status(404).json({
        error: `No jobsite exists with id ${id}!`,
      });
    } else {
      req.jobsite = jobsite;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

const findBuildingById = async (req, res, next) => {
  const { id, userId, jobsiteId } = req.params;
  try {
    const building = await Building.findBy({
      id: id,
      user_id: userId,
      jobsite_id: jobsiteId,
    });
    if (Object.entries(building).length === 0) {
      return res.status(404).json({
        error: `No building exists with id ${id}!`,
      });
    } else {
      req.building = building;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

const findContactById = async (req, res, next) => {
  const { id, userId, jobsiteId } = req.params;
  try {
    const contact = await Contact.findBy({
      id: id,
      user_id: userId,
      jobsite_id: jobsiteId,
    });
    if (Object.entries(contact).length === 0) {
      return res.status(404).json({
        error: `No contact exists with id ${id}!`,
      });
    } else {
      req.contact = contact;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

const findFloorById = async (req, res, next) => {
  const { jobsiteId, buildingId, id } = req.params;
  try {
    const floor = await Floor.findBy({
      jobsite_id: jobsiteId,
      building_id: buildingId,
      id: id,
    });
    if (Object.entries(floor).length === 0) {
      return res.status(404).json({
        error: `No floor exists with id ${id}!`,
      });
    } else {
      req.floor = floor;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

const findUnitById = async (req, res, next) => {
  const { userId, jobsiteId, buildingId, floorId, id } = req.params;
  try {
    const unit = await Unit.findBy({
      user_id: userId,
      jobsite_id: jobsiteId,
      building_id: buildingId,
      floor_id: floorId,
      id: id,
    });
    if (Object.entries(unit).length === 0) {
      return res.status(404).json({
        error: `No unit exists with id ${id}!`,
      });
    } else {
      req.unit = unit;
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    throw err;
  }
};

module.exports = {
  generateToken,
  restricted,
  findUserById,
  findSupplyListById,
  findJobsiteById,
  findBuildingById,
  findContactById,
  findFloorById,
  findUnitById,
};
