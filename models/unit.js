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
	return db("unit").select(
        "id",
        "jobsite_id",
        "building_id",
        "floor_id",
		"name",
        "outlet_count",
        "notes",
        "complete"
	);
}

function findBy(filter) {
	return db("unit").where(filter);
}

async function add(unit) {
	const [id] = await db("unit")
		.insert(unit)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("unit").select(
        "id",
        "jobsite_id",
        "building_id",
        "floor_id",
		"name",
        "outlet_count",
        "notes",
        "complete")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedUnit = await findById(id);
		const getUnit = await db("unit")
			.where({ id })
			.del();
		return getUnit ? getUnit : null;
	} catch {
		throw new Error(err);
	}
}

async function update(unit, id) {
	try {
		const updateUnit = await db("unit")
			.where({ id })
			.update(unit);
		return updateUnit;
	} catch (err) {
		throw new Error(err);
	}
}
