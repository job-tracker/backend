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
	return db("jobsite").select(
		"id",
		"tracking_number",
		"name",
		"address",
        "notes",
        "complete"
	);
}

function findBy(filter) {
	return db("jobsite").where(filter);
}

async function add(jobsite) {
	const [id] = await db("jobsite")
		.insert(jobsite)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("jobsite").select(
		"id", 
		"tracking_number", 
		"name", 
		"address",  
		"notes", 
		"complete")
		.where({ id })
		.first();
}

// async function findByJobId(jobId) {
// 	const job = await db
// 		.select(["tracking_number", "name", "email"])
// 		.from("jobsite")
// 		.leftJoin("jobsites", "couples.id", "weddings.couple_id")
// 		.where("weddings.id", "=", jobId)
// 		.first();
// 	return job;
// }

async function remove(id) {
	try {
		deletedJob = await findById(id);
		const getJob = await db("jobsite")
			.where({ id })
			.del();
		return getJob ? getJob : null;
	} catch {
		throw new Error(err);
	}
}

async function update(jobsite, id) {
	try {
		const updateJob = await db("jobsite")
			.where({ id })
			.update(jobsite);
		return updateJob;
	} catch (err) {
		throw new Error(err);
	}
}
