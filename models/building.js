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
  return db('buildings').select(
    'id',
    'user_id',
    'jobsite_id',
    'address',
    'scope_of_work',
    'complete'
  );
}

function findBy(filter) {
  return db('buildings').where(filter);
}

async function add(building) {
  const [id] = await db('buildings').insert(building).returning('id');

  return findById(id);
}

function findById(id) {
  return db('buildings')
    .select(
      'id',
      'user_id',
      'jobsite_id',
      'address',
      'scope_of_work',
      'complete'
    )
    .where({ id })
    .first();
}

async function remove(id) {
  try {
    deletedBuilding = await findById(id);
    const getBuilding = await db('buildings').where({ id }).del();
    return getBuilding ? getBuilding : null;
  } catch {
    throw new Error(err);
  }
}

async function update(building, id) {
  try {
    const updateBuilding = await db('buildings').where({ id }).update(building);
    return updateBuilding;
  } catch (err) {
    throw new Error(err);
  }
}
