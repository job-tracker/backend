const router = require("express").Router({ mergeParams: true });
const Idf = require("../models/idf");
const { findIdfById } = require("../middleware")

// GET building table
router.get("/", async (req, res) => {
	const { jobsiteId, buildingId } = req.params;
	try {
		const Idfs = await Idf.findBy({jobsite_id: jobsiteId, building_id: buildingId});
		res.status(200).json(Idfs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET building table with ID
router.get("/:id", findIdfById, async (req, res) => {
	const { idf } = req;
		try {
			if (idf) {
				res.status(200).json(idf);
			} else {
				res.status(404).json({ message: "could not find idf room" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to get idf room" });
		}
});

// POST new floor
router.post("/", async (req, res) => {
  const { jobsiteId, buildingId } = req.params;
  const newIdf = req.body;
    if (Object.entries(newIdf).length === 0) {
      return res.status(400).json({
        error: "Empty request"
      })
    } 
    try {
      const idf = await Idf.add({jobsite_id: jobsiteId, building_id: buildingId, ...newIdf})
      if (idf) {
      res.status(201).json(idf)
      } else {
        res.status(404).json({message: "Idf room could not be added"})
      }
    }
    catch (err) {
    res.status(500).json({message: "Failed to add new Idf room"})
    }
})

// EDIT building with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;
		try {
			const idf = await Idf.findById(id);

			if (idf) {
				await Idf.update(changes, id);

				res.status(200).json(changes);
			} else {
				res.status(404).json({ message: "could not find Idf room with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "Failed to update Idf room" });
		}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
		try {
			const deleted = await Idf.remove(id);

			if (deleted) {
				res.status(200).json({ removed: deleted });
			} else {
				res.status(404).json({ message: "could not find Idf room with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to delete Idf room" });
		}
});

module.exports = router;
