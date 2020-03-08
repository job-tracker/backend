const router = require("express").Router({ mergeParams: true });
const Building = require("../models/building");
const { findBuildingById } = require("../middleware")

// GET building table
router.get("/", async (req, res) => {
	const { jobsiteId } = req.params;
	try {
		const buildings = await Building.findBy({jobsite_id: jobsiteId});
		res.status(200).json(buildings);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET building table with ID
router.get("/:id", findBuildingById, async (req, res) => {
	const { building } = req;
		try {
			if (building) {
				res.status(200).json(building);
			} else {
				res.status(404).json({ message: "could not find building" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to get building" });
		}
});

// POST new building
router.post("/", async (req, res) => {
  const { jobsiteId } = req.params;
  const newBuilding = req.body;
    if (Object.entries(newBuilding).length === 0) {
      return res.status(400).json({
        error: "Empty request"
      })
    } 
    try {
      const building = await Building.add({jobsite_id: jobsiteId, ...newBuilding})
      if (building) {
      res.status(201).json(building)
      } else {
        res.status(404).json({message: "Building could not be added"})
      }
    }
    catch (err) {
    res.status(500).json({message: "Failed to add new building"})
    }
})

// EDIT building with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;
		try {
			const building = await Building.findById(id);

			if (building) {
				await Building.update(changes, id);

				res.status(200).json(changes);
			} else {
				res.status(404).json({ message: "could not find building with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "Failed to update building" });
		}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
		try {
			const deleted = await Building.remove(id);

			if (deleted) {
				res.status(200).json({ removed: deleted });
			} else {
				res.status(404).json({ message: "could not find building with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to delete building" });
		}
});

module.exports = router;
