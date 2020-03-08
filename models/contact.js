const db = require("../database/config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find() { 
	return db("contact").select(
        "id",
        "jobsite_id",
        "title",
		"name",
		"phone_number"
	);
}

function findBy(filter) {
	return db("contact").where(filter);
}

async function add(contact) {
	const [id] = await db("contact")
		.insert(contact)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("contact").select(
        "id",
        "jobsite_id",
        "title",
		"name",
		"phone_number")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedContact = await findById(id);
		const getContact = await db("contact")
			.where({ id })
			.del();
		return getContact ? getContact : null;
	} catch {
		throw new Error(err);
	}
}

async function update(contact, id) {
	try {
		const updateContact = await db("contact")
			.where({ id })
			.update(contact);
		return updateContact;
	} catch (err) {
		throw new Error(err);
	}
}
