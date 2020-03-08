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
	return db("idf_room").select(
        "id",
        "jobsite_id",
        "building_id",
        "floor_id",
		"location",
        "images",
        "notes",
        "complete"
	);
}

function findBy(filter) {
	return db("idf_room").where(filter);
}

async function add(idf_room) {
	const [id] = await db("idf_room")
		.insert(idf_room)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("idf_room").select(
        "id",
        "jobsite_id",
        "building_id",
        "floor_id",
		"location",
        "images",
        "notes",
        "complete")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedIdf = await findById(id);
		const getIdf = await db("idf_room")
			.where({ id })
			.del();
		return getIdf ? getIdf : null;
	} catch {
		throw new Error(err);
	}
}

async function update(idf_room, id) {
	try {
		const updateIdf = await db("idf_room")
			.where({ id })
			.update(idf_room);
		return updateIdf;
	} catch (err) {
		throw new Error(err);
	}
}
