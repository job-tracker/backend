const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Building = require("../models/building.js");
const Contact = require("../models/contact.js");

const secrets = require("../config/secrets");

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //Bad Token!
        res
          .status(401)
          .json({ message: "Houston, it appears our token is bad" });
      } else {
        //The token is a good token!
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Houston, we dont have any valid tokens" });
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    name: user.name
  };

  const options = {
    expiresIn: "1d"
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

const findBuildingById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const building = await Building.findById(id);
		if (!building) {
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
	const { id } = req.params;
	try {
		const contact= await Contact.findById(id);
		if (!contact) {
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

module.exports = {
  generateToken,
  restricted,
  findBuildingById,
  findContactById
};
