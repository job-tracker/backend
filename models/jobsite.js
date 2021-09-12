const db = require('../database/config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
};

function find() {
  return db('jobsites').select(
    'id',
    'user_id',
    'tracking_number',
    'name',
    'address',
    'complete'
  );
}

function findBy(filter) {
  return db('jobsites').where(filter);
}

async function add(jobsite) {
  const [id] = await db('jobsites').insert(jobsite).returning('id');

  return findById(id);
}

function findById(id) {
  return db('jobsites')
    .select('id', 'tracking_number', 'name', 'address', 'complete')
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
    const getJob = await db('jobsites').where({ id }).del();
    return getJob ? getJob : null;
  } catch {
    throw new Error(err);
  }
}

async function update(jobsite, id) {
  try {
    const updateJob = await db('jobsites').where({ id }).update(jobsite);
    return updateJob;
  } catch (err) {
    throw new Error(err);
  }
}
