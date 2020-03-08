const router = require("express").Router({ mergeParams: true });
const Unit = require("../models/unit");
const { findUnitById } = require("../middleware")

// GET building table
router.get("/", async (req, res) => {
	const { jobsiteId, buildingId, floorId } = req.params;
	try {
		const units = await Unit.findBy({jobsite_id: jobsiteId, building_id: buildingId, floor_id: floorId});
		res.status(200).json(units);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET building table with ID
router.get("/:id", findUnitById, async (req, res) => {
	const { unit } = req;
		try {
			if (unit) {
				res.status(200).json(unit);
			} else {
				res.status(404).json({ message: "could not find unit" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to get unit" });
		}
});

// POST new floor
router.post("/", async (req, res) => {
  const { jobsiteId, buildingId, floorId } = req.params;
  const newUnit = req.body;
    if (Object.entries(newUnit).length === 0) {
      return res.status(400).json({
        error: "Empty request"
      })
    } 
    try {
      const unit = await Unit.add({jobsite_id: jobsiteId, building_id: buildingId, floor_id: floorId, ...newUnit})
      if (unit) {
      res.status(201).json(unit)
      } else {
        res.status(404).json({message: "Unit could not be added"})
      }
    }
    catch (err) {
    res.status(500).json({message: "Failed to add new unit"})
    }
})

// EDIT building with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;
		try {
			const unit = await Unit.findById(id);

			if (unit) {
				await Unit.update(changes, id);

				res.status(200).json(changes);
			} else {
				res.status(404).json({ message: "could not find unit with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "Failed to update unit" });
		}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
		try {
			const deleted = await Unit.remove(id);

			if (deleted) {
				res.status(200).json({ removed: deleted });
			} else {
				res.status(404).json({ message: "could not find unit with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to delete unit" });
		}
});

module.exports = router;
