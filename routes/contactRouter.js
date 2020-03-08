const router = require("express").Router({ mergeParams: true });
const Contact = require("../models/contact");
const { findContactById } = require("../middleware")

// GET building table
router.get("/", async (req, res) => {
	const { jobsiteId } = req.params;
	try {
		const contacts = await Contact.findBy({jobsite_id: jobsiteId});
		res.status(200).json(contacts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET building table with ID
router.get("/:id", findContactById, async (req, res) => {
	const { contact } = req;
		try {
			if (contact) {
				res.status(200).json(contact);
			} else {
				res.status(404).json({ message: "could not find contact" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to get contact" });
		}
});

// POST new building
router.post("/", async (req, res) => {
  const { jobsiteId } = req.params;
  const newContact = req.body;
    if (Object.entries(newContact).length === 0) {
      return res.status(400).json({
        error: "Empty request"
      })
    } 
    try {
      const contact = await Contact.add({jobsite_id: jobsiteId, ...newContact})
      if (contact) {
      res.status(201).json(contact)
      } else {
        res.status(404).json({message: "Contact could not be added"})
      }
    }
    catch (err) {
    res.status(500).json({message: "Failed to add new contact"})
    }
})

// EDIT building with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;
		try {
			const contact = await Contact.findById(id);

			if (contact) {
				await Contact.update(changes, id);

				res.status(200).json(changes);
			} else {
				res.status(404).json({ message: "could not find contact with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "Failed to update contact" });
		}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
		try {
			const deleted = await Contact.remove(id);

			if (deleted) {
				res.status(200).json({ removed: deleted });
			} else {
				res.status(404).json({ message: "could not find contact with given id" });
			}
		} catch (err) {
			res.status(500).json({ message: "failed to delete contact" });
		}
});

module.exports = router;
