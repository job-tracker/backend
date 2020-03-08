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
	return db("building").select(
        "id",
        "jobsite_id",
		"name",
		"floor_count",
		"unit_count",
        "outlet_count",
        "notes",
        "complete"
	);
}

function findBy(filter) {
	return db("building").where(filter);
}

async function add(building) {
	const [id] = await db("building")
		.insert(building)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("building").select(
        "id",
        "jobsite_id",
		"name",
		"floor_count",
		"unit_count",
        "outlet_count",
        "notes",
        "complete")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedBuilding = await findById(id);
		const getBuilding = await db("building")
			.where({ id })
			.del();
		return getBuilding ? getBuilding : null;
	} catch {
		throw new Error(err);
	}
}

async function update(building, id) {
	try {
		const updateBuilding = await db("building")
			.where({ id })
			.update(building);
		return updateBuilding;
	} catch (err) {
		throw new Error(err);
	}
}
